const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  try {
    // Extract data from the incoming webhook
    const webhookData = req.body;

    // Ensure the required data is present in the webhook payload
    const { subject, body, content_type, recipients, campaign } = webhookData;
    if (!subject || !body || !content_type || !recipients || !campaign) {
      throw new Error('Invalid webhook payload. Missing required fields.');
    }

    // Process each recipient and forward data to FCM
    await processRecipients(recipients, subject, body, content_type);

    // Respond to the original request
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing webhook:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

async function processRecipients(recipients, subject, body, content_type) {
  for (const recipient of recipients) {
    const { email, attribs } = recipient;
    const { fcm_id } = attribs;

    // Forward data to FCM using the FCM token
    await forwardToFCM(fcm_id, subject, body, content_type);
  }
}

async function forwardToFCM(fcmToken, subject, body, contentType) {
  const fcmEndpoint = 'https://fcm.googleapis.com/fcm/send';
  const fcmApiKey = 'your key here';

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${fcmApiKey}`,
  };

  const fcmPayload = {
    to: fcmToken,
    notification: {
      "title": subject,
      "body": body,
      "click_action": null,
      "icon": null,
      "image" url here,
  }
  };

  await axios.post(fcmEndpoint, fcmPayload, { headers });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

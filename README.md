# Listmonk Push Messenger

This is a lightweight HTTP server designed to handle webhooks from Listmonk and forward the data to different messaging services. In this example, we forward the data to Firebase Cloud Messaging (FCM).

## Setup

1. **Initialize Node.js Project:**
   
   ```bash
   npm init -y
2. **Install Dependency:**
   
   ```bash
   npm install express axios body-parser
2. **Run the server:**
   ```bash
   node server.js

The server will start running on the specified port.

Configuration
Before running the server, make sure to replace the placeholder values in server.js with your actual configurations.

FCM API Key:

Replace 'YOUR_FCM_API_KEY' with your Firebase Cloud Messaging API key.


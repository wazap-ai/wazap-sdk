# Wazap Node SDK

Official Node.js SDK for integrating with the Wazap.ai WhatsApp API. This library provides a fully typed, easy-to-use interface for sending messages, media, and bulk notifications through the Wazap platform.

## Features

- 🚀 **Full TypeScript Support**: Complete type definitions for request and response objects.
- 🛡️ **Built-in Validation**: Automatic input validation using Zod before requests even hit the API.
- 📦 **Bulk Messaging**: Specialized methods for high-throughput bulk sending with anti-ban strategies.
- 📁 **Media Support**: Send images, videos, documents, and audio files easily.
- 🔒 **Secure**: Header-based authentication and secure defaults.

## Installation

```bash
npm install wazap-node-sdk
# or
yarn add wazap-node-sdk
# or
pnpm add wazap-node-sdk
```

## Quick Start

### 1. Initialize the Client

```typescript
import { Wazap } from "wazap-node-sdk";

const client = new Wazap({
  companyToken: "YOUR_COMPANY_TOKEN",
  accountToken: "YOUR_ACCOUNT_TOKEN",
  // Optional
  // baseUrl: 'https://api.wazap.ai/external/v1',
  // timeout: 15000 // default 10s
});
```

### 2. Send a Text Message

```typescript
try {
  const result = await client.messages.send({
    to: "5511999999999",
    message: "Hello from Wazap SDK! 🚀",
    // Optional contact info to save automatically
    full_name: "John Doe",
    email: "john@example.com",
  });

  console.log("Message ID:", result.data.messageId);
} catch (error) {
  console.error("Error sending message:", error.message);
}
```

### 3. Send Media

```typescript
await client.messages.sendMedia({
  to: "5511999999999",
  mediaUrl: "https://example.com/invoice.pdf",
  message: "Here is your invoice", // Caption
  fileName: "invoice_january.pdf",
  mimeType: "application/pdf",
});
```

### 4. Send Bulk Messages

Send the same message to up to 100 contacts in a single request. The API handles queuing and delays to prevent banning.

```typescript
await client.messages.sendBulk({
  message: "Special Offer: 50% OFF today!",
  randomize: true, // Recommended: Randomizes order to mimic human behavior
  contacts: [
    "5511999999999",
    "5511888888888",
    // Or providing full contact details:
    {
      phone: "5511777777777",
      full_name: "Jane Smith",
      email: "jane@example.com",
    },
  ],
});
```

## Error Handling

The SDK throws standard Errors. You can catch them to handle API failures or validation errors.

```typescript
try {
  await client.messages.send({ to: "invalid-phone", message: "Hi" });
} catch (error) {
  // Validation Error: "Número de telefone inválido..."
  console.error(error.message);
}
```

## Requirements

- Node.js 18+
- Active Wazap Account

## License

ISC

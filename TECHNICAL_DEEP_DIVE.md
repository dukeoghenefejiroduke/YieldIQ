# Technical Deep-Dive: YieldIQ Architecture

## 1. Offline-First Sync Architecture
YieldIQ utilizes an **Offline-First** model, where the client application remains fully functional without a network connection.
- **Local Persistence:** All logs are immediately written to **Dexie.js** (IndexedDB wrapper). Schema now supports structured transaction data: `type` (sale/purchase/credit), `amount`, and `item`.
- **Custom Sync Hook:** A background service monitors `navigator.onLine`. Upon restoration of connectivity, it performs atomic batched POST requests. The record is only marked as `synced` after the server returns a `200 OK` response.

## 2. Local AI & Intelligence
- **Voice-Native Parsing:** Integrated **Transformers.js** directly into the client-side `VoiceEntry` component. Raw voice transcriptions are parsed locally into structured transactional JSON before persistence, ensuring speed and data privacy without requiring constant network access.

## 3. Communication Bridge (WhatsApp)
- **WhatsApp Webhook:** Server-side infrastructure supports inbound WhatsApp messaging via a dedicated `/api/whatsapp/webhook` endpoint, allowing for automated log ingestion and bidirectional communication.

## 4. Security Protocol
- **At Rest:** Local logs stored in IndexedDB are protected by device-level browser security sandboxing.
- **In Transit:** All API communication is forced over **HTTPS**, utilizing **JWT (Bearer tokens)** for authentication.

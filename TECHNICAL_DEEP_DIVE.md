# Technical Deep-Dive: YieldIQ Architecture

## 1. Offline-First Sync Architecture
YieldIQ utilizes an **Offline-First** model, where the client application remains fully functional without a network connection.
- **Local Persistence:** All logs are immediately written to **Dexie.js** (IndexedDB wrapper).
- **Custom Sync Hook:** A background service monitors `navigator.onLine`. Upon restoration of connectivity, it performs atomic batched POST requests. The record is only marked as `synced` after the server returns a `200 OK` response, ensuring no data loss during network flips.

## 2. Security Protocol
- **At Rest:** Local logs stored in IndexedDB are protected by device-level browser security sandboxing.
- **In Transit:** All API communication is forced over **HTTPS**, utilizing **JWT (Bearer tokens)** for authentication. Tokens are never stored in plain view; they are persisted in memory (AuthStore) and re-hydrated securely from `localStorage` only as needed.

## 3. Resilience vs. Standard Cloud Apps
Standard apps fail the "Last Mile" test. If a Nigerian farmer loses signal while entering data, a cloud-only app resets or loses that input. YieldIQ thrives because the **persistence layer exists on the device**. Our application assumes network failure is the norm, not the exception.

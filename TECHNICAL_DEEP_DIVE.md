# Technical Deep-Dive: AgroVoice Architecture

## 1. Offline-First Sync Architecture
AgroVoice utilizes an **Offline-First** model, where the client application remains fully functional without a network connection.
- **Local Persistence:** All logs are immediately written to **Dexie.js** (IndexedDB wrapper).
- **Custom Sync Hook:** Background sync ensures atomic batched POST requests once connectivity is restored.

## 2. Fintech Services Core (Server)
- **Credit Scoring Engine:** A dynamic service that recalculates `Farmer` and `Cooperative` credit scores on transactional events.
- **Payment Abstraction:** A `PaymentGateway` interface allowing seamless switching between providers (e.g., Paystack, Flutterwave).

## 3. Accessibility & Intelligence
- **USSD Interface:** A specialized controller for processing feature-phone-based USSD requests (Check Credit, Price Query, Transaction Logging).
- **Market Price Aggregator:** A dynamic service layer (extendable for external API integration) providing real-time crop market intelligence.

## 4. Security Protocol
- **At Rest:** Local logs protected by browser sandboxing.
- **In Transit:** All API communication over **HTTPS**; **JWT** for authentication; **Rate Limiting** via `express-rate-limit` for DDoS/brute-force protection.
- **Architecture:** Node.js server migrated to **ESM (ECMAScript Modules)** for modern compatibility.

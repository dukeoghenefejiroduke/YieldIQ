# Judge's FAQ: Preparing for the Q&A

### 1. "How do you handle offline-to-online data conflicts?"
"We use a 'local-first' strategy via Dexie.js. Every transaction gets a local timestamp and a `pending` status. When online, the sync service merges local logs with the server's authoritative state based on timestamps, using the server-side ID for future updates."

### 2. "Why is your AI parsing more reliable than a simple script?"
"While our MVP uses a robust heuristic, the architecture is designed to host quantized transformer models (like DistilBERT) locally via `@xenova/transformers`. This allows for true Natural Language Understanding (NLU) without needing cloud latency, even in low-bandwidth environments."

### 3. "How do you ensure data security for rural farmers?"
"Security is built-in. All communication between the app and the server is over encrypted channels. WhatsApp webhooks are verified via HMAC-SHA256 signatures, ensuring only authentic payloads from WhatsApp enter our processing pipeline."

### 4. "What is the biggest barrier to adoption?"
"Trust. We overcome this by localizing the UI into native languages and ensuring the system is offline-accessible. If the system doesn't work when they're in the field, they won't use it. AgroVoice is designed for the field, not just the office."

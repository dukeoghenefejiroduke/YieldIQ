# Judge's FAQ: Preparing for the Q&A

### 1. "How do you ensure data reliability for farmers without smartphones?"
"We provide an inclusive multi-modal logging pipeline. Farmers can use our offline-first smartphone app, or they can use SMS and USSD shortcodes. We normalize these inputs into our unified transaction ledger, ensuring inclusivity for the most vulnerable users."

### 2. "How robust is your offline-first synchronization?"
"Extremely robust. We use a custom sync service featuring exponential backoff retries. If a farmer is in a dead zone, data is logged locally and retried up to 5 times with increasing delays when connectivity flickers, ensuring high integrity in intermittent 2G/3G environments."

### 3. "How does your credit scoring work without collateral?"
"We leverage **AI-driven behavioral credit scoring**. By analyzing the volume, frequency, and variety of transactions in the farmer’s ledger, we build a risk profile based on actual activity history, not traditional asset-based collateral."

### 4. "How do you protect farmers against climate risks?"
"Our platform integrates localized weather data monitoring (at the LGA level). If environmental indicators (e.g., rainfall) fall below critical thresholds, we trigger proactive alerts and automated workflows to connect the farmer with micro-insurance providers for risk mitigation."

### 5. "What is your strategy for adoption in diverse regions?"
"Trust through accessibility. We have fully localized our interface into Hausa, Yoruba, Igbo, and Pidgin, and our multi-channel approach (SMS/USSD) ensures the technology meets the farmer where they are, not where we want them to be."

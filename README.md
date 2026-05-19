# YieldIQ: Transforming Agriculture through Intelligence

**Empowering farmers in the last mile with offline-first, voice-native AI.**

YieldIQ is an innovative AgroTech platform designed to bridge the digital divide for smallholder farmers. By providing a secure, voice-first AI interface that works seamlessly in low-connectivity areas, YieldIQ ensures that farmers can access expert crop diagnosis, tracking, and localized insights, regardless of internet access.

## Technical Highlights
*   **Offline-First Architecture:** Leveraging **Dexie.js (IndexedDB)** for local persistence, ensuring data is never lost, even in remote regions.
*   **Voice-Native AI:** Utilizing the **Web Speech API** to enable farmers to log crop data via natural speech, removing literacy and language barriers.
*   **Data Integrity:** Implementing **cryptographic hashing** for crop records, ensuring that diagnosis history remains immutable and trusted by cooperatives and insurers.
*   **Synchronization Service:** Intelligent background sync that reconciles local data with the cloud once connectivity is restored.

## Getting Started
1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm run install:all`
3. Configure your `.env` files in `client/` and `server/`.
4. Run the development environment: `npm start`

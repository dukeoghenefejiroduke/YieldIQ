# Technical Deep-Dive: AgroVoice Architecture

## 1. Offline-First Resilience
AgroVoice utilizes a robust **Offline-First** model to support rural Nigerian connectivity constraints.
- **Local Persistence:** All logs are immediately written to **Dexie.js** (IndexedDB wrapper).
- **Resilient Sync:** Custom sync hook with **exponential backoff** and chronological ordering, optimized for 2G/3G networks.

## 2. Fintech & Risk Services Core (Server)
- **Behavioral Credit Scoring Engine:** A dynamic service layer that recalculates `Farmer` and `Cooperative` scores upon every transactional event based on volume, variety, and consistency.
- **Weather Insurance Service:** An integration framework for localized (LGA-level) weather data analysis to trigger micro-insurance events based on rainfall thresholds.

## 3. Accessibility & Multi-Modal Intelligence
- **USSD/SMS Gateway:** A specialized controller/webhook pipeline for processing feature-phone-based inputs (transaction logging, credit checking, price queries).
- **Market Price Aggregator:** Real-time crop intelligence service.
- **Multilingual Support:** I18n architecture supporting Hausa, Yoruba, Igbo, and Pidgin.

## 4. Security & Data Integrity
- **Authentication:** **JWT** for secure API authentication.
- **Data Protection:** HTTPS for transit, server-side validation, and input sanitization.
- **Source Tracking:** All logs are tagged by `source` (app, sms, ussd) for auditability.
- **Infrastructure:** Node.js server using **ESM (ECMAScript Modules)**.

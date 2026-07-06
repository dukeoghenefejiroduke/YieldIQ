# AgroVoice Roadmap & Development Conventions

## Phased Implementation Strategy

We are implementing the feature set in four iterative phases:

1.  **Phase 1: Foundation (Robust Sync & Offline-First)** - *Current Focus*
    - Goal: Ensure data integrity and reliable syncing in unstable network environments.
    - Key Tasks: 
      - Refactor `syncService` to use client-side UUIDs for deduplication.
      - Implement batch sync with transaction awareness.
      - Improve conflict detection/resolution.
2.  **Phase 2: Core Utility**
    - Goal: Lower barrier to entry.
    - Key Tasks: Voice-first interface (dialect support), WhatsApp/SMS integration.
3.  **Phase 3: Value Add**
    - Goal: Enable data-driven decision making.
    - Key Tasks: AI-driven crop advisory, climate risk alerts, real-time price discovery.
4.  **Phase 4: Ecosystem**
    - Goal: Scale impact and trust.
    - Key Tasks: Financial inclusion (credit scoring), Supply chain (traceability), Community Hub.

## Technical Conventions

- **Sync Engine:** All local mutations MUST be queued in the SQLite database (`db.ts`) with a `pending` status before attempting network transmission.
- **Offline Reliability:** Use exponential backoff for all network operations.
- **Data Integrity:** Every log entry MUST be generated with a client-side UUID for idempotency.

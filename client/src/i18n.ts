import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          dashboard: 'Dashboard',
          addLog: 'Add Transaction',
          transactions: 'Transactions',
          syncing: 'Syncing...',
          synced: 'Synced',
          offline: 'Offline'
        }
      },
      izon: {
        translation: {
          dashboard: 'Dashboard (Izon)',
          addLog: 'Add Transaction (Izon)',
          transactions: 'Transactions (Izon)',
          syncing: 'Bolo fiyé...',
          synced: 'Bolo timi',
          offline: 'Off-line'
        }
      },
      epie: {
        translation: {
          dashboard: 'Dashboard (Epie)',
          addLog: 'Add Transaction (Epie)',
          transactions: 'Transactions (Epie)',
          syncing: 'Syncing... (Epie)',
          synced: 'Synced (Epie)',
          offline: 'Off-line (Epie)'
        }
      },
      ogbia: {
        translation: {
          dashboard: 'Dashboard (Ogbia)',
          addLog: 'Add Transaction (Ogbia)',
          transactions: 'Transactions (Ogbia)',
          syncing: 'Syncing... (Ogbia)',
          synced: 'Synced (Ogbia)',
          offline: 'Off-line (Ogbia)'
        }
      },
      nembe: {
        translation: {
          dashboard: 'Dashboard (Nembe)',
          addLog: 'Add Transaction (Nembe)',
          transactions: 'Transactions (Nembe)',
          syncing: 'Syncing... (Nembe)',
          synced: 'Synced (Nembe)',
          offline: 'Off-line (Nembe)'
        }
      }
    }
  });

export default i18n;

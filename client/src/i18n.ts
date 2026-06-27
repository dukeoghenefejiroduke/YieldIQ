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
      hausa: {
        translation: {
          dashboard: 'Dashboard (Hausa)',
          addLog: 'Add Transaction (Hausa)',
          transactions: 'Transactions (Hausa)',
          syncing: 'Ana aiki...',
          synced: 'An gama',
          offline: 'Babu internet'
        }
      },
      yoruba: {
        translation: {
          dashboard: 'Dashboard (Yoruba)',
          addLog: 'Add Transaction (Yoruba)',
          transactions: 'Transactions (Yoruba)',
          syncing: 'Ní ṣíṣiṣẹ...',
          synced: 'Ti pari',
          offline: 'Kò sí ayélujára'
        }
      },
      igbo: {
        translation: {
          dashboard: 'Dashboard (Igbo)',
          addLog: 'Add Transaction (Igbo)',
          transactions: 'Transactions (Igbo)',
          syncing: 'Na-arụ ọrụ...',
          synced: 'Emechala',
          offline: 'Enweghị ịntanetị'
        }
      },
      pidgin: {
        translation: {
          dashboard: 'Dashboard (Pidgin)',
          addLog: 'Add Transaction (Pidgin)',
          transactions: 'Transactions (Pidgin)',
          syncing: 'We dey sync...',
          synced: 'We don finish',
          offline: 'No internet'
        }
      },
    }
  });

export default i18n;

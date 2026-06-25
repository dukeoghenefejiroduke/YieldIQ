type LogType = 'sale' | 'purchase' | 'credit';

const itemKeywords = ['maize', 'beans', 'rice', 'yam', 'cassava', 'tomato', 'pepper'];

const inferType = (text: string): LogType => {
  const lower = text.toLowerCase();

  if (lower.includes('bought') || lower.includes('purchase') || lower.includes('purchased')) {
    return 'purchase';
  }

  if (lower.includes('credit') || lower.includes('owed') || lower.includes('debt')) {
    return 'credit';
  }

  return 'sale';
};

const inferAmount = (text: string) => {
  const match = text.match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
};

const inferItem = (text: string) => {
  const lower = text.toLowerCase();
  return itemKeywords.find((word) => lower.includes(word)) || 'general';
};

export const parseTransaction = async (text: string) => {
  const cleanedText = text.trim();

  if (!cleanedText) {
    return { type: 'sale' as const, amount: 0, item: 'general' };
  }

  return {
    type: inferType(cleanedText),
    amount: inferAmount(cleanedText),
    item: inferItem(cleanedText),
  };
};

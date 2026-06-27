import { UnifiedLog } from '../store/logStore';

/**
 * AI-Driven Behavioral Credit Scoring
 * 
 * Logic:
 * 1. Volume: Frequent transactions indicate steady income.
 * 2. Variety: Diverse item logs indicate a diversified farm.
 * 3. Timeliness: Consistent activity shows operational maturity.
 */

export const calculateCreditScore = (logs: UnifiedLog[]): number => {
    if (logs.length === 0) return 0;

    let score = 300; // Base score

    // Transaction volume factor
    score += Math.min(logs.length * 5, 200);

    // Financial activity factor
    const totalVolume = logs.reduce((acc, log) => acc + (log.amount || 0), 0);
    score += Math.min(totalVolume / 1000, 300); // 1 point per 1000 NGN

    // Consistency factor (simplified: check activity over last 30 days)
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const recentLogs = logs.filter(log => log.timestamp > thirtyDaysAgo);
    score += Math.min(recentLogs.length * 10, 200);

    return Math.min(Math.max(score, 300), 850); // Scale 300-850
};

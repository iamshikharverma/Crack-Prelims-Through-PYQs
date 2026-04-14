export interface SRSData {
  repetition: number;
  interval: number;
  efactor: number;
  nextReview: string; // ISO string
}

export const INITIAL_SRS: SRSData = {
  repetition: 0,
  interval: 0,
  efactor: 2.5,
  nextReview: new Date().toISOString(),
};

/**
 * Simplified Anki-style algorithm for 2 levels: Hard and Easy
 * isHard: boolean
 */
export function calculateSM2(
  quality: number, // We'll map 0 for Hard, 5 for Easy
  previousRepetition: number,
  previousInterval: number,
  previousEfactor: number
): SRSData {
  let repetition: number;
  let interval: number;
  let efactor = previousEfactor;

  // quality 0 = Hard, quality 5 = Easy
  if (quality >= 3) {
    // Easy
    if (previousRepetition === 0) {
      interval = 4; // First time easy: 4 days
    } else if (previousRepetition === 1) {
      interval = 10; // Second time easy: 10 days
    } else {
      interval = Math.round(previousInterval * efactor);
    }
    repetition = previousRepetition + 1;
    // Increase efactor slightly for easy questions
    efactor += 0.1;
  } else {
    // Hard
    repetition = 0;
    interval = 1; // Review tomorrow
    // Decrease efactor for hard questions
    efactor -= 0.2;
  }

  if (efactor < 1.3) efactor = 1.3;
  if (efactor > 3.5) efactor = 3.5;

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  return {
    repetition,
    interval,
    efactor,
    nextReview: nextReview.toISOString(),
  };
}

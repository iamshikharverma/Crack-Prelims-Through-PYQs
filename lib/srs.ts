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
 * SM-2 Algorithm implementation
 * quality: 0-5
 * 5: perfect response
 * 4: correct response after a hesitation
 * 3: correct response recalled with serious difficulty
 * 2: incorrect response; where the correct one seemed easy to recall
 * 1: incorrect response; the correct one remembered
 * 0: complete blackout.
 */
export function calculateSM2(
  quality: number,
  previousRepetition: number,
  previousInterval: number,
  previousEfactor: number
): SRSData {
  let repetition: number;
  let interval: number;
  let efactor: number;

  if (quality >= 3) {
    if (previousRepetition === 0) {
      interval = 1;
    } else if (previousRepetition === 1) {
      interval = 6;
    } else {
      interval = Math.round(previousInterval * previousEfactor);
    }
    repetition = previousRepetition + 1;
  } else {
    repetition = 0;
    interval = 1;
  }

  efactor = previousEfactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (efactor < 1.3) efactor = 1.3;

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  return {
    repetition,
    interval,
    efactor,
    nextReview: nextReview.toISOString(),
  };
}

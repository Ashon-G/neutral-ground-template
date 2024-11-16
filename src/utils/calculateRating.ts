type Rating = {
  rating: number;
  weight?: number;
};

export const calculateRating = (ratings: Rating[]): number => {
  // If no ratings, return 0
  if (ratings.length === 0) return 0;

  // Validate ratings are between 1 and 5
  const validRatings = ratings.filter(r => r.rating >= 1 && r.rating <= 5);
  
  // If no valid ratings after filtering, return 0
  if (validRatings.length === 0) return 0;

  // If weights are provided, normalize them
  const hasWeights = validRatings.some(r => r.weight !== undefined);
  
  if (hasWeights) {
    const weightSum = validRatings.reduce((sum, r) => sum + (r.weight || 1), 0);
    const normalizedRatings = validRatings.map(r => ({
      ...r,
      weight: (r.weight || 1) / weightSum
    }));

    // Calculate weighted average
    const weightedSum = normalizedRatings.reduce(
      (sum, r) => sum + r.rating * r.weight!,
      0
    );

    return Number(weightedSum.toFixed(1));
  }

  // Calculate simple average if no weights
  const sum = validRatings.reduce((acc, r) => acc + r.rating, 0);
  return Number((sum / validRatings.length).toFixed(1));
};
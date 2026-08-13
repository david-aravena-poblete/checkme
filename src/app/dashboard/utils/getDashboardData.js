import { fetchUserStats, fetchRecommendations } from '../serverless/dashboardApi';

export async function getDashboardData() {
  try {
    const [stats, recommendations] = await Promise.all([
      fetchUserStats(),
      fetchRecommendations()
    ]);

    return {
      stats,
      recommendations
    };
  } catch (error) {
    console.error('Error fetching dashboard data', error);
    // Retornamos fallback seguro
    return {
      stats: { reputation: 0, doubts: 0, verifications: 0 },
      recommendations: []
    };
  }
}

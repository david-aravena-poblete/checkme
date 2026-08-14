import { fetchUserStats } from '../serverless/dashboardApi';

export async function getDashboardData(userId) {
  try {
    const stats = await fetchUserStats(userId);

    return {
      stats
    };
  } catch (error) {
    console.error('Error fetching dashboard data', error);
    // Retornamos fallback seguro
    return {
      stats: { reputation: 0, doubts: 0, verifications: 0 }
    };
  }
}

import { fetchUserStats, fetchUserDoubts, fetchUserVerifications } from '../serverless/dashboardApi';

function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('es-CL', options);
  } catch {
    return dateString;
  }
}

export async function getDashboardData(userId) {
  try {
    const [stats, rawDoubts, rawVerifications] = await Promise.all([
      fetchUserStats(userId),
      fetchUserDoubts(userId),
      fetchUserVerifications(userId),
    ]);

    const myDoubts = rawDoubts.map((doubt) => ({
      ...doubt,
      date: formatDate(doubt.createdAt),
    }));

    const myVerifications = rawVerifications.map((verification) => ({
      ...verification,
      date: formatDate(verification.createdAt || verification.votedAt),
    }));

    return {
      stats,
      myDoubts,
      myVerifications,
    };
  } catch (error) {
    console.error('Error fetching dashboard data', error);
    // Retornamos fallback seguro
    return {
      stats: { reputation: 0, doubts: 0, verifications: 0 },
      myDoubts: [],
      myVerifications: [],
    };
  }
}



import { 
  getStoredPublications, 
  getStoredVotes, 
  getStoredPublicationById 
} from '@/lib/localStorageDb';

export async function fetchUserStats(userId) {
  if (!userId) {
    return { reputation: 0, doubts: 0, verifications: 0 };
  }

  try {
    const publications = getStoredPublications();
    const doubtsCount = publications.filter((p) => p.authorId === userId).length;

    const votes = getStoredVotes();
    const verificationsCount = votes.filter((v) => v.userId === userId).length;

    return {
      reputation: 0,
      doubts: doubtsCount,
      verifications: verificationsCount
    };
  } catch (error) {
    console.error('Error obteniendo estadísticas desde LocalStorage:', error);
    return { reputation: 0, doubts: 0, verifications: 0 };
  }
}

export async function fetchUserDoubts(userId) {
  if (!userId) {
    return [];
  }

  try {
    const publications = getStoredPublications();
    const userDoubts = publications.filter((p) => p.authorId === userId);

    return userDoubts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error('Error obteniendo dudas del usuario desde LocalStorage:', error);
    return [];
  }
}

export async function fetchUserVerifications(userId) {
  if (!userId) {
    return [];
  }

  try {
    const votes = getStoredVotes();
    const userVotes = votes.filter((v) => v.userId === userId);

    const verifications = userVotes.map((vote) => {
      const pub = getStoredPublicationById(vote.validationId);
      if (!pub) return null;

      return {
        ...pub,
        userVote: vote.type,
        votedAt: vote.updatedAt || pub.createdAt,
      };
    }).filter(Boolean);

    return verifications.sort((a, b) => new Date(b.votedAt || b.createdAt) - new Date(a.votedAt || a.createdAt));
  } catch (error) {
    console.error('Error obteniendo verificaciones del usuario desde LocalStorage:', error);
    return [];
  }
}

export async function updateUserDoubt(id, data, userId) {
  const { editStoredPublication } = await import('@/lib/localStorageDb');
  return editStoredPublication(id, data, userId);
}

export async function deleteUserDoubt(id, userId) {
  const { deleteStoredPublication } = await import('@/lib/localStorageDb');
  return deleteStoredPublication(id, userId);
}


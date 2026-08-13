export async function fetchUserStats() {
  // Simulando llamada de red
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        reputation: 150,
        doubts: 0,
        verifications: 0
      });
    }, 600);
  });
}

export async function fetchRecommendations() {
  // Simulando llamada de red
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'rec-1',
          title: 'ChatGPT dice que beber agua tibia con limón quema grasa, ¿es real?',
          category: 'Salud',
          status: 'Sin verificar'
        },
        {
          id: 'rec-2',
          title: 'Gemini calculó los impuestos digitales de forma incorrecta para 2026',
          category: 'Economía',
          status: 'En debate'
        }
      ]);
    }, 800);
  });
}

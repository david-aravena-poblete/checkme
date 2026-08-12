import { getDoubtsList } from '../../serverless/getDudas/getDudas';

function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('es-CL', options);
  } catch {
    return dateString;
  }
}


function groupByCategory(dudas) {
  return dudas.reduce((acc, duda) => {
    const category = duda.category || 'Sin categoría';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({
      ...duda,
      date: formatDate(duda.createdAt),
    });
    return acc;
  }, {});
}


export async function getDudasByCategory() {
  const rawDudas = await getDoubtsList();
  const grouped = groupByCategory(rawDudas);
  return grouped;
}

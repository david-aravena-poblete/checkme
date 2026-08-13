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

export async function getValidationsList() {
  const rawValidations = await getDoubtsList();
  
  // En lugar de agrupar por categoría, solo formateamos las fechas 
  // y devolvemos la lista plana de validaciones
  return rawValidations.map(validation => ({
    ...validation,
    date: formatDate(validation.createdAt)
  }));
}

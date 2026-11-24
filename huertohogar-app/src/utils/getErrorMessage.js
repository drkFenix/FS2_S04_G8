export function getErrorMessage(error) {
  if (!error) {
    return 'Ocurrió un error inesperado.';
  }
  return (
    error.response?.data?.message ||
    (error.code === 'ECONNABORTED' ? 'La API tardó demasiado en responder.' : null) ||
    (error.response ? `Error HTTP ${error.response.status}` : null) ||
    'No se pudo contactar a la API. Revisa la conexión y el backend.'
  );
}

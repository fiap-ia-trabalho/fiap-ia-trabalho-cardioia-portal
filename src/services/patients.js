// Consumo de JSON local via fetch: a demonstração não depende de uma API externa.
export async function fetchPatients(signal) {
  const response = await fetch(`${import.meta.env.BASE_URL}data/pacientes.json`, { signal });
  if (!response.ok) throw new Error('Não foi possível carregar a lista de pacientes.');
  const data = await response.json();
  if (!Array.isArray(data) || !data.every((p) => p.id && p.nome && Number.isFinite(p.idade))) {
    throw new Error('A base de pacientes está em um formato inválido.');
  }
  return data;
}

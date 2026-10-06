export const APPOINTMENTS_KEY = 'cardioia.portal.appointments.v1';
export const DOCTORS = ['Dra. Helena Costa', 'Dr. Rafael Mendes', 'Dra. Camila Rocha'];
export const TYPES = ['Consulta', 'Retorno', 'Avaliação inicial'];
export const TIMES = Array.from({ length: 20 }, (_, i) => `${String(8 + Math.floor(i / 2)).padStart(2, '0')}:${i % 2 ? '30' : '00'}`);

export const today = () => new Intl.DateTimeFormat('sv-SE', { timeZone: 'America/Bahia', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
export function dayAfter(days) {
  const date = new Date(`${today()}T12:00:00`);
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export const formatDate = (value, options = { day: '2-digit', month: 'short' }) => new Intl.DateTimeFormat('pt-BR', options).format(new Date(`${value}T12:00:00`));
export const sortAppointments = (items) => [...items].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));

export function initialAppointments() {
  const seed = [
    { id: 'demo-1', patientId: 'P003', doctor: DOCTORS[0], type: 'Avaliação inicial', date: dayAfter(1), time: '09:00', status: 'Agendada' },
    { id: 'demo-2', patientId: 'P001', doctor: DOCTORS[1], type: 'Retorno', date: dayAfter(1), time: '11:00', status: 'Agendada' },
    { id: 'demo-3', patientId: 'P006', doctor: DOCTORS[2], type: 'Consulta', date: dayAfter(2), time: '14:30', status: 'Agendada' },
  ];
  try {
    const raw = localStorage.getItem(APPOINTMENTS_KEY);
    if (raw === null) return seed;
    const saved = JSON.parse(raw);
    if (!Array.isArray(saved) || !saved.every((a) => a.id && /^P00[1-8]$/.test(a.patientId) && DOCTORS.includes(a.doctor) && TYPES.includes(a.type) && /^\d{4}-\d{2}-\d{2}$/.test(a.date) && TIMES.includes(a.time) && ['Agendada', 'Cancelada'].includes(a.status))) return seed;
    return saved;
  } catch { return seed; }
}

export function validateAppointment(values, appointments, patients) {
  const errors = {};
  if (!patients.some((p) => p.id === values.patientId)) errors.patientId = 'Selecione um paciente.';
  if (!DOCTORS.includes(values.doctor)) errors.doctor = 'Selecione um profissional.';
  if (!TYPES.includes(values.type)) errors.type = 'Selecione o tipo de consulta.';
  const dateValue = new Date(`${values.date}T12:00:00`);
  const validCalendarDay = Number.isFinite(dateValue.getTime()) && `${dateValue.getFullYear()}-${String(dateValue.getMonth() + 1).padStart(2, '0')}-${String(dateValue.getDate()).padStart(2, '0')}` === values.date;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date) || !validCalendarDay || values.date < today()) errors.date = 'Escolha uma data válida, a partir de hoje.';
  if (!TIMES.includes(values.time)) errors.time = 'Selecione um horário.';
  if (!errors.date && !errors.time && values.date === today()) {
    const now = new Intl.DateTimeFormat('sv-SE', { timeZone: 'America/Bahia', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date());
    if (values.time <= now) errors.time = 'Escolha um horário futuro.';
  }
  const conflict = appointments.find((a) => a.status === 'Agendada' && a.date === values.date && a.time === values.time && (a.doctor === values.doctor || a.patientId === values.patientId));
  if (conflict) errors.time = conflict.doctor === values.doctor ? 'O profissional já tem uma consulta nesse horário.' : 'O paciente já tem uma consulta nesse horário.';
  return errors;
}

// Estado imutável para compartilhar agenda e indicadores entre as páginas.
export function appointmentsReducer(state, action) {
  switch (action.type) {
    case 'ADD': return [...state, action.appointment];
    case 'CANCEL': return state.map((a) => a.id === action.id ? { ...a, status: 'Cancelada' } : a);
    default: return state;
  }
}

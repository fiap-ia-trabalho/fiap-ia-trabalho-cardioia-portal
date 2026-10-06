import { useReducer, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, CalendarDays, CheckCircle2, ListFilter } from 'lucide-react';
import { usePortal } from '../contexts/PortalContext';
import { DOCTORS, TYPES, TIMES, dayAfter, today, sortAppointments, validateAppointment } from '../services/appointments';
import AppointmentsTable from '../components/AppointmentsTable';
import styles from './Appointments.module.css';
import ui from '../components/ui.module.css';

const initialForm = { patientId: '', doctor: '', type: 'Consulta', date: dayAfter(1), time: '', errors: {} };
export function formReducer(state, action) {
  switch (action.type) {
    case 'FIELD': return { ...state, [action.field]: action.value, errors: { ...state.errors, [action.field]: '' } };
    case 'ERRORS': return { ...state, errors: action.errors };
    case 'RESET': return { ...initialForm, date: dayAfter(1) };
    default: return state;
  }
}

export default function Appointments() {
  const { patients, appointments, addAppointment, cancelAppointment } = usePortal();
  const [params] = useSearchParams();
  const [form, dispatch] = useReducer(formReducer, { ...initialForm, patientId: params.get('paciente') ?? '' });
  const [filter, setFilter] = useState('Agendada');
  const [message, setMessage] = useState('');
  const items = sortAppointments(appointments.filter((a) => filter === 'Todas' || a.status === filter));
  const change = (field) => (event) => { dispatch({ type: 'FIELD', field, value: event.target.value }); setMessage(''); };
  const submit = (event) => {
    event.preventDefault(); setMessage('');
    const { errors: ignored, ...values } = form;
    const errors = validateAppointment(values, appointments, patients);
    if (Object.keys(errors).length) { dispatch({ type: 'ERRORS', errors }); return; }
    addAppointment(values); dispatch({ type: 'RESET' }); setFilter('Agendada'); setMessage('Consulta agendada! Sua agenda e os indicadores foram atualizados.');
  };
  const cancel = (id) => { cancelAppointment(id); setMessage('Consulta cancelada. O horário está disponível novamente.'); };
  const fieldError = (name) => form.errors[name] && <span id={`${name}-error`} className={ui.fieldError}>{form.errors[name]}</span>;
  const fieldProps = (name) => ({ value: form[name], onChange: change(name), 'aria-invalid': Boolean(form.errors[name]), 'aria-describedby': form.errors[name] ? `${name}-error` : undefined });
  return <><div className={ui.pageHeading}><div><p className={ui.eyebrow}>ORGANIZAÇÃO DO ATENDIMENTO</p><h1>Agendamentos</h1><p>Gerencie a agenda e reserve o próximo horário.</p></div><span className={ui.countPill}><CalendarDays size={17} />{appointments.filter((a) => a.status === 'Agendada').length} agendadas</span></div>{message && <div className={ui.success} role="status"><CheckCircle2 size={19} />{message}</div>}<div className={styles.grid}><section className={ui.card}><div className={ui.cardHeading}><div><h2>Agenda de consultas</h2><p>As consultas da equipe de atendimento.</p></div></div><div className={styles.filters}><ListFilter size={16} /><div role="group" aria-label="Filtrar consultas">{['Agendada', 'Cancelada', 'Todas'].map((value) => <button key={value} aria-pressed={filter === value} className={filter === value ? styles.selected : ''} onClick={() => setFilter(value)}>{value === 'Agendada' ? 'Agendadas' : value === 'Cancelada' ? 'Canceladas' : value}</button>)}</div></div><AppointmentsTable items={items} allowCancel onCancel={cancel} /></section><section className={`${ui.card} ${styles.formCard}`}><div className={styles.formTitle}><span><Plus size={20} /></span><div><h2>Nova consulta</h2><p>Preencha os dados do agendamento.</p></div></div><form onSubmit={submit} noValidate><div className={ui.field}><label htmlFor="patientId">Paciente</label><select id="patientId" {...fieldProps('patientId')}><option value="">Selecione o paciente</option>{patients.map((p) => <option key={p.id} value={p.id}>{p.nome} · {p.id}</option>)}</select>{fieldError('patientId')}</div><div className={ui.field}><label htmlFor="doctor">Profissional</label><select id="doctor" {...fieldProps('doctor')}><option value="">Selecione o profissional</option>{DOCTORS.map((doctor) => <option key={doctor}>{doctor}</option>)}</select>{fieldError('doctor')}</div><div className={ui.field}><label htmlFor="type">Tipo de consulta</label><select id="type" {...fieldProps('type')}>{TYPES.map((type) => <option key={type}>{type}</option>)}</select>{fieldError('type')}</div><div className={styles.dateRow}><div className={ui.field}><label htmlFor="date">Data</label><input id="date" type="date" min={today()} {...fieldProps('date')} />{fieldError('date')}</div><div className={ui.field}><label htmlFor="time">Horário</label><select id="time" {...fieldProps('time')}><option value="">Selecione</option>{TIMES.map((time) => <option key={time}>{time}</option>)}</select>{fieldError('time')}</div></div><p className={styles.formHint}>Horários de 30 minutos. Evitamos conflitos de paciente e profissional.</p><button className={`${ui.primaryButton} ${styles.submit}`} type="submit"><Plus size={17} />Agendar consulta</button></form></section></div></>;
}

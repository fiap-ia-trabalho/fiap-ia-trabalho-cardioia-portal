import { Link } from 'react-router-dom';
import { UsersRound, CalendarDays, CalendarCheck2, ArrowRight, Plus, HeartPulse } from 'lucide-react';
import { usePortal } from '../contexts/PortalContext';
import { formatDate, sortAppointments, today, TYPES } from '../services/appointments';
import AppointmentsTable from '../components/AppointmentsTable';
import styles from './Dashboard.module.css';
import ui from '../components/ui.module.css';

export default function Dashboard() {
  const { patients, appointments } = usePortal();
  const active = appointments.filter((a) => a.status === 'Agendada');
  const upcoming = sortAppointments(active.filter((a) => a.date >= today()));
  const next = upcoming[0];
  const nextPatient = patients.find((p) => p.id === next?.patientId);
  const metrics = [
    { label: 'Pacientes cadastrados', value: patients.length, note: 'Na base de demonstração', icon: UsersRound },
    { label: 'Consultas agendadas', value: active.length, note: 'Agendamentos ativos', icon: CalendarDays },
    { label: 'Consultas para hoje', value: active.filter((a) => a.date === today()).length, note: formatDate(today(), { day: 'numeric', month: 'long' }), icon: CalendarCheck2 },
  ];
  return <><div className={ui.pageHeading}><div><p className={ui.eyebrow}>PAINEL DE ATENDIMENTO</p><h1>Visão geral</h1><p>Uma visão clara dos pacientes e da sua agenda.</p></div><Link to="/agendamentos" className={ui.primaryButton}><Plus size={18} />Nova consulta</Link></div>
    <section className={styles.hero}><div><span className={styles.heroLabel}><span />PRÓXIMO ATENDIMENTO</span><h2>{next ? nextPatient?.nome : 'Sua agenda está livre'}</h2><p>{next ? `${next.type} · ${next.doctor}` : 'Organize o próximo atendimento em Agendamentos.'}</p><Link to="/agendamentos">Ver agenda<ArrowRight size={16} /></Link></div><div className={styles.heroRight}>{next ? <><CalendarDays size={26} /><strong>{formatDate(next.date, { day: 'numeric', month: 'long' })}</strong><span>às {next.time}</span></> : <HeartPulse size={55} strokeWidth={1.2} />}</div><div className={styles.heroPattern} aria-hidden="true" /></section>
    <section className={styles.metrics} aria-label="Indicadores do portal">{metrics.map(({ label, value, note, icon: Icon }) => <article key={label} className={styles.metric}><div className={styles.metricTop}><span>{label}</span><span className={styles.metricIcon}><Icon size={21} /></span></div><strong>{value.toString().padStart(2, '0')}</strong><p>{note}</p></article>)}</section>
    <div className={styles.bottomGrid}><section className={ui.card}><div className={ui.cardHeading}><div><h2>Próximas consultas</h2><p>Os próximos atendimentos agendados.</p></div><Link to="/agendamentos" className={ui.textLink}>Ver todas<ArrowRight size={15} /></Link></div><AppointmentsTable items={upcoming.slice(0, 4)} /></section><section className={`${ui.card} ${styles.summary}`}><h2>Perfil da agenda</h2><p>Distribuição das consultas ativas.</p><div className={styles.bars}>{TYPES.map((type, i) => { const count = active.filter((a) => a.type === type).length; return <div key={type}><div className={styles.barLabel}><span>{type}</span><strong>{count}</strong></div><div className={styles.barTrack}><span className={styles[`bar${i}`]} style={{ width: `${active.length ? (count / active.length) * 100 : 0}%` }} /></div></div>; })}</div><div className={styles.summaryNote}><HeartPulse size={18} /><p>Organização do atendimento com informações simuladas.</p></div></section></div>
  </>;
}

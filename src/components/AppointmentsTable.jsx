import { CalendarDays, Clock3, X } from 'lucide-react';
import { usePortal } from '../contexts/PortalContext';
import { formatDate } from '../services/appointments';
import ui from './ui.module.css';

export function initials(name) { return name.split(' ').slice(0, 2).map((p) => p[0]).join(''); }

export default function AppointmentsTable({ items, allowCancel = false, onCancel }) {
  const { patients } = usePortal();
  if (!items.length) return <div className={ui.empty}><CalendarDays size={30} /><h3>Nenhuma consulta por aqui</h3><p>Os agendamentos aparecerão nesta lista.</p></div>;
  return <div className={ui.tableScroll}><table className={`${ui.table} ${ui.appointmentTable}`}><thead><tr><th>Paciente</th><th>Data e horário</th><th>Profissional</th><th>Situação</th>{allowCancel && <th><span className={ui.srOnly}>Ações</span></th>}</tr></thead><tbody>{items.map((a) => {
    const patient = patients.find((p) => p.id === a.patientId);
    return <tr key={a.id}><td><div className={ui.person}><span className={ui.personAvatar}>{initials(patient?.nome ?? 'Paciente')}</span><div><strong>{patient?.nome ?? a.patientId}</strong><small>{a.type}</small></div></div></td><td><strong className={ui.date}>{formatDate(a.date, { day: '2-digit', month: 'short', year: 'numeric' })}</strong><span className={ui.time}><Clock3 size={12} />{a.time}</span></td><td className={ui.doctor}>{a.doctor}</td><td><span className={`${ui.badge} ${a.status === 'Cancelada' ? ui.badgeMuted : ''}`}>{a.status}</span></td>{allowCancel && <td>{a.status === 'Agendada' && <button className={ui.iconButton} aria-label={`Cancelar consulta de ${patient?.nome ?? a.patientId} em ${formatDate(a.date)} às ${a.time}`} title="Cancelar consulta" onClick={() => onCancel(a.id)}><X size={16} /><span className={ui.cancelLabel}>Cancelar</span></button>}</td>}</tr>;
  })}</tbody></table></div>;
}

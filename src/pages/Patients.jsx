import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowUpRight, UsersRound } from 'lucide-react';
import { usePortal } from '../contexts/PortalContext';
import { initials } from '../components/AppointmentsTable';
import ui from '../components/ui.module.css';

export default function Patients() {
  const { patients } = usePortal();
  const [query, setQuery] = useState('');
  const clean = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const filtered = useMemo(() => patients.filter((p) => clean(`${p.nome} ${p.id} ${p.email}`).includes(clean(query))), [patients, query]);
  return <><div className={ui.pageHeading}><div><p className={ui.eyebrow}>BASE DE DEMONSTRAÇÃO</p><h1>Pacientes</h1><p>Conheça os pacientes e organize o próximo atendimento.</p></div><span className={ui.countPill}><UsersRound size={17} />{patients.length} pacientes</span></div><section className={ui.card}><div className={ui.listToolbar}><label className={ui.search}><Search size={18} /><span className={ui.srOnly}>Buscar pacientes</span><input type="search" placeholder="Buscar por nome, código ou e-mail" value={query} onChange={(e) => setQuery(e.target.value)} /></label><span>{filtered.length} de {patients.length} pacientes</span></div>{!filtered.length ? <div className={ui.empty}><Search size={28} /><h3>Nenhum paciente encontrado</h3><p>Tente outro nome, código ou e-mail.</p></div> : <div className={ui.tableScroll}><table className={`${ui.table} ${ui.patientTable}`}><thead><tr><th>Paciente</th><th>Idade</th><th>Contato</th><th>Perfil de atendimento</th><th><span className={ui.srOnly}>Ações</span></th></tr></thead><tbody>{filtered.map((p) => <tr key={p.id}><td><div className={ui.person}><span className={ui.personAvatar}>{initials(p.nome)}</span><div><strong>{p.nome}</strong><small>{p.id}</small></div></div></td><td>{p.idade} anos</td><td><div className={ui.contact}><span>{p.email}</span><small>{p.telefone}</small></div></td><td><span className={`${ui.badge} ${p.perfil === 'Primeira consulta' ? ui.badgeBlue : p.perfil === 'Retorno' ? ui.badgeMuted : ''}`}>{p.perfil}</span></td><td><Link to={`/agendamentos?paciente=${p.id}`} className={ui.textLink} aria-label={`Agendar consulta para ${p.nome}`}>Agendar<ArrowUpRight size={15} /></Link></td></tr>)}</tbody></table></div>}</section><p className={ui.pageNote}>Pacientes inteiramente fictícios. Nenhum dado clínico real é armazenado.</p></>;
}

import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, UsersRound, CalendarDays, LogOut, Menu, X, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { usePortal } from '../contexts/PortalContext';
import Brand from './Brand';
import styles from './Layout.module.css';
import ui from './ui.module.css';

const links = [{ to: '/', label: 'Visão geral', icon: LayoutDashboard }, { to: '/pacientes', label: 'Pacientes', icon: UsersRound }, { to: '/agendamentos', label: 'Agendamentos', icon: CalendarDays }];

export default function Layout() {
  const { user, logout } = useAuth();
  const { loading, error, retry } = usePortal();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const current = links.find((link) => link.to === location.pathname)?.label ?? 'Portal';
  return <div className={styles.shell}>
    <a className={styles.skip} href="#conteudo">Pular para o conteúdo</a>
    {open && <button className={styles.overlay} aria-label="Fechar menu" onClick={() => setOpen(false)} />}
    <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`}>
      <div className={styles.brandRow}><Brand /><button className={styles.closeMenu} aria-label="Fechar menu" onClick={() => setOpen(false)}><X size={20} /></button></div>
      <p className={styles.navTitle}>ATENDIMENTO</p>
      <nav aria-label="Navegação principal">{links.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}><Icon size={20} />{label}</NavLink>)}</nav>
      <div className={styles.sidebarBottom}><div className={styles.demoNote}><ShieldCheck size={20} /><div><strong>Ambiente de demonstração</strong><p>Todos os pacientes e consultas são fictícios.</p></div></div><button className={styles.logout} onClick={logout}><LogOut size={18} />Sair da conta</button><span className={styles.sidebarFooter}>FIAP · CardioIA · Fase 2</span></div>
    </aside>
    <div className={styles.mainColumn}>
      <header className={styles.topbar}><div className={styles.breadcrumb}><button className={styles.menuButton} aria-label="Abrir menu" aria-expanded={open} onClick={() => setOpen(true)}><Menu size={22} /></button><span>Portal</span><span>/</span><strong>{current}</strong></div><div className={styles.profile}><span className={styles.demoPill}><span />Demonstração</span><span className={styles.avatar}>EC</span><div><strong>{user.name}</strong><small>Equipe de atendimento</small></div></div></header>
      <main id="conteudo" className={styles.content}>{loading ? <div className={ui.loading} role="status"><span className={ui.spinner} />Carregando pacientes…</div> : error ? <div className={ui.errorBox} role="alert"><h1>Não foi possível carregar os dados</h1><p>{error}</p><button className={ui.primaryButton} onClick={retry}>Tentar novamente</button></div> : <Outlet />}</main>
      <footer className={styles.footer}><span>CardioIA · Organização do atendimento</span><span>Protótipo acadêmico com dados simulados</span></footer>
    </div>
  </div>;
}

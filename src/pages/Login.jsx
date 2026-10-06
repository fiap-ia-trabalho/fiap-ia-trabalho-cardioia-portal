import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarDays, UsersRound, ShieldCheck, HeartPulse } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { DEMO_EMAIL, DEMO_PASSWORD } from '../services/auth';
import Brand from '../components/Brand';
import styles from './Login.module.css';
import ui from '../components/ui.module.css';

export default function Login() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  if (user) return <Navigate to="/" replace />;
  const submit = (event) => {
    event.preventDefault(); setError('');
    try { login(email, password); navigate(location.state?.from ?? '/', { replace: true }); }
    catch (e) { setError(e.message); }
  };
  return <main className={styles.login}>
    <section className={styles.story}><Brand light /><div className={styles.storyMain}><span className={styles.eyebrow}>CONEXÕES QUE ORGANIZAM O CUIDADO</span><h1>Seu atendimento.<br />Tudo conectado.</h1><p>Pacientes, consultas e uma visão clara da rotina. Um portal pensado para o dia a dia da equipe.</p><div className={styles.preview}><div className={styles.previewTop}><HeartPulse size={23} /><span>CardioIA</span><span className={styles.previewDot} /></div><div className={styles.wave}><svg viewBox="0 0 400 85" aria-hidden="true"><path d="M0 48H75L89 38L102 48H133L144 66L160 12L179 79L194 48H230L245 37L261 48H400" fill="none" stroke="currentColor" strokeWidth="2.5" /></svg></div><div className={styles.previewStats}><div><UsersRound size={19} /><span>Pacientes</span><strong>Organizados</strong></div><div><CalendarDays size={19} /><span>Agendamentos</span><strong>Em um só lugar</strong></div></div></div></div><div className={styles.storyFooter}>FIAP · Inteligência Artificial<span>Fase 2 / Ir Além 1</span></div></section>
    <section className={styles.formSide}><div className={styles.mobileBrand}><Brand /></div><div className={styles.formCard}><span className={styles.formTag}><span />PORTAL DE ATENDIMENTO</span><h2>Bem-vinda ao CardioIA</h2><p className={styles.subtitle}>Entre para acompanhar pacientes e organizar consultas.</p><form onSubmit={submit} noValidate><div className={ui.field}><label htmlFor="email">E-mail</label><input id="email" type="email" autoComplete="username" placeholder="Seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required /></div><div className={ui.field}><label htmlFor="password">Senha</label><input id="password" type="password" autoComplete="current-password" placeholder="Sua senha" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>{error && <p className={ui.formError} role="alert">{error}</p>}<button className={`${ui.primaryButton} ${styles.loginButton}`} type="submit">Entrar no portal<ArrowRight size={18} /></button></form><div className={styles.demoAccess}><ShieldCheck size={20} /><div><strong>Acesso de demonstração</strong><p>{DEMO_EMAIL}<br />Senha: <code>{DEMO_PASSWORD}</code></p><button onClick={() => { setEmail(DEMO_EMAIL); setPassword(DEMO_PASSWORD); setError(''); }}>Preencher acesso</button></div></div><p className={styles.disclaimer}>Protótipo acadêmico. Todos os dados são fictícios.<br />Use somente as credenciais de demonstração.</p></div></section>
  </main>;
}

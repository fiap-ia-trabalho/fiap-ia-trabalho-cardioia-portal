import { HeartPulse } from 'lucide-react';
import styles from './ui.module.css';

export default function Brand({ light = false }) {
  return <div className={`${styles.brand} ${light ? styles.brandLight : ''}`}><span className={styles.brandIcon}><HeartPulse size={25} strokeWidth={1.8} /></span><span>Cardio<span className={styles.brandAccent}>IA</span><small>PORTAL DE ATENDIMENTO</small></span></div>;
}

import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { fetchPatients } from '../services/patients';
import { APPOINTMENTS_KEY, appointmentsReducer, initialAppointments } from '../services/appointments';

const PortalContext = createContext(null);

export function PortalProvider({ children }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [appointments, dispatch] = useReducer(appointmentsReducer, undefined, initialAppointments);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    fetchPatients(controller.signal).then(setPatients).catch((e) => {
      if (e.name !== 'AbortError') setError(e.message);
    }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [attempt]);

  useEffect(() => { localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments)); }, [appointments]);
  const addAppointment = (values) => dispatch({ type: 'ADD', appointment: { ...values, id: crypto.randomUUID(), status: 'Agendada' } });
  const cancelAppointment = (id) => dispatch({ type: 'CANCEL', id });
  return <PortalContext.Provider value={{ patients, loading, error, retry: () => setAttempt((v) => v + 1), appointments, addAppointment, cancelAppointment }}>{children}</PortalContext.Provider>;
}

export const usePortal = () => useContext(PortalContext);

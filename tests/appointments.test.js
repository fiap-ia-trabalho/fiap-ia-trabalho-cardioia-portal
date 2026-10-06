import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DOCTORS, dayAfter, validateAppointment } from '../src/services/appointments.js';

const patients = [{ id: 'P001' }, { id: 'P002' }];
const reservation = { patientId: 'P001', doctor: DOCTORS[0], type: 'Consulta', date: dayAfter(1), time: '10:00' };

test('bloqueia um profissional reservado, mesmo com outro paciente', () => {
  const errors = validateAppointment({ ...reservation, patientId: 'P002' }, [{ ...reservation, status: 'Agendada' }], patients);
  assert.match(errors.time, /profissional/);
});

test('bloqueia o mesmo paciente em dois profissionais no mesmo horário', () => {
  const errors = validateAppointment({ ...reservation, doctor: DOCTORS[1] }, [{ ...reservation, status: 'Agendada' }], patients);
  assert.match(errors.time, /paciente/);
});

test('um cancelamento libera o horário para uma nova consulta', () => {
  assert.deepEqual(validateAppointment(reservation, [{ ...reservation, status: 'Cancelada' }], patients), {});
});

test('rejeita datas passadas e dias inexistentes no calendário', () => {
  assert.ok(validateAppointment({ ...reservation, date: dayAfter(-1) }, [], patients).date);
  assert.ok(validateAppointment({ ...reservation, date: '2099-02-31' }, [], patients).date);
});

test('rejeita paciente e horário fora dos dados permitidos', () => {
  const errors = validateAppointment({ ...reservation, patientId: 'P999', time: '02:00' }, [], patients);
  assert.ok(errors.patientId);
  assert.ok(errors.time);
});

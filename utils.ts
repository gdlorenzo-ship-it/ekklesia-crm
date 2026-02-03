
import { Member, EventType } from './types';

export const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

export const renderTemplate = (template: string, member: Member, eventType: EventType, eventDate: string): string => {
  const age = calculateAge(member.fecha_nacimiento);
  return template
    .replace(/{nombre}/g, member.nombres)
    .replace(/{apellidos}/g, member.apellidos)
    .replace(/{nombre_completo}/g, `${member.nombres} ${member.apellidos}`)
    .replace(/{tipo_evento}/g, eventType)
    .replace(/{fecha_evento}/g, eventDate)
    .replace(/{edad}/g, age.toString())
    .replace(/{telefono}/g, member.telefono);
};

export const formatDate = (dateStr: string): string => {
  if (!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'miembro_activo': return 'bg-green-100 text-green-800';
    case 'nuevo': return 'bg-blue-100 text-blue-800';
    case 'en_discipulado': return 'bg-purple-100 text-purple-800';
    case 'visitante': return 'bg-yellow-100 text-yellow-800';
    case 'miembro_inactivo': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

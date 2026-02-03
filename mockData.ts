
import { 
  Member, PersonStatus, MaritalStatus, Family, FamilyRelation, RelationType, 
  Ministry, MinistryAssignment, DiscipleshipStage, DiscipleshipProgress, DiscipleshipStatus,
  ReminderRule, EventType, UserRole
} from './types';

export const currentUser = {
  id: 'u1',
  nombre: 'Pastor Juan Pérez',
  role: UserRole.ADMIN
};

export const mockMembers: Member[] = [
  {
    id: 'm1',
    nombres: 'Gabriel',
    apellidos: 'Rodríguez',
    telefono: '555-0101',
    email: 'gabriel@email.com',
    fecha_nacimiento: '1985-06-15',
    fecha_bautismo: '2010-08-20',
    estado_civil: MaritalStatus.CASADO,
    estatus_persona: PersonStatus.MIEMBRO_ACTIVO,
    activo: true,
    created_at: '2020-01-01',
    updated_at: '2023-10-01'
  },
  {
    id: 'm2',
    nombres: 'María',
    apellidos: 'García',
    telefono: '555-0102',
    email: 'maria@email.com',
    fecha_nacimiento: '1988-11-02',
    fecha_bautismo: '2012-05-10',
    estado_civil: MaritalStatus.CASADO,
    estatus_persona: PersonStatus.MIEMBRO_ACTIVO,
    activo: true,
    created_at: '2020-01-01',
    updated_at: '2023-10-01'
  },
  {
    id: 'm3',
    nombres: 'Roberto',
    apellidos: 'Soto',
    telefono: '555-0103',
    email: 'roberto@email.com',
    fecha_nacimiento: '1995-02-14',
    estado_civil: MaritalStatus.SOLTERO,
    estatus_persona: PersonStatus.NUEVO,
    activo: true,
    created_at: '2024-05-01',
    updated_at: '2024-05-01'
  },
  {
    id: 'm4',
    nombres: 'Elena',
    apellidos: 'Paz',
    telefono: '555-0104',
    email: 'elena@email.com',
    fecha_nacimiento: '1990-09-30',
    estado_civil: MaritalStatus.SOLTERO,
    estatus_persona: PersonStatus.EN_DISCIPULADO,
    activo: true,
    created_at: '2023-11-15',
    updated_at: '2023-11-15'
  }
];

export const mockFamilies: Family[] = [
  { id: 'f1', nombre_familia: 'Familia Rodríguez García', miembro_principal_id: 'm1' }
];

export const mockFamilyRelations: FamilyRelation[] = [
  { id: 'fr1', family_id: 'f1', relation_type: RelationType.SPOUSE, member_id: 'm2' },
  { id: 'fr2', family_id: 'f1', relation_type: RelationType.CHILD, nombre_manual: 'Gaby Jr', fecha_nacimiento: '2015-12-10' }
];

export const mockMinistries: Ministry[] = [
  { id: 'min1', nombre: 'Alabanza', descripcion: 'Ministerio de música y adoración', lider_user_id: 'u1', activo: true },
  { id: 'min2', nombre: 'Ujieres', descripcion: 'Servicio de bienvenida y orden', activo: true },
  { id: 'min3', nombre: 'Niños', descripcion: 'Escuela dominical para niños', activo: true }
];

export const mockMinistryAssignments: MinistryAssignment[] = [
  { id: 'ma1', ministry_id: 'min1', member_id: 'm1', rol_en_ministerio: 'Guitarrista', activo: true },
  { id: 'ma2', ministry_id: 'min1', member_id: 'm2', rol_en_ministerio: 'Vocalista', activo: true }
];

export const mockDiscipleshipStages: DiscipleshipStage[] = [
  { id: 'ds1', nombre: 'Nuevo creyente', orden: 1 },
  { id: 'ds2', nombre: 'Fundamentos', orden: 2 },
  { id: 'ds3', nombre: 'Servicio', orden: 3 },
  { id: 'ds4', nombre: 'Liderazgo', orden: 4 }
];

export const mockDiscipleshipProgress: DiscipleshipProgress[] = [
  { id: 'dp1', member_id: 'm4', stage_id: 'ds1', fecha_inicio: '2023-11-20', estatus: DiscipleshipStatus.COMPLETADO },
  { id: 'dp2', member_id: 'm4', stage_id: 'ds2', fecha_inicio: '2024-01-10', estatus: DiscipleshipStatus.EN_PROGRESO }
];

export const mockReminderRules: ReminderRule[] = [
  {
    id: 'rr1',
    nombre: 'Cumpleaños (General)',
    aplica_a: EventType.BIRTHDAY,
    dias_antes: 3,
    hora_envio: '09:00',
    canal: 'email',
    enabled: true,
    asunto_template: 'Recordatorio: Cumpleaños de {nombre_completo}',
    body_template: 'Hola, recordatorio: el {fecha_evento} es el cumpleaños de {nombre_completo}. Cumple {edad} años. Tel: {telefono}.'
  },
  {
    id: 'rr2',
    nombre: 'Aniversario de Boda',
    aplica_a: EventType.ANNIVERSARY,
    dias_antes: 1,
    hora_envio: '10:00',
    canal: 'email',
    enabled: true,
    asunto_template: 'Felicidades por su Aniversario: {nombre_completo}',
    body_template: 'Que Dios siga bendiciendo su hogar. El {fecha_evento} es su aniversario.'
  }
];


export enum UserRole {
  ADMIN = 'admin',
  SECRETARIA = 'secretaria',
  LIDER_MINISTERIO = 'lider_ministerio',
  LECTURA = 'lectura'
}

export enum PersonStatus {
  VISITANTE = 'visitante',
  NUEVO = 'nuevo',
  EN_DISCIPULADO = 'en_discipulado',
  MIEMBRO_ACTIVO = 'miembro_activo',
  MIEMBRO_INACTIVO = 'miembro_inactivo'
}

export enum MaritalStatus {
  SOLTERO = 'soltero',
  CASADO = 'casado',
  VIUDO = 'viudo',
  DIVORCIADO = 'divorciado'
}

export enum RelationType {
  SPOUSE = 'spouse',
  CHILD = 'child',
  OTHER = 'other'
}

export enum DiscipleshipStatus {
  EN_PROGRESO = 'en_progreso',
  COMPLETADO = 'completado',
  PAUSADO = 'pausado'
}

export enum FollowUpType {
  LLAMADA = 'llamada',
  VISITA = 'visita',
  MENSAJE = 'mensaje',
  ORACION = 'oracion',
  REUNION = 'reunion',
  OTRO = 'otro'
}

export enum TaskPriority {
  BAJA = 'baja',
  MEDIA = 'media',
  ALTA = 'alta'
}

export enum TaskStatus {
  PENDIENTE = 'pendiente',
  EN_PROCESO = 'en_proceso',
  HECHO = 'hecho',
  CANCELADO = 'cancelado'
}

export enum EventType {
  BIRTHDAY = 'birthday',
  BAPTISM = 'baptism',
  ANNIVERSARY = 'anniversary',
  CUSTOM = 'custom'
}

export interface Member {
  id: string;
  nombres: string;
  apellidos: string;
  sexo?: string;
  telefono: string;
  email: string;
  direccion?: string;
  fecha_nacimiento: string;
  fecha_bautismo?: string;
  fecha_aniversario?: string;
  estado_civil: MaritalStatus;
  estatus_persona: PersonStatus;
  fecha_ingreso_iglesia?: string;
  foto?: string;
  notas_generales?: string;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Family {
  id: string;
  nombre_familia: string;
  miembro_principal_id: string;
}

export interface FamilyRelation {
  id: string;
  family_id: string;
  relation_type: RelationType;
  member_id?: string;
  nombre_manual?: string;
  fecha_nacimiento?: string;
  notas?: string;
}

export interface Ministry {
  id: string;
  nombre: string;
  descripcion?: string;
  lider_user_id?: string;
  activo: boolean;
}

export interface MinistryAssignment {
  id: string;
  ministry_id: string;
  member_id: string;
  rol_en_ministerio?: string;
  fecha_inicio?: string;
  fecha_fin?: string;
  activo: boolean;
}

export interface DiscipleshipStage {
  id: string;
  nombre: string;
  orden: number;
}

export interface DiscipleshipProgress {
  id: string;
  member_id: string;
  stage_id: string;
  fecha_inicio: string;
  fecha_fin?: string;
  estatus: DiscipleshipStatus;
  mentor_user_id?: string;
  notas?: string;
}

export interface FollowUp {
  id: string;
  member_id: string;
  tipo: FollowUpType;
  fecha: string;
  responsable_user_id: string;
  resultado: string;
  notas: string;
  proximo_paso?: string;
}

export interface Task {
  id: string;
  member_id?: string;
  titulo: string;
  descripcion: string;
  asignado_a_user_id: string;
  fecha_limite: string;
  prioridad: TaskPriority;
  estatus: TaskStatus;
}

export interface ReminderRule {
  id: string;
  nombre: string;
  aplica_a: EventType;
  dias_antes: number;
  hora_envio: string;
  canal: 'email' | 'whatsapp' | 'both';
  enabled: boolean;
  asunto_template: string;
  body_template: string;
}

export interface NotificationLog {
  id: string;
  member_id: string;
  event_id?: string;
  rule_id: string;
  scheduled_for: string;
  sent_at?: string;
  channel: string;
  status: 'pending' | 'sent' | 'failed' | 'simulated';
  error_message?: string;
  rendered_subject?: string;
  rendered_body?: string;
}

export interface ChurchEvent {
  id: string;
  member_id: string;
  event_type: EventType;
  titulo?: string;
  event_date: string;
  recurrence: 'yearly' | 'once';
  activo: boolean;
}

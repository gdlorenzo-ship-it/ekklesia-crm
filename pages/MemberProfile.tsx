
import React, { useState } from 'react';
import { useAppContext } from '../store';
import { Member, FollowUpType, TaskPriority, TaskStatus } from '../types';
import { 
  ArrowLeft, Phone, Mail, MapPin, Calendar, 
  Plus, Edit, MessageSquare, ClipboardList, 
  Users, Target, Award 
} from 'lucide-react';
import { formatDate, calculateAge, getStatusColor } from '../utils';

interface MemberProfileProps {
  member: Member;
  onBack: () => void;
}

const MemberProfile: React.FC<MemberProfileProps> = ({ member, onBack }) => {
  const { state, dispatch } = useAppContext();
  const [activeTab, setActiveTab] = useState('datos');

  // Related data
  const family = state.families.find(f => f.miembro_principal_id === member.id || state.familyRelations.some(fr => fr.family_id === f.id && fr.member_id === member.id));
  const relations = family ? state.familyRelations.filter(fr => fr.family_id === family.id) : [];
  const assignments = state.ministryAssignments.filter(ma => ma.member_id === member.id && ma.activo);
  const progress = state.discipleshipProgress.filter(dp => dp.member_id === member.id);
  const followUps = state.followUps.filter(f => f.member_id === member.id).sort((a,b) => b.fecha.localeCompare(a.fecha));
  const tasks = state.tasks.filter(t => t.member_id === member.id);

  const tabs = [
    { id: 'datos', label: 'Datos', icon: ClipboardList },
    { id: 'familia', label: 'Familia', icon: Users },
    { id: 'ministerios', label: 'Ministerios', icon: Award },
    { id: 'discipulado', label: 'Discipulado', icon: Target },
    { id: 'seguimiento', label: 'Seguimiento', icon: MessageSquare },
  ];

  return (
    <div className="space-y-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
      >
        <ArrowLeft size={18} /> Volver al directorio
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Section */}
        <div className="bg-indigo-900 h-32 relative">
          <div className="absolute -bottom-12 left-8 flex items-end gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg">
              <div className="w-full h-full rounded-xl bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-700">
                {member.nombres[0]}{member.apellidos[0]}
              </div>
            </div>
            <div className="pb-2 text-white">
              <h2 className="text-2xl font-bold">{member.nombres} {member.apellidos}</h2>
              <p className="opacity-80 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${member.activo ? 'bg-green-400' : 'bg-gray-400'}`}></span>
                {member.estatus_persona.replace('_', ' ')} &bull; {calculateAge(member.fecha_nacimiento)} años
              </p>
            </div>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Editar Perfil
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="pt-16 px-8 pb-8">
          <div className="flex border-b border-gray-100 mb-6 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap border-b-2 ${
                  activeTab === tab.id 
                    ? 'border-indigo-600 text-indigo-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {activeTab === 'datos' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-gray-500 uppercase">Teléfono</p>
                      <p className="flex items-center gap-2 text-gray-900 font-medium">
                        <Phone size={16} className="text-gray-400" /> {member.telefono}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-gray-500 uppercase">Email</p>
                      <p className="flex items-center gap-2 text-gray-900 font-medium">
                        <Mail size={16} className="text-gray-400" /> {member.email}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-gray-500 uppercase">Fecha de Nacimiento</p>
                      <p className="flex items-center gap-2 text-gray-900 font-medium">
                        <Calendar size={16} className="text-gray-400" /> {formatDate(member.fecha_nacimiento)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-gray-500 uppercase">Fecha de Bautismo</p>
                      <p className="flex items-center gap-2 text-gray-900 font-medium">
                        <Award size={16} className="text-gray-400" /> {member.fecha_bautismo ? formatDate(member.fecha_bautismo) : 'No bautizado'}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-1 pt-4 border-t border-gray-50">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Dirección</p>
                    <p className="flex items-center gap-2 text-gray-900">
                      <MapPin size={16} className="text-gray-400" /> {member.direccion || 'No especificada'}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'familia' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-800">Círculo Familiar</h3>
                    <button className="text-indigo-600 text-sm font-medium hover:underline">+ Agregar familiar</button>
                  </div>
                  {family ? (
                    <div className="bg-gray-50 p-6 rounded-xl space-y-4 border border-gray-100">
                      <p className="font-bold text-gray-900 border-b border-gray-200 pb-2">{family.nombre_familia}</p>
                      <div className="space-y-3">
                        {relations.map(rel => {
                          const relMember = rel.member_id ? state.members.find(m => m.id === rel.member_id) : null;
                          return (
                            <div key={rel.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">
                                  {relMember ? `${relMember.nombres[0]}` : `${rel.nombre_manual?.[0]}`}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {relMember ? `${relMember.nombres} ${relMember.apellidos}` : rel.nombre_manual}
                                  </p>
                                  <p className="text-xs text-gray-500 capitalize">{rel.relation_type}</p>
                                </div>
                              </div>
                              <span className="text-xs text-indigo-600 font-medium cursor-pointer">Ver perfil</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
                      No se ha registrado una estructura familiar.
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'seguimiento' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800">Historial Pastoral</h3>
                    <button className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors">
                      Registrar visita/llamada
                    </button>
                  </div>
                  <div className="relative border-l-2 border-gray-100 pl-6 space-y-8 ml-3">
                    {followUps.length > 0 ? followUps.map(fu => (
                      <div key={fu.id} className="relative">
                        <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-white border-2 border-indigo-600"></div>
                        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded">
                              {fu.tipo}
                            </span>
                            <span className="text-xs text-gray-400">{formatDate(fu.fecha)}</span>
                          </div>
                          <p className="text-sm font-medium text-gray-900 mb-1">{fu.resultado}</p>
                          <p className="text-sm text-gray-600 italic">"{fu.notas}"</p>
                          {fu.proximo_paso && (
                            <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-2 text-xs font-semibold text-orange-600">
                              <ArrowLeft size={12} className="rotate-180" /> Próximo paso: {fu.proximo_paso}
                            </div>
                          )}
                        </div>
                      </div>
                    )) : (
                      <p className="text-gray-400 italic text-sm">Sin registros de seguimiento reciente.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar info */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-gray-800 uppercase">Estatus Espiritual</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Membresía</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${getStatusColor(member.estatus_persona)}`}>
                      {member.estatus_persona.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Liderazgo</span>
                    <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-full uppercase">
                      Miembro
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-gray-800 uppercase">Ministerios</h4>
                <div className="flex flex-wrap gap-2">
                  {assignments.length > 0 ? assignments.map(as => {
                    const min = state.ministries.find(m => m.id === as.ministry_id);
                    return (
                      <span key={as.id} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
                        {min?.nombre}
                      </span>
                    );
                  }) : <p className="text-xs text-gray-400 italic">No asignado a ministerios.</p>}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-gray-800 uppercase">Tareas Asignadas</h4>
                  <span className="text-xs font-bold bg-orange-100 text-orange-700 px-1.5 rounded">
                    {tasks.filter(t => t.estatus === TaskStatus.PENDIENTE).length}
                  </span>
                </div>
                <div className="space-y-3">
                  {tasks.length > 0 ? tasks.map(t => (
                    <div key={t.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded transition-colors border-l-2 border-orange-500">
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-gray-900">{t.titulo}</p>
                        <p className="text-[10px] text-gray-500">{formatDate(t.fecha_limite)}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${t.prioridad === 'alta' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
                    </div>
                  )) : <p className="text-xs text-gray-400 italic">No hay tareas pendientes.</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;

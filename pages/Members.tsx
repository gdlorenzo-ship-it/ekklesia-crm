
import React, { useState } from 'react';
import { useAppContext } from '../store';
import { 
  Search, Filter, Plus, MoreVertical, 
  Phone, Mail, ChevronRight 
} from 'lucide-react';
import { PersonStatus, Member } from '../types';
import { getStatusColor, formatDate } from '../utils';

interface MembersProps {
  onSelectMember: (m: Member) => void;
}

const Members: React.FC<MembersProps> = ({ onSelectMember }) => {
  const { state } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredMembers = state.members.filter(m => {
    const fullName = `${m.nombres} ${m.apellidos}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || 
                          m.telefono.includes(searchTerm) || 
                          m.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || m.estatus_persona === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Directorio de Miembros</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus size={18} /> Nuevo Miembro
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nombre, correo o teléfono..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select 
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Todos los estatus</option>
              <option value={PersonStatus.MIEMBRO_ACTIVO}>Miembro Activo</option>
              <option value={PersonStatus.NUEVO}>Nuevo</option>
              <option value={PersonStatus.EN_DISCIPULADO}>En Discipulado</option>
              <option value={PersonStatus.VISITANTE}>Visitante</option>
              <option value={PersonStatus.MIEMBRO_INACTIVO}>Inactivo</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Miembro</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Estatus</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Contacto</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">F. Ingreso</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredMembers.map((member) => (
              <tr 
                key={member.id} 
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onSelectMember(member)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                      {member.nombres[0]}{member.apellidos[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{member.nombres} {member.apellidos}</p>
                      <p className="text-xs text-gray-500 capitalize">{member.estado_civil}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase ${getStatusColor(member.estatus_persona)}`}>
                    {member.estatus_persona.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5"><Phone size={14} /> {member.telefono}</div>
                    <div className="flex items-center gap-1.5"><Mail size={14} /> {member.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatDate(member.created_at)}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredMembers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No se encontraron miembros con esos criterios.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;

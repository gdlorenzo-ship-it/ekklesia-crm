
import React from 'react';
import { useAppContext } from '../store';
import { Cross, Plus, Users, ShieldCheck, ChevronRight } from 'lucide-react';

const Ministries: React.FC = () => {
  const { state } = useAppContext();
  const { ministries, ministryAssignments, members } = state;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Ministerios y Servicio</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 shadow-sm transition-colors">
          <Plus size={18} /> Nuevo Ministerio
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ministries.map((min) => {
          const count = ministryAssignments.filter(ma => ma.ministry_id === min.id && ma.activo).length;
          const leader = members.find(m => m.id === min.lider_user_id);
          
          return (
            <div key={min.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-indigo-50 p-6 flex justify-between items-start">
                <div className="bg-white p-3 rounded-xl shadow-sm text-indigo-600">
                  <Cross size={24} />
                </div>
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${min.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {min.activo ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{min.nombre}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{min.descripcion}</p>
                </div>
                
                <div className="pt-4 border-t border-gray-50 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2"><Users size={16} /> Voluntarios</span>
                    <span className="font-bold text-gray-900">{count} personas</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center gap-2"><ShieldCheck size={16} /> Líder</span>
                    <span className="font-bold text-gray-900">{leader ? `${leader.nombres}` : 'Por asignar'}</span>
                  </div>
                </div>

                <button className="w-full mt-4 flex items-center justify-center gap-2 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
                  Ver Miembros <ChevronRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ministries;

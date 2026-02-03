
import React from 'react';
import { useAppContext } from '../store';
import { Target, CheckCircle2, Circle, Clock } from 'lucide-react';
import { DiscipleshipStatus } from '../types';

const Discipleship: React.FC = () => {
  const { state } = useAppContext();
  const { discipleshipStages, discipleshipProgress, members } = state;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Pipeline de Discipulado</h2>
          <p className="text-sm text-gray-500">Seguimiento del crecimiento espiritual de la congregación.</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 shadow-sm transition-colors">
          Asignar Mentor
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {discipleshipStages.map((stage) => {
          const peopleInStage = discipleshipProgress.filter(dp => dp.stage_id === stage.id && dp.estatus !== DiscipleshipStatus.COMPLETADO);
          
          return (
            <div key={stage.id} className="min-w-[300px] flex-shrink-0 bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-4">
              <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Target size={18} className="text-indigo-600" /> {stage.nombre}
                </h3>
                <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {peopleInStage.length}
                </span>
              </div>

              <div className="space-y-3">
                {peopleInStage.length > 0 ? peopleInStage.map(dp => {
                  const member = members.find(m => m.id === dp.member_id);
                  if (!member) return null;
                  
                  return (
                    <div key={dp.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-700">
                          {member.nombres[0]}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">{member.nombres} {member.apellidos}</p>
                          <p className="text-[10px] text-gray-500">Iniciado: {new Date(dp.fecha_inicio).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                        <span className="text-[10px] font-bold uppercase text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                          <Clock size={10} /> En progreso
                        </span>
                        <button className="text-indigo-600 text-xs font-bold hover:underline">
                          Actualizar
                        </button>
                      </div>
                    </div>
                  );
                }) : (
                  <div className="text-center py-10 text-gray-400 text-sm italic">
                    Nadie en esta etapa actualmente.
                  </div>
                )}
              </div>
              
              <button className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-400 text-sm font-medium rounded-xl hover:border-gray-400 hover:text-gray-500 transition-colors">
                + Agregar persona
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Discipleship;

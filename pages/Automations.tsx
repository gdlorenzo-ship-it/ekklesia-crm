
import React, { useState } from 'react';
import { useAppContext } from '../store';
import { Bell, Edit, Trash2, Mail, MessageCircle, PlayCircle, Eye } from 'lucide-react';
import { ReminderRule } from '../types';

const Automations: React.FC = () => {
  const { state } = useAppContext();
  const [selectedRule, setSelectedRule] = useState<ReminderRule | null>(state.reminderRules[0]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Centro de Automatización</h2>
          <p className="text-sm text-gray-500">Configura recordatorios y notificaciones automáticas.</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm">
          <PlayCircle size={18} /> Forzar ejecución hoy
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* List of Rules */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900 text-sm uppercase">Reglas Activas</h3>
          {state.reminderRules.map(rule => (
            <div 
              key={rule.id}
              onClick={() => setSelectedRule(rule)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedRule?.id === rule.id 
                  ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                  : 'bg-white border-gray-100 hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className={`p-1.5 rounded ${rule.canal === 'email' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                  {rule.canal === 'email' ? <Mail size={16} /> : <MessageCircle size={16} />}
                </div>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${rule.enabled ? 'bg-indigo-600' : 'bg-gray-200'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${rule.enabled ? 'left-5.5' : 'left-0.5'}`}></div>
                </div>
              </div>
              <h4 className="font-bold text-gray-900 text-sm">{rule.nombre}</h4>
              <p className="text-xs text-gray-500 mt-1">{rule.dias_antes} días antes • {rule.hora_envio}</p>
            </div>
          ))}
          <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm font-medium hover:border-gray-300 hover:text-gray-500 transition-colors">
            + Nueva Regla
          </button>
        </div>

        {/* Rule Editor/Preview */}
        <div className="lg:col-span-2 space-y-6">
          {selectedRule ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Editar Plantilla: {selectedRule.nombre}</h3>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-gray-50"><Eye size={18} /></button>
                  <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-50"><Trash2 size={18} /></button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase">Canal</label>
                    <select className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500">
                      <option value="email">Email</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="both">Ambos</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase">Anticipación (Días)</label>
                    <input type="number" className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" value={selectedRule.dias_antes} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">Asunto del Mensaje</label>
                  <input type="text" className="w-full p-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" value={selectedRule.asunto_template} />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-500 uppercase">Cuerpo del Mensaje</label>
                    <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50 px-1.5 rounded">Variables: {'{nombre}'}, {'{edad}'}, {'{fecha_evento}'}</span>
                  </div>
                  <textarea 
                    rows={6}
                    className="w-full p-4 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                    defaultValue={selectedRule.body_template}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
                  <button className="px-6 py-2 text-sm font-bold text-gray-600 hover:text-gray-800">Descartar</button>
                  <button className="bg-indigo-600 text-white px-8 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 shadow-sm">Guardar Cambios</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl">
              Selecciona una regla para editar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Automations;

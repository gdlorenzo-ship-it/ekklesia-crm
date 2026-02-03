
import React from 'react';
import { useAppContext } from '../store';
import { 
  Users, UserPlus, Heart, ClipboardCheck, 
  Calendar as CalendarIcon, ArrowRight 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { PersonStatus } from '../types';

const Dashboard: React.FC = () => {
  const { state } = useAppContext();
  const { members, discipleshipProgress, tasks } = state;

  const stats = [
    { label: 'Total Miembros', value: members.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Nuevos (Mes)', value: members.filter(m => m.estatus_persona === PersonStatus.NUEVO).length, icon: UserPlus, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'En Discipulado', value: members.filter(m => m.estatus_persona === PersonStatus.EN_DISCIPULADO).length, icon: Heart, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Tareas Pendientes', value: tasks.filter(t => t.estatus === 'pendiente').length, icon: ClipboardCheck, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  const statusData = [
    { name: 'Activos', value: members.filter(m => m.estatus_persona === PersonStatus.MIEMBRO_ACTIVO).length },
    { name: 'Nuevos', value: members.filter(m => m.estatus_persona === PersonStatus.NUEVO).length },
    { name: 'Discipulado', value: members.filter(m => m.estatus_persona === PersonStatus.EN_DISCIPULADO).length },
    { name: 'Visitantes', value: members.filter(m => m.estatus_persona === PersonStatus.VISITANTE).length },
  ];

  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Panel Principal</h2>
        <div className="text-sm text-gray-500">Actualizado: {new Date().toLocaleString()}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Composición de la Membresía</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-xs font-medium">
            {statusData.map((s, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                <span>{s.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Próximos Eventos (30 días)</h3>
            <button className="text-indigo-600 text-sm flex items-center gap-1 hover:underline">
              Ver calendario <ArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors border-l-4 border-indigo-500">
              <div className="bg-indigo-100 text-indigo-700 p-2 rounded text-center min-w-[50px]">
                <p className="text-xs font-bold uppercase">Nov</p>
                <p className="text-lg font-bold leading-none">02</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Cumpleaños de María García</p>
                <p className="text-sm text-gray-500">Cumple 36 años</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors border-l-4 border-pink-500">
              <div className="bg-pink-100 text-pink-700 p-2 rounded text-center min-w-[50px]">
                <p className="text-xs font-bold uppercase">Nov</p>
                <p className="text-lg font-bold leading-none">15</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Aniversario: Familia Rodríguez</p>
                <p className="text-sm text-gray-500">14 años de casados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

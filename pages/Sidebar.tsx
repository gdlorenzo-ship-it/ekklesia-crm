
import React from 'react';
import { 
  Home, Users, Cross, Target, Calendar, 
  Settings, Bell, CheckSquare, BarChart2 
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  role: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab, role }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, roles: [UserRole.ADMIN, UserRole.SECRETARIA, UserRole.LIDER_MINISTERIO, UserRole.LECTURA] },
    { id: 'members', label: 'Miembros', icon: Users, roles: [UserRole.ADMIN, UserRole.SECRETARIA, UserRole.LIDER_MINISTERIO, UserRole.LECTURA] },
    { id: 'ministries', label: 'Ministerios', icon: Cross, roles: [UserRole.ADMIN, UserRole.SECRETARIA, UserRole.LIDER_MINISTERIO, UserRole.LECTURA] },
    { id: 'discipleship', label: 'Discipulado', icon: Target, roles: [UserRole.ADMIN, UserRole.SECRETARIA, UserRole.LIDER_MINISTERIO, UserRole.LECTURA] },
    { id: 'tasks', label: 'Seguimiento y Tareas', icon: CheckSquare, roles: [UserRole.ADMIN, UserRole.SECRETARIA, UserRole.LIDER_MINISTERIO] },
    { id: 'calendar', label: 'Calendario', icon: Calendar, roles: [UserRole.ADMIN, UserRole.SECRETARIA] },
    { id: 'reports', label: 'Reportes', icon: BarChart2, roles: [UserRole.ADMIN, UserRole.SECRETARIA] },
    { id: 'automations', label: 'Automatizaciones', icon: Bell, roles: [UserRole.ADMIN] },
  ];

  const visibleItems = navItems.filter(item => item.roles.includes(role));

  return (
    <div className="w-64 bg-indigo-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-indigo-800">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="bg-white text-indigo-900 p-1 rounded">EK</span>
          Ekklesia CRM
        </h1>
      </div>
      <nav className="flex-1 mt-4">
        {visibleItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentTab(item.id)}
            className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
              currentTab === item.id 
                ? 'bg-indigo-800 border-r-4 border-white' 
                : 'hover:bg-indigo-800'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 bg-indigo-950 text-indigo-300 text-xs">
        v1.0.0 &copy; 2024 Iglesia Local
      </div>
    </div>
  );
};

export default Sidebar;

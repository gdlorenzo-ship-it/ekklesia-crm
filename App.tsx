
import React, { useState } from 'react';
import { AppProvider, useAppContext } from './store';
import { UserRole, Member } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import MemberProfile from './pages/MemberProfile';
import Ministries from './pages/Ministries';
import Discipleship from './pages/Discipleship';
import Automations from './pages/Automations';
import { Bell, LogOut, Search, User, ChevronDown } from 'lucide-react';

const AppContent: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showRoleSelect, setShowRoleSelect] = useState(false);

  const renderContent = () => {
    if (selectedMember) {
      return <MemberProfile member={selectedMember} onBack={() => setSelectedMember(null)} />;
    }

    switch (currentTab) {
      case 'dashboard': return <Dashboard />;
      case 'members': return <Members onSelectMember={setSelectedMember} />;
      case 'ministries': return <Ministries />;
      case 'discipleship': return <Discipleship />;
      case 'automations': return <Automations />;
      default: return <Dashboard />;
    }
  };

  const handleSetRole = (role: UserRole) => {
    dispatch({ type: 'SET_ROLE', payload: role });
    setShowRoleSelect(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={(tab) => { setCurrentTab(tab); setSelectedMember(null); }} 
        role={state.currentUser.role} 
      />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4 text-gray-400">
             {/* Dynamic Breadcrumb Placeholder */}
             <span className="text-gray-900 font-medium capitalize">{currentTab}</span>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-gray-600 relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">2</span>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowRoleSelect(!showRoleSelect)}
                className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                  {state.currentUser.nombre[0]}
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-bold text-gray-900 leading-none">{state.currentUser.nombre}</p>
                  <p className="text-[10px] font-medium text-gray-500 uppercase tracking-tighter">{state.currentUser.role}</p>
                </div>
                <ChevronDown size={14} className="text-gray-400" />
              </button>

              {showRoleSelect && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-20">
                  <p className="text-[10px] font-bold text-gray-400 uppercase px-3 py-2">Cambiar Rol (Demo)</p>
                  {Object.values(UserRole).map(role => (
                    <button 
                      key={role}
                      onClick={() => handleSetRole(role)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-indigo-50 transition-colors capitalize ${state.currentUser.role === role ? 'font-bold text-indigo-600 bg-indigo-50' : 'text-gray-600'}`}
                    >
                      {role.replace('_', ' ')}
                    </button>
                  ))}
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button className="w-full text-left px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 flex items-center gap-2">
                      <LogOut size={16} /> Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;

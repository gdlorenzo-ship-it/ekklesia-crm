
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { 
  Member, Family, FamilyRelation, Ministry, MinistryAssignment, 
  DiscipleshipStage, DiscipleshipProgress, FollowUp, Task, 
  ReminderRule, NotificationLog, ChurchEvent, UserRole, SystemUser
} from './types';
import { 
  mockMembers, mockFamilies, mockFamilyRelations, mockMinistries, 
  mockMinistryAssignments, mockDiscipleshipStages, mockDiscipleshipProgress,
  mockReminderRules, currentUser
} from './mockData';

interface State {
  members: Member[];
  families: Family[];
  familyRelations: FamilyRelation[];
  ministries: Ministry[];
  ministryAssignments: MinistryAssignment[];
  discipleshipStages: DiscipleshipStage[];
  discipleshipProgress: DiscipleshipProgress[];
  followUps: FollowUp[];
  tasks: Task[];
  reminderRules: ReminderRule[];
  notificationLogs: NotificationLog[];
  events: ChurchEvent[];
  systemUsers: SystemUser[];
  currentUser: { id: string; nombre: string; role: UserRole };
}

type Action = 
  | { type: 'SET_ROLE', payload: UserRole }
  | { type: 'ADD_MEMBER', payload: Member }
  | { type: 'UPDATE_MEMBER', payload: Member }
  | { type: 'DELETE_MEMBER', payload: string }
  | { type: 'ADD_FOLLOW_UP', payload: FollowUp }
  | { type: 'ADD_TASK', payload: Task }
  | { type: 'UPDATE_TASK', payload: Task }
  | { type: 'ADD_LOG', payload: NotificationLog }
  | { type: 'ADD_SYSTEM_USER', payload: SystemUser }
  | { type: 'DELETE_SYSTEM_USER', payload: string };

const initialState: State = {
  members: mockMembers,
  families: mockFamilies,
  familyRelations: mockFamilyRelations,
  ministries: mockMinistries,
  ministryAssignments: mockMinistryAssignments,
  discipleshipStages: mockDiscipleshipStages,
  discipleshipProgress: mockDiscipleshipProgress,
  followUps: [],
  tasks: [],
  reminderRules: mockReminderRules,
  notificationLogs: [],
  events: [],
  systemUsers: [
    { id: 'u1', nombre: 'Pastor Juan Pérez', email: 'juan@ekklesia.com', role: UserRole.ADMIN, activo: true },
    { id: 'u2', nombre: 'Ana Secretaria', email: 'ana@ekklesia.com', role: UserRole.SECRETARIA, activo: true },
    { id: 'u3', nombre: 'Carlos Líder', email: 'carlos@ekklesia.com', role: UserRole.LIDER_MINISTERIO, activo: true }
  ],
  currentUser: currentUser
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_ROLE':
      const newCurrentUser = state.systemUsers.find(u => u.role === action.payload) || state.currentUser;
      return { ...state, currentUser: { ...state.currentUser, role: action.payload, nombre: newCurrentUser.nombre } };
    case 'ADD_MEMBER':
      return { ...state, members: [...state.members, action.payload] };
    case 'UPDATE_MEMBER':
      return { ...state, members: state.members.map(m => m.id === action.payload.id ? action.payload : m) };
    case 'DELETE_MEMBER':
      return { ...state, members: state.members.filter(m => m.id !== action.payload) };
    case 'ADD_FOLLOW_UP':
      return { ...state, followUps: [...state.followUps, action.payload] };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return { ...state, tasks: state.tasks.map(t => t.id === action.payload.id ? action.payload : t) };
    case 'ADD_LOG':
      return { ...state, notificationLogs: [...state.notificationLogs, action.payload] };
    case 'ADD_SYSTEM_USER':
      return { ...state, systemUsers: [...state.systemUsers, action.payload] };
    case 'DELETE_SYSTEM_USER':
      return { ...state, systemUsers: state.systemUsers.filter(u => u.id !== action.payload) };
    default:
      return state;
  }
};

const AppContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const runDailyAutomation = () => {
      console.log('Running daily automation check...');
    };
    runDailyAutomation();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};

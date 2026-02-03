
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { 
  Member, Family, FamilyRelation, Ministry, MinistryAssignment, 
  DiscipleshipStage, DiscipleshipProgress, FollowUp, Task, 
  ReminderRule, NotificationLog, ChurchEvent, UserRole
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
  currentUser: { id: string; nombre: string; role: UserRole };
}

type Action = 
  | { type: 'SET_ROLE', payload: UserRole }
  | { type: 'ADD_MEMBER', payload: Member }
  | { type: 'UPDATE_MEMBER', payload: Member }
  | { type: 'ADD_FOLLOW_UP', payload: FollowUp }
  | { type: 'ADD_TASK', payload: Task }
  | { type: 'UPDATE_TASK', payload: Task }
  | { type: 'ADD_LOG', payload: NotificationLog };

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
  currentUser: currentUser
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, currentUser: { ...state.currentUser, role: action.payload } };
    case 'ADD_MEMBER':
      return { ...state, members: [...state.members, action.payload] };
    case 'UPDATE_MEMBER':
      return { ...state, members: state.members.map(m => m.id === action.payload.id ? action.payload : m) };
    case 'ADD_FOLLOW_UP':
      return { ...state, followUps: [...state.followUps, action.payload] };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return { ...state, tasks: state.tasks.map(t => t.id === action.payload.id ? action.payload : t) };
    case 'ADD_LOG':
      return { ...state, notificationLogs: [...state.notificationLogs, action.payload] };
    default:
      return state;
  }
};

const AppContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Simulated daily job
  useEffect(() => {
    const runDailyAutomation = () => {
      console.log('Running daily automation check...');
      // Logic for detecting events and creating notification logs would go here
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

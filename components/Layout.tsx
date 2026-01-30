
import React from 'react';
import { Theme, User } from '../types';
import { SafeClickLogo } from './Logo';
import { 
  BookOpen, 
  Scale, 
  Download, 
  Search, 
  MessageSquare,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  Moon,
  Sun,
  Zap,
  Monitor,
  ChevronRight
} from 'lucide-react';

interface LayoutProps {
  theme: Theme;
  setTheme: (t: Theme) => void;
  user: User | null;
  logout: () => void;
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ theme, setTheme, user, logout, children, activeTab, setActiveTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Command Center', icon: <Monitor size={20} /> },
    { id: 'awareness', label: 'Intel Library', icon: <BookOpen size={20} /> },
    { id: 'attacks', label: 'Threat Catalog', icon: <Zap size={20} /> },
    { id: 'legal', label: 'Legal Archives', icon: <Scale size={20} /> },
    { id: 'analyzer', label: 'Neural Scan', icon: <Search size={20} /> },
    { id: 'chatbot', label: 'Sentinel AI', icon: <MessageSquare size={20} /> },
    { id: 'resources', label: 'Deployables', icon: <Download size={20} /> },
  ];

  const ThemeToggle = () => (
    <div className="flex flex-wrap gap-2 p-1.5 bg-black/5 dark:bg-white/5 rounded-xl border border-white/5">
      <button onClick={() => setTheme(Theme.LIGHT)} title="Light" className={`p-2 rounded-lg transition-all ${theme === Theme.LIGHT ? 'bg-white shadow-md text-indigo-600' : 'opacity-50 hover:opacity-100'}`}><Sun size={14} /></button>
      <button onClick={() => setTheme(Theme.DARK)} title="Dark" className={`p-2 rounded-lg transition-all ${theme === Theme.DARK ? 'bg-gray-800 shadow-md text-white' : 'opacity-50 hover:opacity-100'}`}><Moon size={14} /></button>
      <button onClick={() => setTheme(Theme.CYBER_BLUE)} title="Cyber" className={`p-2 rounded-lg transition-all ${theme === Theme.CYBER_BLUE ? 'bg-blue-600 shadow-md text-white' : 'opacity-50 hover:opacity-100'}`}><Monitor size={14} /></button>
      <button onClick={() => setTheme(Theme.NEON_GREEN)} title="Terminal" className={`p-2 rounded-lg transition-all ${theme === Theme.NEON_GREEN ? 'bg-emerald-600 shadow-md text-white' : 'opacity-50 hover:opacity-100'}`}><Zap size={14} /></button>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <header className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-inherit/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-2">
          <SafeClickLogo size={32} />
          <span className="font-bold tracking-tighter text-lg uppercase">SAFECLICK</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-white/5 rounded-lg border border-white/10">
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 transform transition-all duration-300 lg:translate-x-0 lg:static lg:inset-auto
        ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        border-r border-gray-200 dark:border-gray-800 flex flex-col bg-inherit
      `}>
        <div className="flex flex-col items-center gap-2 py-10 px-6 border-b border-white/5 mb-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-[var(--accent)] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative p-3 bg-black rounded-2xl text-white">
              <SafeClickLogo size={56} />
            </div>
          </div>
          <div className="text-center mt-2">
            <h1 className="font-black text-2xl tracking-tighter uppercase italic">SAFECLICK</h1>
            <p className="text-[9px] uppercase tracking-[0.25em] font-bold opacity-40">System Security Suite</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
              className={`
                w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all group
                ${activeTab === item.id 
                  ? 'bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent-glow)]' 
                  : 'hover:bg-white/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100'}
              `}
            >
              <div className="flex items-center gap-4">
                <span className={`${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
                  {item.icon}
                </span>
                <span className="font-bold text-xs uppercase tracking-widest">{item.label}</span>
              </div>
              <ChevronRight size={14} className={`opacity-0 group-hover:opacity-40 transition-all ${activeTab === item.id ? 'translate-x-1 opacity-100' : ''}`} />
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5 space-y-6">
          <ThemeToggle />
          {user && (
            <div className="group relative">
               <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--accent)] to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 transition duration-500"></div>
               <div className="relative flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] border border-[var(--accent)]/20">
                    <SafeClickLogo size={20} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-black truncate uppercase tracking-tighter">{user.name}</p>
                    <p className="text-[10px] opacity-40 uppercase font-mono">{user.role}</p>
                  </div>
                </div>
                <button onClick={logout} className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-xl transition-all">
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-30 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="flex-1 overflow-y-auto w-full relative">
        <div className="max-w-screen-2xl mx-auto p-4 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
};

import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Home, Map, AlertTriangle, User } from 'lucide-react';

interface BottomNavProps {
  active: 'home' | 'map' | 'report' | 'profile';
}

const BottomNav = ({ active }: BottomNavProps) => {
  const { t } = useApp();
  const navigate = useNavigate();

  const items = [
    { key: 'home' as const, icon: Home, label: t('home'), path: '/home' },
    { key: 'map' as const, icon: Map, label: t('map'), path: '/home' },
    { key: 'report' as const, icon: AlertTriangle, label: t('report'), path: '/report' },
    { key: 'profile' as const, icon: User, label: t('profile'), path: '/settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-2 pb-2 pt-1 z-40 flex justify-around max-w-lg mx-auto">
      {items.map(({ key, icon: Icon, label, path }) => (
        <button
          key={key}
          onClick={() => navigate(path)}
          className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
            active === key ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <Icon className="w-5 h-5" />
          <span className="text-[10px] font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;

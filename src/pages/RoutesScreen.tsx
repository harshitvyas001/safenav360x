import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Clock, Shield, Zap, Navigation } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import SOSButton from '@/components/SOSButton';

const routes = [
  { type: 'safest', color: 'safe', score: 92, time: '28 min', distance: '4.2 km', icon: Shield, highlights: ['Well-lit streets', 'Police station nearby', 'High crowd density'] },
  { type: 'balanced', color: 'warning', score: 74, time: '22 min', distance: '3.5 km', icon: Clock, highlights: ['Moderate lighting', 'Mixed areas', 'Some quiet streets'] },
  { type: 'fastest', color: 'primary', score: 58, time: '15 min', distance: '2.8 km', icon: Zap, highlights: ['Shortcut through dimly lit area', 'Low crowd at night', 'Fastest path'] },
];

const RoutesScreen = () => {
  const { t } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const { from, to } = (location.state as { from: string; to: string }) || { from: '', to: '' };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'safe': return { bg: 'bg-safe-light', text: 'text-safe', gradient: 'gradient-safe', border: 'border-safe/30' };
      case 'warning': return { bg: 'bg-warning-light', text: 'text-warning-custom', gradient: 'gradient-warning', border: 'border-warning/30' };
      default: return { bg: 'bg-accent', text: 'text-primary', gradient: 'gradient-primary', border: 'border-primary/30' };
    }
  };

  const getRouteLabel = (type: string) => {
    switch (type) {
      case 'safest': return t('safestRoute');
      case 'balanced': return t('balancedRoute');
      case 'fastest': return t('fastestRoute');
      default: return type;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex items-center gap-3 px-4 py-4 bg-card border-b border-border">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">{from}</p>
          <p className="text-sm font-semibold text-foreground">→ {to}</p>
        </div>
      </div>

      {/* Mock map with routes */}
      <div className="h-48 bg-accent/30 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-15">
          {Array.from({ length: 15 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 25} x2="100%" y2={i * 25} stroke="hsl(var(--primary))" strokeWidth="0.5" />
          ))}
        </svg>
        {/* Route lines */}
        <svg className="absolute inset-0 w-full h-full">
          <path d="M 40 180 Q 100 100, 200 60 Q 280 30, 350 40" fill="none" stroke="hsl(var(--safe))" strokeWidth="4" strokeDasharray="8,4" opacity="0.8" />
          <path d="M 40 180 Q 120 130, 180 80 Q 260 30, 350 40" fill="none" stroke="hsl(var(--warning))" strokeWidth="3" strokeDasharray="6,4" opacity="0.6" />
          <path d="M 40 180 L 200 100 L 350 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" opacity="0.5" />
        </svg>
        <div className="absolute bottom-3 left-4 w-4 h-4 rounded-full gradient-primary border-2 border-primary-foreground" />
        <div className="absolute top-3 right-8 w-4 h-4 rounded-full gradient-danger border-2 border-primary-foreground" />
      </div>

      <div className="flex-1 px-4 py-4 pb-32 space-y-3 overflow-y-auto">
        <h2 className="text-lg font-bold text-foreground mb-2">Routes Found</h2>
        {routes.map((route, idx) => {
          const colors = getColorClasses(route.color);
          const Icon = route.icon;
          return (
            <button
              key={route.type}
              onClick={() => navigate('/navigate', { state: { route, from, to } })}
              className={`w-full text-left ${colors.bg} border ${colors.border} rounded-2xl p-4 fade-in`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full ${colors.gradient} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="font-bold text-foreground">{getRouteLabel(route.type)}</span>
                </div>
                <div className={`px-3 py-1 rounded-full ${colors.gradient}`}>
                  <span className="text-sm font-bold text-primary-foreground">{route.score}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                <span>🕐 {route.time}</span>
                <span>📏 {route.distance}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {route.highlights.map(h => (
                  <span key={h} className="text-xs bg-card/60 px-2 py-0.5 rounded-full text-muted-foreground">{h}</span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      <SOSButton />
      <BottomNav active="home" />
    </div>
  );
};

export default RoutesScreen;

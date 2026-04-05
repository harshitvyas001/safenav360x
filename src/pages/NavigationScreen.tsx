import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Navigation, AlertTriangle, Share2 } from 'lucide-react';
import SOSButton from '@/components/SOSButton';

const NavigationScreen = () => {
  const { t } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const { route, from, to } = (location.state as any) || {};
  const [progress, setProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        if (p === 40) setShowAlert(true);
        return p + 2;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      {/* Alert */}
      {showAlert && (
        <div className="absolute top-16 left-4 right-4 z-30 bg-danger-light border border-danger/30 rounded-xl p-4 flex items-center gap-3 fade-in shadow-lg">
          <AlertTriangle className="w-6 h-6 text-danger flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-bold text-danger">{t('unsafeAreaWarning')}</p>
            <p className="text-xs text-muted-foreground mt-1">Consider safest route alternative</p>
          </div>
          <button onClick={() => setShowAlert(false)} className="text-xs text-muted-foreground">✕</button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-card/90 backdrop-blur-sm border-b border-border z-20">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <p className="text-sm font-bold text-foreground">{t('navigate')}</p>
          <p className="text-xs text-muted-foreground">→ {to}</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
          <Share2 className="w-5 h-5 text-primary" />
        </button>
      </div>

      {/* Map with navigation */}
      <div className="flex-1 bg-accent/30 relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-15">
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={`g${i}`} x1="0" y1={i * 30} x2="100%" y2={i * 30} stroke="hsl(var(--primary))" strokeWidth="0.5" />
          ))}
        </svg>

        {/* Route path */}
        <svg className="absolute inset-0 w-full h-full">
          <path d="M 50 500 Q 100 400, 150 300 Q 200 200, 250 150 Q 300 80, 350 50" fill="none" stroke="hsl(var(--safe))" strokeWidth="5" strokeLinecap="round" />
          <circle cx={50 + progress * 3} cy={500 - progress * 4.5} r="8" fill="hsl(var(--primary))" />
        </svg>

        {/* Unsafe zone */}
        <div className="absolute top-32 right-12 w-20 h-20 rounded-full bg-danger/10 border border-danger/20" />
      </div>

      {/* Bottom info */}
      <div className="bg-card border-t border-border rounded-t-3xl -mt-4 relative z-10 px-4 pt-5 pb-6 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-lg font-bold text-foreground">{route?.time || '22 min'}</p>
            <p className="text-xs text-muted-foreground">{route?.distance || '3.5 km'} remaining</p>
          </div>
          <div className={`px-4 py-2 rounded-full ${route?.score >= 80 ? 'gradient-safe' : route?.score >= 60 ? 'gradient-warning' : 'gradient-danger'}`}>
            <span className="text-sm font-bold text-primary-foreground">{t('safetyScore')}: {route?.score || 74}</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full gradient-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">{progress}% {t('navigate')}</p>
      </div>

      <SOSButton />
    </div>
  );
};

export default NavigationScreen;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { MapPin, Navigation, Search, Wifi, WifiOff, BatteryMedium, AlertTriangle } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import SOSButton from '@/components/SOSButton';

const mockLocations = [
  'Connaught Place, New Delhi',
  'MG Road, Bangalore',
  'Marine Drive, Mumbai',
  'Park Street, Kolkata',
  'Anna Nagar, Chennai',
  'Banjara Hills, Hyderabad',
];

const HomeScreen = () => {
  const { t, isOffline } = useApp();
  const navigate = useNavigate();
  const [from, setFrom] = useState('Connaught Place, New Delhi');
  const [to, setTo] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredLocations = mockLocations.filter(l =>
    l.toLowerCase().includes(to.toLowerCase()) && to.length > 0
  );

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      {/* Offline Banner */}
      {isOffline && (
        <div className="bg-warning text-warning-foreground px-4 py-2 text-center text-sm font-semibold flex items-center justify-center gap-2">
          <WifiOff className="w-4 h-4" />
          {t('offlineMode')}
        </div>
      )}

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-safe" />
          <span className="text-xs text-muted-foreground">{isOffline ? <WifiOff className="w-3 h-3 inline" /> : <Wifi className="w-3 h-3 inline" />} {isOffline ? '2G' : '4G'}</span>
        </div>
        <span className="text-xs font-bold text-foreground">{t('appName')}</span>
        <div className="flex items-center gap-1">
          <BatteryMedium className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">72%</span>
        </div>
      </div>

      {/* Mock Map */}
      <div className="flex-1 relative bg-accent/30 overflow-hidden">
        {/* Map grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 30} x2="100%" y2={i * 30} stroke="hsl(var(--primary))" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 30} y1="0" x2={i * 30} y2="100%" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          ))}
        </svg>

        {/* Roads */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted-foreground/20" />
        <div className="absolute top-0 bottom-0 left-1/3 w-1 bg-muted-foreground/20" />
        <div className="absolute top-0 bottom-0 right-1/3 w-1 bg-muted-foreground/20" />
        <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-muted-foreground/10" />

        {/* Unsafe zone overlay */}
        <div className="absolute top-16 right-8 w-24 h-24 rounded-full bg-danger/15 border-2 border-danger/30 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-danger" />
        </div>
        <span className="absolute top-12 right-4 text-[10px] font-bold text-danger bg-danger-light px-2 py-0.5 rounded-full">
          Unsafe Zone
        </span>

        {/* User location */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full gradient-primary border-2 border-primary-foreground shadow-lg" />
          </div>
        </div>

        {/* Map label */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-md">
          <span className="text-xs font-medium text-foreground">📍 {from}</span>
        </div>
      </div>

      {/* Search Panel */}
      <div className="bg-card border-t border-border rounded-t-3xl -mt-6 relative z-10 px-4 pt-6 pb-24 shadow-xl">
        <h2 className="text-lg font-bold text-foreground mb-4">{t('whereToGo')}</h2>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 bg-safe-light rounded-xl px-4 py-3">
            <div className="w-3 h-3 rounded-full bg-safe" />
            <span className="text-sm text-foreground font-medium">{from}</span>
          </div>

          <div className="relative">
            <div className="flex items-center gap-3 bg-muted rounded-xl px-4 py-3">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={to}
                onChange={(e) => { setTo(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                placeholder={t('destination')}
                className="flex-1 bg-transparent outline-none text-foreground text-sm"
              />
            </div>
            {showSuggestions && filteredLocations.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-card border border-border rounded-xl mt-1 shadow-lg z-20 overflow-hidden">
                {filteredLocations.map(loc => (
                  <button
                    key={loc}
                    onClick={() => { setTo(loc); setShowSuggestions(false); }}
                    className="w-full text-left px-4 py-3 text-sm text-foreground hover:bg-accent flex items-center gap-2 border-b border-border last:border-0"
                  >
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => to && navigate('/routes', { state: { from, to } })}
            disabled={!to}
            className="w-full py-4 rounded-xl text-base font-bold gradient-primary text-primary-foreground shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Navigation className="w-5 h-5" />
            {t('findRoutes')}
          </button>
        </div>
      </div>

      <SOSButton />
      <BottomNav active="home" />
    </div>
  );
};

export default HomeScreen;

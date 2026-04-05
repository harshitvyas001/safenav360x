import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, AlertTriangle, MapPin, Camera, Mic, CheckCircle } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const incidentTypes = [
  { key: 'harassment', icon: '🚨', color: 'bg-danger-light border-danger/30' },
  { key: 'unsafeStreet', icon: '🛣️', color: 'bg-warning-light border-warning/30' },
  { key: 'suspiciousActivity', icon: '👁️', color: 'bg-accent border-primary/30' },
];

const ReportScreen = () => {
  const { t } = useApp();
  const navigate = useNavigate();
  const [selected, setSelected] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
          <div className="w-20 h-20 rounded-full gradient-safe flex items-center justify-center fade-in">
            <CheckCircle className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground">{t('reportSubmitted')}</h2>
          <p className="text-sm text-muted-foreground text-center">Your report helps keep the community safe. Thank you!</p>
          <button onClick={() => navigate('/home')} className="py-3 px-8 rounded-xl gradient-primary text-primary-foreground font-bold">
            {t('home')} →
          </button>
        </div>
        <BottomNav active="report" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex items-center gap-3 px-4 py-4 bg-card border-b border-border">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">{t('reportIncident')}</h1>
      </div>

      <div className="flex-1 px-4 py-4 pb-28 space-y-4 overflow-y-auto">
        <div className="flex items-center gap-2 bg-accent rounded-xl px-4 py-3">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground">📍 Connaught Place, New Delhi</span>
        </div>

        <h3 className="text-sm font-semibold text-muted-foreground">Select Incident Type</h3>
        <div className="space-y-2">
          {incidentTypes.map(({ key, icon, color }) => (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={`w-full text-left px-4 py-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                selected === key ? color : 'bg-card border-border'
              }`}
            >
              <span className="text-2xl">{icon}</span>
              <span className="font-semibold text-foreground">{t(key)}</span>
            </button>
          ))}
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t('description')}
          className="w-full h-24 bg-muted rounded-xl px-4 py-3 text-sm text-foreground outline-none resize-none"
        />

        <div className="flex gap-3">
          <button className="flex-1 py-3 rounded-xl bg-muted text-foreground font-medium flex items-center justify-center gap-2">
            <Camera className="w-4 h-4" /> Photo
          </button>
          <button className="flex-1 py-3 rounded-xl bg-muted text-foreground font-medium flex items-center justify-center gap-2">
            <Mic className="w-4 h-4" /> Audio
          </button>
        </div>

        <button
          onClick={() => selected && setSubmitted(true)}
          disabled={!selected}
          className="w-full py-4 rounded-xl gradient-primary text-primary-foreground font-bold text-base disabled:opacity-50"
        >
          {t('submit')}
        </button>
      </div>

      <BottomNav active="report" />
    </div>
  );
};

export default ReportScreen;

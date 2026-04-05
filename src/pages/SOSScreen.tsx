import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Phone, MessageCircle, Send, CheckCircle, ArrowLeft, MapPin } from 'lucide-react';

const SOSScreen = () => {
  const { t, contacts } = useApp();
  const navigate = useNavigate();
  const [stage, setStage] = useState<'sending' | 'sent'>('sending');

  useEffect(() => {
    const timer = setTimeout(() => setStage('sent'), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex items-center gap-3 px-4 py-4 bg-card border-b border-border">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">{t('sosTitle')}</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        {stage === 'sending' ? (
          <div className="fade-in flex flex-col items-center gap-4">
            <div className="w-24 h-24 rounded-full gradient-danger flex items-center justify-center sos-pulse">
              <Send className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground">{t('sosSending')}</h2>
            <div className="space-y-2 w-full max-w-xs">
              {['📍 Sharing location...', '📱 Sending SMS...', '💬 Sending WhatsApp...', '📞 Calling 112...'].map((msg, i) => (
                <div key={i} className="flex items-center gap-3 bg-muted rounded-xl px-4 py-3 fade-in" style={{ animationDelay: `${i * 0.5}s` }}>
                  <div className="w-2 h-2 rounded-full gradient-danger" />
                  <span className="text-sm text-foreground">{msg}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="fade-in flex flex-col items-center gap-6 w-full max-w-sm">
            <div className="w-24 h-24 rounded-full gradient-safe flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground">{t('sosActivated')}</h2>
            <p className="text-sm text-muted-foreground text-center">
              Alerts sent to {contacts.length} contacts. Emergency services notified.
            </p>

            <div className="w-full space-y-3">
              <button className="w-full py-4 rounded-xl gradient-danger text-primary-foreground font-bold flex items-center justify-center gap-2 text-lg">
                <Phone className="w-5 h-5" />
                {t('callEmergency')}
              </button>
              <button className="w-full py-3 rounded-xl bg-safe text-safe-foreground font-bold flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                {t('shareWhatsApp')}
              </button>
              <button className="w-full py-3 rounded-xl bg-muted text-foreground font-semibold flex items-center justify-center gap-2">
                <MapPin className="w-5 h-5" />
                {t('shareLocation')}
              </button>
            </div>

            <p className="text-xs text-muted-foreground mt-2">
              📍 Location: 28.6139°N, 77.2090°E (Connaught Place)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SOSScreen;

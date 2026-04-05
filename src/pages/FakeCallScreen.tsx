import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Phone, PhoneOff } from 'lucide-react';

const FakeCallScreen = () => {
  const { t } = useApp();
  const navigate = useNavigate();
  const [ringing, setRinging] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setRinging(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen gradient-primary px-6 py-12">
      <div className="flex flex-col items-center gap-2 mt-12">
        <p className="text-primary-foreground/70 text-sm">{ringing ? 'Incoming Call' : 'Connected 0:12'}</p>
        <h1 className="text-3xl font-bold text-primary-foreground">Mom</h1>
        <p className="text-primary-foreground/60 text-sm">+91 98765 43210</p>
      </div>

      <div className="w-24 h-24 rounded-full bg-primary-foreground/10 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center text-4xl">
          👩
        </div>
      </div>

      <div className="flex items-center gap-12 mb-8">
        {ringing ? (
          <>
            <button onClick={() => navigate(-1)} className="w-16 h-16 rounded-full gradient-danger flex items-center justify-center">
              <PhoneOff className="w-7 h-7 text-primary-foreground" />
            </button>
            <button onClick={() => setRinging(false)} className="w-16 h-16 rounded-full gradient-safe flex items-center justify-center sos-pulse">
              <Phone className="w-7 h-7 text-primary-foreground" />
            </button>
          </>
        ) : (
          <button onClick={() => navigate(-1)} className="w-16 h-16 rounded-full gradient-danger flex items-center justify-center">
            <PhoneOff className="w-7 h-7 text-primary-foreground" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FakeCallScreen;

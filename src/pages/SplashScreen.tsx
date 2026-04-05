import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.jpeg';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/language'), 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gradient-primary">
      <div className="fade-in flex flex-col items-center gap-6">
        <img src={logo} alt="SafeNav 360X" className="w-48 h-48 rounded-3xl shadow-2xl object-cover" />
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-extrabold text-primary-foreground tracking-tight">SafeNav 360X</h1>
          <p className="text-primary-foreground/80 text-sm font-medium">Intelligent Safe-Route Navigation</p>
        </div>
        <div className="flex gap-1 mt-8">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-2 h-2 rounded-full bg-primary-foreground/60" style={{
              animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`
            }} />
          ))}
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1.2)} }`}</style>
    </div>
  );
};

export default SplashScreen;

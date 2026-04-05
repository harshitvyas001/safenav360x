import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Phone, Shield } from 'lucide-react';
import logo from '@/assets/logo.jpeg';

const LoginScreen = () => {
  const { t, phone, setPhone, setIsLoggedIn } = useApp();
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSendOtp = () => {
    if (phone.length >= 10) setOtpSent(true);
  };

  const handleVerify = () => {
    if (otp.length === 4) {
      setIsLoggedIn(true);
      navigate('/home');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-6">
      <div className="fade-in flex flex-col items-center gap-6 w-full max-w-sm">
        <img src={logo} alt="SafeNav 360X" className="w-20 h-20 rounded-2xl object-cover" />
        <h1 className="text-2xl font-bold text-foreground">{t('login')}</h1>

        {!otpSent ? (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-3 border-2 border-border rounded-xl px-4 py-3 bg-card">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground font-medium">+91</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder={t('enterMobile')}
                className="flex-1 bg-transparent outline-none text-foreground text-lg"
              />
            </div>
            <button
              onClick={handleSendOtp}
              disabled={phone.length < 10}
              className="w-full py-4 rounded-xl text-lg font-bold gradient-primary text-primary-foreground shadow-lg disabled:opacity-50"
            >
              {t('sendOtp')}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            <p className="text-muted-foreground text-center text-sm">OTP sent to +91 {phone}</p>
            <div className="flex gap-3 justify-center">
              {[0, 1, 2, 3].map(i => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  value={otp[i] || ''}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    const newOtp = otp.split('');
                    newOtp[i] = val;
                    setOtp(newOtp.join(''));
                    if (val && e.target.nextElementSibling) {
                      (e.target.nextElementSibling as HTMLInputElement).focus();
                    }
                  }}
                  className="w-14 h-14 text-center text-2xl font-bold border-2 border-border rounded-xl bg-card text-foreground outline-none focus:border-primary"
                />
              ))}
            </div>
            <button
              onClick={handleVerify}
              disabled={otp.length < 4}
              className="w-full py-4 rounded-xl text-lg font-bold gradient-primary text-primary-foreground shadow-lg disabled:opacity-50"
            >
              {t('verifyOtp')}
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 text-muted-foreground text-xs mt-4">
          <Shield className="w-4 h-4" />
          <span>Your data is private & secure</span>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

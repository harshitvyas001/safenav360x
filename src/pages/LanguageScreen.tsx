import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Globe } from 'lucide-react';

const LanguageScreen = () => {
  const { lang, setLang, t } = useApp();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-6">
      <div className="fade-in flex flex-col items-center gap-8 w-full max-w-sm">
        <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
          <Globe className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">{t('selectLanguage')}</h1>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => setLang('en')}
            className={`w-full py-4 px-6 rounded-xl text-lg font-semibold transition-all border-2 ${
              lang === 'en' ? 'border-primary bg-accent text-accent-foreground' : 'border-border bg-card text-card-foreground'
            }`}
          >
            🇬🇧 English
          </button>
          <button
            onClick={() => setLang('hi')}
            className={`w-full py-4 px-6 rounded-xl text-lg font-semibold transition-all border-2 ${
              lang === 'hi' ? 'border-primary bg-accent text-accent-foreground' : 'border-border bg-card text-card-foreground'
            }`}
          >
            🇮🇳 हिन्दी
          </button>
        </div>

        <button
          onClick={() => navigate('/login')}
          className="w-full py-4 rounded-xl text-lg font-bold gradient-primary text-primary-foreground shadow-lg"
        >
          {t('continue')} →
        </button>
      </div>
    </div>
  );
};

export default LanguageScreen;

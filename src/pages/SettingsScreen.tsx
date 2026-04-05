import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Globe, Bell, Users, Phone, Shield, LogOut, Plus } from 'lucide-react';
import BottomNav from '@/components/BottomNav';

const SettingsScreen = () => {
  const { t, lang, setLang, alertSensitivity, setAlertSensitivity, contacts, setContacts, setIsLoggedIn, isOffline, setIsOffline } = useApp();
  const navigate = useNavigate();
  const [showAddContact, setShowAddContact] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const addContact = () => {
    if (newName && newPhone) {
      setContacts([...contacts, { name: newName, phone: newPhone }]);
      setNewName('');
      setNewPhone('');
      setShowAddContact(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex items-center gap-3 px-4 py-4 bg-card border-b border-border">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-bold text-foreground">{t('settings')}</h1>
      </div>

      <div className="flex-1 px-4 py-4 pb-28 space-y-4 overflow-y-auto">
        {/* Language */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">{t('language')}</span>
          </div>
          <div className="flex gap-2">
            {(['en', 'hi'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                  lang === l ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                {l === 'en' ? 'English' : 'हिन्दी'}
              </button>
            ))}
          </div>
        </div>

        {/* Alert Sensitivity */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="flex items-center gap-3 mb-3">
            <Bell className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">{t('alertSensitivity')}</span>
          </div>
          <div className="flex gap-2">
            {(['low', 'medium', 'high'] as const).map(s => (
              <button key={s} onClick={() => setAlertSensitivity(s)}
                className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                  alertSensitivity === s ? 'gradient-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                {t(s)}
              </button>
            ))}
          </div>
        </div>

        {/* Offline toggle */}
        <div className="bg-card rounded-2xl p-4 border border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">{t('offlineMode')}</span>
          </div>
          <button onClick={() => setIsOffline(!isOffline)}
            className={`w-12 h-7 rounded-full transition-all ${isOffline ? 'gradient-primary' : 'bg-muted'} relative`}>
            <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-card shadow transition-all ${isOffline ? 'left-5' : 'left-0.5'}`} />
          </button>
        </div>

        {/* Trusted Contacts */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">{t('trustedContacts')}</span>
            </div>
            <button onClick={() => setShowAddContact(!showAddContact)} className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <Plus className="w-4 h-4 text-primary" />
            </button>
          </div>
          <div className="space-y-2">
            {contacts.map((c, i) => (
              <div key={i} className="flex items-center gap-3 bg-muted rounded-xl px-3 py-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.phone}</p>
                </div>
              </div>
            ))}
          </div>
          {showAddContact && (
            <div className="mt-3 space-y-2 fade-in">
              <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Name" className="w-full bg-muted rounded-xl px-3 py-2 text-sm text-foreground outline-none" />
              <input value={newPhone} onChange={e => setNewPhone(e.target.value)} placeholder="Phone" className="w-full bg-muted rounded-xl px-3 py-2 text-sm text-foreground outline-none" />
              <button onClick={addContact} className="w-full py-2 rounded-xl gradient-primary text-primary-foreground text-sm font-bold">{t('addContact')}</button>
            </div>
          )}
        </div>

        {/* Fake Call */}
        <button
          onClick={() => navigate('/fake-call')}
          className="w-full bg-card rounded-2xl p-4 border border-border flex items-center gap-3 text-left"
        >
          <Phone className="w-5 h-5 text-safe" />
          <span className="font-semibold text-foreground">{t('fakeCall')}</span>
        </button>

        {/* Logout */}
        <button
          onClick={() => { setIsLoggedIn(false); navigate('/'); }}
          className="w-full py-4 rounded-xl bg-destructive text-destructive-foreground font-bold flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          {t('logout')}
        </button>
      </div>

      <BottomNav active="profile" />
    </div>
  );
};

export default SettingsScreen;

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface Contact {
  name: string;
  phone: string;
}

interface AppState {
  lang: Language;
  setLang: (l: Language) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  phone: string;
  setPhone: (v: string) => void;
  contacts: Contact[];
  setContacts: (c: Contact[]) => void;
  alertSensitivity: 'low' | 'medium' | 'high';
  setAlertSensitivity: (s: 'low' | 'medium' | 'high') => void;
  isOffline: boolean;
  setIsOffline: (v: boolean) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  appName: { en: 'SafeNav 360X', hi: 'सेफनैव 360X' },
  tagline: { en: 'Intelligent Safe-Route Navigation', hi: 'बुद्धिमान सुरक्षित-मार्ग नेविगेशन' },
  selectLanguage: { en: 'Select Language', hi: 'भाषा चुनें' },
  english: { en: 'English', hi: 'English' },
  hindi: { en: 'हिन्दी', hi: 'हिन्दी' },
  continue: { en: 'Continue', hi: 'जारी रखें' },
  login: { en: 'Login', hi: 'लॉगिन' },
  enterMobile: { en: 'Enter Mobile Number', hi: 'मोबाइल नंबर दर्ज करें' },
  sendOtp: { en: 'Send OTP', hi: 'OTP भेजें' },
  enterOtp: { en: 'Enter OTP', hi: 'OTP दर्ज करें' },
  verifyOtp: { en: 'Verify OTP', hi: 'OTP सत्यापित करें' },
  whereToGo: { en: 'Where do you want to go?', hi: 'आप कहाँ जाना चाहते हैं?' },
  currentLocation: { en: 'Current Location', hi: 'वर्तमान स्थान' },
  destination: { en: 'Destination', hi: 'गंतव्य' },
  findRoutes: { en: 'Find Safe Routes', hi: 'सुरक्षित मार्ग खोजें' },
  safestRoute: { en: 'Safest Route', hi: 'सबसे सुरक्षित मार्ग' },
  balancedRoute: { en: 'Balanced Route', hi: 'संतुलित मार्ग' },
  fastestRoute: { en: 'Fastest Route', hi: 'सबसे तेज़ मार्ग' },
  safetyScore: { en: 'Safety Score', hi: 'सुरक्षा स्कोर' },
  sos: { en: 'SOS', hi: 'SOS' },
  sosTitle: { en: 'Emergency SOS', hi: 'आपातकालीन SOS' },
  sosActivated: { en: 'Help Alert Sent!', hi: 'मदद अलर्ट भेजा गया!' },
  sosSending: { en: 'Sending alerts...', hi: 'अलर्ट भेज रहे हैं...' },
  callEmergency: { en: 'Call 112', hi: '112 पर कॉल करें' },
  shareWhatsApp: { en: 'Share via WhatsApp', hi: 'WhatsApp से साझा करें' },
  shareSMS: { en: 'Share via SMS', hi: 'SMS से साझा करें' },
  liveTracking: { en: 'Live Tracking', hi: 'लाइव ट्रैकिंग' },
  shareLocation: { en: 'Share Location', hi: 'स्थान साझा करें' },
  reportIncident: { en: 'Report Incident', hi: 'घटना रिपोर्ट करें' },
  harassment: { en: 'Harassment', hi: 'उत्पीड़न' },
  unsafeStreet: { en: 'Unsafe Street', hi: 'असुरक्षित सड़क' },
  suspiciousActivity: { en: 'Suspicious Activity', hi: 'संदिग्ध गतिविधि' },
  submit: { en: 'Submit Report', hi: 'रिपोर्ट जमा करें' },
  settings: { en: 'Settings', hi: 'सेटिंग्स' },
  trustedContacts: { en: 'Trusted Contacts', hi: 'विश्वसनीय संपर्क' },
  alertSensitivity: { en: 'Alert Sensitivity', hi: 'अलर्ट संवेदनशीलता' },
  language: { en: 'Language', hi: 'भाषा' },
  offlineMode: { en: 'Offline Safety Mode Active', hi: 'ऑफलाइन सुरक्षा मोड सक्रिय' },
  noInternet: { en: 'No Internet Connection', hi: 'कोई इंटरनेट कनेक्शन नहीं' },
  navigate: { en: 'Start Navigation', hi: 'नेविगेशन शुरू करें' },
  home: { en: 'Home', hi: 'होम' },
  map: { en: 'Map', hi: 'मैप' },
  report: { en: 'Report', hi: 'रिपोर्ट' },
  profile: { en: 'Profile', hi: 'प्रोफ़ाइल' },
  fakeCall: { en: 'Fake Call', hi: 'नकली कॉल' },
  fakeCallActive: { en: 'Incoming Call...', hi: 'आने वाली कॉल...' },
  unsafeAreaWarning: { en: '⚠️ This area is unsafe at night', hi: '⚠️ यह इलाका रात में असुरक्षित है' },
  battery: { en: 'Battery', hi: 'बैटरी' },
  network: { en: 'Network', hi: 'नेटवर्क' },
  low: { en: 'Low', hi: 'कम' },
  medium: { en: 'Medium', hi: 'मध्यम' },
  high: { en: 'High', hi: 'उच्च' },
  addContact: { en: 'Add Contact', hi: 'संपर्क जोड़ें' },
  logout: { en: 'Logout', hi: 'लॉगआउट' },
  reportSubmitted: { en: 'Report Submitted!', hi: 'रिपोर्ट जमा हो गई!' },
  description: { en: 'Description', hi: 'विवरण' },
  cancel: { en: 'Cancel', hi: 'रद्द करें' },
};

const AppContext = createContext<AppState | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phone, setPhone] = useState('');
  const [contacts, setContacts] = useState<Contact[]>([
    { name: 'Mom', phone: '+91 98765 43210' },
    { name: 'Dad', phone: '+91 98765 43211' },
  ]);
  const [alertSensitivity, setAlertSensitivity] = useState<'low' | 'medium' | 'high'>('medium');
  const [isOffline, setIsOffline] = useState(false);

  const t = (key: string) => translations[key]?.[lang] || key;

  return (
    <AppContext.Provider value={{
      lang, setLang, isLoggedIn, setIsLoggedIn, phone, setPhone,
      contacts, setContacts, alertSensitivity, setAlertSensitivity,
      isOffline, setIsOffline, t
    }}>
      {children}
    </AppContext.Provider>
  );
};

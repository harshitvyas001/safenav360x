import { useNavigate } from 'react-router-dom';

const SOSButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/sos')}
      className="fixed bottom-20 right-4 z-50 w-16 h-16 rounded-full gradient-danger text-primary-foreground font-extrabold text-lg shadow-xl sos-pulse flex items-center justify-center"
      aria-label="SOS Emergency"
    >
      SOS
    </button>
  );
};

export default SOSButton;

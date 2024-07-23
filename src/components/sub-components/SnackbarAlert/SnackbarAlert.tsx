import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import './SnackBarAlert.css';
interface SnackbarContextType {
  showSnackbar: (message: string, severity?: AlertProps['severity']) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  },
);

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertProps['severity']>('error');
  const [shake, setShake] = useState(false);

  const showSnackbar = (
    message: string,
    severity: AlertProps['severity'] = 'error',
  ) => {
    if (snackbarMessage == message) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } else {
      setSnackbarMessage(message);
    }
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          className={`alert-snackbar ${shake ? 'scale' : ''}`}
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

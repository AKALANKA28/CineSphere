import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Tabs,
  Tab,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
}

const AuthDialog: React.FC<AuthDialogProps> = ({ open, onClose, initialTab = 'login' }) => {
  const [tabValue, setTabValue] = useState(initialTab === 'login' ? 0 : 1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSuccessfulAuth = () => {
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        style: {
          backdropFilter: "blur(4px)",
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(30, 30, 30, 0.9)'
            : 'rgba(255, 255, 255, 0.9)',
          borderRadius: isMobile ? 0 : 8,
          overflowY: "auto",
        },
      }}
      sx={{
        backdropFilter: "blur(8px)",
        '& .MuiDialog-paper': {
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.15)',
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Tabs
        value={tabValue}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        sx={{ mb: 2, px: 2 }}
      >
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>
      
      <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
        <TabPanel value={tabValue} index={0}>
          <LoginForm onSuccess={handleSuccessfulAuth} />
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <RegisterForm onSuccess={handleSuccessfulAuth} />
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;

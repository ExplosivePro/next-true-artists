// External
import React, { createContext, useState, useContext } from "react";

// Custom Components
import CustomDialog from "../components/CustomDialog";

// @ts-ignore
const context = createContext<Context>({});

export function AppContext({ children }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogSuccess, setDialogSuccess] = useState(false);

  const showErrorDialog = (show: boolean, message: string) => {
    setDialogSuccess(false);
    setDialogMessage(message);
    setDialogOpen(show);
  };

  const showSuccessDialog = (show: boolean, message: string) => {
    setDialogSuccess(true);
    setDialogOpen(show);
    setDialogMessage(message);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <context.Provider value={{ open: dialogOpen, message: dialogMessage, showErrorDialog, showSuccessDialog }}>
      {children}
      <CustomDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        errorMessage={dialogMessage}
        success={dialogSuccess}
      />
    </context.Provider>
  );
}

export function useApp() {
  return useContext(context);
}

interface Props {
  children: JSX.Element;
}

interface Context {
  open: boolean;
  message: string;
  showErrorDialog: (show: boolean, message: string) => void;
  showSuccessDialog: (show: boolean, message: string) => void;
}

// External
import React, { createContext, useState, useContext } from "react";

// Custom Components
import CustomDialog from "../components/CustomDialog";

// @ts-ignore
const context = createContext<Context>({});

export function AppContext({ children }: Props) {
  // Message dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogSuccess, setDialogSuccess] = useState(false);

  // Global value
  const [registrationCallback, setRegistrationCallback] = useState(false);
  const [userInfo, setUserInfo] = useState<Resource.UserDetail>({
    email: "",
    full_name: "",
    id: 0,
    role: "",
    status: "",
  });

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

  const setRegistrationCallbackData = (userInfo: Resource.UserDetail, destroy = false) => {
    if (destroy) {
      setRegistrationCallback(false);
      setUserInfo({ email: "", full_name: "", id: 0, registerType: "", role: "", status: "" });
    } else {
      setRegistrationCallback(true);
      setUserInfo(userInfo);
    }
  };

  return (
    <context.Provider
      value={{
        open: dialogOpen,
        message: dialogMessage,
        showErrorDialog,
        showSuccessDialog,
        setRegistrationCallbackData,
        registrationCallback,
        userInfo,
      }}
    >
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
  registrationCallback: boolean;
  userInfo: Resource.UserDetail;
  showErrorDialog: (show: boolean, message: string) => void;
  showSuccessDialog: (show: boolean, message: string) => void;
  setRegistrationCallbackData: (userInfo: Resource.UserDetail, destroy?: boolean) => void;
}

// External import
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { createStyles, makeStyles } from "@material-ui/core/styles";

// Material UI Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Custom Components
import LeftBarRegisterSelection from "../../components/LeftBarRegisterSelection";
import RightBarRegisterAccountType from "../../components/RightBarRegisterAccountType";
import RightBarRegisterPersonalDetail from "../../components/RightBarRegisterPersonalDetail";
import RightBarArtistRegisterInformation from "../../components/RightBarArtistRegisterInformation";
import RightBarStudioRegisterInformation from "../../components/RightBarStudioRegisterInformation";
import RightBarRegisterWorkStyle from "../../components/RightBarRegisterWorkStyle";
import RightBarRegisterBusinessSettings from "../../components/RightBarRegisterBusinessSettings";
import RightBarRegisterAvatarUpload from "../../components/RightBarRegisterAvatarUpload";
import RightBarRegisterTattooUpload from "../../components/RightBarRegisterTattooUpload";

// Utils
import { getWorkingStyleList } from "../../api";
import { useAuth, useApp } from "../../contexts";

import colors from "../../palette";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      height: "100vh",
      padding: 0,
      [theme.breakpoints.down("sm")]: {
        height: "100%",
      },
    },
    leftBarContainer: {
      [theme.breakpoints.down("sm")]: {
        height: "70px",
      },
    },
    fullHeightContainer: {
      height: "100%",
    },
    relativeContainer: {
      position: "relative",
    },
    formWrapper: {
      position: "relative",
      height: "100%",
    },
    formInput: {
      margin: "10px 0",
    },
    rightContainer: {
      height: "100%",
      padding: "50px 65px",
      overflow: "scroll",
      backgroundColor: colors.lightGrey,
      [theme.breakpoints.down("sm")]: {
        padding: "50px 22px",
        overflow: "inherit",
      },
    },
    title: {
      fontWeight: "bold",
      marginLeft: "10px",
    },
    resetPasswordButton: {
      marginTop: "15px",
    },
    image: {
      width: "70%",
      height: "auto",
    },
    iconButton: {
      marginLeft: "-12px", // Adjust margin instead of padding to prevent affecting to hover circle shape
    },
    backButton: {
      color: colors.black,
    },
  }),
);

export default function RegisterSelection({ workingStyles }: Props) {
  const classes = useStyles();
  const auth = useAuth();
  const { setRegistrationCallbackData, registrationCallback, userInfo } = useApp();

  const [step, setStep] = useState(0);
  const [currentUserId, setCurrentUserId] = useState<number>();
  const [currentUserRoleId, setCurrentUserRoleId] = useState<number>(); // This is can be artist id or studio id
  const [stepData, setStepData] = useState({});
  const [token, setToken] = useState<string>(); // Keep token temporarily, at the end of this registration, will store this one to loggin

  // Step 1: Account type
  const [role, setRole] = useState<string>("artist");

  useEffect(() => {
    // User back from login page
    if (registrationCallback) {
      const token = localStorage.getItem("AUTH_TOKEN");
      if (token && userInfo.registerType) {
        setToken(token);
        setRole(userInfo.registerType);

        const thisStepData = { 1: { firstName: userInfo.full_name, email: userInfo.email } };

        // Save current user id
        setCurrentUserId(userInfo.id);

        // Store step data to edit later
        setStepData({ ...stepData, ...thisStepData });

        // Next step
        setStep(2);
      }
    }

    // Reset these value at destructure
    return () => {
      setRegistrationCallbackData(userInfo, true);
    };
  }, []);

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid container className={classes.fullHeightContainer}>
        <Grid
          container
          item
          lg={3}
          md={3}
          sm={12}
          xs={12}
          alignItems={"center"}
          justify={"center"}
          className={clsx(classes.relativeContainer, classes.leftBarContainer)}
        >
          <LeftBarRegisterSelection step={step} role={role} />
        </Grid>

        <Grid item lg={9} md={9} sm={12} xs={12} className={clsx(classes.relativeContainer, classes.rightContainer)}>
          {step === 0 && (
            <RightBarRegisterAccountType
              onNext={(role) => {
                setRole(role);
                setStep(1);
              }}
            />
          )}
          {step === 1 && (
            <RightBarRegisterPersonalDetail
              role={role}
              currentUserId={currentUserId}
              currentData={stepData[1] || {}}
              onNext={(userId: number, data, token) => {
                if (token) {
                  setToken(token);
                }

                const thisStepData = { 1: data };

                // Save current user id
                setCurrentUserId(userId);

                // Store step data to edit later
                setStepData({ ...stepData, ...thisStepData });

                // Next step
                setStep(2);
              }}
              onPreviousStep={() => {
                setStep(0);
              }}
            />
          )}

          {step === 2 && role === "artist" && (
            <RightBarArtistRegisterInformation
              role={role}
              currentUserId={currentUserId}
              currentUserRoleId={currentUserRoleId}
              currentData={stepData[2] || {}}
              onNext={(id: number, data) => {
                const thisStepData = { 2: data };

                // Save current user role id
                setCurrentUserRoleId(id);

                // Store step data to edit later
                setStepData({ ...stepData, ...thisStepData });

                setStep(3);
              }}
              onPreviousStep={() => {
                setStep(1);
              }}
            />
          )}
          {step === 2 && role === "studio" && (
            <RightBarStudioRegisterInformation
              role={role}
              currentUserId={currentUserId}
              currentUserRoleId={currentUserRoleId}
              currentData={stepData[2] || {}}
              onNext={(id: number, data) => {
                const thisStepData = { 2: data };

                // Save current user role id
                setCurrentUserRoleId(id);

                // Store step data to edit later
                setStepData({ ...stepData, ...thisStepData });

                setStep(3);
              }}
              onPreviousStep={() => {
                setStep(1);
              }}
            />
          )}

          {role === "artist" && step === 3 && (
            <RightBarRegisterWorkStyle
              role={role}
              currentData={stepData[3] || {}}
              data={workingStyles}
              currentUserId={currentUserRoleId}
              onNext={(data) => {
                const thisStepData = { 3: data };

                // Store step data to edit later
                setStepData({ ...stepData, ...thisStepData });

                // Next step
                setStep(4);
              }}
              onSkip={() => {
                setStep(2);
              }}
            />
          )}
          {role === "studio" && step === 3 && (
            <RightBarRegisterBusinessSettings
              role={role}
              currentData={stepData[3] || {}}
              currentUserId={currentUserRoleId}
              onNext={(data) => {
                const thisStepData = { 3: data };

                // Store step data to edit later
                setStepData({ ...stepData, ...thisStepData });

                // Next step
                setStep(4);
              }}
              onPrevious={() => {
                setStep(2);
              }}
            />
          )}

          {step === 4 && (
            <RightBarRegisterAvatarUpload
              role={role}
              currentUserId={currentUserRoleId}
              currentData={stepData[4] || {}}
              onNext={(data) => {
                const thisStepData = { 4: data };

                // Store step data to edit later
                setStepData({ ...stepData, ...thisStepData });

                // Next step
                setStep(5);
              }}
              onPreviousStep={() => {
                setStep(3);
              }}
            />
          )}

          {step === 5 && (
            <RightBarRegisterTattooUpload
              role={role}
              currentUserId={currentUserRoleId}
              currentData={stepData[4] || {}}
              onNext={() => {
                if (token) {
                  auth.loginByToken(token);
                }
              }}
              onPreviousStep={() => {
                setStep(4);
              }}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

interface Props {
  workingStyles: Resource.WorkingStyle[];
}

export const getStaticProps = async () => {
  const workingStyles = await getWorkingStyleList();

  return { props: { workingStyles } };
};

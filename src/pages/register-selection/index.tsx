// External import
import React, { useEffect, useState } from "react";
import clsx from "clsx";

// Material UI Components
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

// Custom Components
import LeftBarRegisterSelection from "../../components/LeftBarRegisterSelection";
import RightBarRegisterAccountType from "../../components/RightBarRegisterAccountType";
import RightBarRegisterPersonalDetail from "../../components/RightBarRegisterPersonalDetail";
import RightBarRegisterAddress from "../../components/RightBarRegisterAddress";
// import RightBarRegisterWorkingLocation from "../components/RightBarRegisterWorkingLocation";
import RightBarRegisterWorkStyle from "../../components/RightBarRegisterWorkStyle";

import { getWorkingStyleList } from "../../api";
import { useAuth, useApp } from "../../contexts";

import useStyles from "./styles";

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
          <LeftBarRegisterSelection step={step} />
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

          {step === 2 && (
            <RightBarRegisterAddress
              role={role}
              currentUserId={currentUserId}
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
          {/*{step === 2 && (*/}
          {/*  <RightBarRegisterSetPassword*/}
          {/*    onNext={() => {*/}
          {/*      setStep(3);*/}
          {/*    }}*/}
          {/*    onPreviousStep={() => {*/}
          {/*      setStep(1);*/}
          {/*    }}*/}
          {/*  />*/}
          {/*)}*/}
          {/*{step === 3 && (*/}
          {/*  <RightBarRegisterWorkingLocation*/}
          {/*    onNext={() => {*/}
          {/*      setStep(4);*/}
          {/*    }}*/}
          {/*    onPreviousStep={() => {*/}
          {/*      setStep(2);*/}
          {/*    }}*/}
          {/*  />*/}
          {/*)}*/}
          {step === 3 && (
            <RightBarRegisterWorkStyle
              role={role}
              data={workingStyles}
              currentUserId={currentUserRoleId}
              onNext={() => {
                if (token) {
                  auth.loginByToken(token);
                }
              }}
              onSkip={() => {
                if (token) {
                  auth.loginByToken(token);
                }
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

import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import CustomDivider from "src/components/CustomDivider";
import colors from "src/palette";

import getConfig from "next/config";

import {
  EReCaptchaV2Size,
  EReCaptchaV2Theme,
  ReCaptchaProvider,
  ReCaptchaV2,
  // ReCaptchaV3,
  TReCaptchaV2Callback,
  // TReCaptchaV3Callback,
  // TReCaptchaV3RefreshToken,
} from "react-recaptcha-x";

const useStyles = makeStyles({
  greyText: {
    color: colors.grey,
  },
  dividerContainer: {
    marginTop: "10px",
  },
  checkWrapperSuccess: {
    marginTop: "10px",
    color: colors.standardGreen,
  },
  checkWrapperError: {
    marginTop: "10px",
    color: colors.brightRed,
  },
});

export default function GoogleReCaptcha({ setIsHuman }: { setIsHuman: React.Dispatch<React.SetStateAction<boolean>> }) {
  const classes = useStyles();
  const recaptchaSiteKey = getConfig().publicRuntimeConfig.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const [msg, setMsg] = useState({ status: false, message: "" });

  const v2Callback: TReCaptchaV2Callback = (token: string | false | Error): void => {
    if (typeof token === "string") {
      setMsg({ status: true, message: "Security check: Success" });
      setIsHuman(true);
    } else if (typeof token === "boolean" && !token) {
      setMsg({ status: false, message: "Token has expired, Check the checkbox again" });
    } else if (token instanceof Error) {
      setMsg({ status: false, message: "Error. Please check your network connection" });
    }
  };

  /* const v3Callback: TReCaptchaV3Callback = (
    token: string | void,
    refreshToken: TReCaptchaV3RefreshToken | void,
  ): void => {
    if (typeof token === "string") {
      if (typeof refreshToken === "function") {
        setMsg({ status: false, message: "Token refresh in progress..." });
      }
      setMsg({ status: true, message: "Security check: Success" });
      setIsHuman(true);
    } else {
      setMsg({ status: false, message: "Token retrieval in progress..." });
    }
  }; */

  return (
    <Grid container item justify={"center"}>
      {!msg.status ? (
        <ReCaptchaProvider
          siteKeyV2={recaptchaSiteKey}
          // siteKeyV3="your-reCAPTCHA-v3-site-key"
          langCode="en"
          // hideV3Badge={false}
        >
          <CustomDivider className={classes.dividerContainer}>
            <Typography className={classes.greyText}>Security Check</Typography>
          </CustomDivider>

          <ReCaptchaV2
            callback={v2Callback}
            theme={EReCaptchaV2Theme.Light}
            size={EReCaptchaV2Size.Normal}
            id="googleReCaptcha"
            data-test-id="googleReCaptcha-test-id"
          />
          {/* <ReCaptchaV3 action="your-action" callback={v3Callback} /> */}

          <Typography variant="caption" align="center" className={classes.checkWrapperError}>
            {msg.message}
          </Typography>
        </ReCaptchaProvider>
      ) : (
        <Typography variant="caption" align="center" className={classes.checkWrapperSuccess}>
          {msg.message}
        </Typography>
      )}
    </Grid>
  );
}

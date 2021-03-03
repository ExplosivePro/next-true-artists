import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const googleAppId = publicRuntimeConfig.GOOGLE_APP_ID;
export const instagramAppId = publicRuntimeConfig.INSTAGRAM_APP_ID;

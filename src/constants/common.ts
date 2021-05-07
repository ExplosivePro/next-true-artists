import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const publicPageBaseUrl = publicRuntimeConfig.PUBLIC_PAGE_BASE_URL;

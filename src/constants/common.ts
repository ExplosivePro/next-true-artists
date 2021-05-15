import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const publicPageBaseUrl = publicRuntimeConfig.PUBLIC_PAGE_BASE_URL;

// Client settings
export const clientSettings = [
  {
    groupName: "",
    settings: [
      {
        title: "Send email notification",
        name: "email_notifications",
        defaultValue: false,
        subTitle: null,
      },
      {
        title: "Send phone notification",
        name: "phone_notifications",
        defaultValue: false,
        subTitle: null,
      },
      {
        title: "Marketing emails",
        name: "marketing_emails",
        defaultValue: false,
        subTitle: "",
      },
      {
        title: "Active",
        name: "active",
        defaultValue: false,
        subTitle: "",
      },
    ],
  },
];

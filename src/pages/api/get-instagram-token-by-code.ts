import formData from "form-data";

import { getInstagramAccessToken } from "../../api";

export default async (req: any, res: any) => {
  const { method, body } = req;

  switch (method) {
    case "POST":
      // Create form data
      const data = new formData();
      data.append("client_id", process.env.INSTAGRAM_APP_ID);
      data.append("client_secret", process.env.INSTAGRAM_APP_SECRET);
      data.append("code", body.code);
      data.append("grant_type", "authorization_code");
      data.append("redirect_uri", body.redirectUrl);

      const result = await getInstagramAccessToken(data);

      return res.status(200).json(result);

    default:
      return res.status(400).json({
        error: {
          code: 400,
          message: "authentication fail",
        },
      });
  }
};

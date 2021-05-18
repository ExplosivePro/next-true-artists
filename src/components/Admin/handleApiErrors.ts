const handleApiErrors = (e: any) => {
  const errors = [];

  if (e.response.data) {
    const response = e.response.data;

    if (typeof response === "string")
      if (response.includes("<!DOCTYPE html>")) errors.push("Error fetching data !");
      else errors.push(response);

    if (typeof response === "object") {
      Object.keys(response).map((error: any) => {
        if (response[error] && typeof response[error] === "string") errors.push(response[error]);

        if (typeof response[error] === "object" && response[error].length > 0) {
          response[error].map((err: { key: any; message: any }) => {
            errors.push(`${err.key}: ${err.message}`);
          });
        }
      });
    }
  }
  return errors.join("; ");
};
export default handleApiErrors;

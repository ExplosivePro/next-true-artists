import useS3BucketUpload from "src/hooks/s3bucketImageUpload";

export const JoditUploadButton = {
  tooltip: "Insert image",
  icon: "image",
  name: "Insert image",
  popup: (editor: any, current: any, self: any, close: () => void) => {
    const form = editor.create.fromHTML(
      `<b>Insert image</b> <br><br>
      <form>
        <input id="image" type="file" accept="image/*"> <br><br>
        <div id="status" style="color: blue;"></div> <br>
        <div id="alert" style="color: red;"></div> <br>
        <input type="submit" value="Method 1" style="color: white;background-color: #0066ff;">
        <input type="submit" value="Method 2" style="color: white;background-color: #0066bb;">
      </form>`,
    );

    editor.e.on(form, "submit", async (e: any) => {
      e.preventDefault();
      form.querySelector("#alert").innerText = "";
      form.querySelector("#status").innerText = "";

      const uploadedImage = form.querySelector("#image").files[0];

      if (uploadedImage)
        if (uploadedImage.type.includes("image/")) {
          form.querySelector("#status").innerText = `Using ${e.submitter.value}:\n`;

          const uploadedImageResults = await useS3BucketUpload({
            onUploadStart: () => (form.querySelector("#status").innerText += `Starting upload...\n`),
            onUploadReady: () => (form.querySelector("#status").innerText += `Upload complete...\n`),
            onError: () => {
              form.querySelector("#alert").innerText = "Error loading image !";
              return;
            },
            pendingImage: uploadedImage,
            method: e.submitter.value,
          });

          if (uploadedImageResults.status) {
            editor.s.insertImage(uploadedImageResults.url);
            close();
          } else {
            form.querySelector("#alert").innerText = uploadedImageResults.url;
          }
        } else {
          form.querySelector("#alert").innerText = "Not a valid image !";
        }
    });

    return form;
  },
};

/***_______  image convert img to base64    ________**/

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileRender = new FileReader();
    fileRender.readAsDataURL(file);
    fileRender.onload = () => {
      resolve(fileRender.result);
    };
    fileRender.onerror = (err) => {
      reject(err);
    };
  });
}

export { convertToBase64 };


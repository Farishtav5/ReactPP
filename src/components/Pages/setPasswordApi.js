import Config from "../../config";

function SetPasswordApi(userDetails, ApiName) {
  return new Promise((resolve, reject) => {
    let url = Config.api + "/" + ApiName;
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic VXNlcjE6cGFzczEyMw==",
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(userDetails),
    })
      .then((response) => response.json())
      .then((responsejson) => {
        resolve(responsejson);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export default SetPasswordApi;

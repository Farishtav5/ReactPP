import Config from "../../config";

function ForgotUserPassword(userDetails) {
  return new Promise((resolve, reject) => {
    // let Tanentid = sessionStorage.getItem("Tanent");
    // Tanentid = parseInt(Tanentid, 10);
    let url = Config.api + "/forgotPassword";
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
export default ForgotUserPassword;

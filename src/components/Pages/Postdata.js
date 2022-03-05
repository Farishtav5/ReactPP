import Config from "../../config";

function Postdata(userData, data1) {
  return new Promise((resolve, reject) => {
    // const url = Config.login + "/loginDetails";
    let url = Config.api + "/getLoginInformation";
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: sessionStorage.getItem("access_token"),
        // "Authorization" : "Basic VXNlcjE6cGFzczEyMw==",
        Accept: "application/json",
        "Content-type": "application/json",
      },

      body: JSON.stringify({
        Email: userData,
        TenantID: sessionStorage.getItem("Tanent"),
      }),
    })
      .then((response) => response.json())
      .then((responsejson) => {
        resolve(responsejson);
        // console.log('responsejson');
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export default Postdata;

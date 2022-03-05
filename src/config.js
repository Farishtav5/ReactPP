import ConfigData from "./config.json";
class Config {
  //static api = 'http://localhost:3001'
  //static api = 'http://192.61.99.40:8088/api/values';
  static async init() {
    if (process.env.NODE_ENV === "development") {
      Config.api = window.webApi.ConfigApi + "/MemberService";
      Config.Providerapi = window.webApi.ConfigApi + "/Provider";
      // Config.api = window.webApi.ConfigApi;
      // Config.Provider = window.webApi.ConfigProvider;
      // Config.api = "http://localhost:54808/api/MemberService";
      // Config.Providerapi = "http://localhost:3001/api/Provider";
      // Config.data = "http://localhost:3001";
    }
    // use url in production mode
    if (process.env.NODE_ENV === "production") {
      Config.api = window.webApi.ConfigApi + "/MemberService";
      Config.Providerapi = window.webApi.ConfigApi + "/Provider";
      // Config.api = 'http://192.61.99.40:8090/api/providermgmt';
    }
  }
  static tableColumns = ConfigData.columns;
  static membertable = ConfigData.MemberData;
  static eligibilitytable = ConfigData.EligibilityData;
  static userDetails = ConfigData.USerDetails.ListUser;
}
export default Config;

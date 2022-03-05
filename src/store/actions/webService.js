// /**
//  * Add data to the store with given key name
//  * @param {Array} data  to be added to store
//  * @param {String} key  name to hold the data
//  */
export const addData = (data) => {
  return {
    type: "LOAD_DATA",
    payload: { data: data },
  };
};

// /**
//  *
//  * @param {string} url      url to fetch data from
//  * @param {string} method   method of request
//  * @param {object} headers  contains info to be send in headers
//  * @param {object} data     payload data
//  */

export const fetchLoadData = (
  url,
  method = "GET",
  keyName,
  headers = {},
  data = undefined
) => {
  return async (dispatch) => {
    async function fetcher() {
      const promise = await fetch(url, {
        method: method,
        headers: headers,
        body: method === "POST" ? JSON.stringify(data) : undefined,
      });
      let data = await promise.json();
      // if dataset is empty
      if (url.includes("GetClaimDeatils")) {
        // if blank data is coming
        if (data && data.ClaimsDetails && data.ClaimsDetails.length === 0) {
          const tableStatus = {
            isTableData: false,
          };
          return dispatch(addData(tableStatus));
        }
        // if data is comming
        else if (data && data.ClaimsDetails && data.ClaimsDetails.length > 0) {
          const tableStatus = {
            isTableData: true,
          };
          dispatch(addData(tableStatus));
        }
      }

      // if all data is null
      // const timerInfo = timer !== undefined ? {name:timer.name , unsubscribe: timer.instance} : timer
      return dispatch(addData(data));
    }
    fetcher();
  };
};

/**
 * unsubscribe the interval
 */
export const unsubscribe = (timerInstanceHolder) => {
  return {
    type: "UNSUBSCRIBE",
    payload: timerInstanceHolder,
  };
};

/**
 * fetch card details
 */

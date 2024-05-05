import Axios from "axios";

const baseUrl = "https://seller-app-backend-7gkm.onrender.com/cw/";

const AxiosCall = (
  type: any,
  data = {},
  api: any,
  resultHandler?: any,
  faultHandler?: any
) => {
  const parsedError = (error: any) => {
    let response;

    if (error.response) {
      response = error.response;
    }

    if (response && (response.status === 401 || response.status === 403)) {
      // when seesion gets expired clear the storage
      // dispatch(setUserData(''))
      const message =
        response.status === 401
          ? response.data.message
          : "Your session has expired, Please login again";

      return {
        message: message,
        status: response.status,
      };
    } else if (response && response.status === 404) {
      return Promise.reject({
        message: "Page Not Found",
        status: response.status,
      });
    } else {
      const message = error.response ? response.data : error.message;

      return {
        message: message,
        status: response ? response.status : 500,
        data: error.config.data,
      };
    }
  };

  const parseBody = (response: any) => {
    if (response && (response.data === null || response.data === undefined)) {
      return Promise.reject({
        message: "Resource Not Found",
      });
    }
    let exception = true;

    if (response.data && (response.status === 200 || response.status === 201)) {
      exception = false;
    }

    return exception ? parsedError(response.data) : response.data;
  };

  const instance = Axios.create({
    baseURL: baseUrl,
    timeout: 20000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.response.use(
    (response) => {
      const result = parseBody(response);

      return result;
    },
    (error) => {
      const err = parsedError(error);

      return Promise.reject(err);
    }
  );

  if (type === "get") {
    return new Promise((resolve, reject) => {
      instance
        .get(baseUrl + api, data)
        .then((res) => {
          console.log(res);
          resultHandler && resultHandler(res);
        })
        .catch((err) => {
          console.log(err);
          // faultHandler && faultHandler(err);
        });
    });
  } else {
    return new Promise((resolve, reject) => {
      instance
        .post(baseUrl + api, data)
        .then((res) => {
          console.log(res);
          resultHandler && resultHandler(res);
        })
        .catch((err) => {
          console.log(err);
          // faultHandler && faultHandler(err);
        });
    });
  }
};

export { AxiosCall, baseUrl };

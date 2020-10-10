import axios from "axios";
import { Toast } from "vant";
// 运行vue-cli-service,可以读取到.env.xxx配置文件配置,解决不同环境baseUrl问题
const axios_default = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 6000
});
axios_default.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios_default.defaults.headers.put["Content-Type"] =
  "application/x-www-form-urlencoded";
// `transformRequest` 允许在向服务器发送前，修改请求数据
// 且只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
axios_default.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);
axios_default.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const { status } = error.response;
    let message_notice;
    switch (status) {
      case 404:
        message_notice = "接口找不到";
        break;
      default:
        message_notice = "错误来自火星";
    }
    Toast(message_notice);
    return Promise.reject(error);
  }
);

const request = (url, params, config, method) => {
  return new Promise((resolve, reject) => {
    axios_default[method](url, params, Object.assign({}, config))
      .then(
        response => {
          resolve(response.data);
        },
        error => {
          reject(error);
        }
      )
      .catch(error => {
        reject(error);
      });
  });
};

const post = (url, params, config = {}) => {
  return request(url, params, config, "post");
};

// get和post有些区别,get: {params: {name : xxx}}, post: { name : xxxx}
const get = (url, params, config = {}) => {
  return request(url, { params }, config, "get");
};

const put = (url, params, config = {}) => {
  return request(url, params, config, "put");
};

const del = (url, params, config = {}) => {
  return request(url, params, config, "delete");
};
export { post, get, del, put };

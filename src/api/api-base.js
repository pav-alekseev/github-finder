import axios from 'axios';

export default class ApiBase {
  constructor(baseURL, params) {
    const instance = axios.create({
      baseURL: baseURL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    instance.interceptors.request.use(config => ({
      ...config,
      params: {
        ...config.params,
        params,
      },
    }));

    this.get = async (path, config) => instance.get(path, config);

    this.create = async (path, body, config) =>
      instance.post(path, body, config);

    this.update = async (path, body, config) =>
      instance.patch(path, body, config);

    this.remove = async (path, config) => instance.delete(path, config);
  }
}

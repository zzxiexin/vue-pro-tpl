import { get } from "./request";
export default {
  getIpAdr: params => get("/api", params)
};

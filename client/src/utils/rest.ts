import axios from "axios";
import { customtype, randomtype } from "./schema";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_ENDPOINT}`,
});

export const customURL = async ({ destination, shortId }: customtype) => {
  const { data } = await instance.post("/api/url", { destination, shortId });
  return data;
};

export const randomURL = async ({ destination }: randomtype) => {
  const { data } = await instance.post("/api/url", { destination });
  return data;
};

export const getHistory = async () => {
  const { data } = await instance.get("/api/history");
  return data;
};

export const getAnalytics = async (shortId: string) => {
  const { data } = await instance.get(`/api/analytics/${shortId}`);
  return data;
};

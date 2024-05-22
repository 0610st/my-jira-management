import { initQueryClient } from "@ts-rest/react-query";
import { api } from "contracts";

export const client = initQueryClient(api, {
  baseUrl: import.meta.env.VITE_API_URL,
  baseHeaders: {},
});

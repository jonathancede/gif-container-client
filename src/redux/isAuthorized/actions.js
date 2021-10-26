import { SET_DATA_IS_AUTHORIZED, RESET_DATA_IS_AUTHORIZED } from "./types";

export const setDataIsAuthorized = (data) => ({
  type: SET_DATA_IS_AUTHORIZED,
  payload: data,
});

export const resetDataIsAuthorized = () => ({
  type: RESET_DATA_IS_AUTHORIZED,
});

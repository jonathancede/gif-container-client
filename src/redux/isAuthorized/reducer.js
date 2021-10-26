import initialState from "./state";
import { SET_DATA_IS_AUTHORIZED, RESET_DATA_IS_AUTHORIZED } from "./types";

const isAuthorizedReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA_IS_AUTHORIZED:
      return { ...state, isAuthorized: true, userData: action.payload };
    case RESET_DATA_IS_AUTHORIZED:
      return initialState;
    default:
      return state;
  }
};

export default isAuthorizedReducer;

import * as types from "../actions/types";
import createReducer from "./createReducer";

const initialState = {
  checkItems: []
};

export function handleCheckItem(state = initialState, action = {}, checkItem) {
  switch (action.type) {
    case types.DELETECHECKITEM:
      return {
        ...state,
        count: state.checkItems.append(checkItem)
      };
    default:
      return state;
  }
}

export default function checkItemsReducer(state = initialState, action) {
  switch (action.type) {
  }
}

/*
export const checkItems = createReducer(
  {},
  {
    [types.SET_CHECKITEMS](state, action) {
      let newState = {};
      console.log("action is " + action);
      return newState;
    }
  }
);
*/
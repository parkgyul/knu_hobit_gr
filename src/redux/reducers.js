// reducers.js
import { RECEIVE_DATA } from "./actions";

const initialState = {
  messages: [], // 메시지를 저장할 배열
};

export function messageReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_DATA:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
}

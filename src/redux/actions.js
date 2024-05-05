// actions.js
export const RECEIVE_DATA = "RECEIVE_DATA";

export function receiveDataAction(data) {
  return {
    type: RECEIVE_DATA,
    payload: data,
  };
}

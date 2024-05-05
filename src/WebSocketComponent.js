// WebSocketComponent.js
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { receiveDataAction } from "./redux/actions";
import { SOCKET_URL } from "./config";

const WebSocketComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = new WebSocket(`${SOCKET_URL}`);

    socket.onopen = () => {
      console.log("WebSocket 연결 성공");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      dispatch(receiveDataAction(data));
    };

    socket.onclose = () => {
      console.log("WebSocket 연결 닫힘");
    };

    return () => {
      socket.close();
    };
  }, [dispatch]);

  return <div>{/* WebSocket 컴포넌트의 나머지 내용 */}</div>;
};

export default WebSocketComponent;

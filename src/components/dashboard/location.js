import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fullopr from "../../assets/images/logos/fullopr.svg";

const Location = () => {
  const messages = useSelector((state) => state.messages) || [];
  const [map, setMap] = useState(null); // 카카오 맵 객체
  const [marker, setMarker] = useState(null); // 마커 객체

  useEffect(() => {
    // 카카오 맵 초기화
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(34.874414, 128.70144),
      level: 5,
    };
    const newMap = new window.kakao.maps.Map(container, options);
    setMap(newMap);

    const initialMarker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(0, 0), // 초기 위치
      image: new window.kakao.maps.MarkerImage(
        fullopr,
        new window.kakao.maps.Size(40, 40)
      ),
    });
    initialMarker.setMap(newMap);
    setMarker(initialMarker);
  }, []);

  useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    if (latestMessage && map && marker) {
      const newPosition = new window.kakao.maps.LatLng(
        parseFloat(latestMessage.gps_lat),
        parseFloat(latestMessage.gps_lon)
      );
      marker.setPosition(newPosition); // 마커 위치 변경
    }
  }, [messages, map, marker]);

  return (
    <div style={{ border: "5px solid #E6EAFE" }}>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      <h2>Redux 상태 확인</h2>
      {messages.length === 0 ? (
        <p>메시지가 없습니다.</p>
      ) : (
        <div>
          <p>메시지 목록:</p>
          <ul>
            {messages.map((message, index) => (
              <li key={index}>
                Latitude: {message.gps_lat}, Longitude: {message.gps_lon}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Location;

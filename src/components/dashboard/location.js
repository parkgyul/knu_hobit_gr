import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import fullopr from "../../assets/images/logos/fullopr.svg";
import empopr from "../../assets/images/logos/empopr.svg";
const Location = () => {
  const messages = useSelector((state) => state.messages) || [];
  const [map, setMap] = useState(null); // 카카오 맵 객체
  const markersRef = useRef({}); // 마커 객체들 저장

  useEffect(() => {
    // 카카오 맵 초기화
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(34.874414, 128.70144),
      level: 5,
    };
    const newMap = new window.kakao.maps.Map(container, options);
    setMap(newMap);
  }, []);

  useEffect(() => {
    const message = messages[messages.length - 1];
    if (message && map) {
      // 메시지 목록을 순회하면서 각 eqp_id에 대해 마커 생성/업데이트
      const { eqp_id, gps_lat, gps_lon, weight } = message;

      //marker들의 정보 저장하기 (위치, 무게)
      const newPosition = new window.kakao.maps.LatLng(
        parseFloat(gps_lat).toFixed(7),
        parseFloat(gps_lon).toFixed(7)
      );
      const markerImageSrc = weight > 0 ? fullopr : empopr;
      const markerImage = new window.kakao.maps.MarkerImage(
        markerImageSrc,
        new window.kakao.maps.Size(40, 40)
      );

      // 마커가 이미 존재하는 경우, 그냥 위치 업데이트
      if (markersRef.current[eqp_id]) {
        markersRef.current[eqp_id].setPosition(newPosition);
        markersRef.current[eqp_id].setImage(markerImage);
      } else {
        // 마커가 존재하지 않으면 새로 생성
        const newMarker = new window.kakao.maps.Marker({
          position: newPosition,
          image: markerImage,
        });
        newMarker.setMap(map);
        markersRef.current[eqp_id] = newMarker;
        console.log("New marker created for eqp_id:", eqp_id);
      }
    }
  }, [messages, map]);

  return (
    <div style={{ border: "5px solid #E6EAFE" }}>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      {/*<h2>Redux 상태 확인</h2>
      {messages.length === 0 ? (
        <p>메시지가 없습니다.</p>
      ) : (
        <div>
          <p>메시지 목록:</p>
          <ul>
            {messages.map((message, index) => (
              <li key={index}>
                Latitude: {message.gps_lat}, Longitude: {message.gps_lon}
                , Weight: {message.weight}
              </li>
            ))}
          </ul>
        </div>
      )}*/}
    </div>
  );
};

export default Location;

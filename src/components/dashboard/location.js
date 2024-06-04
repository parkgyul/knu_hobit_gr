import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import fullopr from "../../assets/images/logos/fullopr.svg";
import empopr from "../../assets/images/logos/empopr.svg";

const Location = () => {
  const messages = useSelector((state) => state.messages) || [];
  const [map, setMap] = useState(null); // 카카오 맵 객체
  const markersRef = useRef({}); // 마커 객체들 저장
  const overlaysRef = useRef({}); // 커스텀 오버레이 객체들 저장

  useEffect(() => {
    // 카카오 맵 초기화
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(34.874414, 128.70144),
      level: 6,
    };
    const newMap = new window.kakao.maps.Map(container, options);
    setMap(newMap);
  }, []);

  useEffect(() => {
    const message = messages[messages.length - 1];
    if (message && map) {
      // 메시지 목록을 순회하면서 각 eqp_id에 대해 마커 생성/업데이트
      const { eqpId, gpsLat, gpsLon, weight } = message;

      //marker들의 정보 저장하기 (위치, 무게)
      const newPosition = new window.kakao.maps.LatLng(
        parseFloat(gpsLat).toFixed(7),
        parseFloat(gpsLon).toFixed(7)
      );

      const markerImageSrc = weight > 0 ? fullopr : empopr;
      const markerImage = new window.kakao.maps.MarkerImage(
        markerImageSrc,
        new window.kakao.maps.Size(40, 40)
      );

      if (markersRef.current[eqpId]) {
        // 마커가 이미 존재하는 경우, 위치와 이미지 업데이트
        markersRef.current[eqpId].setPosition(newPosition);
        markersRef.current[eqpId].setImage(markerImage);

        // 커스텀 오버레이 위치 업데이트
        if (overlaysRef.current[eqpId]) {
          overlaysRef.current[eqpId].setPosition(newPosition);
        }
      } else {
        // 마커가 존재하지 않으면 새로 생성
        const newMarker = new window.kakao.maps.Marker({
          position: newPosition,
          image: markerImage,
        });

        const content = `<div style="padding:1px 3px; background:rgba(255, 255, 255, 0); border:1px solid rgba(0, 0, 0, 0); border-radius:3px; font-size:12px; color:black;">${eqpId}</div>`;
        const overlay = new window.kakao.maps.CustomOverlay({
          position: newPosition,
          content: content,
          yAnchor: 2.6, // 마커 위쪽에 위치하도록 설정
        });

        newMarker.setMap(map);
        overlay.setMap(map);

        markersRef.current[eqpId] = newMarker;
        overlaysRef.current[eqpId] = overlay;
      }
    }
  }, [messages, map]);

  return (
    <div style={{ border: "5px solid #E6EAFE" }}>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
    </div>
  );
};

export default Location;

/* global kakao */
// eslint-disable-next-line
import { Card, CardBody, CardSubtitle, CardTitle, Row, Col } from "reactstrap";
import React, { useEffect } from "react";
import full from "../../assets/images/logos/full.png";

const Location = () => {
  useEffect(() => {
    var container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(34.874414, 128.70144),
      level: 4,
    };

    var map = new kakao.maps.Map(container, options);
    var markerPosition = new kakao.maps.LatLng(34.872408, 128.701388);

    var imageSrc = full,
      imageSize = new kakao.maps.Size(40, 40),
      imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      ),
      markerPosition = new kakao.maps.LatLng(34.872408, 128.701388);

    var marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });
    marker.setMap(map);
  }, []);

  return (
    <div style={{ border: "5px solid #E6EAFE" }}>
      <div id="map" style={{ width: "100&", height: "400px" }}></div>
    </div>
  );
};

export default Location;

import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  Button,
} from "reactstrap";
import "../../App.css";
import Checkbox from "./Checkbox.js";
import ApplyButton from "./ApplyButton.js";
import "./ApplyButton.scss";
import axios from "axios";
import { API_BASE_URL } from "../../config.js";
const OPERATION = [
  { value: "all", name: "전체" },
  { value: "O", name: "운행 중" },
  { value: "X", name: "정지" },
];
const LOAD = [
  { value: "all", name: "전체" },
  { value: "O", name: "상차" },
  { value: "X", name: "하차" },
];
const SelectBox = (props) => {
  return (
    <select style={{ width: "180px" }}>
      {props.options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          defaultValue={props.defaultValue === option.value}
        >
          {option.name}
        </option>
      ))}
    </select>
  );
};

const Options = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [sensorList, setSensorList] = useState([]);

  const getSensorList = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/sensor/read`);
      setSensorList(response.data);
    } catch (error) {
      console.error("불러오지 못함", error);
    }
  };

  useEffect(() => {
    getSensorList();
  }, []);

  const handleCheckboxChange = (value) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((id) => id !== value)
        : [...prevSelected, value]
    );
  };

  const handleSelectAll = () => {
    const sensorId = sensorList.map((sensor) => {
      return sensor.sensorEqpId;
    });
    setSelectedIds(sensorId);
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  const checkboxes = ["0000", "0001", "0010", "0100", "1200"];

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5" className="font-weight-bold">
          Options
        </CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          트랜스포터/상하차/운행
        </CardSubtitle>
        <hr style={{ borderTop: "3px solid #B9B8B8" }} />
        <ListGroup flush className="mt-4">
          <CardTitle tag="h5">
            트랜스포터 ID 선택
            <Button
              color="secondary"
              size="sm"
              onClick={handleSelectAll}
              style={{
                marginLeft: "100px",
                marginRight: "10px",
              }}
            >
              전체 선택
            </Button>
            <Button color="secondary" size="sm" onClick={handleDeselectAll}>
              전체 해제
            </Button>
            <div style={{ marginBottom: "10px" }} />
            {sensorList.map((sensor) => (
              <Checkbox
                key={sensor.id}
                value={sensor.sensorEqpId}
                onChange={() => handleCheckboxChange(sensor.sensorEqpId)}
                checked={selectedIds.includes(sensor.sensorEqpId)}
              >
                {sensor.sensorEqpId} &nbsp;
              </Checkbox>
            ))}
            <div style={{ marginBottom: "20px" }} />
            <hr style={{ borderTop: "3px solid #B9B8B8" }} />
            <div style={{ marginBottom: "10px" }} />
            상/하차: <SelectBox options={LOAD} defaultValue="all" />
            <div style={{ marginBottom: "10px" }} />
            <hr style={{ borderTop: "3px solid #B9B8B8" }} />
            <div style={{ marginBottom: "10px" }} />
            운행 여부: <SelectBox options={OPERATION} defaultValue="all" />
            <div style={{ marginBottom: "10px" }} />
          </CardTitle>
        </ListGroup>
        <div className="Button">
          <ApplyButton>Apply</ApplyButton>
        </div>
      </CardBody>
    </Card>
  );
};

export default Options;

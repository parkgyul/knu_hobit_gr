import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  Button,
} from "reactstrap";
import "../../App.css";
import Checkbox from "./Checkbox";
import ApplyButton from "./ApplyButton";
import "../../assets/scss/ApplyButton.scss";

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
    <select
      style={{ width: "180px" }}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    >
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

const Options = ({
  selectedIds,
  setSelectedIds,
  operationStatus,
  setOperationStatus,
  loadStatus,
  setLoadStatus,
  sensorList,
}) => {
  const handleCheckboxChange = (value) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((id) => id !== value)
        : [...prevSelected, value]
    );
  };

  const handleSelectAll = () => {
    const sensorId = sensorList.map((sensor) => sensor.sensorEqpId);
    setSelectedIds(sensorId);
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5" className="font-weight-bold">
          Options
        </CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          트랜스포터
        </CardSubtitle>
        <hr style={{ borderTop: "3px solid #B9B8B8" }} />
        <ListGroup flush className="mt-4">
          <CardTitle tag="h5">
            트랜스포터 ID 선택
            <Button
              color="secondary"
              size="sm"
              onClick={handleSelectAll}
              style={{ marginLeft: "80px", marginRight: "10px" }}
            >
              전체 선택
            </Button>
            <Button color="secondary" size="sm" onClick={handleDeselectAll}>
              전체 해제
            </Button>
            <div style={{ marginBottom: "10px" }} />
            {sensorList &&
              sensorList.map((sensor) => (
                <Checkbox
                  key={sensor.sensorEqpId}
                  value={sensor.sensorEqpId}
                  onChange={() => handleCheckboxChange(sensor.sensorEqpId)}
                  checked={selectedIds.includes(sensor.sensorEqpId)}
                >
                  {sensor.sensorEqpId} &nbsp;
                </Checkbox>
              ))}
            <div style={{ marginBottom: "20px" }} />
            <hr style={{ borderTop: "3px solid #B9B8B8" }} />
            {/*<div style={{ marginBottom: "10px" }} />
            상/하차:
            <SelectBox
              options={LOAD}
              value={loadStatus}
              onChange={setLoadStatus}
            />
            <div style={{ marginBottom: "10px" }} />
            <hr style={{ borderTop: "3px solid #B9B8B8" }} />
            <div style={{ marginBottom: "10px" }} />
            운행 여부:
            <SelectBox
              options={OPERATION}
              value={operationStatus}
              onChange={setOperationStatus}
            />
            <div style={{ marginBottom: "10px" }} />*/}
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

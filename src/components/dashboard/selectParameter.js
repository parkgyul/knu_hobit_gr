import React, { useState } from "react";
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
import "./ApplyButton.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";

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

const SelectParameter = ({
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateTime, setDateTime] = useState(null);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5" className="font-weight-bold">
          학습 파라미터 고르기
        </CardTitle>
        <hr style={{ borderTop: "3px solid #B9B8B8" }} />
        <ListGroup flush className="mt-3">
          Label Column
          <div style={{ marginBottom: "10px" }} />
          <select
            className="form-select form-select-sm form-select-short"
            aria-label=".form-select-sm example"
          >
            <option value="" disabled>
              조회할 데이터셋을 고르세요.
            </option>
            <option value="haha">hahaha</option>
          </select>
        </ListGroup>
        <hr style={{ borderTop: "3px solid #B9B8B8" }} />
        <ListGroup flush className="mt-3">
          Feature Column
          <div style={{ marginBottom: "10px" }} />
          <select
            className="form-select form-select-sm form-select-short"
            aria-label=".form-select-sm example"
          >
            <option value="" disabled>
              조회할 데이터셋을 고르세요.
            </option>
            <option value="haha">hahaha</option>
          </select>
          <hr style={{ borderTop: "3px solid #B9B8B8" }} />
        </ListGroup>
        <div>
          <label style={{ marginRight: "5px" }}>Start Date :</label>
          <label>Date and Time:</label>

          <DatePicker
            selected={dateTime}
            onChange={(date) => setDateTime(date)}
            showTimeSelect
            timeIntervals={15}
            dateFormat="yyyy/MM/dd HH:mm"
            timeFormat="HH:mm"
            placeholderText="Select date and time"
            customTimeInput={<TimePicker step={60} />}
          />
        </div>
        <ListGroup flush className="mt-3">
          <div>
            <label style={{ marginRight: "10px" }}>End Date : </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="종료 날짜와 시간을 고르세요"
            />
          </div>
          <div className="Button">
            <ApplyButton>Apply</ApplyButton>
          </div>
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default SelectParameter;

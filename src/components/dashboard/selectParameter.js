import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  Button,
  Spinner,
} from "reactstrap";
import "../../App.css";
import ApplyButton from "./ApplyButton";
import "./ApplyButton.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import axios from "axios";
const SelectParameter = ({ dataType, data, onResultChartDataUpdate }) => {
  const [loading, setLoading] = useState(false);

  //dataType 저장하기
  const [bucket, setBucket] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [tagKey, setTagKey] = useState("");
  const [tagValue, setTagValue] = useState("");

  //parameters 저장하기
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [estimator, setEstimator] = useState(100); // 초기값 설정
  const [split, setSplit] = useState(0.8);
  const [selectedLabelColumn, setSelectedLabelColumn] = useState("");
  const [selectedFeatureColumns, setSelectedFeatureColumns] = useState([]);

  const handleEstimatorChange = (event) => {
    const value = event.target.value;
    setEstimator(value);
  };

  const handleSplitChange = (event) => {
    const value = event.target.value;
    setSplit(value);
  };

  const handleLabelColumnChange = (event) => {
    const value = event.target.value;
    setSelectedLabelColumn(value);
  };

  const handleFeatureColumnChange = (event) => {
    const value = event.target.value;
    if (selectedFeatureColumns.includes(value)) {
      setSelectedFeatureColumns(
        selectedFeatureColumns.filter((col) => col !== value)
      );
    } else {
      setSelectedFeatureColumns([...selectedFeatureColumns, value]);
    }
  };

  const handleApplyButtonClick = async () => {
    //체크하기
    console.log("dataType: ", dataType);
    console.log("++++++++++++++++++++++++++++++++++++++++++");
    console.log("bucket: ", bucket);
    console.log("measurement: ", measurement);
    console.log("tagKey: ", tagKey);
    console.log("tagValue:", tagValue);
    console.log("Selected Estimator:", estimator);
    console.log("start Time", startTime);
    console.log("end Time", endTime);
    console.log("start Date", startDate);
    console.log("end Date", endDate);
    console.log("split", split);
    console.log("selectedLabelColumn", selectedLabelColumn);
    console.log("selectedFeatureColumns", selectedFeatureColumns);

    try {
      const response = await axios.post(
        "http://155.230.34.51:8081/train",
        {},
        {
          params: {
            bucket: bucket,
            measurement: measurement,
            tag_key: tagKey,
            tag_value: tagValue,
            start: startDate,
            end: endDate,
            send_topic: "iot-sensor-data-p3-r1-retentionih",
            train_ratio: split,
            n_estimators: estimator,
            feature_option_list: selectedFeatureColumns.join(","),
            label_option: selectedLabelColumn,
          },
        }
      );
      console.log("hahahahahhahahhaa", response.data);
      onResultChartDataUpdate(response.data);
      setSelectedFeatureColumns([]);
    } catch (error) {
      console.error("데이터를 불러오지 못했습니다.", error);
    } finally {
      setLoading(false); // API 호출 후에 로딩 상태 해제
    }
  };

  useEffect(() => {
    if (data) {
      setStartDate(new Date(data.start));
      setEndDate(new Date(data.end));
    }

    if (dataType && dataType.length === 4) {
      setBucket(dataType[0]);
      setMeasurement(dataType[1]);
      setTagKey(dataType[2]);
      setTagValue(dataType[3]);
    }
  }, [data, dataType]);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5" className="font-weight-bold">
          학습 파라미터 고르기
        </CardTitle>
        {data ? (
          <>
            <hr style={{ borderTop: "3px solid #B9B8B8" }} />
            <ListGroup flush className="mt-3">
              Label Column
              <div style={{ marginBottom: "10px" }} />
              <select
                className="form-select form-select-sm form-select-short"
                aria-label=".form-select-sm example"
                onChange={handleLabelColumnChange}
                value={selectedLabelColumn}
              >
                <option value="" disabled>
                  조회할 데이터셋을 고르세요.
                </option>
                {data.columns.map((column, index) => (
                  <option key={index} value={column}>
                    {column}
                  </option>
                ))}
              </select>
            </ListGroup>
            <hr style={{ borderTop: "3px solid #B9B8B8" }} />
            <ListGroup flush className="mt-3">
              Feature Column
              <div style={{ marginBottom: "10px" }} />
              <select
                className="form-select form-select-sm form-select-short"
                aria-label=".form-select-sm example"
                disabled={selectedLabelColumn === ""}
                onChange={handleFeatureColumnChange}
                value={selectedFeatureColumns}
                multiple
              >
                {selectedLabelColumn ? (
                  data.columns.map(
                    (column, index) =>
                      selectedLabelColumn !== column && ( // Label Column이 아닌 경우에만 option으로 추가
                        <option key={index} value={column}>
                          {column}
                        </option>
                      )
                  )
                ) : (
                  <option value="" disabled>
                    Label을 먼저 선택해주세요.
                  </option>
                )}
              </select>
              <hr style={{ borderTop: "3px solid #B9B8B8" }} />
            </ListGroup>
            <div>
              <label style={{ marginRight: "5px" }}>Start Date :</label>

              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                timeIntervals={60}
                dateFormat="yyyy/MM/dd HH:mm"
                timeFormat="HH:mm"
                placeholderText="시작 날짜와 시각을 고르세요."
                minDate={startDate}
                customTimeInput={
                  <TimePicker
                    onChange={(time) => setStartTime(time)}
                    value={startTime}
                    step={60}
                  />
                }
              />
            </div>
            <ListGroup flush className="mt-3">
              <div>
                <label style={{ marginRight: "10px" }}>End Date : </label>

                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  showTimeSelect
                  timeIntervals={60}
                  dateFormat="yyyy/MM/dd HH:mm"
                  timeFormat="HH:mm"
                  maxDate={endDate}
                  placeholderText="종료 날짜와 시각을 고르세요."
                  customTimeInput={
                    <TimePicker
                      onChange={(time) => setEndTime(time)}
                      value={endTime}
                      step={60}
                    />
                  }
                />
              </div>
            </ListGroup>
            <hr style={{ borderTop: "3px solid #B9B8B8" }} />
            <ListGroup flush className="mt-3">
              Estimator
              <div style={{ marginBottom: "10px" }} />
              <input
                type="number"
                name="number"
                step="100"
                placeholder="100"
                min="100"
                max="1000"
                value={estimator}
                onChange={handleEstimatorChange}
              ></input>
            </ListGroup>
            <hr style={{ borderTop: "3px solid #B9B8B8" }} />
            <ListGroup flush className="mt-3">
              Split
              <div style={{ marginBottom: "10px" }} />
              <input
                type="number"
                name="number"
                step="0.01"
                placeholder="0"
                min="0"
                max="1"
                value={split}
                onChange={handleSplitChange}
              ></input>
            </ListGroup>
            <hr style={{ borderTop: "3px solid #B9B8B8" }} />
            <ListGroup>
              <Button onClick={handleApplyButtonClick}>모델 학습 시키기</Button>
            </ListGroup>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              <Spinner style={{ width: "3rem", height: "3rem" }} />
            </div>
            <div style={{ textAlign: "center" }}>데이터를 선택해주세요.</div>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default SelectParameter;

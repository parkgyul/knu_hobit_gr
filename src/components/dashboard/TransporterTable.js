import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Spinner, // Spinner 추가
} from "reactstrap";
import transporter from "../../assets/images/users/transporter.png";
import axios from "axios";
import { useSelector } from "react-redux";
import "../../assets/scss/table.css";

const ProjectTables = ({
  selectedIds,
  operationStatus,
  loadStatus,
  sensorList,
}) => {
  const messages = useSelector((state) => state.messages) || [];
  const [filteredSensorList, setFilteredSensorList] = useState([]);
  const [operatedTime, setOperatedTime] = useState();
  const [modal, setModal] = useState(false);
  const [eqpId, setEqpId] = useState("");
  const [loading, setLoading] = useState(false); // loading state 추가

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    const filterSensors = () => {
      let filtered = sensorList;

      if (selectedIds.length > 0) {
        filtered = filtered.filter((sensor) =>
          selectedIds.includes(sensor.sensorEqpId)
        );
      }
      if (operationStatus !== "all") {
        filtered = filtered.filter(
          (sensor) => sensor.weight > 0 || sensor.weight < 0
        );
      }
      if (loadStatus !== "all") {
        filtered = filtered.filter((sensor) =>
          loadStatus === "O" ? sensor.weight >= 0 : sensor.weight < 0
        );
      }

      setFilteredSensorList(filtered);
    };

    filterSensors();
  }, [selectedIds, operationStatus, loadStatus, sensorList]);

  useEffect(() => {
    console.log(messages);
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      if (latestMessage) {
        const updatedSensorList = filteredSensorList.map((sensor) => {
          if (String(sensor.sensorEqpId) === String(latestMessage.eqpId)) {
            return {
              ...sensor,
              weight: parseFloat(latestMessage.weight).toFixed(3),
            };
          }
          return sensor;
        });
        setFilteredSensorList(updatedSensorList);
      }
    }
  }, [messages]);

  const formatOperatedTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}시간 ${minutes}분 ${remainingSeconds}초`;
  };

  const RecieveOperatedTime = async (eqp_id) => {
    setEqpId(eqp_id);
    toggleModal();
    try {
      setLoading(true); // loading 상태를 true로 설정
      const response = await axios.get(`http://155.230.34.51:8081/chunk/read`, {
        params: {
          bucket: "mqtt_iot_sensor",
          measurement: "transport",
          tag_key: "eqp_id",
          tag_value: eqp_id,
          send_topic: "iot-sensor-data-p3-r1-retention1h",
        },
      });
      const formattedTime = formatOperatedTime(response.data);
      setOperatedTime(formattedTime);
    } catch (error) {
      console.error("불러오지 못함", error);
      setOperatedTime(null);
    } finally {
      setLoading(false); // loading 상태를 false로 설정
    }
  };

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">트랜스포터</CardTitle>
          <div className="fixed-header">
            <Table className="no-wrap mt-3 align-middle" responsive hover>
              <thead>
                <tr>
                  <th>장비 ID</th>
                  <th>현재 중량물</th>
                  <th>운행상태</th>
                  <th>누적운행시간 보기</th>
                </tr>
              </thead>
              <tbody>
                {filteredSensorList.map((sensor, index) => (
                  <tr key={index} className="border-top">
                    <td>
                      <div className="d-flex align-items-center p-2">
                        <img
                          src={transporter}
                          className="rounded-circle"
                          alt="avatar"
                          width="45"
                          height="45"
                        />
                        <div className="ms-3">
                          <h6 className="mb-0">{sensor.sensorName}</h6>

                          <span className="text-muted">
                            {sensor.sensorEqpId}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{sensor.weight ? sensor.weight + " ton" : "N/A"}</td>
                    <td>
                      {sensor.weight ? (
                        <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                      ) : (
                        <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                      )}
                    </td>
                    <td>
                      <Button
                        color="secondary"
                        onClick={() => RecieveOperatedTime(sensor.sensorEqpId)}
                      >
                        {sensor.sensorEqpId} 's 누적운행시간
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>누적 운행 시간 확인하기</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="d-flex justify-content-center">
              <img src={transporter} alt="transporter" width="80" />
            </div>
            <div className="d-flex justify-content-center mt-3">
              <span>{eqpId}</span>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <span>
                누적 운행 시간:{" "}
                {operatedTime ? operatedTime : <Spinner color="primary" />}
              </span>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProjectTables;

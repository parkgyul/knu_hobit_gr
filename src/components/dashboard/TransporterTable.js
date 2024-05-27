import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import transporter from "../../assets/images/users/transporter.png";
import axios from "axios";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../../config";
import "./table.css";

const ProjectTables = () => {
  const messages = useSelector((state) => state.messages) || [];
  const [sensorList, setSensorList] = useState([]);
  const [operatedTime, setOperatedTime] = useState();
  const [modal, setModal] = useState(false);
  const [eqpId, setEqpId] = useState();
  const toggleModal = () => {
    setModal(!modal);
  };

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

  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      if (latestMessage) {
        const updatedSensorList = sensorList.map((sensor) => {
          if (String(sensor.sensorEqpId) === String(latestMessage.eqp_id)) {
            return {
              ...sensor,
              weight: parseFloat(latestMessage.weight).toFixed(3),
            };
          }
          return sensor;
        });
        setSensorList(updatedSensorList);
      }
    }
  }, [messages]);

  const RecieveOperatedTime = async (eqp_id) => {
    setEqpId(eqp_id);
    try {
      const response = await axios.get(`${API_BASE_URL}/${eqp_id}`);
      setOperatedTime(response.data);
      toggleModal();
    } catch (error) {
      console.error("불러오지 못함", error);
      setOperatedTime(null);
      toggleModal();
    }
  };

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">트랜스포터</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            .
          </CardSubtitle>
          <div className="fixed-header">
            <Table
              className="no-wrap mt-3 align-middle"
              variant="dark"
              responsive
              hover
            >
              <thead>
                <tr>
                  <th>장비 ID</th>
                  <th>현재 중량물</th>
                  <th>운행상태</th>
                  <th>누적운행시간 보기</th>
                </tr>
              </thead>
              <tbody>
                {sensorList.map((sensor, index) => (
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
              <span>누적 운행 시간: {operatedTime ? operatedTime : "N/A"}</span>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProjectTables;

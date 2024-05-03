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
  ModalFooter,
} from "reactstrap";
import ship from "../../assets/images/users/ship.png";
import transporter from "../../assets/images/users/transporter.png";
import "../../assets/scss/layout/modalStyle.css";
import axios from "axios";
import { API_BASE_URL } from "../../config.js";

// const items = [s
//     type: "ship",
//     name: "sensor1",
//     topic: "topic1",
//   },
//   {
//     type: "transporter",
//     name: "sensor2",
//     topic: "topic2",
//   },
//   {
//     type: "transporter",
//     name: "sensor3",
//     topic: "topic3",
//   },
//   {
//     type: "ship",
//     name: "sensor4",
//     topic: "topic4",
//   },
// ];

const SensorTable = () => {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [sensorList, setSensorList] = useState([]);
  const [sensor, setSensor] = useState([]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleEditModal = () => {
    setEditModal(!editModal);
  };

  const getSensorList = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      console.log(response.data);
      console.log("서버 응답 데이터:", response.data.response);
      setSensorList(response.data.response);
    } catch (error) {
      console.error("불러오지 못함", error);
    }
  };

  useEffect(() => {
    getSensorList();
  }, []);

  const AddSensor = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/dir/0`, {
        name: name,
        type: type,
        topic: topic,
      });
      console.log(response);
      if (response.status === 200) {
        console.log("보냈음 ");
      }
    } catch (error) {
      console.error("Error adding sensor:", error);
    }
  };

  const handleAddSensor = async () => {
    try {
      await AddSensor();
      toggleModal();
      getSensorList();
      setName("");
      setTopic("");
      setType("");
    } catch (error) {
      console.error("센서 등록 실패", error);
    }
  };

  const onClickRemove = async (id) => {
    if (window.confirm("센서를 삭제하시겠습니까?")) {
      await axios.delete(`${API_BASE_URL}/${id}`);
      alert("삭제되었습니다.");
    }
  };

  const clickModal = () => {
    return (
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>센서 등록하기</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="input-group">
              <span>type</span>
              <input
                type="text"
                placeholder="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div className="input-group">
              <span>name</span>
              <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <span>topic</span>
              <input
                type="text"
                placeholder="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            취소
          </Button>
          <Button color="primary" onClick={handleAddSensor}>
            센서 등록하기
          </Button>
        </ModalFooter>
      </Modal>
    );
  };

  const handleEditSensor = async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/sensor/${id}`, {
        name: sensor.name,
        type: sensor.type,
        topic: sensor.topic,
      });
      console.log(response);
      if (response.status === 200) {
        toggleEditModal();
        console.log("보냈음 ");
      }
    } catch (error) {
      console.error("수정실패", error);
    }
  };

  const onChange = (event) => {
    const { value, name } = event.target;
    setSensor((prevSensor) => ({
      ...prevSensor,
      [name]: value,
    }));
  };

  const clickEditModal = (id) => {
    try {
      const response = axios.get(`${API_BASE_URL}/sensor/{id}`);
      setSensor(response.data.response);
    } catch (error) {
      console.error("센서 하나 정보 불러오지 못함", error);
    }

    return (
      <Modal isOpen={modal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>센서 수정하기</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="input-group">
              <span>type</span>
              <input
                type="text"
                placeholder="type"
                value={sensor.type}
                onChange={onChange}
              />
            </div>
            <div className="input-group">
              <span>name</span>
              <input
                type="text"
                placeholder="name"
                value={sensor.name}
                onChange={onChange}
              />
            </div>
            <div className="input-group">
              <span>topic</span>
              <input
                type="text"
                placeholder="topic"
                value={sensor.topic}
                onChange={onChange}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleEditModal}>
            취소
          </Button>
          <Button color="primary" onClick={handleEditSensor(id)}>
            수정완료
          </Button>
        </ModalFooter>
      </Modal>
    );
  };
  return (
    <div>
      <Card>
        <CardBody>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <CardTitle tag="h5">Sensor Listing</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                Overview of the Sensors
              </CardSubtitle>
            </div>
            <Button
              color="dark"
              style={{ borderRadius: "20px" }}
              onClick={toggleModal}
            >
              New Sensor
            </Button>
          </div>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>name</th>
                <th>topic</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            {sensorList.length === 0 ? (
              <p>센서를 등록해주세요.</p>
            ) : (
              <tbody>
                {sensorList.map((sensor) => (
                  <tr key={sensor.id} className="border-top">
                    <td>
                      <div className="d-flex align-items-center p-2">
                        <img
                          src={sensor.type === "ship" ? ship : transporter}
                          alt="avatar"
                          width="45"
                          height="45"
                        />
                        <div className="ms-3">
                          <h5 className="mb-0">{sensor.name}</h5>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h5 className="mb-0">{sensor.topic}</h5>
                    </td>
                    <td className="text-end">
                      <Button
                        color="info"
                        size="sm"
                        onClick={() => clickEditModal(sensor.id)}
                      >
                        Edit
                      </Button>
                    </td>
                    <td className="text-start">
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => onClickRemove(sensor.id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </Table>
        </CardBody>
      </Card>
      {clickModal()}
    </div>
  );
};

export default SensorTable;

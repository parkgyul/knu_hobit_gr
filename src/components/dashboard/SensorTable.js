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

const SensorTable = () => {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [eqpId, setEqpId] = useState("");
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [sensorList, setSensorList] = useState([]);
  const [sensor, setSensor] = useState({});
  const [sensorId, setSensorId] = useState("");

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleEditModal = () => {
    setEditModal(!editModal);
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

  const AddSensor = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/sensor/create`, {
        sensorName: name,
        sensorType: type,
        sensorEqpId: eqpId,
      });
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
      setType("");
      setEqpId("");
    } catch (error) {
      console.error("센서 등록 실패", error);
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
              <span>equipID</span>
              <input
                type="text"
                placeholder="equip Id"
                value={eqpId}
                onChange={(e) => setEqpId(e.target.value)}
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

  const onClickRemove = async (id) => {
    if (window.confirm("센서를 삭제하시겠습니까?")) {
      await axios.patch(`${API_BASE_URL}/sensor/delete/${id}`);
      alert("삭제되었습니다.");
      getSensorList();
    }
  };

  const handleEditSensor = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/sensor/update/${sensorId}`,
        {
          sensorName: sensor.sensorName,
          sensorType: sensor.sensorType,
          sensorEqpId: sensor.sensorEqpId,
        }
      );
      if (response.status === 200) {
        console.log("보냈음 ");
        toggleEditModal();
        getSensorList();
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

  const clickEditModal = async (id) => {
    setSensorId(id);
    toggleEditModal();
  };

  useEffect(() => {
    if (editModal && sensorId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/sensor/read/${sensorId}`
          );
          setSensor(response.data);
        } catch (error) {
          console.error("센서 하나 정보 불러오지 못함", error);
        }
      };
      fetchData();
    }
  }, [editModal, sensorId]);

  const editmodal = () => {
    return (
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>센서 수정하기</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="input-group">
              <span>type</span>
              <input
                type="text"
                placeholder="type"
                value={sensor.sensorType}
                onChange={onChange}
                name="sensorType"
              />
            </div>
            <div className="input-group">
              <span>name</span>
              <input
                type="text"
                placeholder="name"
                value={sensor.sensorName}
                onChange={onChange}
                name="sensorName"
              />
            </div>
            <div className="input-group">
              <span>Equip Id</span>
              <input
                type="text"
                placeholder="Equip Id"
                value={sensor.sensorEqpId}
                onChange={onChange}
                name="sensorEqpId"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleEditModal}>
            취소
          </Button>
          <Button color="primary" onClick={handleEditSensor}>
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
            {sensorList ? (
              <tbody>
                {sensorList.map((sensor) => (
                  <tr key={sensor.sensorEqpId} className="border-top">
                    <td>
                      <div className="d-flex align-items-center p-2">
                        <img
                          src={
                            sensor.sensorType === "ship" ? ship : transporter
                          }
                          alt="avatar"
                          width="45"
                          height="45"
                        />
                        <div className="ms-3">
                          <h5 className="mb-0">{sensor.sensorName}</h5>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h5 className="mb-0">{sensor.sensorTopic}</h5>
                    </td>
                    <td className="text-end">
                      <Button
                        color="info"
                        size="sm"
                        onClick={() => clickEditModal(sensor.sensorId)}
                      >
                        Edit
                      </Button>
                    </td>
                    <td className="text-start">
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => onClickRemove(sensor.sensorId)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <p>센서를 등록해주세요.</p>
            )}
          </Table>
        </CardBody>
      </Card>
      {clickModal()}
      {editmodal()}
    </div>
  );
};

export default SensorTable;

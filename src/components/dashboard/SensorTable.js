import React, { useState } from "react";
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
const items = [
  {
    type: "ship",
    name: "sensor1",
    topic: "topic1",
  },
  {
    type: "transporter",
    name: "sensor2",
    topic: "topic2",
  },
  {
    type: "transporter",
    name: "sensor3",
    topic: "topic3",
  },
  {
    type: "ship",
    name: "sensor4",
    topic: "topic4",
  },
];

const SensorTable = () => {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
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
            Close
          </Button>
          <Button color="primary" onClick={toggleModal}>
            Save changes
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
            <tbody>
              {items.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={tdata.type === "ship" ? ship : transporter}
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h5 className="mb-0">{tdata.name}</h5>
                      </div>
                    </div>
                  </td>
                  <td>
                    <h5 className="mb-0">{tdata.topic}</h5>
                  </td>
                  <td className="text-end">
                    <Button color="info" size="sm">
                      Edit
                    </Button>
                  </td>
                  <td className="text-start">
                    <Button color="danger" size="sm">
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      {clickModal()}
    </div>
  );
};

export default SensorTable;

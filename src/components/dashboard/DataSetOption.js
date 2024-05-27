import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config.js";
import { Modal, ModalBody, ModalHeader, Button, ModalFooter } from "reactstrap";
import Checkbox from "./Checkbox";
const DataSetOption = ({ onTypeChange }) => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [modal, setModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedBucketName, setSelectedBucketName] = useState("");
  const [selectedMeasurement, setSelectedMeasurement] = useState("");
  const [selectedTagKey, setSelectedTagKey] = useState("");
  const [selectedTagValue, setSelectedTagValue] = useState("");

  const handleNextPage = () => {
    if (currentPage === 1 && !selectedBucketName) {
      return;
    } else if (currentPage === 2 && !selectedMeasurement) {
      return;
    } else if (currentPage === 3 && !selectedTagKey) {
      return;
    } else if (currentPage === 4 && !selectedTagValue) {
      return;
    }

    setCurrentPage((currentPage) => currentPage + 1);
  };
  const toggleModal = () => {
    setModal(!modal);
    setCurrentPage(1);
  };

  const handleBucketChange = (value) => {
    setSelectedBucketName(value);
  };

  const handleMeasurementChange = (value) => {
    setSelectedMeasurement(value);
  };

  const handleTagKeyChange = (value) => {
    setSelectedTagKey(value);
  };

  const handleTagValueChange = (value) => {
    setSelectedTagValue(value);
  };

  const DataTypeSubmit = () => {
    const selectedData = [
      selectedBucketName,
      selectedMeasurement,
      selectedTagKey,
      selectedTagValue,
    ];

    onTypeChange(selectedData);
  };

  const getDataSetTypes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dataset/type`);
      console.log(response.data.dataset_list);
      setTypes(response.data.dataset_list);
      toggleModal();
    } catch (error) {
      console.error("불러오지 못함", error);
    }
  };
  //데이터 타입 받아오는지 확인하자 !!!!
  /*
  const getDataSetTypes2 = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dataset/type`);
      console.log(response.data.dataset_list);
    } catch (error) {
      console.error("불러오지 못함", error);
    }
  };

  useEffect(() => {
    getDataSetTypes2();
  }, []);*/
  const SelectDataType = () => {};
  return (
    <div>
      <Button color="secondary" onClick={getDataSetTypes}>
        데이터셋 고르기
      </Button>
      <Modal isOpen={modal} toggle={toggleModal}>
        {/* 페이지에 따라 렌더링되는 내용 변경 */}
        {currentPage === 1 && (
          <ModalHeader toggle={toggleModal}>Bucket 선택하기</ModalHeader>
        )}
        {currentPage === 2 && (
          <ModalHeader toggle={toggleModal}>Measurement 선택하기</ModalHeader>
        )}
        {currentPage === 3 && (
          <ModalHeader toggle={toggleModal}>Tag Key 선택하기</ModalHeader>
        )}
        {currentPage === 4 && (
          <ModalHeader toggle={toggleModal}>Tag Value 선택하기</ModalHeader>
        )}
        {/* 나머지 페이지 모달 헤더 구현 */}
        <ModalBody>
          {currentPage === 1 && (
            <div>
              {types &&
                types

                  .filter(
                    (type, index, self) =>
                      self.findIndex(
                        (t) => t.bucket_name === type.bucket_name
                      ) === index
                  )
                  .map((type, index) => (
                    <Checkbox
                      key={index}
                      value={type.bucket_name}
                      onChange={() => handleBucketChange(type.bucket_name)}
                    >
                      {type.bucket_name} &nbsp;
                    </Checkbox>
                  ))}
            </div>
          )}
          {currentPage === 2 && (
            <div>
              {types &&
                types
                  .filter((type) => type.bucket_name === selectedBucketName)
                  .filter(
                    (type, index, self) =>
                      self.findIndex(
                        (t) => t.measurement === type.measurement
                      ) === index
                  )
                  .map((type, index) => (
                    <Checkbox
                      key={index}
                      value={type.measurement}
                      onChange={() => handleMeasurementChange(type.measurement)}
                    >
                      {type.measurement} &nbsp;
                    </Checkbox>
                  ))}
            </div>
          )}

          {currentPage === 3 && (
            <div>
              {types &&
                types
                  .filter((type) => type.bucket_name === selectedBucketName)
                  .filter((type) => type.measurement === selectedMeasurement)
                  .filter(
                    (type, index, self) =>
                      self.findIndex((t) => t.tagKeyStr === type.tagKeyStr) ===
                      index
                  )
                  .map((type, index) => (
                    <Checkbox
                      key={index}
                      value={type.tagKeyStr}
                      onChange={() => handleTagKeyChange(type.tagKeyStr)}
                    >
                      {type.tagKeyStr} &nbsp;
                    </Checkbox>
                  ))}
            </div>
          )}
          {currentPage === 4 && (
            <div>
              {types &&
                types
                  .filter((type) => type.bucket_name === selectedBucketName)
                  .filter((type) => type.measurement === selectedMeasurement)
                  .filter((type) => type.tagKeyStr === selectedTagKey)
                  .filter(
                    (type, index, self) =>
                      self.findIndex(
                        (t) => t.tagValueStr === type.tagValueStr
                      ) === index
                  )
                  .map((type, index) => (
                    <Checkbox
                      key={index}
                      value={type.tagValueStr}
                      onChange={() => handleTagValueChange(type.tagValueStr)}
                    >
                      {type.tagValueStr} &nbsp;
                    </Checkbox>
                  ))}
            </div>
          )}

          {/* 나머지 페이지 모달 내용 구현 */}
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              setCurrentPage(1);
              toggleModal();
            }}
          >
            취소
          </Button>
          {currentPage !== 4 ? (
            <Button color="primary" onClick={handleNextPage}>
              다음
            </Button>
          ) : (
            <Button
              color="red"
              onClick={() => {
                toggleModal();
                setCurrentPage(1);
                DataTypeSubmit();
              }}
            >
              제출하기
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DataSetOption;

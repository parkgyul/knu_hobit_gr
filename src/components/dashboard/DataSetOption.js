import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config.js";

const DataSetOption = ({ onTypeChange }) => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  const getDataSetTypes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dataset/type`);
      console.log(response.data.dataset_list);
      setTypes(response.data.dataset_list);
    } catch (error) {
      console.error("불러오지 못함", error);
    }
  };

  useEffect(() => {
    getDataSetTypes();
  }, []);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedType(selectedValue);
    onTypeChange(selectedValue);
  };

  return (
    <div>
      <select
        className="form-select form-select-sm form-select-short"
        aria-label=".form-select-sm example"
        value={selectedType}
        onChange={handleSelectChange}
      >
        <option value="" disabled>
          조회할 데이터셋을 고르세요.
        </option>
        {types.length > 0 ? (
          types.map((type, index) => (
            <option
              key={index}
              value={`${type.bucket_name},${type.measurement}`}
            >
              {type.bucket_name} + {type.measurement}
            </option>
          ))
        ) : (
          <option value="none">선택할 데이터셋이 없습니다.</option>
        )}
      </select>
    </div>
  );
};

export default DataSetOption;

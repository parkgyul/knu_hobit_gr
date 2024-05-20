import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config.js";

const DataSetOption = ({ onTypeChange }) => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  const getDataSetTypes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/dataset/type`);
      console.log(response);
      setTypes(response.data);
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
    onTypeChange(selectedValue); // Call the parent function to update the state
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
          types.map((type) => (
            <option key={type.type} value={type.type}>
              {type.type}
            </option>
          ))
        ) : (
          <option value="haha">hahaha</option>
        )}
      </select>
    </div>
  );
};

export default DataSetOption;

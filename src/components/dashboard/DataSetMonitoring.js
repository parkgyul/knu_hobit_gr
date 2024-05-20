import React, { useEffect } from "react";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { Card } from "reactstrap";
const DataSetMonitoring = ({ selectedType }) => {
  const sendDataSetTypes = (type) => {
    console.log(type);
    try {
      axios
        .get(
          `${API_BASE_URL}/dataset/selection`,
          {
            name: type,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.error("불러오지 못함", error);
    }
  };

  useEffect(() => {
    if (selectedType) {
      sendDataSetTypes(selectedType);
    }
  }, [selectedType]);

  return (
    <div>
      selectedType : {selectedType}
      <Card>dfadfadf</Card>
    </div>
  );
};

export default DataSetMonitoring;

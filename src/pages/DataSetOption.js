import React, { useState, useEffect } from "react";

import { Card, CardTitle, Button } from "reactstrap";
import axios from "axios";
import { API_BASE_URL } from "../config.js";

const DataSetOption = () => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  const getDataSetTypes = async () => {
    try {
      await axios.get(`${API_BASE_URL}/dataset/types`).then((response) => {
        console.log(response);
        setTypes(response.data);
      });
    } catch (error) {
      console.error("불러오지 못함", error);
    }
  };
  useEffect(() => {
    getDataSetTypes();
  }, []);

  const sendDataSetTypes = (props) => {
    try {
      axios
        .get(
          `${API_BASE_URL}/dataset/selection`,
          {
            name: props,
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

  //option

  return (
    <Card>
      <CardTitle tag="h6" className="font-weight-bold">
        데이터 종류를 고르세요.
      </CardTitle>
      <div>
        {types.map((type) => (
          <Button
            color="secondary"
            size="sm"
            onClick={() => sendDataSetTypes(type.type)}
          >
            {type.type}
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default DataSetOption;

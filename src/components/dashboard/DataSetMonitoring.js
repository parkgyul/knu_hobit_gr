import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

const DataSetMonitoring = ({ selectedType }) => {
  const [dataSet, setDataSet] = useState([]);

  const sendDataSetTypes = (type) => {
    console.log(type);
    const [bucketName, measurement] = type.split(",");
    console.log("Bucket Name:", bucketName);
    console.log("Measurement:", measurement);
    try {
      axios
        .get(`${API_BASE_URL}/dataset/selection`, {
          bucket_name: bucketName,
          measurement: measurement,
        })
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
                <CardTitle tag="h5">{selectedType} Monitoring</CardTitle>
              </div>
            </div>

            <Table className="no-wrap mt-3 align-middle" responsive borderless>
              {dataSet && dataSet.column && dataSet.datas ? (
                <>
                  <div>count : {dataSet.count}</div>
                  <div>데이터 기록 start : {dataSet.start}</div>
                  <div>데이터 기록 end : {dataSet.end}</div>
                  <div>measurement: {dataSet.measurement}</div>
                  <thead>
                    <tr>
                      {dataSet.column.map((col, index) => (
                        <th key={index}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dataSet.datas.map((data, index) => (
                      <tr key={index} className="border-top">
                        <td>
                          <div className="d-flex align-items-center p-2">
                            <div className="ms-3">
                              <h5 className="mb-0">{data.sensorName}</h5>
                            </div>
                          </div>
                        </td>
                        <td>
                          <h5 className="mb-0">{data.sensorTopic}</h5>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              ) : (
                <div>데이터가 없지롱</div>
              )}
            </Table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DataSetMonitoring;

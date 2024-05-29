import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Options from "../components/dashboard/options.js";
import DataSet from "./DataSet.js";
import SelectParameter from "../components/dashboard/selectParameter.js";
const Analysis = () => {
  return (
    <div>
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <DataSet />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <SelectParameter />
        </Col>
        <SalesChart />
      </Row>
    </div>
  );
};

export default Analysis;

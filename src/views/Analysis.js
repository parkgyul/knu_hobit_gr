import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Options from "../components/dashboard/options.js";


const Analysis = () => {
  return (
    <div>
      {/***Top Cards***/}

      {/***Sales & Feed***/}
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <SalesChart />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Options />
        </Col>
      </Row>
    </div>
  );
};

export default Analysis;

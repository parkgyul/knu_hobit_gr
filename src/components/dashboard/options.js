import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";
import '../../App.css';
import Checkbox from "./Checkbox.js";

const OPERATION = [
  { value: "all", name: "전체" },
	{ value: "O", name: "운행 중" },
	{ value: "X", name: "정지" },
];
const LOAD = [
  { value: "all", name: "전체" },
	{ value: "O", name: "상차" },
	{ value: "X", name: "하차" },
];
const SelectBox = (props) => {
	return (
		<select style={{ width: '180px'}}>
			{props.options.map((option) => (
				<option
					value={option.value}
					defaultValue={props.defaultValue === option.value}
				>
					{option.name}
				</option>
			))}
		</select>
	);
};

const FeedData = [
  {
    title: "Cras justo odio",
    icon: "bi bi-bell",
    color: "primary",
    date: "6 minute ago",
  },

  {
    title: "New user registered.",
    icon: "bi bi-person",
    color: "info",
    date: "6 minute ago",
  },
  {
    title: "Cras justo odio",
    icon: "bi bi-bell",
    color: "dark",
    date: "6 minute ago",
  },
];


const Feeds = () => {
  const LoadContext = React.createContext();
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5" className="font-weight-bold">Opitions</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          트랜스포터/상하차/운행
        </CardSubtitle>
        <hr style={{borderTop: '3px solid #B9B8B8'}} />
        <ListGroup flush className="mt-4">
        <CardTitle tag="h5">
        트랜스포터 선택:
        <div style={{ marginBottom: '20px' }} />

        <Checkbox value="red">id : 0000</Checkbox>
        <Checkbox value="yellow">id : 0001</Checkbox>
        <Checkbox value="green">id : 0010</Checkbox>
        <Checkbox value="blue">id : 0100</Checkbox>

          
          <hr style={{borderTop: '3px solid #B9B8B8'}} />
          <div style={{ marginBottom: '20px' }} />
          상/하차:   <SelectBox options={LOAD} defaultValue="all" />
          <div style={{ marginBottom: '15px' }} />
          <hr style={{borderTop: '3px solid #B9B8B8'}} />
          <div style={{ marginBottom: '15px' }} />
          운행 여부:   <SelectBox options={OPERATION} defaultValue="all" />
          <div style={{ marginBottom: '20px' }} />

          </CardTitle>
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default Feeds;

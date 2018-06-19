import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Table, Divider, Icon } from 'antd';
import { observer } from 'mobx-react';
import store from '../store/state';

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a href="javascript:;">{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;">Action 一 {record.name}</a>
        <Divider type="vertical" />
        <a href="javascript:;">Delete</a>
        <Divider type="vertical" />
        <a href="javascript:;" className="ant-dropdown-link">
          More actions <Icon type="down" />
        </a>
      </span>
    ),
  },
];
class Requests extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.startDate = new Date();
  }
  componentDidMount() {
    // setInterval(() => {
    //   this.setState({
    //     count: this.state.count + 1,
    //   });
    // }, 5000);
  }

  render() {
    return (
      <Row>
        <Table columns={columns} dataSource={data} />
      </Row>
    );
  }
}
export default withRouter(observer(Requests));

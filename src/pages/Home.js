import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Divider } from 'antd';
import { observer } from 'mobx-react';
import store from '../store/state';
import CountCard from '../components/CountCard';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        count: this.state.count + 1,
      });
    }, 5000);
  }
  render() {
    return (
      <Row>
        <Row>
          <Col span={6}>
            <CountCard title="Total Requests" value={store.requests.length} />
          </Col>
          <Col span={6}>
            <CountCard title="Request Pending" value={store.pending.length} />
          </Col>{' '}
          <Col span={6}>
            <CountCard
              title="Request Completed"
              value={store.resloved.length}
            />
          </Col>
        </Row>
        <Divider />
      </Row>
    );
  }
}
export default withRouter(observer(Home));

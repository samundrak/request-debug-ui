import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Divider } from 'antd';
import { observer } from 'mobx-react';
import Timeline from '../components/Timeline';
import store from '../store/state';
import CountCard from '../components/CountCard';

class Home extends React.Component {
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
  normalizeData() {
    return store.requests.map(({ _id, request, response }) => ({
      id: _id,
      content: request.data.uri || 'content',
      start: new Date(request.created_at),
      end: response ? new Date(response.created_at) : null,
    }));
  }
  render() {
    return (
      <Row>
        <Row>
          <Col span={6} style={{ marginLeft: '10px' }}>
            <CountCard title="Total Requests" value={store.requests.length} />
          </Col>
          <Col span={6} style={{ marginLeft: '10px' }}>
            <CountCard title="Request Pending" value={store.pending.length} />
          </Col>{' '}
          <Col span={6} style={{ marginLeft: '10px' }}>
            <CountCard
              title="Request Completed"
              value={store.resloved.length}
            />
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={24}>
            <p>Timeline</p>
            <Timeline startDate={this.startDate} data={this.normalizeData()} />
          </Col>
        </Row>
      </Row>
    );
  }
}
export default withRouter(observer(Home));

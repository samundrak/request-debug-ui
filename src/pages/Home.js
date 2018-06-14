import React from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row, Col, Divider } from 'antd';
import { observer } from 'mobx-react';
import store from '../store/state';

const cardCss = {
  fontWeight: 'bold',
  fontSize: '70px',
  position: 'relative',
  top: '37%',
  left: '40%',
  transform: 'translateX(-50%) translateY(-50%)',
};
class Home extends React.Component {
  render() {
    return (
      <Row>
        <Row>
          <Col span={6}>
            <Card title="Total Requests" style={{ width: 300 }}>
              <span
                style={{
                  ...cardCss,
                }}
              >
                {store.requests.length}
              </span>
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Request Pending" style={{ width: 300 }}>
              <span
                style={{
                  ...cardCss,
                }}
              >
                {store.pending.length}
              </span>
            </Card>
          </Col>{' '}
          <Col span={6}>
            <Card title="Request Completed" style={{ width: 300 }}>
              <span
                style={{
                  ...cardCss,
                }}
              >
                {store.resloved.length}
              </span>
            </Card>
          </Col>
        </Row>
        <Divider />
      </Row>
    );
  }
}
export default withRouter(observer(Home));

import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { observer } from 'mobx-react';
import { Switch, Link, Route } from 'react-router-dom';
import './App.css';
import Socket from './Socket';
import store from './store/state';

import Home from './pages/Home';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

window.store = store;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.socket = new Socket(store);
    this.socket.listen();
  }
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  increment = () => {};
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }} />
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Switch>
                <Route exact path="/" component={Home} store={store} />
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default observer(App);

import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link, withRouter } from 'react-router-dom';

import './../../nav.css';
const { Header } = Layout;
const CustomerAuthComponent = props => {
  return (
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        style={{ lineHeight: '64px' }}
        onClick={e => props.handleClick(e)}
        selectedKeys={[props.selectedKeys]}
        mode="horizontal"
        align="right"
      >
        <Menu.Item key="view">
          <Link to="/customer/viewticket">
            <Icon type="folder-open" />
            View Ticket
          </Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/customer/ticket">
            <Icon type="folder-add" />
            Create Ticket
          </Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <Link to="/" onClick={() => props.logOut()}>
            <Icon type="logout" />
            Sign Out
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};
export class NavbarCustomer extends Component {
  state = {
    current: 'view',
  };

  logOut = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('role');
    this.props.history.push(`/`);
    window.location.reload(true);
    
  };

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };
  render() {
    return (
      <div>
        <CustomerAuthComponent
          handleClick={this.handleClick}
          logOut={this.logOut}
          selectedKeys={this.state.current}
        />
      </div>
    );
  }
}

export default withRouter(NavbarCustomer);

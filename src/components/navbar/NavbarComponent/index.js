import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './../../nav.css';
const { Header } = Layout;
const NavbarAuthComponent = props => {
  return (
    <Header className="header">
      <div className="logo" >

      </div>
      <Menu
        theme="dark"
        style={{ lineHeight: '64px' }}
        onClick={e => props.handleClick(e)}
        selectedKeys={[props.selectedKeys]}
        mode="horizontal"
        align="right"
      >
        <Menu.Item key="login">
          <Link to="/">
            <Icon type="login" />
            Login
          </Link>
        </Menu.Item>

        <Menu.Item key="app">
          <Link to="/customer/signup">
            <Icon type="user-add" />
             Register
          </Link>
        </Menu.Item>

      </Menu>
    </Header>
  );
};

export class NavbarComponent extends Component {
  state = {
    current: 'login',
  };

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };
  render() {
    return (
      <div>
        <NavbarAuthComponent
          handleClick={this.handleClick}
          logOut={this.logOut}
          selectedKeys={this.state.current}
        />
      </div>
    );
  }
}

export default withRouter(NavbarComponent);

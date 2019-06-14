import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './../../nav.css';
const { Header } = Layout;
const NavbarAuthComponent = props => {
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
export class NavbarUser extends Component {
  state = {
    current: 'home',
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
        <NavbarAuthComponent
          handleClick={this.handleClick}
          logOut={this.logOut}
          selectedKeys={this.state.current}
        />
      </div>
    );
  }
}

export default NavbarUser;

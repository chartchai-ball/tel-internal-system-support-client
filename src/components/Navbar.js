import React from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './nav.css';
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
            SignOut
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

const NavbarComponent = props => {
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
        <Menu.Item key="mails">
          <Link to="/">
            <Icon type="login" />
            Login
          </Link>
        </Menu.Item>

        <Menu.Item key="app">
          <Link to="/customer/signup">
            <Icon type="user-add" />
            Customer Register
          </Link>
        </Menu.Item>

        <Menu.Item key="apps">
          <Link to="/user/signup">
            <Icon type="user-add" />
            User Register
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

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
        <Menu.Item key="pro">
          <Link to="/customer/viewticket">
            <Icon type="user-add" />
            View Ticket
          </Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/customer/ticket">
            <Icon type="user-add" />
            ticket
          </Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <Link to="/" onClick={() => props.logOut()}>
            <Icon type="logout" />
            SignOut
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

class Navbar extends React.Component {
  state = {
    current: 'home',
  };

  logOut = () => {
    window.localStorage.removeItem('token');
    this.props.history.push(`/`);
  };

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };

  render() {
    const token = localStorage.getItem('token');


     
    if (!token) {
      return (
        <NavbarComponent
          handleClick={this.handleClick}
          selectedKeys={this.state.current}
        />
      );
    }
    if (token) {
      const decoded = jwt_decode(token);
      if (decoded.role) {
        return (
          <NavbarAuthComponent
            handleClick={this.handleClick}
            logOut={this.logOut}
            selectedKeys={this.state.current}
          />
        );
      }
      return (
        <CustomerAuthComponent
          handleClick={this.handleClick}
          logOut={this.logOut}
          selectedKeys={this.state.current}
        />
      );
    }
  }
}

export default withRouter(Navbar);

import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
const { Sider } = Layout;

const SidebarSuperAdmin = () => {
  return (
    <Sider width={300} style={{ background: '#fff', height: '100hv' }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1">
          <Link to="/user/approve">
            <Icon type="user" />

            <span>User Approve</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="2">
          <Link to="/user/ticketsystem">
            <Icon type="folder-open" />
            <span>Ticket System</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="4">
          <Link to="/user/problem">
            <Icon type="folder-add" />
            <span>Create New Subject</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/user/company">
           <Icon type="bank" />
            <span>Create New Company</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
const SidebarAdmin = () => {
  return (
    <Sider width={300} style={{ background: '#fff', height: '100hv' }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="2">
          <Link to="/user/ticketsystem">
            <Icon type="folder-open" />
            <span>Ticket</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
export class Sidebar extends Component {
  render() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    if (token) {
      const decode = jwt_decode(token);
      if (decode.role === 'superadmin' || decode.role === 'developer') {
        return <SidebarSuperAdmin />;
      } else if (decode.role === 'admin') {
        return <SidebarAdmin />;
      }
      return null;
    }
  }
}

export default Sidebar;

import React, { Component } from 'react';
import { baseHttp } from '../../../config/baseHttp';
import axios from 'axios';
import { Table, DatePicker, Input, Menu, Icon, Button, Dropdown } from 'antd';
import { updateRole } from '../../../function/UserFunctions';

import Highlighter from 'react-highlight-words';

const { Column } = Table;
const Search = Input.Search;
const { RangePicker } = DatePicker;
export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], searchText: '' };
  }

  async componentDidMount() {
    const jwtToken = localStorage.getItem('token');

    const resp = await axios.get(`${baseHttp}/users/list/`, {
      headers: { Authorization: `${jwtToken}` },
    });
    const sortdata = resp.data.data.data.sort((val, key) => val.id - key.id);
    this.setState({ users: sortdata });

    {
      if (!jwtToken) {
        this.props.history.push(`/user/signin`);
      }
    }
  }

  handleMenuClick = (e, record) => {
    if (e.key === '1') {
      this.state.users.roles = 'admin';
    }
    if (e.key === '2') {
      this.state.users.roles = 'superadmin';
    }
    const roles = {
      roles: this.state.users.roles,
      id: record.id,
    };

    console.log('ลองเด้อ', roles);
    updateRole(roles).then(res => {
      
    });
    console.log('Received values of form: ', record);
  };

  _renderMenu = record => {
    return (
      <Menu onClick={key => this.handleMenuClick(key, record)}>
        <Menu.Item key="1">
          <a>Admin</a>
        </Menu.Item>
        <Menu.Item key="2">
          <a>Super admin</a>
        </Menu.Item>
      </Menu>
    );
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: '10%',
        ...this.getColumnSearchProps('id'),
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
        width: '20%',
        ...this.getColumnSearchProps('email'),
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        width: '20%',
        ...this.getColumnSearchProps('phone'),
      },
      {
        title: 'Role',
        dataIndex: 'roles',
        key: 'roles',
        ...this.getColumnSearchProps('address'),
      },
      {
        title: 'Action',
        render: (text, record) => (
          <span>
            <Dropdown overlay={this._renderMenu(record)}>
              <a className="ant-dropdown-link">
                Change Status
                <Icon type="down" />
              </a>
            </Dropdown>
          </span>
        ),
      },
    ];

    return (
      <div>
        <div className="container">
          <h1> Users Approve</h1>
        </div>
        <Table columns={columns} dataSource={this.state.users} />;
      </div>
    );
  }
}

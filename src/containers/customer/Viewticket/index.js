import React from 'react';
import {
  Tag,
  Table,
  Card,
  List,
  Avatar,
  Skeleton,
  Button,
  Menu,
  Col,
  Input,
  Icon,
  Dropdown,
  Row,
} from 'antd';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import axios from 'axios';
import { baseHttp, localbase } from '../../../config/baseHttp';
import Highlighter from 'react-highlight-words';
import ModalButton from './modal';
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
class Viewticket extends React.Component {
  state = {
    searchText: '',
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  };
  async componentDidMount() {
    const jwtToken = localStorage.getItem('token');
 
    const decoded = jwt_decode(jwtToken);

    const resp = await axios.get(`${baseHttp}/ticket/list/`, {
      headers: { Authorization: `${jwtToken}` },
    });
    const mapDate = resp.data.data.data.map(val => ({
      ...val,
      createdAt: moment(val.createdAt).format('LLLL'),
    }));
    this.setState({ users: mapDate });
    
  }
  Addticket() {
    window.location.href = 'http://localhost:3000/customer/ticket';
  }
  nextPage = async item => {
 
    const jwtToken = localStorage.getItem('token');
    const imgs = await axios.get(`${baseHttp}/ticket/view/${item.ticketId}`, {
      headers: { Authorization: `${jwtToken}` },
    });


    this.setState({ image: imgs.data.data.data });

    this.setState({ dataTicket: item });

    this.props.history.push({
      pathname: `/customer/ticketdetail`,
      state: { datas: this.state.dataTicket },
    });

   
  };

  viewMenu = item => {
    return <Menu onClick={item => this.handleMenuClick(item)} />;
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
    const arrayData = this.state.users;
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'Ticket ID',
        dataIndex: 'ticketId',
        key: 'ticketId',
      },
      {
        title: 'Company',
        dataIndex: 'company',
        key: 'company',
      },
      {
        title: 'Subject',
        dataIndex: 'subject',
        key: 'subject',
      },

      {
        title: 'Priority',
        dataIndex: 'priority',
        key: 'priority',
        render: priority => (
          <span>
            {[priority].map(tag => {
              let color = priority.length > 5 ? '#108ee9' : '#87d068';
              if (priority === 'high') {
                color = '#f50';
              }
              return (
                <Tag color={color} key={priority}>
                  {priority}
                </Tag>
              );
            })}
          </span>
        ),
        filters: [
          { text: 'high', value: 'high' },
          { text: 'normal', value: 'normal' },
          { text: 'low', value: 'low' },
        ],
        filteredValue: filteredInfo.priority || null,
        onFilter: (value, record) => record.priority.includes(value),
        sorter: (a, b) => a.priority.length - b.priority.length,
        sortOrder: sortedInfo.columnKey === 'priority' && sortedInfo.order,
      },
      {
        title: 'Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: status => (
          <span>
            {[status].map(tag => {
              let color = status.length > 8 ? '#108ee9' : '#f50';
              if (status === 'done') {
                color = '#87d068';
              }
              return (
                <Tag color={color} key={status}>
                  {status}
                </Tag>
              );
            })}
          </span>
        ),
        filters: [
          { text: 'pending', value: 'pending' },
          { text: 'inprogress', value: 'inprogress' },
          { text: 'done', value: 'done' },
        ],
        filteredValue: filteredInfo.status || null,
        onFilter: (value, record) => record.status.includes(value),
        sorter: (a, b) => a.status.length - b.status.length,
        sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
      },

      {
        title: 'View',
        render: (text, record) => (
          <span>
            <a
              className="ant-dropdown-link"
              overlay={this.viewMenu(record)}
              onClick={this.nextPage.bind(null, record)}
            >
              View
            </a>
          </span>
        ),
      },
    ];

    return (
      <div>
        <Row>
          <h1>
            Your Problem&Question{' '}
            {/* <Button type="danger" ghost onClick={this.Addticket}>
            Add ticket
          </Button> */}
            <ModalButton />
          </h1>
        </Row>
        <div>
          <Table
            columns={columns}
            dataSource={arrayData}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
export default Viewticket;

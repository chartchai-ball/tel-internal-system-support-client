import React, { Component } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import { baseHttp } from '../../../config/baseHttp';
import axios from 'axios';
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {form => {
              this.form = form;
              return editing ? (
                <FormItem style={{ margin: 0 }}>
                  {form.getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `${title} is required.`,
                      },
                    ],
                    initialValue: record[dataIndex],
                  })(
                    <Input
                      ref={node => (this.input = node)}
                      onPressEnter={this.save}
                      onBlur={this.save}
                    />
                  )}
                </FormItem>
              ) : (
                <div
                  className="editable-cell-value-wrap"
                  style={{ paddingRight: 24 }}
                  onClick={this.toggleEdit}
                >
                  {restProps.children}
                </div>
              );
            }}
          </EditableContext.Consumer>
        ) : (
          restProps.children
        )}
      </td>
    );
  }
}

export default class EditableTable extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Company',
        dataIndex: 'company',
        width: '50%',
        editable: true,
      },

      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => this.handleDelete(record)}
            >
              <a href="javascript:;">Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [],
      count: 2,
    };
  }
  async componentDidMount() {
    const jwtToken = localStorage.getItem('token');
  
    const resp = await axios.get(`${baseHttp}/company/list/`, {
      headers: { Authorization: `${jwtToken}` },
      
    });
    console.log('company',resp)
    const sortdata = resp.data.data.data.sort((val, key) => val.id - key.id);
    this.setState({ dataSource: sortdata });
   
  }
  handleDelete = record => {
    const jwtToken = localStorage.getItem('token');
    axios.delete(`${baseHttp}/company/delete/${record.id}`, {
      headers: { Authorization: `${jwtToken}` },
    });
    window.location.reload(true);

  };

  // handleAdd = () => {
  //   const { count, dataSource } = this.state;
  //   const newData = {
  //     key: count,
  //     name: `Edward King ${count}`,
  //     age: 32,
  //     address: `London, Park Lane no. ${count}`,
  //   };
  //   this.setState({
  //     dataSource: [...dataSource, newData],
  //     count: count + 1,
  //   });
  // };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
    const jwtToken = localStorage.getItem('token');
    axios.put(
      `${baseHttp}/company/update/${row.id}`,
      {
        company: row.company,
      },
      {
        headers: { Authorization: `${jwtToken}` },
      }
    );
   
  };

  render() {
   
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

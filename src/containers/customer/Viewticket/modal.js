import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Select, Upload, Icon } from 'antd';
import { ticketCustomer } from '../../../function/CustomerFunction';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { baseHttp } from '../../../config/baseHttp';
const { Option } = Select;
const FormItem = Form.Item;
const { TextArea } = Input;
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    constructor() {
      super();
      this.state = {
        customerId: '',
        company: '',
        name: '',
        email: '',
        subject: '',
        message: '',
        priority: '',

        file: '',
        fileList: [],
        uploading: false,
      };
      this.onChange = this.onChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
      const jwtToken = localStorage.getItem('token');
   
      const resp = await axios.get(`${baseHttp}/ticket/list/subject`, {
        headers: { Authorization: `${jwtToken}` },
      });
      const sortdata = resp.data.data.data.sort((val, key) => val.id - key.id);
      this.setState({ subject: sortdata });
    }

    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const jwtToken = localStorage.getItem('token');
          const decoded = jwt_decode(jwtToken);

          const ticket = {
            subject: values.subject,
            message: this.state.message,
            priority: values.priority,
            fileList: this.state.fileList,
          };
   
          ticketCustomer(ticket).then(res => {
        
            window.location.reload();
       
          });
 
        }
      });
    };
    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }

    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = this.props.form;
      const subb = this.state.subject;
      const newArray = Object.values(subb);
      const mapData = newArray.map(val => {
        return <Option value={val.subject}>{val.subject}</Option>;
      });

      const formItemLayout = {
        labelCol: {
          xs: { span: 20 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };

      const { uploading, fileList } = this.state;
      const props = {
        multiple: true,
        onRemove: file => {
          this.setState(state => {
            const index = state.fileList.indexOf(file);
            const newFileList = state.fileList.slice();
            newFileList.splice(index, 1);
            return {
              fileList: newFileList,
            };
          });
        },
        beforeUpload: file => {
          this.setState(state => ({
            fileList: [...state.fileList, file],
          }));
          return false;
        },
        fileList,
      };
      return (
        <Modal
          visible={visible}
          title="Create a new Ticket"
          okText="Create"
          onCancel={onCancel}
          onOk={this.handleSubmit}
          width={700}
        >
          <Form layout="vertical">
            <Form.Item {...formItemLayout} label="Subject">
              {getFieldDecorator('subject', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your subject!',
                  },
                ],
              })(
                <Select
                  defaultValue="select"
                  style={{ width: '100%' }}
                  placeholder="input your subject"
                >
                  {mapData}
                  
                </Select>
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Message">
              {getFieldDecorator('Message', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your message!',
                  },
                ],
              })(
                <TextArea
                  rows={4}
                  type="text"
                  className="form-control"
                  name="message"
                  placeholder="Enter Message"
                  value={this.state.message}
                  onChange={this.onChange}
                />
              )}
            </Form.Item>

            <Form.Item {...formItemLayout} label="Priority">
              {getFieldDecorator('priority', {
                rules: [
                  {
                    required: true,
                    message: 'Please select your priority!',
                  },
                ],
              })(
                <Select
                  defaultValue="normal"
                  style={{ width: '100%' }}
                  placeholder="Normal"
                >
                 <Option value="high">High</Option>
                <Option value="normal">Normal</Option>
                 <Option value="low">Low</Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="Upload picture or file"
              style={{ paddingLeft: 95 }}
            >
              <Upload {...props}>
                <Button>
                  <Icon type="upload " /> Select File
                </Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class modal extends React.Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

   
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="danger" onClick={this.showModal}>
          Create new ticket
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleSubmit}
        />
      </div>
    );
  }
}

export default modal;

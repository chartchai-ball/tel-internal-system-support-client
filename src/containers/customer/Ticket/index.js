import { Form, Input, Button, Card, Upload, message, Icon, Select } from 'antd';
import React from 'react';
import { ticketCustomer } from '../../../function/CustomerFunction';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { baseHttp, localbase } from '../../../config/baseHttp';
const { Option } = Select;
const FormItem = Form.Item;
const { TextArea } = Input;
export class Ticket extends React.Component {
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
          this.props.history.push(`/customer/viewticket`);
        });
      }
    });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
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
      <div
        style={{
          display: 'flex',
          paddingTop: 30,
        }}
      >
        <Card style={{ width: 800, margin: 'auto' }}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              <h1 style={{ textAlign: 'center' }}>Ticket System</h1>
            </FormItem>

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
                  placeholder="Enter Subject"

                >
                  <Option value="Bug">Bug</Option>
                  <Option value="Error">Error</Option>
                  <Option value="Suggestion">Suggestion</Option>
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
                  <Option value="normal">Normal</Option>
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
            <FormItem style={{ textAlign: 'center' }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={uploading}
                style={{ marginTop: 16 }}
              >
                {uploading ? 'Uploading' : 'Submit'}
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(Ticket);

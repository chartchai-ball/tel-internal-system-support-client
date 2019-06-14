import {
  Form,
  Input,
  Button,
  Card,
  Upload,
  message,
  Icon,
  Select,
  Row,
  Col,
} from 'antd';
import React from 'react';
import { ticketCustomer } from '../../../function/CustomerFunction';
import reqwest from 'reqwest';
import jwt_decode from 'jwt-decode';
const { Option } = Select;
const FormItem = Form.Item;
const { TextArea } = Input;
export class UploadTicket extends React.Component {
  constructor() {
    super();
    this.state = {
      company: '',
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: '',
      department: '',
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
          company: this.state.company,
          name: decoded.name,
          email: decoded.email,
          subject: this.state.subject,
          message: this.state.message,
          priority: values.priority,
          department: values.department,
          fileList: this.state.fileList,
        };

        ticketCustomer(ticket).then(res => {
          this.props.history.push(`/customer/ticket`);
        });
        
      }
    });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    //
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
              <h1 style={{ textAlign: 'center' }}>Upload Ticket file</h1>
            </FormItem>

            <Form.Item
              {...formItemLayout}
              label="Upload file as csv"
              style={{ paddingLeft: 95 }}
            >
              <Upload {...props}>
                <Button style={{ width: 300 }}>
                  <Icon type="upload" /> Select File
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

export default Form.create()(UploadTicket);

import React, { Component } from 'react';
import {
  Icon,
  Card,
  Input,
  Button,
  List,
  Avatar,
  Col,
  Form,
  Comment,
  Tooltip,
  Upload,
  Row,
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import { commenttttt } from '../../../function/UserFunctions';
import jwtdecode from 'jwt-decode';
const { TextArea } = Input;
export class TicketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: [],
      photoIndex: 0,
      isOpen: false,
      comments: [],
      submitting: false,
      value: '',
      file: '',
      fileList: [],
      uploading: false,
      comment: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const imgs = await axios.get(
      `http://localhost:8080/v1/ticket/list/${
        this.props.location.state.datas.id
      }`
    );

    this.setState({ image: imgs.data.data.data[0].assetsTickets });
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const jwtToken = localStorage.getItem('token');
        var decoded = jwtdecode(jwtToken);
        const comment = {
          comment: this.state.comment,
          ticketId: this.props.location.state.datas.id,
          userId: decoded.id,
          name: decoded.name,
          fileList: this.state.fileList,
        };
        commenttttt(comment).then(res => {});
      }
    });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { uploading, fileList } = this.state;
    const arrayData = this.state.image;
    const testqqq = Object.values(arrayData);

    const images = testqqq.map(imgs => {
      return (
        <div>
          <Col span={8}>
            <img
              style={{
                width: 300,
                height: 300,
                paddingTop: 20,
              }}
              alt="example"
              src={`http://localhost:8080/${imgs.name}`}
            />
          </Col>
        </div>
      );
    });

    const upload = {
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
      <div>
        <Card style={{ width: 1000, margin: 'auto' }}>
          <Col span={12}>
            <h1>Subject: {this.props.location.state.datas.subject}</h1>
          </Col>

          <h3 style={{ textAlign: 'center' }}>
            Status: {this.props.location.state.datas.status}
          </h3>
          <Col span={24}>
            <h3>Ticket ID: {this.props.location.state.datas.id}</h3>
          </Col>
          <h3>DateTime: {this.props.location.state.datas.createdAt}</h3>
          <h3>Priority: {this.props.location.state.datas.priority}</h3>
          <h3>Department: {this.props.location.state.datas.department}</h3>
          <h3>
            Company/Organization: {this.props.location.state.datas.company}
          </h3>
          <h3>Sender: {this.props.location.state.datas.email}</h3>

          <h3 style={{ paddingTop: 10 }}>Message</h3>
          <p style={{ paddingLeft: 50 }}>
            {this.props.location.state.datas.message}
          </p>

          <div>
            <h3 style={{ paddingTop: 20, margin: 'auto' }}>Picture and File</h3>
            {images}
          </div>
        </Card>
        {/* ทำคอมเม้นตรงนี้ */}
        <Card style={{ width: 1000, margin: 'auto' }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="Comment">
              {getFieldDecorator('comment', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your comment!',
                  },
                ],
              })(
                <TextArea
                  rows={4}
                  type="text"
                  className="form-control"
                  name="comment"
                  placeholder="Enter your comment"
                  value={this.state.comment}
                  onChange={this.onChange}
                />
              )}
            </Form.Item>
            <Form.Item label="Upload picture or file">
              <Upload {...upload}>
                <Button>
                  <Icon type="upload" /> Select File
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {uploading ? 'Uploading' : 'Submit'}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(TicketDetail);

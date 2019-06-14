import React, { Component } from 'react';
import { Icon, Card, Button, List, Col, Form, Upload, Row, Input } from 'antd';
import jwtdecode from 'jwt-decode';
import commentt from '../../function/ComponentFunction.js';
const { TextArea } = Input;
export class index extends Component {
  constructor() {
    this.state = {
      comments: [],
      submitting: false,
      value: '',
      file: '',
      fileList: [],
      uploading: false,
      comment: '',
      name: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log('----value----', this.state, values);
      if (!err) {
        const jwtToken = localStorage.getItem('token');
        var decoded = jwtdecode(jwtToken);
        console.log('ดีโค้ด', decoded.id, decoded);
        const comment = {
          comment: this.state.comment,
          ticketId: this.props.location.state.datas.ticketId,
          fileList: this.state.fileList,
        };
        console.log('trycomment', comment);
        commentt(comment).then(res => {
          window.location.reload(true);
        });
        console.log('Received values of form: ', values, comment);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { uploading, fileList } = this.state;
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
    const DescriptionItem = ({ title, content }) => (
      <div
        style={{
          fontSize: 16,
          lineHeight: '22px',
          marginBottom: 7,
          color: 'rgba(0,0,0,0.65)',
        }}
      >
        <p
          style={{
            marginRight: 12,
            display: 'inline-block',
            color: 'rgba(0,0,0,0.85)',
          }}
        >
          {title}:
        </p>
        {content}
      </div>
    );

    return (
      <div>
        <div className="classpadding">
          <Card>
            <Row style={{ paddingTop: 10 }}>
              <Col span={24}>
                <DescriptionItem title="Comment" />{' '}
              </Col>
            </Row>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 10,
              }}
              dataSource={this.state.comments}
              renderItem={item => (
                <List.Item key={item.message}>
                  <List.Item.Meta
                    title={<a href={item.href}>{item.name}</a>}
                    description={item.createdAt}
                  />
                  {item.comment}
                </List.Item>
              )}
            />
          </Card>
        </div>

        <div style={{ paddingTop: 60 }}>
          <Card style={{ width: '100%', margin: 'auto' }}>
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
      </div>
    );
  }
}

export default index;

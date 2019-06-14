import React, { Component } from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import {
  Icon,
  Dropdown,
  Card,
  Input,
  Button,
  List,
  Col,
  Form,
  Upload,
  Row,
  Tag,
  Tabs,
  PageHeader,
  Menu,
} from 'antd';
import axios from 'axios';
import moment from 'moment';
import { commenttttt, updateStatus } from '../../../function/UserFunctions';
import jwtdecode from 'jwt-decode';
import { baseHttp, localbase } from '../../../config/baseHttp';
import './ticket.css';
import { Comment } from '../../../components/comment';
const { TextArea } = Input;
const TabPane = Tabs.TabPane;

export class TicketDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: [],
      currentImage: 0,
      comments: [],
      submitting: false,
      value: '',
      file: '',
      fileList: [],
      uploading: false,
      comment: '',
      name: '',
      closingname: [],
      carername: [],
    };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  async componentDidMount() {
    console.log('this.propeffeefeeffe ::', this.props.location.state.datas);
    const jwtToken = localStorage.getItem('token');
    const imgs = await axios.get(
      `${baseHttp}/ticket/view/${this.props.location.state.datas.ticketId}`,
      {
        headers: { Authorization: `${jwtToken}` },
      }
    );

    this.setState({ image: imgs.data.data.data.getAssetsTicket.assetsTickets });

    this.setState({ closingname: imgs.data.data.data.findClosing.name });
    this.setState({ carername: imgs.data.data.data.findCarer.name });
    const com = await axios.get(
      `${baseHttp}/post/list/${this.props.location.state.datas.ticketId}`,
      {
        headers: { Authorization: `${jwtToken}` },
      }
    );

    const mapDate = com.data.data.data.map(val => ({
      ...val,
      createdAt: moment(val.createdAt).format('LLLL'),
    }));
    const sortdata = mapDate.sort((val, key) => val.id - key.id);
    this.setState({ comments: sortdata });
   this.setState({ status : this.props.location.state.datas.status})
   console.log('status',this.state.status)
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
        commenttttt(comment).then(res => {
          window.location.reload(true);
        });
        console.log('Received values of form: ', values, comment);
      }
    });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleMenuClick = e => {
    if (e.key === '1') {
      this.props.location.state.datas.status = 'inprogress';
    }
    if (e.key === '2') {
      this.props.location.state.datas.status = 'done';
    }
    const statuss = {
      status: this.props.location.state.datas.status,
      id: this.props.location.state.datas.ticketId,
    };

    updateStatus(statuss).then(res => {
      window.history.back();
    });
    console.log('Received values of form: ', statuss);
  };

  _renderMenu = record => {
    return (
      <Menu onClick={key => this.handleMenuClick(key)}>
        <Menu.Item key="1">
          <a>inprogress</a>
        </Menu.Item>
        <Menu.Item key="2">
          <a>done</a>
        </Menu.Item>
      </Menu>
    );
  };

_renderStatus = () =>{
  const status = this.state.status;
 
  if (this.props.location.state.datas.status ==='done') {
    return <Tag color="#87d068"> {this.props.location.state.datas.status}</Tag> 
  }else if(this.props.location.state.datas.status==='inprogress') {
    return <Tag color="#108ee9"> {this.props.location.state.datas.status}</Tag> 
  }else if(this.props.location.state.datas.status==='pennding'){return <Tag color="#f50"> {this.props.location.state.datas.status}</Tag> }
}
_renderPriority = () =>{
  const status = this.state.status;
 
  if (this.props.location.state.datas.priority ==='low') {
    return <Tag color="#87d068"> {this.props.location.state.datas.priority}</Tag> 
  }else if(this.props.location.state.datas.priority==='normal') {
    return <Tag color="#108ee9"> {this.props.location.state.datas.priority}</Tag> 
  }else if(this.props.location.state.datas.priority==='high'){return <Tag color="#f50"> {this.props.location.state.datas.priority}</Tag> }
}


  render() {
    const { getFieldDecorator } = this.props.form;
    const { uploading, fileList } = this.state;
    const arrayData = this.state.image;
    const testqqq = Object.values(arrayData);




    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
    //ลูปรูป
    const photos = testqqq.map(imgs => ({
      src: `${localbase}/${imgs.name}`,
      width: 1,
      height: 1,
    }));

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

    const Description = ({ term, children, span = 12 }) => (
      <Col span={span}>
        <div className="description">
          <div className="term">{term}</div>
          <div className="detail">{children}</div>
        </div>
      </Col>
    );

    const content = (
      <Row>
        <Description term="Ticket ID">
          {this.props.location.state.datas.ticketId}
        </Description>
        <Description term="Status">
        <Dropdown overlay={this._renderMenu()}>
          <a className="ant-dropdown-link">
            Change Status
            <Icon type="down" />
          </a>
        </Dropdown>
        </Description>
        <Description term="Status">
        {/* this.props.location.state.datas.status==='low' ? <Tag color="#87d068"> {this.props.location.state.datas.status}</Tag> 
    : (this.props.location.state.datas.status==='normal'? { <Tag color="#87d068"> {this.props.location.state.datas.status}</Tag> }
    : (this.props.location.state.datas.status==='heigh') { <Tag color="#87d068"> {this.props.location.state.datas.status}</Tag> }} */}
 {this._renderStatus()}
        </Description>
        <Description term="Create At">
          {this.props.location.state.datas.createdAt}
        </Description>

        <Description term="Organization/Company">
          <Tag color="#87d068"> {this.props.location.state.datas.company}</Tag>
        </Description>
        <Description term="Receiver">{this.state.carername}</Description>
        <Description term="Closing">{this.state.closingname}</Description>
      </Row>
    );

    return (
      <div className="classpadding">
        <Card style={{ width: '100%', margin: 'auto' }}>
          <PageHeader
            onBack={() => window.history.back()}
            title="Subject"
            subTitle={this.props.location.state.datas.subject}
            tags={
              this._renderPriority()
            }
            footer={
              <Tabs defaultActiveKey="1">
                <TabPane tab="Message" key="1">
                  <p style={{ wordWrap: 'break-word' }}>
                    {this.props.location.state.datas.message}
                  </p>
                </TabPane>
                <TabPane tab="Pic" key="2">
                  <Gallery photos={photos} onClick={this.openLightbox} />
                  <Lightbox
                    images={photos}
                    onClose={this.closeLightbox}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    currentImage={this.state.currentImage}
                    isOpen={this.state.lightboxIsOpen}
                  />
                </TabPane>
              </Tabs>
            }
          >
            <div className="wrap">
              <div className="content padding">{content}</div>
            </div>
          </PageHeader>
          ,
        </Card>

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

        <div className="classpadding">
          <Card >
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

export default Form.create()(TicketDetail);

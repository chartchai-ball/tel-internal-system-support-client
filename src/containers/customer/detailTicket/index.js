import React from 'react';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import {
  Form,
  Card,
  List,
  Icon,
  Row,
  Upload,
  Button,
  Col,
  Input,
  Statistic,
  Tabs,
  Tag,
  PageHeader,
} from 'antd';
import jwtdecode from 'jwt-decode';
import axios from 'axios';
import moment from 'moment';
import { commentt } from '../../../function/CustomerFunction';
import { baseHttp, localbase } from './../../../config/baseHttp';
import './tic.css';
const { TextArea } = Input;
const TabPane = Tabs.TabPane;
class Viewticket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: [],
      currentImage: 0,
      isOpen: false,
      comments: [],
      submitting: false,
      value: '',
      file: '',
      fileList: [],
      uploading: false,
      comment: '',
      name: '',
      customerId: '',
      closingname: [],
      carername: [],
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
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
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const jwtToken = localStorage.getItem('token');
        var decode = jwtdecode(jwtToken);
        const comment = {
          comment: this.state.comment,
          ticketId: this.props.location.state.datas.ticketId,
          fileList: this.state.fileList,
        };
        commentt(comment).then(res => {
          window.location.reload(true);
        });
      }
    });
  };
  goBack() {
    window.history.back();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
          wordWrap: 'break-word',
        }}
      >
        <p
          style={{
            marginRight: 12,
            display: 'inline-block',
            color: 'rgba(0,0,0,0.85)',
            wordWrap: 'break-word',
          }}
        >
          {title}:
        </p>
        {content}
      </div>
    );
    //
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
          <a>{this.props.location.state.datas.status}</a>
        </Description>
        <Description term="Create At">
          {this.props.location.state.datas.createdAt}
        </Description>

        <Description term="Organization/Company">
          <Tag color="#87d068"> {this.props.location.state.datas.company}</Tag>
        </Description>
        <Description term="Create by">
          {this.props.location.state.datas.email}
        </Description>
        <Description term="Receiver">{this.state.carername}</Description>
        <Description term="Closing">{this.state.closingname}</Description>
      </Row>
    );

    return (
      <div className="divpadding">
        <Card className="cardd">
          <PageHeader
            onBack={() => window.history.back()}
            title="Subject"
            subTitle={this.props.location.state.datas.subject}
            tags={
              <Tag color="red">{this.props.location.state.datas.priority}</Tag>
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
              {/* <div className="extraContent">{extraContent}</div> */}
            </div>
          </PageHeader>
          ,
        </Card>

        <div className="divpadding">
          <Card className="cardd">
            <Row style={{ paddingTop: 10 }}>
              <Col span={24}>
                <DescriptionItem title="Comment" />{' '}
              </Col>
            </Row>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: page => {},
                pageSize: 10,
              }}
              dataSource={this.state.comments}
              renderItem={item => (
                <List.Item
                  key={item.message}
                  // extra={
                  //   <img
                  //     width={272}
                  //     alt="logo"
                  //     src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  //   />
                  // }
                >
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

        <div className="divpadding">
          <Card className="cardd">
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
export default Form.create()(Viewticket);

import axios from 'axios';
import { message } from 'antd';
import jwtdecode from 'jwt-decode';
import { baseHttp } from './../config/baseHttp';
export const commentt = ment => {
  const jwtToken = localStorage.getItem('token');
  let formData = new FormData();
  ment.fileList.forEach(file => {
    formData.append('files', file);
  });

  formData.append('ticketId', ment.ticketId);
  formData.append('comment', ment.comment);

  const config = {
    header: { 'Content-Type': 'multipart/form-data', accept: '*/*' },
  };
  return axios({
    url: `${baseHttp}/post/create`,
    method: 'post',
    processData: false,
    data: formData,
    config,
    headers: { Authorization: `${jwtToken}` },
    success: () => {
      this.setState({
        comment: '',
        ticketId: '',
        file: [],
        uploading: false,
      });

      message.success('upload successfully.');
    },
    error: () => {
      this.setState({
        uploading: false,
      });
      message.error('upload failed.', this.state);
    },
  });
};

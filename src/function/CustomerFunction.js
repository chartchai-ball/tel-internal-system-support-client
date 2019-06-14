//สมัคร
//เอาไว้เก็บฟัคชั่นต่างๆเช่น เซิซ
//เก็บlocalhostในตัวแปร

import axios from 'axios';
import { message } from 'antd';
import { baseHttp } from './../config/baseHttp';
export const registerCustomer = newCustomer => {
  return axios
    .post(`${baseHttp}/customer/register`, {
      name: newCustomer.name,
      email: newCustomer.email,
      password: newCustomer.password,
      phone: newCustomer.phone,
      company: newCustomer.company,
      username: newCustomer.username,
    })
    .then(res => {

    });
};
//ล็อคอิน
export const loginCustomer = customer => {
  return axios
    .post(`${baseHttp}/login`, {
      username: customer.email,
      password: customer.password,
    })
    .then(res => {
      const {
        data: { token, role },
      } = res.data.data;

      if (!token) {
        message.error('Wrong Username or Password');
        window.localStorage.removeItem('token');
        this.props.history.push();
      }
 
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      return token;
    })

    .catch(err => {

    });
};
//ticket

export const ticketCustomer = newTicket => {
  let formData = new FormData();
  newTicket.fileList.forEach(file => {
    formData.append('files', file);
  });

  formData.append('company', newTicket.company);

  formData.append('subject', newTicket.subject);
  formData.append('message', newTicket.message);
  formData.append('priority', newTicket.priority);
  formData.append('department', newTicket.department);

  const config = {
    header: { 'Content-Type': 'multipart/form-data', accept: '*/*' },
  };
  const jwtToken = localStorage.getItem('token');
  return axios({
    url: `${baseHttp}/ticket/create`,
    method: 'post',
    processData: false,
    data: formData,
    config,
    headers: { Authorization: `${jwtToken}` },

    success: () => {
      this.setState({
        subject: '',
        message: '',
        priority: '',
        department: '',
        file: [],
        uploading: false,
      });
    
      message.success('upload successfully.');
    },
    error: () => {
      this.setState({
        uploading: false,
      });
      message.error('upload failed.');
    },
  });
};



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

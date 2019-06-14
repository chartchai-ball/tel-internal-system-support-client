import axios from 'axios';
import { message } from 'antd';
import jwtdecode from 'jwt-decode';
import { baseHttp } from './../config/baseHttp';
export const register = newUser => {
  console.log('tryssssss', newUser);
  return axios

    .post(`${baseHttp}/users/register`, {
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      roles: newUser.roles,
      phone: newUser.phone,
      position: newUser.position,
      company: newUser.company,
    })
    .then(res => {
      console.log('Registered!', newUser.position);
    });
};

export const login = user => {
  return axios
    .post(`${baseHttp}/login`, {
      username: user.username,
      password: user.password,
    })
    .then(res => {
      const {
        data: { token, role },
      } = res.data.data;
      console.log('ressssssss', res, role);

      if (!role) {
        message.error('Wrong Username or Password');
        window.localStorage.removeItem('token');
        this.props.history.push(`/`);
      }

      if (role === 'customer') {
        window.location.href = '/customer/viewticket';
      } else if (role === 'superadmin' || role === 'developer') {
        window.location.href = '/user/approve';
      } else if (role === 'admin') {
        window.location.href = '/user/ticketsystem';
      } else if (role === 'user') {
        message.error('waiting for superadmin approve');
        window.localStorage.removeItem('token');
      }
      localStorage.setItem('token', token);

      localStorage.setItem('role', role);

      return token;
    })

    .catch(err => {
      console.log('err', err.message);
      message.error('worng username or password');
      window.localStorage.removeItem('token');
    });
};

export const updateRole = newRole => {
  const jwtToken = localStorage.getItem('token');

  var decode = jwtdecode(jwtToken);

  return axios
    .patch(
      `${baseHttp}/users/approve/${newRole.id}`,
      {
        roles: newRole.roles,
      },
      {
        headers: { Authorization: `${jwtToken}` },
      }
    )
    .then(res => {
      window.location.reload(true);
      console.log('newrolssssssssssssse', newRole.roles);
      console.log('update!');
    });
};

export const updateStatus = statuss => {
  const jwtToken = localStorage.getItem('token');
  var decode = jwtdecode(jwtToken);
  console.log('yyyyyyyyyyyyyyyyyyyyyyyyt', statuss.id, statuss.status);
  console.log('eiei');
  return axios
    .patch(
      `${baseHttp}/ticket/updatestatus/${statuss.id}`,
      {
        status: statuss.status,
      },
      {
        headers: { Authorization: `${jwtToken}` },
      }
    )
    .then(res => {
  
      console.log('newrolssssssssssssse');
      console.log('update!', res);
    });
};

export const commenttttt = ment => {
  console.log('-------------------', ment);
  const jwtToken = localStorage.getItem('token');
  let formData = new FormData();
  ment.fileList.forEach(file => {
    formData.append('files', file);
  });
  formData.append('comment', ment.comment);
  formData.append('ticketId', ment.ticketId);
  const config = {
    header: {
      'Content-Type': 'multipart/form-data',
      accept: '*/*',
    },
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
      console.log('success', this.state);
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

export const newsubject = news => {
  const jwtToken = localStorage.getItem('token');
  console.log('jwt', jwtToken);
  return axios
    .post(
      `${baseHttp}/ticket/create/subject`,
      {
        subject: [news.subject],
      },
      {
        headers: { Authorization: `${jwtToken}` },
      }
    )
    .then(res => {
      window.location.reload(true);
    })
    .catch(error => console.log('error ======', error.response.data));
};

export const newcompany = newscom => {
  const jwtToken = localStorage.getItem('token');
  console.log('jwt', newscom);
  return axios
    .post(
      `${baseHttp}/company/create`,
      {
        company: [newscom.company],
      },
      {
        headers: { Authorization: `${jwtToken}` },
      }
    )
    .then(res => {
      window.location.reload(true);
    })
    .catch(error => console.log('error ======', error.response.data));
};

import React from 'react';
import { Form, Card } from 'antd';

const FormItem = Form.Item;

class Profile extends React.Component {


  componentDidMount() {
    const jwtToken = localStorage.getItem('token');
    if (!jwtToken) {
      this.props.history.push(`/user/signin`);
    }
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        <Card style={{ width: 1000, margin: 'auto' }}>
          <FormItem>
            <h1 style={{ textAlign: 'center' }}>User Profile</h1>
          </FormItem>

          <FormItem style={{ paddingLeft: 100 }}>
            <h2>Name: </h2>
            <br />
            <h2>E-mail: </h2>
            <br />
            <h2>Tel: </h2>
            <br />
            <h2>Position: </h2>
            <br />
            <h2>Role: </h2>
            <br />
          </FormItem>
        </Card>
      </div>
    );
  }
}
export default Profile;

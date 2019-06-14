import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';
import { login } from '../../../function/UserFunctions';
const FormItem = Form.Item;

class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      password: this.state.password,
    };

    login(user).then(res => {
      if (res) {
      }
    });
  }
  render() {
    return (
      <div style={{ display: 'flex', paddingTop: 100 }}>
        <Card style={{ width: 500, margin: 'auto' }}>
          <Form onSubmit={this.onSubmit}>
            <FormItem>
              <h1 style={{ textAlign: 'center' }}>Sign In</h1>
            </FormItem>

            <FormItem>
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                name="username"
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={this.onChange}
              />
            </FormItem>
            <FormItem>
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                name="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onChange}
              />
            </FormItem>
            <FormItem>{<Checkbox>Remember me</Checkbox>}</FormItem>
            <FormItem >
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in    
              </Button>
               <a href="/user/signup"> or Register Now</a>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}
export default Signin;

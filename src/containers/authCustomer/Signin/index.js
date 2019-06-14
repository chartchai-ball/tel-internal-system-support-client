import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Card } from 'antd';

import { loginCustomer } from '../../../function/CustomerFunction';
const FormItem = Form.Item;

class SigninCustomer extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
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

    const customer = {
      email: this.state.email,
      password: this.state.password,
    };

    loginCustomer(customer).then(res => {
      if (res) {
        this.props.history.push(`/customer/viewticket`);
      }
    });
  }

  render() {
    return (
      <div style={{ display: 'flex', paddingTop: 100 }}>
        <Card style={{ width: 500, margin: 'auto' }}>
          <Form onSubmit={this.onSubmit}>
            <FormItem>
              <h1 style={{ textAlign: 'center' }}>Customer SignIn</h1>
            </FormItem>

            <FormItem>
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                name="email"
                type="text"
                placeholder="email"
                value={this.state.email}
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
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <a href="/customer/signup">register now!</a>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}
export default SigninCustomer;

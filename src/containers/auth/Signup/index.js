import React from 'react';
import { Form, Input, Button, Card, Select } from 'antd';
import { register } from '../../../function/UserFunctions';
import './signup.css';
const { Option } = Select;
const FormItem = Form.Item;

class Singup extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      username: '',
      email: '',
      password: '',
      roles: 'user',
      phone: '',

    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const user = {
          name: this.state.name,
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          roles: this.state.roles,
          phone: this.state.phone,
          company: this.state.company,
         
        };
        register(user).then(res => {
          this.props.history.push(`/`);
        });
      }
    });
  };
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '66',
    })(
      <Select style={{ width: 70 }}>
        <Option value="66">+66</Option>
      </Select>
    );

    return (
      <div style={{ display: 'flex' }}>
        <Card style={{ width: 500, margin: 'auto' }}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              <h1 style={{ textAlign: 'center' }}>SignUp</h1>
            </FormItem>
            <Form.Item {...formItemLayout} label="Fullname">
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please input Fullname!',
                  },
                ],
              })(
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter your Name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Username">
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your Username!',
                  },
                ],
              })(
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Enter your UserName"
                  value={this.state.username}
                  onChange={this.onChange}
                />
              )}
            </Form.Item>
            <Form.Item {...formItemLayout} label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Enter your E-mail"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              )}
            </Form.Item>

            <Form.Item {...formItemLayout} label="Company">
              {getFieldDecorator('company', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your Company!',
                  },
                ],
              })(
                <Input
                  type="text"
                  className="form-control"
                  name="company"
                  placeholder="Enter your Company"
                  value={this.state.company}
                  onChange={this.onChange}
                />
              )}
            </Form.Item>

            <Form.Item {...formItemLayout} label="Password">
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              )}
            </Form.Item>

            <Form.Item {...formItemLayout} label="Confirm Password">
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(
                <Input
                  type="password"
                  onBlur={this.handleConfirmBlur}
                  placeholder="Confirm Password"
                />
              )}
            </Form.Item>

            <Form.Item {...formItemLayout} label="Phone Number">
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your phone number!',
                  },
                ],
              })(
                <Input
                  addonBefore={prefixSelector}
                  style={{ width: '100%' }}
                  className="form-control"
                  name="phone"
                  placeholder="Enter your PhoneNumber"
                  value={this.state.phone}
                  onChange={this.onChange}
                />
              )}
            </Form.Item>

           
            <Form.Item className="buttons">
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}
export default Form.create()(Singup);

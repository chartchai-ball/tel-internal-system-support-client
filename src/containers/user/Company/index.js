import { Form, Input, Button, Card, Select } from 'antd';
import React from 'react';
import { newcompany } from '../../../function/UserFunctions';
import jwt_decode from 'jwt-decode';
import EditableTable from './table';
import './company.css';
const { Option } = Select;
const FormItem = Form.Item;
const { TextArea } = Input;

export class index extends React.Component {
  constructor() {
    super();
    this.state = {
      company: '',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const jwtToken = localStorage.getItem('token');
        const decoded = jwt_decode(jwtToken);

        const company = {
          company: this.state.company,
        };
console.log('company',company)
        newcompany(company).then(res => {});
      }
    });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 20 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <div className="classdiv">
        <Card className="classcard">
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              <h1 style={{ textAlign: 'center' }}>Create new Company</h1>
            </FormItem>

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
                  placeholder="Enter Company"
                  onChange={this.onChange}
                />
              )}
            </Form.Item>

            <FormItem className="formstyle">
              <Button type="primary" htmlType="submit">
                submit
              </Button>
            </FormItem>
          </Form>
          <EditableTable />
        </Card>
      </div>
    );
  }
}

export default Form.create()(index);

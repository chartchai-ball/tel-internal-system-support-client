import { Form, Input, Button, Card, Upload, message, Icon, Select } from 'antd';
import React, { Component } from 'react';

const FormItem = Form.Item;
const { TextArea } = Input;
const Dragger = Upload.Dragger;
const Option = Select.Option;

const props = {
  name: 'file',
  multiple: true,
  action: '',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
     
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
function handleChange(value) {
 
}

function handleBlur() {

}

function handleFocus() {
  
}
export class Ticket extends Component {
  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ width: 800, margin: 'auto', paddingTop: 60 }}>
          <Card style={{ width: 900 }}>
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                <h1 style={{ textAlign: 'center' }}>Ticket System</h1>
              </FormItem>
              <Form.Item label="Project">
                <Select
                  showSearch
                  style={{ width: 845 }}
                  placeholder="Select a project"
                  optionFilterProp="children"
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="jack">Internal System Support</Option>
                  <Option value="lucy">unknow</Option>
                  <Option value="tom">unknow</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Topic">
                <Input />
              </Form.Item>
              <Form.Item label="Description">
                <TextArea rows={4} />
              </Form.Item>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from
                  uploading company data or other band files
                </p>
              </Dragger>
              ,
              <FormItem style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </FormItem>
            </Form>
          </Card>
        </div>
      </div>
    );
  }
}

export default Ticket;

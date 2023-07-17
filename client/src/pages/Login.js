import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Input, Button, Icon, Form, Alert } from 'antd'

class Login extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.loginUser(values)
        setTimeout(()=>{
          window.location.href = "/"
        }, 3000)
      }
    });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    const { isLoggedIn, message } = this.props;
    console.log(this.props)
    return(
      <Row justify="space-around" type="flex">
        <Col span={8} className="form login">
          { !isLoggedIn ?
          <Form onSubmit={this.handleSubmit}>
            <h2 className="title">Login</h2>
            {
              message.type === 'login error' &&
              <Alert
                message="Failed"
                description={message.status}
                type="error"
                showIcon
              />
            }
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  {required: true, message: "Please type your email address"},
                  {type: 'email', message: 'The input is not valid E-mail!'}
                ]
              })(
                <Input size="large"
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                  placeholder="Email"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  {required: true, message: "Please type your password"},
                  {min: 8, message: "Password must be greate than 8 letters"}
                ]
              })(
                <Input.Password size="large"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                  placeholder="Password" 
                />
              )}
            </Form.Item>
            <Button block htmlType="submit" size="large">Login</Button>
          </Form> :
          (
            //alert for success/failure
            console.log('message', message.type === "login success"),
            [message.type === "login success" && ( 
            <Alert
              message="Success"
              description={`${message.status}, this page will reload in 3 seconds`}
              type="success"
              showIcon
            /> ),
            message.type === "" && (
            <Alert
              message="Warning"
              description="This account is already logged in"
              type="warning"
              showIcon
            />)]
          )
          }
        </Col>
      </Row>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired
}

export default Form.create({name: 'login'})(Login)
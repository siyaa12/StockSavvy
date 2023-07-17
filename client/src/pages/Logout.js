import React, { Component } from 'react'
import { Alert } from 'antd'

class Logout extends Component{

  componentDidMount(){
    setTimeout(() =>{
      window.location.href="/login"
    }, 3000)
  }

  render(){
    return (
      <Alert
      message="Success"
      description="Logged out successfully"
      type="success"
      showIcon
    />)
  }
}

export default Logout
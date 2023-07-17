import React, { Component } from 'react'
import { Row, Col, Icon } from 'antd'

export default class Share extends Component {
  render(){
    const {symbol, quantity, openPrice, latestPrice} = this.props
    let color = null
    if(openPrice > latestPrice){
      color = red
    } else if (openPrice < latestPrice){
      color = green
    }
    return(
      <Row 
        className="share"
        style={color}
      >
        <Col span={16}>
          <div>
            {symbol} - {quantity} Shares
          </div>
        </Col>
        <Col span={8}>
          <div className="price">
            {latestPrice ? `$${latestPrice}` : <Icon type="loading" style={{ fontSize: 24 }} spin />}
          </div>
        </Col>
      </Row>
    )
  }
}

const red = {
  color: 'red'
}

const green = {
  color: 'green'
}
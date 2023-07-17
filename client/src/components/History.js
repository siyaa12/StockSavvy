import React, { Component } from 'react'
import {Row, Col} from 'antd'
import Moment from 'react-moment'

export default class History extends Component {
  render(){
    const {type, date, symbol, quantity, price} = this.props
    return(
      <Row type="flex" justify="start">
        <Col span={14} className="history">
          <div>
            {type} ({symbol}) - {quantity} Shares @ ${price}, &nbsp;&nbsp;
            <Moment format="MM/DD/YYYY HH:mm">{date}</Moment>
          </div>
        </Col>
      </Row>
    )
  }
}
import React, { Component } from 'react'
import { Row, Col, Spin, Alert } from 'antd'
import { History } from '../components'
import { getTransactions } from '../apis'
class Transactions extends Component {

  constructor() {
    super()
    this.state = {
      transactions: []
    }
  }
  
  componentDidMount = async() => {
    const transactions = await getTransactions()
    this.setState({
      transactions: transactions
    })
  };
  
  render(){
    const { transactions } = this.state
    const { isPageLoading, isLoggedIn } = this.props
    return(
      isPageLoading ? 
      <Row type="flex" justify="center">
        <Spin size="large" />
      </Row> :
      (this.props.isLoggedIn ?
      <Row>
        <Row>
          <h1 className="page-title">Transactions</h1>
        </Row>
        <Row justify="left">
          <Col>
            { transactions ?
              transactions.map( val=>{
                return <History {...val} key={val.symbol} />
              }):
              <h5>No Transactions yet!</h5>
            }
          </Col>
        </Row> 
      </Row> 
      :
      <Alert
        message="Warning"
        description="Please Log in first"
        type="warning"
        showIcon
      />)
    )
  }
}

export default Transactions
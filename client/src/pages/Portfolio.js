import React, { Component } from 'react'
import { Row, Col, Alert, Spin } from 'antd'
import { Share } from '../components'
import { BuyShare } from '../components'
import { getPortfolio, getCash, getStockQuotes } from '../apis'

class Portfolio extends Component {

  constructor(){
    super()
    this.state = {
      portfolio: {},
      cash: 0,
      quotes: {},
      portfolioTotal: 0,
    }
  }

  componentDidMount = async() => {
    this.setState({
      pageIsLoading: false,
    })
    const portfolio = await getPortfolio()
    const cash = await getCash()
    this.setState({
      portfolio: portfolio,
      cash: cash
    })
    this.interval = setInterval( async () => {
      const keys = Object.keys(portfolio)
      const quotes = await getStockQuotes(keys)
      let total = this.state.cash
      Object.keys(quotes).forEach( key =>{
        total += quotes[key].latestPrice * portfolio[key]
      })
      this.setState({
        quotes : quotes,
        portfolioTotal : total
      })
    },
    2000);
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render(){
    const { portfolio, cash, quotes, portfolioTotal } = this.state
    return(
      this.props.isPageLoading ?
      <Row type="flex" justify="center">
        <Spin size="large" />
      </Row> 
      :
      (this.props.isLoggedIn ?
      <Row>
        <Row>
          <h1 className="page-title">Portfolio (${portfolioTotal.toFixed(2)})</h1>
        </Row>
        <Row type="flex" justify="center">
          <Col span={10}>
            { Object.entries(portfolio).length > 0 ?
              Object.keys(portfolio).map((key) => {
                return <Share 
                        symbol={key}
                        key={key}
                        quantity={portfolio[key]}
                        {...quotes[key]}
                      />
              }) :
              <h5>Start with buying your first stock on the right.</h5>
            }
          </Col>
          <Col span={3} className="portfolio-middle-line"></Col>
          <Col span={9} offset={2}>
            <BuyShare cash={cash} />
          </Col>
        </Row>
      </Row>:
      <Alert
        message="Warning"
        description="Please Log in first"
        type="warning"
        showIcon
      />)
    )
  }

}

export default Portfolio
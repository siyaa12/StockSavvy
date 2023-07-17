import React, { Component } from 'react'
import { Row, Col, Button, Input, Form } from 'antd'
import Animate from 'rc-animate'
import { getStockQuote, buyStock } from '../apis'
class BuyShare extends Component{
  
  constructor() {
    super();
    this.state = {
      number: {},
      validateSymbol: '',
      validateQty: '',
      showQuote: false,
      currentQuote: {},
      showPrice: false,
      price: 0
    }
  }
  
  handleSubmit = (e) => {
    const { validateQty, validateSymbol } = this.state 
    e.preventDefault()
    this.props.form.validateFields( async(err, values) => {
      if (!err && validateQty === 'success' && validateSymbol === 'success') {
        let res = await buyStock(values)
        alert(res)
        window.location.reload()
      }
    })
  }

  handleSymbolChange = (e) => {
    let symbol = e.target.value
    if(symbol === ""){
      this.setState({
        showQuote: false,
      })
    } else {
      this.setState({
        validateSymbol: 'validating'
      }, async () => {
        const quote = await getStockQuote(symbol)
        if(!quote.error){
          this.setState({
            validateSymbol: 'success',
            showQuote: true,
            currentQuote: quote 
          })
        }
        else {
          this.setState({
            validateSymbol: 'error',
            showQuote: true,
            currentQuote: quote
          })
        }
      })
    }
  }

  handleQtyChange = (e) => {
    const { cash } = this.props
    const { currentQuote } = this.state
    let qty = e.target.value
    if(qty === ""){
      this.setState({
        showPrice: false,
      })
    } else {
      this.setState({
        validateQty: 'validating'
      }, () => {
        if(currentQuote && currentQuote !== "Unknown symbol"){
          if(currentQuote.latestPrice * qty <= cash){
            this.setState({
              validateQty: 'success',
              showPrice: true,
              price: (currentQuote.latestPrice * qty).toFixed(2)
            })
          } else {
            this.setState({
              validateQty: 'error',
              showPrice: true,
              price: (currentQuote.latestPrice * qty).toFixed(2)
            })
          }
        }
        else {
          this.setState({
            validateQty: 'warning',
          })
        }
      })
    }
  }
  
  
  render() {
    
    const { getFieldDecorator } = this.props.form;
    const { cash } = this.props
    const { showQuote, currentQuote, validateSymbol, validateQty, showPrice, price } = this.state

    return(
      <Row justify="space-around">
        <Col span={20} className="form buy-share">
          <Form onSubmit={this.handleSubmit}>
            <h3 className="title">Cash - ${cash}</h3>
            <Form.Item
              hasFeedback
              validateStatus={validateSymbol}
            >
              {getFieldDecorator('symbol', {
                rules: [
                  {required: true, message: "Please type the symbol of your stock"},
                ]
              })(
                <Input 
                  onChange={this.handleSymbolChange}
                  size="large"
                  placeholder="Ticker"
                />
              )}
            </Form.Item>
            { (showQuote) &&
              <Animate
                transitionName="fade"
                transitionAppear
              >
              {!currentQuote.error?
                <p>{currentQuote.symbol}: {currentQuote.companyName}, 
                latest: {currentQuote.latestPrice}, open: {currentQuote.openPrice}</p>:
                <p> {currentQuote.error}</p>
              }
              </Animate>
            }
            <Form.Item
              hasFeedback
              validateStatus={validateQty}
            >
              {getFieldDecorator('quantity', {
                rules: [
                  { required: true, message: "Please type your quantity" },
                ]
              })(
                <Input 
                  size="large"
                  placeholder="Quantity"
                  type="number"
                  onChange={this.handleQtyChange}
                />
              )}
            </Form.Item>
            { showPrice &&
              <Animate
                transitionName="fade"
                transitionAppear
              >
                { validateSymbol === "success"?
                <p>This will cost ${price}
                  { validateQty === 'error' &&
                  ", which excceeds your available cash amount."
                }
                </p> : 
                <p>
                  Input a Valid Symbol first
                </p>
                }
              </Animate>
            }
            <Button htmlType="submit" block size="large">Buy Shares</Button>
          </Form>
        </Col>
       </Row>
    )
  }
}

export default Form.create({ name: 'buy-share'})(BuyShare)
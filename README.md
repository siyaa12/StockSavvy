# Virtual Stock Demo

A virtual Stock market built by MERN stack (MongoDB, Express, React, Node) that allows users to use virtual money to buy stocks in real market (using IEX Trading APIs).<br>
Some dependencies used: Redux, Ant Design, axios, JWT WebToken, etc.

#### Online Demo https://virtual-stock-demo.herokuapp.com/

## Getting Started
```bash

# backend
cd server && yarn dev

# frontend
cd client && yarn start

# also make sure that mongodb is installed and there should be a db called ttp-test

```

## Overview (updated 3/05/2022)

This is a full-stack demo of a stock web application that allow users to buy stock, view purchase history and current prices of stocks in the markets. Upon registration, User will be granted $5000 virtual money and they can use them to purchase stocks with their most updated price via IEX API.

## Interfaces Implemented:

### Portfolio Page
![portfolio](https://github.com/ThisZW/virtual-stock-demo/blob/master/assets/portfolio.png)

### Transaction Page
![Transactions](https://github.com/ThisZW/virtual-stock-demo/blob/master/assets/transactions.png)

### Login Page
![Login](https://github.com/ThisZW/virtual-stock-demo/blob/master/assets/login.png)

### Register Page
![Register](https://github.com/ThisZW/virtual-stock-demo/blob/master/assets/register.png)

## Bugs to be fixed
 - Missing functionality of dealing with expired JWT token, as they cannot be automatically cleared so far.

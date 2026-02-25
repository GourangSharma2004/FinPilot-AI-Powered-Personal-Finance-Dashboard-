import React from 'react';
import { Container, Row, Col, Card, CardBody, Table } from 'reactstrap';
import ReactApexChart from 'react-apexcharts';

const investmentOptions = [
  { title: 'Stock Market', icon: 'ri-stock-line', description: 'Buy and sell stocks.' },
  { title: 'Mutual Funds', icon: 'ri-funds-line', description: 'Invest in mutual funds.' },
  { title: 'Crypto Buy/Sell', icon: 'ri-bit-coin-line', description: 'Trade cryptocurrencies.' },
  { title: 'Real Estate Invest', icon: 'ri-building-line', description: 'Invest in real estate.' },
  { title: 'Deposits', icon: 'ri-bank-line', description: 'Manage recurring/fixed deposits.' },
  { title: 'Gold', icon: 'ri-vip-diamond-line', description: 'Invest in physical/digital gold.' },
  { title: 'Bonds or NPS', icon: 'ri-file-text-line', description: 'Invest in bonds or NPS.' },
  { title: 'Portfolio Rebalancing', icon: 'ri-shuffle-line', description: 'Rebalance your portfolio.' },
];

const assetAllocationData = {
  series: [44, 55, 13, 43, 22],
  options: {
    labels: ['Stocks', 'Crypto', 'Real Estate', 'Bonds', 'Gold'],
    chart: { height: 300, type: 'donut' },
    legend: { position: 'bottom' },
    responsive: [{
      breakpoint: 480,
      options: { chart: { width: 200 }, legend: { position: 'bottom' } }
    }],
    title: { text: 'Asset Allocation', style: { fontWeight: 500 } },
  },
};

const recentTransactionsData = [
  { date: '2024-07-26', type: 'Buy', asset: 'BTC', amount: '0.5', status: 'Completed' },
  { date: '2024-07-25', type: 'Sell', asset: 'AAPL', amount: '10', status: 'Completed' },
  { date: '2024-07-24', type: 'Deposit', asset: 'Mutual Fund A', amount: '₹500', status: 'Completed' },
  { date: '2024-07-23', type: 'Buy', asset: 'ETH', amount: '2', status: 'Pending' },
];

const InvestmentPortfolio = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <h2 className="my-4">Investment Portfolio</h2>

          <Row>
            <Col lg={4}>
              <Card>
                <CardBody>
                  <h5 className="card-title">Total Value</h5>
                  <h3>₹150,450.75</h3>
                </CardBody>
              </Card>
            </Col>
            <Col lg={4}>
              <Card>
                <CardBody>
                  <h5 className="card-title">Overall Gain/Loss</h5>
                  <h3 className="text-success">+₹25,350.25 (+18.2%)</h3>
                </CardBody>
              </Card>
            </Col>
            <Col lg={4}>
              <Card>
                <CardBody>
                  <h5 className="card-title">24h Change</h5>
                  <h3 className="text-danger">-₹1,200.50 (-0.8%)</h3>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Asset Allocation</h4>
                  <ReactApexChart options={assetAllocationData.options} series={assetAllocationData.series} type="donut" height={300} />
                </CardBody>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Recent Transactions</h4>
                  <div className="table-responsive">
                    <Table className="table-centered table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Type</th>
                          <th>Asset</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentTransactionsData.map((transaction, index) => (
                          <tr key={index}>
                            <td>{transaction.date}</td>
                            <td>{transaction.type}</td>
                            <td>{transaction.asset}</td>
                            <td>{transaction.amount}</td>
                            <td><span className={`badge bg-${transaction.status === 'Completed' ? 'success' : 'warning'}`}>{transaction.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="my-4">Explore & Manage</h4>
          <Row>
            {investmentOptions.map((option, index) => (
              <Col key={index} lg={3} md={4} sm={6} className="mb-4">
                <Card className="text-center h-100">
                  <CardBody>
                    <i className={`${option.icon} font-size-24 mb-3`}></i>
                    <h5>{option.title}</h5>
                    <p>{option.description}</p>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default InvestmentPortfolio;
 
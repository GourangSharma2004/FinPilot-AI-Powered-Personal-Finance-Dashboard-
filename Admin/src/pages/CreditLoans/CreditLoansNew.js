import React, { useState } from 'react';
import { 
    Card, CardBody, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink,
    Progress, Button, Badge, Alert, Table
} from 'reactstrap';
import classnames from 'classnames';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './CreditLoans.css';
import CreditCard from './components/CreditCard';

// Sample data for credit cards
const creditCards = [
    {
        id: 1,
        bank: 'HDFC Bank',
        type: 'Platinum',
        cardNumber: '1234',
        cardHolder: 'JOHN DOE',
        validThru: '12/25',
        cvv: '•••',
        creditLimit: 250000,
        usedAmount: 175000,
        dueDate: '25th Dec 2023',
        minDue: 5000,
        status: 'Active',
        cardBrand: 'visa',
        cardNetwork: 'VISA',
        cardColor: 'bg-primary',
        borderColor: 'border-primary',
        textColor: 'text-white'
    },
    {
        id: 2,
        bank: 'ICICI Bank',
        type: 'Coral',
        cardNumber: '5678',
        cardHolder: 'JANE SMITH',
        validThru: '06/26',
        cvv: '•••',
        creditLimit: 150000,
        usedAmount: 45000,
        dueDate: '15th Jan 2024',
        minDue: 3500,
        status: 'Active',
        cardBrand: 'mastercard',
        cardNetwork: 'Mastercard',
        cardColor: 'bg-success',
        borderColor: 'border-success',
        textColor: 'text-white'
    }
];

// Sample loans data
const loans = [
    {
        id: 1,
        type: 'Personal Loan',
        amount: 750000,
        outstanding: 350000,
        emi: 32500,
        nextDue: '15th Jul 2024',
        interestRate: '12.5%',
        status: 'Active',
        startDate: '15 Jan 2023',
        endDate: '15 Jan 2028',
        lender: 'HDFC Bank',
        purpose: 'Home Renovation'
    },
    {
        id: 2,
        type: 'Home Loan',
        amount: 8500000,
        outstanding: 6200000,
        emi: 78500,
        nextDue: '5th Aug 2024',
        interestRate: '8.9%',
        status: 'Active',
        startDate: '5 Aug 2022',
        endDate: '5 Aug 2042',
        lender: 'SBI',
        purpose: 'Apartment Purchase'
    },
    {
        id: 3,
        type: 'Car Loan',
        amount: 1200000,
        outstanding: 450000,
        emi: 22500,
        nextDue: '22nd Jul 2024',
        interestRate: '9.2%',
        status: 'Active',
        startDate: '22 Jan 2023',
        endDate: '22 Jan 2028',
        lender: 'ICICI Bank',
        purpose: 'New Car Purchase',
        vehicle: 'Hyundai Creta'
    }
];

const CreditLoans = ({ t }) => {
    const [activeTab, setActiveTab] = useState('1');
    const [cibilScore] = useState(789);
    const [creditUtilization] = useState(75);
    
    const toggleTab = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const getCibilScoreColor = (score) => {
        if (score >= 750) return 'success';
        if (score >= 700) return 'info';
        if (score >= 650) return 'warning';
        return 'danger';
    };

    const calculateTotalDebt = () => {
        return loans.reduce((total, loan) => total + loan.outstanding, 0);
    };

    const calculateTotalEmi = () => {
        return loans.reduce((total, loan) => total + loan.emi, 0);
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <h4>Credit & Loans</h4>
                    
                    <Row className="mb-4">
                        <Col xl={3} md={6}>
                            <Card className="mini-stats-wid">
                                <CardBody>
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-muted fw-medium">CIBIL Score</p>
                                            <h4 className="mb-0">
                                                {cibilScore}
                                                <Badge color={getCibilScoreColor(cibilScore)} className="ms-2">
                                                    {cibilScore >= 750 ? 'Excellent' : cibilScore >= 700 ? 'Good' : 'Fair'}
                                                </Badge>
                                            </h4>
                                        </div>
                                        <div className="mini-stat-icon align-self-center">
                                            <i className="ri-shield-check-line text-primary"></i>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xl={3} md={6}>
                            <Card className="mini-stats-wid">
                                <CardBody>
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-muted fw-medium">Credit Utilization</p>
                                            <h4 className="mb-0">{creditUtilization}%</h4>
                                            <p className="text-muted mb-0 mt-1">
                                                <i className={`ri-arrow-${creditUtilization > 70 ? 'up' : 'down'}-line ${creditUtilization > 70 ? 'text-danger' : 'text-success'} me-1`}></i>
                                                {creditUtilization > 70 ? 'High' : 'Good'} usage
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <Progress value={creditUtilization} color={creditUtilization > 70 ? 'danger' : 'success'} />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xl={3} md={6}>
                            <Card className="mini-stats-wid">
                                <CardBody>
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-muted fw-medium">Total Debt</p>
                                            <h4 className="mb-0">₹{(calculateTotalDebt() / 100000).toFixed(1)}L</h4>
                                            <p className="text-muted mb-0 mt-1">
                                                <i className="ri-arrow-down-line text-danger me-1"></i>
                                                5.2% from last month
                                            </p>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col xl={3} md={6}>
                            <Card className="mini-stats-wid">
                                <CardBody>
                                    <div className="d-flex">
                                        <div className="flex-grow-1">
                                            <p className="text-muted fw-medium">Monthly EMI</p>
                                            <h4 className="mb-0">₹{calculateTotalEmi().toLocaleString()}</h4>
                                            <p className="text-muted mb-0 mt-1">
                                                <i className="ri-calendar-line me-1"></i>
                                                Next: 5th {new Date().toLocaleString('default', { month: 'long' })}
                                            </p>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>

                    <Nav tabs className="nav-tabs-custom mb-3">
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggleTab('1'); }}
                            >
                                <i className="ri-bank-card-line me-1 align-middle"></i> Credit Cards
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggleTab('2'); }}
                            >
                                <i className="ri-bank-line me-1 align-middle"></i> Loans
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '3' })}
                                onClick={() => { toggleTab('3'); }}
                            >
                                <i className="ri-file-chart-line me-1 align-middle"></i> Credit Report
                            </NavLink>
                        </NavItem>
                    </Nav>

                    <TabContent activeTab={activeTab}>
                        {/* Credit Cards Tab */}
                        <TabPane tabId="1">
                            <Row>
                                {creditCards.map((card, index) => (
                                    <Col lg={6} key={index}>
                                        <CreditCard card={card} />
                                    </Col>
                                ))}
                                <Col lg={6}>
                                    <Card className="h-100">
                                        <CardBody className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '300px' }}>
                                            <div className="text-center">
                                                <div className="avatar-lg mx-auto mb-3">
                                                    <div className="avatar-title bg-soft-primary text-primary rounded-circle font-size-24">
                                                        <i className="ri-add-line"></i>
                                                    </div>
                                                </div>
                                                <h5>Add New Card</h5>
                                                <p className="text-muted">Add a new credit card to your account</p>
                                                <Button color="primary" className="mt-2">
                                                    <i className="ri-add-line align-middle me-1"></i> Add Card
                                                </Button>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </TabPane>

                        {/* Loans Tab */}
                        <TabPane tabId="2">
                            <Card>
                                <CardBody>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h5 className="card-title mb-0">Your Loans</h5>
                                        <Button color="primary">
                                            <i className="ri-add-line align-middle me-1"></i> Apply for Loan
                                        </Button>
                                    </div>
                                    
                                    <div className="table-responsive">
                                        <Table className="table-centered mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Loan Type</th>
                                                    <th>Lender</th>
                                                    <th>Amount</th>
                                                    <th>Outstanding</th>
                                                    <th>EMI</th>
                                                    <th>Next Due</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loans.map((loan, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <div className="flex-shrink-0 me-2">
                                                                    <i className="ri-bank-line text-primary"></i>
                                                                </div>
                                                                <div>
                                                                    <h6 className="mb-0">{loan.type}</h6>
                                                                    <small className="text-muted">{loan.purpose}</small>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{loan.lender}</td>
                                                        <td>₹{loan.amount.toLocaleString()}</td>
                                                        <td>₹{loan.outstanding.toLocaleString()}</td>
                                                        <td>₹{loan.emi.toLocaleString()}</td>
                                                        <td>{loan.nextDue}</td>
                                                        <td>
                                                            <span className={`badge bg-soft-${loan.status === 'Active' ? 'success' : 'danger'} text-${loan.status === 'Active' ? 'success' : 'danger'}`}>
                                                                {loan.status}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <Button color="light" size="sm" className="me-1">
                                                                <i className="ri-eye-line"></i>
                                                            </Button>
                                                            <Button color="light" size="sm">
                                                                <i className="ri-pencil-line"></i>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </CardBody>
                            </Card>
                        </TabPane>

                        {/* Credit Report Tab */}
                        <TabPane tabId="3">
                            <Card>
                                <CardBody>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h4 className="card-title mb-0">Credit Report & Analysis</h4>
                                        <div>
                                            <Button color="light" outline className="me-2">
                                                <i className="ri-download-line align-middle me-1"></i> Download PDF
                                            </Button>
                                            <Button color="primary">
                                                <i className="ri-refresh-line align-middle me-1"></i> Refresh Score
                                            </Button>
                                        </div>
                                    </div>
                                    
                                    <Alert color="info" className="mb-4">
                                        <div className="d-flex">
                                            <div className="me-3">
                                                <i className="ri-information-line font-size-20"></i>
                                            </div>
                                            <div>
                                                <p className="mb-0">
                                                    Your credit report was last updated on {new Date().toLocaleDateString()}. 
                                                    Next update available in 7 days. 
                                                    <a href="#" className="text-primary ms-1">Learn more</a>
                                                </p>
                                            </div>
                                        </div>
                                    </Alert>
                                    
                                    <Row className="mb-4">
                                        <Col xl={3} md={6}>
                                            <Card className="mini-stats-wid">
                                                <CardBody>
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1">
                                                            <p className="text-muted fw-medium">CIBIL Score</p>
                                                            <h4 className="mb-0">
                                                                {cibilScore} 
                                                                <Badge color={getCibilScoreColor(cibilScore)} className="ms-2">
                                                                    {cibilScore >= 750 ? 'Excellent' : cibilScore >= 650 ? 'Good' : 'Fair'}
                                                                </Badge>
                                                            </h4>
                                                        </div>
                                                        <div className="mini-stat-icon align-self-center">
                                                            <i className="ri-shield-check-line text-primary"></i>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col xl={3} md={6}>
                                            <Card className="mini-stats-wid">
                                                <CardBody>
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1">
                                                            <p className="text-muted fw-medium">Credit Utilization</p>
                                                            <h4 className="mb-0">{creditUtilization}%</h4>
                                                            <p className="text-muted mb-0 mt-1">
                                                                <i className={`ri-arrow-${creditUtilization > 70 ? 'up' : 'down'}-line ${creditUtilization > 70 ? 'text-danger' : 'text-success'} me-1`}></i>
                                                                {creditUtilization > 70 ? 'High' : 'Good'} usage
                                                            </p>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col xl={3} md={6}>
                                            <Card className="mini-stats-wid">
                                                <CardBody>
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1">
                                                            <p className="text-muted fw-medium">Credit Age</p>
                                                            <h4 className="mb-0">4.5 Yrs</h4>
                                                            <p className="text-muted mb-0 mt-1">
                                                                <i className="ri-information-line me-1"></i>
                                                                Above average
                                                            </p>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col xl={3} md={6}>
                                            <Card className="mini-stats-wid">
                                                <CardBody>
                                                    <div className="d-flex">
                                                        <div className="flex-grow-1">
                                                            <p className="text-muted fw-medium">Inquiries (24m)</p>
                                                            <h4 className="mb-0">3</h4>
                                                            <p className="text-muted mb-0 mt-1">
                                                                <i className="ri-check-line text-success me-1"></i>
                                                                Low impact
                                                            </p>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg={6}>
                                            <Card className="h-100">
                                                <CardBody>
                                                    <h5 className="card-title mb-4">Score Factors</h5>
                                                    
                                                    <div className="mb-4">
                                                        <div className="d-flex justify-content-between mb-2">
                                                            <div>
                                                                <i className="ri-checkbox-circle-fill text-success me-2"></i>
                                                                <span>Payment History</span>
                                                            </div>
                                                            <div>
                                                                <span className="me-2">Excellent</span>
                                                                <Badge color="success" className="badge-soft-success">+</Badge>
                                                            </div>
                                                        </div>
                                                        <Progress value={90} color="success" />
                                                        <p className="text-muted mt-1 small">No late payments in last 7 years</p>
                                                    </div>
                                                    
                                                    <div className="mb-4">
                                                        <div className="d-flex justify-content-between mb-2">
                                                            <div>
                                                                <i className="ri-alert-fill text-warning me-2"></i>
                                                                <span>Credit Utilization</span>
                                                            </div>
                                                            <div>
                                                                <span className="me-2">Good</span>
                                                                <Badge color="warning" className="badge-soft-warning">=</Badge>
                                                            </div>
                                                        </div>
                                                        <Progress value={75} color="warning" />
                                                        <p className="text-muted mt-1 small">Using 75% of available credit</p>
                                                    </div>
                                                    
                                                    <div className="mb-4">
                                                        <div className="d-flex justify-content-between mb-2">
                                                            <div>
                                                                <i className="ri-time-line text-info me-2"></i>
                                                                <span>Credit History Length</span>
                                                            </div>
                                                            <div>
                                                                <span className="me-2">Average</span>
                                                                <Badge color="info" className="badge-soft-info">=</Badge>
                                                            </div>
                                                        </div>
                                                        <Progress value={60} color="info" />
                                                        <p className="text-muted mt-1 small">Oldest account: 6 years 3 months</p>
                                                    </div>
                                                    
                                                    <div className="mb-4">
                                                        <div className="d-flex justify-content-between mb-2">
                                                            <div>
                                                                <i className="ri-bank-card-line text-success me-2"></i>
                                                                <span>Total Accounts</span>
                                                            </div>
                                                            <div>
                                                                <span className="me-2">Good</span>
                                                                <Badge color="success" className="badge-soft-success">+</Badge>
                                                            </div>
                                                        </div>
                                                        <Progress value={80} color="success" />
                                                        <p className="text-muted mt-1 small">8 active credit accounts</p>
                                                    </div>
                                                    
                                                    <div>
                                                        <div className="d-flex justify-content-between mb-2">
                                                            <div>
                                                                <i className="ri-search-line text-warning me-2"></i>
                                                                <span>Credit Inquiries</span>
                                                            </div>
                                                            <div>
                                                                <span className="me-2">Fair</span>
                                                                <Badge color="warning" className="badge-soft-warning">-</Badge>
                                                            </div>
                                                        </div>
                                                        <Progress value={50} color="warning" />
                                                        <p className="text-muted mt-1 small">3 hard inquiries in last 24 months</p>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        
                                        <Col lg={6}>
                                            <Card className="h-100">
                                                <CardBody>
                                                    <h5 className="card-title mb-4">Score Simulation</h5>
                                                    <p className="text-muted">See how different actions might affect your score</p>
                                                    
                                                    <div className="mb-4">
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="simulationType" id="payOffCards" defaultChecked />
                                                            <label className="form-check-label" htmlFor="payOffCards">Pay off credit cards</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="simulationType" id="newLoan" />
                                                            <label className="form-check-label" htmlFor="newLoan">Take a new loan</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input" type="radio" name="simulationType" id="increaseLimit" />
                                                            <label className="form-check-label" htmlFor="increaseLimit">Increase credit limit</label>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="text-center py-4">
                                                        <div className="avatar-lg mx-auto mb-3">
                                                            <div className="avatar-title bg-soft-primary text-primary rounded-circle font-size-24">
                                                                <i className="ri-line-chart-line"></i>
                                                            </div>
                                                        </div>
                                                        <h4>Potential Score: {cibilScore + 15}</h4>
                                                        <p className="text-muted">By paying off credit card balances</p>
                                                        <Button color="primary" className="mt-2">
                                                            <i className="ri-lightbulb-line align-middle me-1"></i> Get Personalized Tips
                                                        </Button>
                                                    </div>
                                                    
                                                    <div className="mt-4 pt-3 border-top">
                                                        <h6>Credit Score Tips</h6>
                                                        <ul className="list-unstyled">
                                                            <li className="mb-2">
                                                                <i className="ri-checkbox-circle-fill text-success me-2"></i>
                                                                Keep credit card balances below 30% of limit
                                                            </li>
                                                            <li className="mb-2">
                                                                <i className="ri-checkbox-circle-fill text-success me-2"></i>
                                                                Avoid applying for new credit frequently
                                                            </li>
                                                            <li className="mb-2">
                                                                <i className="ri-checkbox-circle-fill text-success me-2"></i>
                                                                Maintain a healthy mix of credit types
                                                            </li>
                                                            <li className="mb-2">
                                                                <i className="ri-checkbox-circle-fill text-success me-2"></i>
                                                                Make all payments on time, every time
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                    
                                    <Row className="mt-4">
                                        <Col lg={12}>
                                            <Card>
                                                <CardBody>
                                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                                        <h5 className="card-title mb-0">Credit Report Timeline</h5>
                                                        <div className="d-flex">
                                                            <Button color="light" size="sm" className="me-2">
                                                                <i className="ri-calendar-line me-1"></i> Last 12 Months
                                                            </Button>
                                                            <Button color="light" size="sm" outline>
                                                                <i className="ri-download-line me-1"></i> Export
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="timeline-2">
                                                        <div className="timeline-year">
                                                            <h5>2024</h5>
                                                            <div className="timeline-month">
                                                                <h6>June</h6>
                                                                <div className="timeline-box">
                                                                    <div className="timeline-icon">
                                                                        <i className="ri-check-line"></i>
                                                                    </div>
                                                                    <div className="timeline-content">
                                                                        <h6>Credit Score Updated</h6>
                                                                        <p className="text-muted mb-0">CIBIL Score: {cibilScore} (Up by 12 points)</p>
                                                                        <small className="text-muted">June 15, 2024</small>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div className="timeline-box">
                                                                    <div className="timeline-icon bg-soft-warning">
                                                                        <i className="ri-search-line"></i>
                                                                    </div>
                                                                    <div className="timeline-content">
                                                                        <h6>Credit Inquiry</h6>
                                                                        <p className="text-muted mb-0">HDFC Bank - Personal Loan</p>
                                                                        <small className="text-muted">June 5, 2024</small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="timeline-month">
                                                                <h6>May</h6>
                                                                <div className="timeline-box">
                                                                    <div className="timeline-icon bg-soft-success">
                                                                        <i className="ri-bank-card-line"></i>
                                                                    </div>
                                                                    <div className="timeline-content">
                                                                        <h6>New Credit Card</h6>
                                                                        <p className="text-muted mb-0">ICICI Bank Platinum Card (Limit: ₹150,000)</p>
                                                                        <small className="text-muted">May 22, 2024</small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="timeline-year">
                                                            <h5>2023</h5>
                                                            <div className="timeline-month">
                                                                <h6>December</h6>
                                                                <div className="timeline-box">
                                                                    <div className="timeline-icon bg-soft-info">
                                                                        <i className="ri-bank-line"></i>
                                                                    </div>
                                                                    <div className="timeline-content">
                                                                        <h6>Loan Account Closed</h6>
                                                                        <p className="text-muted mb-0">Personal Loan - Axis Bank</p>
                                                                        <small className="text-muted">December 10, 2023</small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        </React.Fragment>
    );
};

export default withTranslation()(CreditLoans);

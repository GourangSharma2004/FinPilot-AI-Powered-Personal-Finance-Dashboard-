import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

// Import Components
import BreadCrumb from '../../components/Common/BreadCrumb';

const Account = () => {
    const [activeTab, setActiveTab] = useState('1');

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    document.title = 'Account Management | FinPilot';

    return (
        <div className="page-content">
            <Container fluid>
                <BreadCrumb title="Account Management" pageTitle="Account" />
                
                <Row>
                    <Col xs={12}>
                        <Card>
                            <CardBody>
                                <Nav tabs className="nav-tabs-custom nav-justified">
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '1' })}
                                            onClick={() => toggleTab('1')}
                                        >
                                            <i className="ri-bank-line me-1 align-middle"></i> Bank Transactions
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '2' })}
                                            onClick={() => toggleTab('2')}
                                        >
                                            <i className="ri-atm-line me-1 align-middle"></i> ATM Withdrawals
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '3' })}
                                            onClick={() => toggleTab('3')}
                                        >
                                            <i className="ri-smartphone-line me-1 align-middle"></i> UPI Transactions
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '4' })}
                                            onClick={() => toggleTab('4')}
                                        >
                                            <i className="ri-exchange-funds-line me-1 align-middle"></i> Fund Transfer
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '5' })}
                                            onClick={() => toggleTab('5')}
                                        >
                                            <i className="ri-money-dollar-circle-line me-1 align-middle"></i> Maintenance Charges
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '6' })}
                                            onClick={() => toggleTab('6')}
                                        >
                                            <i className="ri-funds-line me-1 align-middle"></i> Overdraft Usage
                                        </NavLink>
                                    </NavItem>
                                </Nav>

                                <TabContent activeTab={activeTab} className="mt-4">
                                    <TabPane tabId="1">
                                        <h5 className="card-title mb-4">Bank Account Transactions</h5>
                                        {/* Add bank transactions table/content here */}
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <h5 className="card-title mb-4">ATM Withdrawals</h5>
                                        {/* Add ATM withdrawals table/content here */}
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <h5 className="card-title mb-4">UPI Transactions</h5>
                                        {/* Add UPI transactions table/content here */}
                                    </TabPane>
                                    <TabPane tabId="4">
                                        <h5 className="card-title mb-4">Fund Transfer History</h5>
                                        {/* Add fund transfer table/content here */}
                                    </TabPane>
                                    <TabPane tabId="5">
                                        <h5 className="card-title mb-4">Account Maintenance Charges</h5>
                                        {/* Add maintenance charges table/content here */}
                                    </TabPane>
                                    <TabPane tabId="6">
                                        <h5 className="card-title mb-4">Overdraft Usage History</h5>
                                        {/* Add overdraft usage table/content here */}
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Account;
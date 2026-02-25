import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//Import Components
import KPIWidget from "./KPIWidget";
import IncomeSummary from "./IncomeSummary";
import ExpenseSummary from "./ExpenseSummary";
import FinancialTrends from "./FinancialTrends";
import UpcomingBills from "./UpcomingBills";
import InvestmentAllocation from "./InvestmentAllocation";
import TransactionInsights from "./TransactionInsights";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems : [
                { title : "finpilot", link : "/" },
                { title : "Dashboard", link : "#" },
            ],
            reports : [
                { icon : "ri-wallet-line", title: "Account Balance", value: `₹${(23450).toLocaleString('en-IN')}`, color: 'success' },
                { icon : "ri-bank-card-line", title: "Outstanding Loans", value: `₹${(8930).toLocaleString('en-IN')}`, color: 'danger' },
                { icon : "ri-exchange-dollar-line", title: "Net Cash-Flow (MTD)", value: `₹${(1120).toLocaleString('en-IN')}`, color: 'primary' },
                { icon : "ri-funds-line", title: "Investment Value", value: `₹${(48500).toLocaleString('en-IN')}`, color: 'info' },
                { icon : "ri-calendar-todo-line", title: "Upcoming Bills", value: "3", color: 'warning' },
                { icon : "ri-alert-line", title: "Alerts", value: "2", color: 'danger' }
            ]
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="page-content" style={{ padding: '0', margin: '0', maxWidth: '100%', overflowX: 'hidden' }}>
                    <div style={{ padding: '10px 10px 5px' }}>
                        <Breadcrumbs title="Dashboard" breadcrumbItems={this.state.breadcrumbItems} />
                    </div>
                    
                    {/* Top KPI Widgets - Single Row */}
                    <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap',
                        gap: '8px',
                        padding: '0 10px 8px',
                        margin: 0
                    }}>
                        {this.state.reports.map((card, idx) => (
                            <div key={idx} style={{ 
                                flex: '1 1 180px',
                                minWidth: '180px',
                                maxWidth: 'calc(16.666% - 8px)',
                                margin: '0',
                                padding: '0'
                            }}>
                                <KPIWidget {...card} style={{ height: '100%', margin: '0' }} />
                            </div>
                        ))}
                    </div>
                    
                    {/* Main Chart */}
                    <div style={{ padding: '0 10px 8px' }}>
                        <FinancialTrends />
                    </div>
                    
                    {/* Middle Section - Three Columns */}
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '10px',
                        padding: '0 10px 8px',
                        margin: 0,
                        width: '100%',
                        boxSizing: 'border-box'
                    }}>
                        <div style={{ margin: '0' }}><ExpenseSummary style={{ height: '100%', margin: '0' }} /></div>
                        <div style={{ margin: '0' }}><UpcomingBills style={{ height: '100%', margin: '0' }} /></div>
                        <div style={{ margin: '0' }}><InvestmentAllocation style={{ height: '100%', margin: '0', width: '100%' }} /></div>
                    </div>
                    
                    {/* Bottom Section */}
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '10px',
                        padding: '0 10px 10px',
                        margin: 0,
                        width: '100%',
                        boxSizing: 'border-box'
                    }}>
                        <div style={{ margin: '0', width: '100%' }}><IncomeSummary style={{ margin: '0', width: '100%' }} /></div>
                        <div style={{ margin: '0', width: '100%' }}><TransactionInsights style={{ margin: '0', width: '100%' }} /></div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;

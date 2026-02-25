import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button, Table } from "reactstrap";
import ReactApexChart from 'react-apexcharts';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

class RecurringExpenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Expenses", link: "#" },
                { title: "Recurring Expenses", link: "#" }
            ],
            expenses: [],
            newExpense: {
                category: '',
                subcategory: '',
                description: '',
                amount: '',
                dueDate: '',
                frequency: 'monthly',
                paymentMethod: '',
                autoPayEnabled: false,
                reminderDays: 3,
                lastPaymentDate: '',
                nextPaymentDate: '',
                paymentStatus: 'pending',
                billerInfo: {
                    name: '',
                    accountNumber: '',
                    website: ''
                },
                notes: ''
            },
            paymentHistory: [],
            upcomingPayments: [],
            missedPayments: [],
            totalRecurringAmount: 0,
            paymentReminders: [],
            columnChartOptions: {
                chart: {
                    height: 350,
                    type: 'bar',
                    toolbar: {
                        show: false
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '45%',
                        endingShape: 'rounded'
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
                },
                yaxis: {
                    title: {
                        text: 'Amount (₹)'
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return "₹ " + val
                        }
                    }
                },
                colors: ['#34c38f', '#556ee6', '#f46a6a']
            },
            columnChartSeries: [{
                name: 'Paid',
                data: [44, 55, 57, 56, 61, 58]
            }, {
                name: 'Pending',
                data: [76, 85, 101, 98, 87, 105]
            }, {
                name: 'Overdue',
                data: [35, 41, 36, 26, 45, 48]
            }],
            pieData: {
                labels: ['Rent', 'EMI', 'Insurance', 'Utilities', 'Subscriptions', 'Others'],
                datasets: [{
                    data: [30, 25, 15, 12, 10, 8],
                    backgroundColor: [
                        '#34c38f',
                        '#556ee6',
                        '#f46a6a',
                        '#50a5f1',
                        '#f1b44c',
                        '#74788d'
                    ]
                }]
            },
            pieOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Expense Distribution by Category'
                    }
                }
            }
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            newExpense: {
                ...prevState.newExpense,
                [name]: value
            }
        }));
    }

    getSubcategories = (category) => {
        const subcategories = {
            'Rent': ['House Rent', 'Office Rent', 'Storage Rent', 'Parking Rent', 'Other'],
            'EMI': ['Education Loan', 'Home Loan', 'Car Loan', 'Personal Loan', 'Business Loan', 'Consumer Loan'],
            'Insurance': ['Health Insurance', 'Life Insurance', 'Vehicle Insurance', 'Home Insurance', 'Term Insurance', 'Critical Illness'],
            'Subscription': ['Netflix', 'Spotify', 'Gym', 'WiFi', 'Cloud Storage', 'Security System', 'Magazine', 'Other'],
            'Utility': ['Electricity', 'Internet', 'Gas', 'Phone', 'Water', 'Cable TV', 'Waste Management'],
            'Education': ['School Fees', 'College Fees', 'Tuition Fees', 'Online Courses', 'Professional Certifications'],
            'Credit Card': ['Minimum Payment', 'Full Payment', 'Custom Payment'],
            'Maintenance': ['Home Maintenance', 'Vehicle Service', 'Equipment AMC'],
            'Investment': ['SIP', 'Retirement Fund', 'Child Education Fund']
        };
        return subcategories[category] || [];
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            expenses: [...prevState.expenses, prevState.newExpense],
            newExpense: {
                category: '',
                subcategory: '',
                description: '',
                amount: '',
                dueDate: '',
                frequency: 'monthly'
            }
        }));
    }

    render() {
        const subcategories = this.getSubcategories(this.state.newExpense.category);

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs title="Recurring Expenses" breadcrumbItems={this.state.breadcrumbItems} />
                        
                        <Row className="mb-4">
                            <Col xl={7}>
                                <Card>
                                    <CardBody>
                                        <div className="d-flex align-items-center mb-3">
                                            <h4 className="card-title flex-grow-1">Payment Status Overview</h4>
                                        </div>
                                        <div style={{ height: '350px' }}>
                                            <ReactApexChart
                                                options={{
                                                    ...this.state.columnChartOptions,
                                                    chart: {
                                                        ...this.state.columnChartOptions.chart,
                                                        background: 'transparent',
                                                        stacked: false,
                                                        toolbar: {
                                                            show: true,
                                                            tools: {
                                                                download: true,
                                                                selection: false,
                                                                zoom: false,
                                                                zoomin: false,
                                                                zoomout: false,
                                                                pan: false,
                                                                reset: false
                                                            }
                                                        }
                                                    },
                                                    plotOptions: {
                                                        bar: {
                                                            borderRadius: 4,
                                                            columnWidth: '60%',
                                                            dataLabels: {
                                                                position: 'top'
                                                            }
                                                        }
                                                    }
                                                }}
                                                series={this.state.columnChartSeries}
                                                type="bar"
                                                height="100%"
                                            />
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl={5}>
                                <Card>
                                    <CardBody>
                                        <div className="d-flex align-items-center mb-3">
                                            <h4 className="card-title flex-grow-1">Category Distribution</h4>
                                        </div>
                                        <div style={{ height: '350px' }}>
                                            <Pie
                                                data={this.state.pieData}
                                                options={{
                                                    ...this.state.pieOptions,
                                                    maintainAspectRatio: false,
                                                    plugins: {
                                                        ...this.state.pieOptions.plugins,
                                                        legend: {
                                                            display: true,
                                                            position: 'bottom',
                                                            labels: {
                                                                boxWidth: 12,
                                                                padding: 20,
                                                                font: {
                                                                    size: 12
                                                                }
                                                            }
                                                        }
                                                    },
                                                    layout: {
                                                        padding: {
                                                            bottom: 20
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <CardBody>
                                        <h4 className="card-title mb-4">Add New Recurring Expense</h4>
                                        
                                        <Form onSubmit={this.handleSubmit}>
                                            <Row>
                                                <Col md={2}>
                                                    <FormGroup>
                                                        <Label>Category</Label>
                                                        <Input
                                                            type="select"
                                                            name="category"
                                                            value={this.state.newExpense.category}
                                                            onChange={this.handleInputChange}
                                                            required
                                                        >
                                                            <option value="">Select Category</option>
                                                            <option value="Rent">Rent Payment</option>
                                                            <option value="EMI">EMI</option>
                                                            <option value="Insurance">Insurance Premium</option>
                                                            <option value="Subscription">Subscription</option>
                                                            <option value="Utility">Utility Bills</option>
                                                            <option value="Education">School/College Fees</option>
                                                            <option value="Credit Card">Credit Card Payment</option>
                                                        </Input>
                                                    </FormGroup>
                                                </Col>

                                                <Col md={2}>
                                                    <FormGroup>
                                                        <Label>Subcategory</Label>
                                                        <Input
                                                            type="select"
                                                            name="subcategory"
                                                            value={this.state.newExpense.subcategory}
                                                            onChange={this.handleInputChange}
                                                            required
                                                            disabled={!this.state.newExpense.category}
                                                        >
                                                            <option value="">Select Subcategory</option>
                                                            {subcategories.map((sub, index) => (
                                                                <option key={index} value={sub}>{sub}</option>
                                                            ))}
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                                
                                                <Col md={2}>
                                                    <FormGroup>
                                                        <Label>Description</Label>
                                                        <Input
                                                            type="text"
                                                            name="description"
                                                            value={this.state.newExpense.description}
                                                            onChange={this.handleInputChange}
                                                            required
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col md={2}>
                                                    <FormGroup>
                                                        <Label>Amount</Label>
                                                        <Input
                                                            type="number"
                                                            name="amount"
                                                            value={this.state.newExpense.amount}
                                                            onChange={this.handleInputChange}
                                                            required
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col md={2}>
                                                    <FormGroup>
                                                        <Label>Due Date</Label>
                                                        <Input
                                                            type="date"
                                                            name="dueDate"
                                                            value={this.state.newExpense.dueDate}
                                                            onChange={this.handleInputChange}
                                                            required
                                                        />
                                                    </FormGroup>
                                                </Col>

                                                <Col md={2}>
                                                    <FormGroup>
                                                        <Label>Frequency</Label>
                                                        <Input
                                                            type="select"
                                                            name="frequency"
                                                            value={this.state.newExpense.frequency}
                                                            onChange={this.handleInputChange}
                                                        >
                                                            <option value="monthly">Monthly</option>
                                                            <option value="quarterly">Quarterly</option>
                                                            <option value="half-yearly">Half Yearly</option>
                                                            <option value="yearly">Yearly</option>
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <Button color="primary" type="submit">
                                                Add Expense
                                            </Button>
                                        </Form>

                                        <div className="table-responsive mt-4">
                                            <Table className="table table-centered table-nowrap mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>Category</th>
                                                        <th>Subcategory</th>
                                                        <th>Description</th>
                                                        <th>Amount</th>
                                                        <th>Due Date</th>
                                                        <th>Frequency</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.expenses.map((expense, index) => (
                                                        <tr key={index}>
                                                            <td>{expense.category}</td>
                                                            <td>{expense.subcategory}</td>
                                                            <td>{expense.description}</td>
                                                            <td>${expense.amount}</td>
                                                            <td>{expense.dueDate}</td>
                                                            <td>{expense.frequency}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>


                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default RecurringExpenses;
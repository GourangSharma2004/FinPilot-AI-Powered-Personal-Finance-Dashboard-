import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button, Table } from "reactstrap";
import ReactApexChart from 'react-apexcharts';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

class OneTimeExpenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Expenses", link: "#" },
                { title: "One Time Expenses", link: "#" }
            ],
            expenses: [],
            newExpense: {
                category: '',
                description: '',
                amount: '',
                date: '',
                paymentMethod: '',
                priority: 'medium',
                attachments: [],
                tags: [],
                notes: ''
            },
            showAnalytics: false,
            totalExpenses: 0,
            categoryWiseTotal: {},
            monthlyTrend: [],
            chartOptions: {
                chart: {
                    type: 'donut',
                    height: 300
                },
                labels: ['Medical', 'Vehicle', 'Home', 'Travel', 'Family', 'Others'],
                colors: ['#34c38f', '#556ee6', '#f46a6a', '#50a5f1', '#f1b44c', '#74788d'],
                legend: {
                    show: true,
                    position: 'bottom',
                    horizontalAlign: 'center',
                    verticalAlign: 'middle',
                    floating: false,
                    fontSize: '14px',
                    offsetX: 0
                },
                responsive: [{
                    breakpoint: 600,
                    options: {
                        chart: {
                            height: 240
                        },
                        legend: {
                            show: false
                        },
                    }
                }]
            },
            chartSeries: [44, 55, 41, 17, 15, 35],
            barData: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Monthly Expenses',
                    data: [65, 59, 80, 81, 56, 55],
                    backgroundColor: '#556ee6',
                }]
            },
            barOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Monthly Expense Trend'
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            expenses: [...prevState.expenses, prevState.newExpense],
            newExpense: {
                category: '',
                description: '',
                amount: '',
                date: '',
                frequency: 'monthly'
            }
        }));
    }

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs title="One Time Expenses" breadcrumbItems={this.state.breadcrumbItems} />
                        
                        <Row className="mb-4">
                            <Col xl={6}>
                                <Card>
                                    <CardBody>
                                        <div className="d-flex align-items-center mb-3">
                                            <h4 className="card-title flex-grow-1">Expense Distribution</h4>
                                        </div>
                                        <div style={{ height: '350px' }}>
                                            <ReactApexChart
                                                options={this.state.chartOptions}
                                                series={this.state.chartSeries}
                                                type="donut"
                                                height="100%"
                                            />
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col xl={6}>
                                <Card>
                                    <CardBody>
                                        <div className="d-flex align-items-center mb-3">
                                            <h4 className="card-title flex-grow-1">Monthly Trend</h4>
                                        </div>
                                        <div style={{ height: '350px' }}>
                                            <Bar
                                                data={this.state.barData}
                                                options={{
                                                    ...this.state.barOptions,
                                                    maintainAspectRatio: false,
                                                    plugins: {
                                                        ...this.state.barOptions.plugins,
                                                        legend: {
                                                            display: true,
                                                            position: 'top',
                                                            labels: {
                                                                boxWidth: 10,
                                                                padding: 20
                                                            }
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
                                        <h4 className="card-title mb-4">Add New One Time Expense</h4>
                                        
                                        <Form onSubmit={this.handleSubmit}>
                                            <Row>
                                                <Col md={3}>
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
                                                            <option value="Medical Emergency">Medical Emergency</option>
                                            <option value="Vehicle Repair">Vehicle Repair</option>
                                            <option value="Home Repair">Home Repair</option>
                                            <option value="Travel">Travel</option>
                                            <option value="Family Event">Family Event</option>
                                            <option value="Penalties">Penalties/Fines</option>
                                            <option value="Losses">Losses</option>
                                            <option value="Education Emergency">Education Emergency</option>
                                            <option value="Legal Expenses">Legal Expenses</option>
                                            <option value="Natural Disaster">Natural Disaster</option>
                                            <option value="Technology Replacement">Technology Replacement</option>
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                                
                                                <Col md={3}>
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
                                                        <Label>Date</Label>
                                                        <Input
                                                            type="date"
                                                            name="date"
                                                            value={this.state.newExpense.date}
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
                                                            required
                                                        >
                                                            <option value="daily">Daily</option>
                                                            <option value="weekly">Weekly</option>
                                                            <option value="monthly">Monthly</option>
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
                                                        <th>Description</th>
                                                        <th>Amount</th>
                                                        <th>Date</th>
                                                        <th>Frequency</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.expenses.map((expense, index) => (
                                                        <tr key={index}>
                                                            <td>{expense.category}</td>
                                                            <td>{expense.description}</td>
                                                            <td>${expense.amount}</td>
                                                            <td>{expense.date}</td>
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

export default OneTimeExpenses;
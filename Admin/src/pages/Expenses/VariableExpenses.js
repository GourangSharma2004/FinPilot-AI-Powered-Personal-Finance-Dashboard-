import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button, Table } from "reactstrap";
import ReactApexChart from 'react-apexcharts';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);

class VariableExpenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems: [
                { title: "Expenses", link: "#" },
                { title: "Variable Expenses", link: "#" }
            ],
            expenses: [],
            newExpense: {
                category: '',
                description: '',
                amount: '',
                date: '',
                paymentMethod: '',
                location: '',
                budgetLimit: '',
                tags: [],
                receiptImage: null,
                isRecurring: false,
                notes: ''
            },
            monthlyBudget: {},
            spendingTrends: [],
            categoryAlerts: {},
            savingsSuggestions: [],
            areaChartOptions: {
                chart: {
                    height: 350,
                    type: 'area',
                    toolbar: {
                        show: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth',
                    width: 3
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
                },
                colors: ['#556ee6'],
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        inverseColors: false,
                        opacityFrom: 0.45,
                        opacityTo: 0.05,
                        stops: [20, 100, 100, 100]
                    }
                }
            },
            areaChartSeries: [{
                name: 'Monthly Spending',
                data: [45, 52, 38, 45, 19, 23]
            }],
            lineData: {
                labels: ['Shopping', 'Groceries', 'Pet Care', 'Dining', 'Travel', 'Others'],
                datasets: [{
                    label: 'Category-wise Spending',
                    data: [65, 59, 80, 81, 56, 55],
                    fill: false,
                    borderColor: '#34c38f',
                    tension: 0.1
                }]
            },
            lineOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: 'Spending by Category'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
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
                        <Breadcrumbs title="Variable Expenses" breadcrumbItems={this.state.breadcrumbItems} />
                        
                        <Row className="mb-4">
                            <Col xl={6}>
                                <Card>
                                    <CardBody>
                                        <div className="d-flex align-items-center mb-3">
                                            <h4 className="card-title flex-grow-1">Monthly Spending Trend</h4>
                                        </div>
                                        <div style={{ height: '350px' }}>
                                            <ReactApexChart
                                                options={{
                                                    ...this.state.areaChartOptions,
                                                    chart: {
                                                        ...this.state.areaChartOptions.chart,
                                                        background: 'transparent',
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
                                                    }
                                                }}
                                                series={this.state.areaChartSeries}
                                                type="area"
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
                                            <h4 className="card-title flex-grow-1">Category-wise Analysis</h4>
                                        </div>
                                        <div style={{ height: '350px' }}>
                                            <Line
                                                data={this.state.lineData}
                                                options={{
                                                    ...this.state.lineOptions,
                                                    maintainAspectRatio: false,
                                                    plugins: {
                                                        ...this.state.lineOptions.plugins,
                                                        legend: {
                                                            display: true,
                                                            position: 'top',
                                                            labels: {
                                                                boxWidth: 10,
                                                                padding: 20,
                                                                font: {
                                                                    size: 12
                                                                }
                                                            }
                                                        }
                                                    },
                                                    elements: {
                                                        line: {
                                                            tension: 0.4
                                                        },
                                                        point: {
                                                            radius: 4,
                                                            hitRadius: 10,
                                                            hoverRadius: 6
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
                                        <h4 className="card-title mb-4">Add New Variable Expense</h4>
                                        
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
                                                            <option value="Shopping">Shopping</option>
                                            <option value="Groceries">Groceries</option>
                                            <option value="Pet Care">Pet Care</option>
                                            <option value="Gifts and Donations">Gifts and Donations</option>
                                            <option value="Personal Care">Personal Care and Medical</option>
                                            <option value="Dining and Entertainment">Dining and Entertainment</option>
                                            <option value="Travel and Commuting">Travel and Commuting</option>
                                            <option value="Home Maintenance">Home Maintenance</option>
                                            <option value="Clothing">Clothing and Accessories</option>
                                            <option value="Hobbies">Hobbies and Sports</option>
                                            <option value="Education">Education and Training</option>
                                            <option value="Beauty">Beauty and Wellness</option>
                                            <option value="Electronics">Electronics and Gadgets</option>
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
                                                        >
                                                            <option value="daily">Daily</option>
                                                            <option value="weekly">Weekly</option>
                                                            <option value="monthly">Monthly</option>
                                                            <option value="quarterly">Quarterly</option>
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

export default VariableExpenses;
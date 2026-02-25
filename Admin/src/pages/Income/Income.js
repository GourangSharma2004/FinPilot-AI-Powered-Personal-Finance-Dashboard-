import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button, Table, Alert } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';

const Income = () => {
    const [incomeRecords, setIncomeRecords] = useState([
        { id: 1, category: 'Salary', description: 'Monthly salary', amount: 5000, date: '2023-05-01' },
        { id: 2, category: 'Freelancing', description: 'Web development', amount: 1200, date: '2023-05-15' },
    ]);
    
    const [formData, setFormData] = useState({
        category: '',
        amount: '',
        date: '',
        description: ''
    });

    const incomeCategories = [
        'Salary',
        'Freelancing',
        'Passive Income',
        'Business Income',
        'Interest Income',
        'Bonuses',
        'Rewards',
        'Subsidies',
        'Digital Assets'
    ];

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const newRecord = { 
                ...formData, 
                id: Date.now(),
                amount: parseFloat(formData.amount) || 0
            };
            setIncomeRecords([...incomeRecords, newRecord]);
            setFormData({ category: '', amount: '', date: '', description: '' });
        } catch (error) {
            console.error('Error adding income record:', error);
        }
    };

    return (
        <div className="page-content">
            <Container fluid>
                <Breadcrumbs 
                    title="Income" 
                    breadcrumbItems={[
                        { title: 'Dashboard', link: '/dashboard' },
                        { title: 'Income Tracking', link: '#' }
                    ]} 
                />
                
                <Alert color="info">
                    Charts are temporarily disabled. We're working on fixing the chart library integration.
                </Alert>

                <Row>
                    <Col xl={12}>
                        <Card>
                            <CardBody>
                                <h4 className="card-title mb-4">Add New Income</h4>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="category">Category</Label>
                                                <Input 
                                                    type="select" 
                                                    name="category" 
                                                    id="category"
                                                    value={formData.category}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    <option value="">Select Category</option>
                                                    {incomeCategories.map((category, index) => (
                                                        <option key={index} value={category}>{category}</option>
                                                    ))}
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="amount">Amount</Label>
                                                <Input 
                                                    type="number" 
                                                    name="amount" 
                                                    id="amount"
                                                    value={formData.amount}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="date">Date</Label>
                                                <Input 
                                                    type="date" 
                                                    name="date" 
                                                    id="date"
                                                    value={formData.date}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="description">Description</Label>
                                                <Input 
                                                    type="text" 
                                                    name="description" 
                                                    id="description"
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Button color="primary" type="submit" className="mt-2">
                                        Add Income
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col lg="12">
                        <Card>
                            <CardBody>
                                <h4 className="card-title mb-4">Income History</h4>
                                <div className="table-responsive">
                                    <Table className="table table-centered table-nowrap mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Category</th>
                                                <th>Description</th>
                                                <th>Amount</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {incomeRecords.map(record => (
                                                <tr key={record.id}>
                                                    <td>{record.category}</td>
                                                    <td>{record.description}</td>
                                                    <td>${record.amount.toLocaleString()}</td>
                                                    <td>{new Date(record.date).toLocaleDateString()}</td>
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
    );
};

export default Income;
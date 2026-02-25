import React, { useState, useMemo, useCallback } from 'react';
import {
  Container, Row, Col, Card, CardBody, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Table, ListGroup, ListGroupItem, Progress, Badge
} from 'reactstrap';
import { useDropzone } from 'react-dropzone';
import Chart from 'react-apexcharts';

const categories = [
  { key: 'bank', label: 'Bank Transaction', fields: ['description'] },
  { key: 'upi', label: 'UPI', fields: ['to'] },
  { key: 'atm', label: 'ATM Withdrawal', fields: ['location'] },
  { key: 'investment', label: 'Investment', fields: ['type'] },
  { key: 'shopping', label: 'Shopping', fields: ['store'] },
  { key: 'food', label: 'Food', fields: ['restaurant'] },
  { key: 'utilities', label: 'Utilities', fields: ['bill'] },
];

const demoTransactions = [
  { id: 1, category: 'bank', date: '2025-06-01', description: 'Salary', amount: '85000', isForeign: false, type: 'income', tags: ['work', 'salary'] },
  { id: 2, category: 'upi', date: '2025-06-02', to: 'Zomato', amount: '450', isForeign: false, type: 'expense', tags: ['food', 'personal'] },
  { id: 3, category: 'shopping', date: '2025-06-04', store: 'Myntra', amount: '3500', isForeign: false, type: 'expense', tags: ['personal'] },
  { id: 4, category: 'atm', date: '2025-06-05', location: 'HDFC Bank ATM', amount: '5000', isForeign: false, type: 'expense', tags: [] },
  { id: 5, category: 'investment', date: '2025-06-07', type: 'Mutual Fund', amount: '10000', isForeign: false, type: 'expense', tags: ['investment'] },
  { id: 6, category: 'utilities', date: '2025-06-10', bill: 'Electricity Bill', amount: '1200', isForeign: false, type: 'expense', tags: ['home'] },
  { id: 7, category: 'bank', date: '2025-06-12', description: 'Spotify Premium', amount: '119', isForeign: true, type: 'expense', tags: ['personal', 'entertainment'] },
  { id: 8, category: 'food', date: '2025-06-15', restaurant: 'Local Cafe', amount: '600', isForeign: false, type: 'expense', tags: ['food', 'personal'] },
  { id: 9, category: 'upi', date: '2025-06-18', to: 'Uber', amount: '250', isForeign: false, type: 'expense', tags: ['travel'] },
  { id: 10, category: 'bank', date: '2025-06-20', description: 'Freelance Project', amount: '15000', isForeign: false, type: 'income', tags: ['work', 'freelance'] },
  { id: 11, category: 'shopping', date: '2025-06-22', store: 'Amazon', amount: '2200', isForeign: false, type: 'expense', tags: ['home', 'gadgets'] },
  { id: 12, category: 'utilities', date: '2025-06-25', bill: 'Wi-Fi Bill', amount: '999', isForeign: false, type: 'expense', tags: ['home'] },
  { id: 13, category: 'investment', date: '2025-06-28', type: 'Stocks', amount: '7500', isForeign: false, type: 'expense', tags: ['investment'] },
];

const initialFormState = {
  category: 'bank', date: '', amount: '', description: '', location: '', to: '', type: '', store: '', restaurant: '', bill: '', isForeign: false, type: 'expense', tags: ''
};

const Account = () => {
  const [modal, setModal] = useState(false);
  const [transactions, setTransactions] = useState(demoTransactions);
  const [formData, setFormData] = useState(initialFormState);
  const [searchTerm, setSearchTerm] = useState('');
  const [files, setFiles] = useState([]);
  const [accountLimit, setAccountLimit] = useState(100000);
  const [budget, setBudget] = useState(50000);

  const toggleModal = () => setModal(!modal);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFormData({ ...initialFormState, category });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    setTransactions((prev) => [...prev, { ...formData, id: Date.now(), tags: tagsArray }]);
    setFormData({ ...initialFormState, category: formData.category });
    toggleModal();
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const searchLower = searchTerm.toLowerCase();
      const categoryLabel = categories.find(c => c.key === t.category)?.label.toLowerCase();
      const tagsMatch = t.tags && t.tags.some(tag => tag.toLowerCase().includes(searchLower));
      return (
        t.date.toLowerCase().includes(searchLower) ||
        (categoryLabel && categoryLabel.includes(searchLower)) ||
        tagsMatch ||
        Object.values(t).some(val => String(val).toLowerCase().includes(searchLower))
      );
    });
  }, [transactions, searchTerm]);

  const onDrop = useCallback(acceptedFiles => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }))]);
  }, []);

  const removeFile = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const foreignTxns = useMemo(() => transactions.filter(t => t.isForeign).length, [transactions]);

  const totalBalance = useMemo(() => {
    return transactions.reduce((acc, t) => {
      const amount = parseFloat(t.amount || 0);
      return t.type === 'income' ? acc + amount : acc - amount;
    }, 0);
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + parseFloat(t.amount || 0), 0);
  }, [transactions]);

  const budgetProgress = (totalExpenses / budget) * 100;

  const expenseChartData = useMemo(() => {
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const categoryTotals = expenseTransactions.reduce((acc, t) => {
      const categoryLabel = categories.find(c => c.key === t.category)?.label || 'Other';
      acc[categoryLabel] = (acc[categoryLabel] || 0) + parseFloat(t.amount || 0);
      return acc;
    }, {});

    return {
      options: {
        labels: Object.keys(categoryTotals),
        legend: { position: 'bottom' },
        dataLabels: { enabled: true, formatter: (val) => `${Math.round(val)}%` },
        responsive: [{ breakpoint: 480, options: { chart: { width: 200 } } }]
      },
      series: Object.values(categoryTotals)
    };
  }, [transactions]);

  const balanceOverTimeData = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    let balance = 0;
    const dataPoints = sorted.map(t => {
      const amount = parseFloat(t.amount || 0);
      balance = t.type === 'income' ? balance + amount : balance - amount;
      return { x: new Date(t.date).getTime(), y: balance };
    });

    return {
      series: [{ name: 'Balance', data: dataPoints }],
      options: {
        chart: { type: 'area', height: 350, toolbar: { show: false } },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth' },
        xaxis: { type: 'datetime' },
        yaxis: { labels: { formatter: (val) => `₹${val.toLocaleString('en-IN')}` } },
        tooltip: { x: { format: 'dd MMM yyyy' } },
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.9, stops: [0, 90, 100] } },
      }
    };
  }, [transactions]);

  const renderCategoryFields = () => {
    const selectedCategory = categories.find((c) => c.key === formData.category);
    if (!selectedCategory) return null;
    return selectedCategory.fields.map((field) => (
      <FormGroup key={field}>
        <Label for={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
        <Input type="text" name={field} id={field} value={formData[field]} onChange={handleInputChange} required />
      </FormGroup>
    ));
  };

  const getFileIcon = (fileName) => {
    if (fileName.endsWith('.pdf')) return 'ri-file-pdf-line';
    if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) return 'ri-file-word-line';
    if (fileName.endsWith('.xls') || fileName.endsWith('.xlsx')) return 'ri-file-excel-line';
    return 'ri-file-text-line';
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Row><Col><h2>Account Management</h2><p className="text-muted">A consolidated view of all your account activities.</p></Col></Row>
        <Row>
          <Col md={3}><Card className="mini-stats-wid"><CardBody><div className="d-flex"><div className="flex-grow-1"><p className="text-muted fw-medium">Total Balance</p><h4 className="mb-0">₹{totalBalance.toLocaleString('en-IN')}</h4></div><div className="flex-shrink-0 align-self-center"><div className="mini-stat-icon avatar-sm rounded-circle bg-primary"><span className="avatar-title"><i className="ri-wallet-3-line font-size-24"></i></span></div></div></div></CardBody></Card></Col>
          <Col md={3}><Card className="mini-stats-wid"><CardBody><div className="d-flex"><div className="flex-grow-1"><p className="text-muted fw-medium">Transactions</p><h4 className="mb-0">{transactions.length}</h4></div><div className="flex-shrink-0 align-self-center"><div className="mini-stat-icon avatar-sm rounded-circle bg-primary"><span className="avatar-title"><i className="ri-exchange-dollar-line font-size-24"></i></span></div></div></div></CardBody></Card></Col>
          <Col md={3}><Card className="mini-stats-wid"><CardBody><div className="d-flex"><div className="flex-grow-1"><p className="text-muted fw-medium">Monthly Expenses</p><h4 className="mb-0">₹{totalExpenses.toLocaleString('en-IN')}</h4></div><div className="flex-shrink-0 align-self-center"><div className="mini-stat-icon avatar-sm rounded-circle bg-primary"><span className="avatar-title"><i className="ri-arrow-left-right-line font-size-24"></i></span></div></div></div></CardBody></Card></Col>
          <Col md={3}><Card className="mini-stats-wid"><CardBody><div className="d-flex"><div className="flex-grow-1"><p className="text-muted fw-medium">Foreign Transactions</p><h4 className="mb-0">{foreignTxns}</h4></div><div className="flex-shrink-0 align-self-center"><div className="mini-stat-icon avatar-sm rounded-circle bg-primary"><span className="avatar-title"><i className="ri-global-line font-size-24"></i></span></div></div></div></CardBody></Card></Col>
        </Row>
        <Row className="mt-4"><Col><Card><CardBody><h4 className="card-title mb-4">Balance Over Time</h4><Chart options={balanceOverTimeData.options} series={balanceOverTimeData.series} type="area" height={350} /></CardBody></Card></Col></Row>
        <Row className="mt-4">
          <Col lg={8}>
            <Card><CardBody>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="card-title">All Transactions</h4>
                <Button color="primary" onClick={toggleModal}><i className="ri-add-line me-1"></i> Add New</Button>
              </div>
              <Input type="text" placeholder="Search transactions by date, category, tag..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="mb-3" />
              <div className="table-responsive"><Table className="table-striped table-hover"><thead><tr><th>Date</th><th>Category</th><th>Details</th><th>Tags</th><th>Amount</th></tr></thead><tbody>
                {filteredTransactions.length > 0 ? (filteredTransactions.map((t) => {
                  const category = categories.find(c => c.key === t.category);
                  const details = category.fields.map(f => `${f.charAt(0).toUpperCase() + f.slice(1)}: ${t[f]}`).join(', ');
                  return (
                    <tr key={t.id}>
                      <td>{t.date}</td>
                      <td>
                        {t.type === 'income' ? <i className="ri-arrow-up-circle-fill text-success me-1"></i> : <i className="ri-arrow-down-circle-fill text-danger me-1"></i>}
                        {category ? category.label : 'N/A'}
                      </td>
                      <td>{details}</td>
                      <td>{t.tags && t.tags.map(tag => <Badge color="light" className="me-1" key={tag}>{tag}</Badge>)}</td>
                      <td className={t.type === 'income' ? 'text-success' : 'text-danger'}>₹{parseFloat(t.amount).toLocaleString('en-IN')}</td>
                    </tr>
                  );
                })) : (<tr><td colSpan="5" className="text-center">No transactions found.</td></tr>)}
              </tbody></Table></div>
            </CardBody></Card>
          </Col>
          <Col lg={4}>
            <Card><CardBody><h4 className="card-title mb-4">Monthly Budget</h4>
              <FormGroup><Label for="budget">Set Budget (₹)</Label><Input type="number" name="budget" id="budget" value={budget} onChange={(e) => setBudget(parseFloat(e.target.value) || 0)} /></FormGroup>
              <div className="mt-3"><p className="mb-1">₹{totalExpenses.toLocaleString('en-IN')} spent of ₹{budget.toLocaleString('en-IN')}</p><Progress value={budgetProgress} color={budgetProgress > 100 ? 'danger' : 'success'} style={{ height: '10px' }} /></div>
            </CardBody></Card>
            <Card className="mt-4"><CardBody><h4 className="card-title mb-4">Expense Distribution</h4><Chart options={expenseChartData.options} series={expenseChartData.series} type="pie" width="100%" /></CardBody></Card>
            <Card className="mt-4"><CardBody><h4 className="card-title">Upload Documents</h4>
              <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed #007bff', padding: '20px', textAlign: 'center', cursor: 'pointer', borderRadius: '5px' }}><input {...getInputProps()} /><i className="ri-upload-cloud-2-line font-size-24 text-primary"></i><p className="mt-2">Drag & drop or click to upload</p></div>
              <ListGroup flush className="mt-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {files.map(file => (
                  <ListGroupItem key={file.name} className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      {file.type.startsWith('image/') ? <img src={file.preview} alt="preview" style={{ width: '30px', height: '30px', marginRight: '10px', objectFit: 'cover' }} /> : <i className={`${getFileIcon(file.name)} font-size-20 me-2`}></i>}
                      <span className="text-truncate" style={{ maxWidth: '150px' }}>{file.name}</span>
                    </div>
                    <Button close onClick={() => removeFile(file.name)} />
                  </ListGroupItem>
                ))}
              </ListGroup>
            </CardBody></Card>
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={toggleModal} centered>
          <ModalHeader toggle={toggleModal}>Add New Transaction</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit}>
              <Row><Col md={6}><FormGroup><Label for="type">Type</Label><Input type="select" name="type" id="type" value={formData.type} onChange={handleInputChange}><option value="expense">Expense</option><option value="income">Income</option></Input></FormGroup></Col>
              <Col md={6}><FormGroup><Label for="category">Category</Label><Input type="select" name="category" id="category" value={formData.category} onChange={handleCategoryChange}>{categories.map((cat) => (<option key={cat.key} value={cat.key}>{cat.label}</option>))}</Input></FormGroup></Col></Row>
              <FormGroup><Label for="date">Date</Label><Input type="date" name="date" id="date" value={formData.date} onChange={handleInputChange} required /></FormGroup>
              {renderCategoryFields()}
              <FormGroup><Label for="amount">Amount (₹)</Label><Input type="number" name="amount" id="amount" value={formData.amount} onChange={handleInputChange} required placeholder="0.00" /></FormGroup>
              <FormGroup><Label for="tags">Tags (comma-separated)</Label><Input type="text" name="tags" id="tags" value={formData.tags} onChange={handleInputChange} placeholder="e.g. work, personal" /></FormGroup>
              <FormGroup check className="mb-3"><Input type="checkbox" name="isForeign" id="isForeign" checked={formData.isForeign} onChange={handleInputChange} /><Label check for="isForeign">This is a foreign transaction</Label></FormGroup>
              <div className="d-flex justify-content-end"><Button color="secondary" onClick={toggleModal} className="me-2">Cancel</Button><Button color="primary" type="submit">Add Transaction</Button></div>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    </div>
  );
};

export default Account;
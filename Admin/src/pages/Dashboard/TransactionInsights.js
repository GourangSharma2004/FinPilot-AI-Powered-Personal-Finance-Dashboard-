import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Table, Badge } from 'reactstrap';
import ReactApexChart from 'react-apexcharts';

const TransactionInsights = () => {
  const [activeTab, setActiveTab] = useState('expenses');
  
  // Sample transaction data in INR
  const transactionData = {
    expenses: [
      { id: 1, category: 'Groceries', amount: 12500, date: '2023-07-05', type: 'debit', account: 'HDFC Bank' },
      { id: 2, category: 'Dining', amount: 3500, date: '2023-07-04', type: 'debit', account: 'SBI Card' },
      { id: 3, category: 'Transport', amount: 2800, date: '2023-07-03', type: 'debit', account: 'PayTM Wallet' },
      { id: 4, category: 'Shopping', amount: 8500, date: '2023-07-02', type: 'debit', account: 'Amazon Pay' },
      { id: 5, category: 'Bills', amount: 6400, date: '2023-07-01', type: 'debit', account: 'HDFC Bank' },
    ],
    income: [
      { id: 1, source: 'Salary', amount: 125000, date: '2023-07-01', type: 'credit', account: 'HDFC Bank' },
      { id: 2, source: 'Freelance', amount: 35000, date: '2023-07-03', type: 'credit', account: 'PayPal' },
      { id: 3, source: 'Dividends', amount: 8200, date: '2023-07-05', type: 'credit', account: 'ICICI Direct' },
      { id: 4, source: 'Rental', amount: 45000, date: '2023-07-02', type: 'credit', account: 'HDFC Bank' },
    ]
  };

  // Calculate category-wise totals
  const categoryTotals = transactionData.expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  // Chart options
  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: {
      categories: Object.keys(categoryTotals),
      labels: { style: { fontSize: '12px', fontWeight: 500 } }
    },
    yaxis: {
      title: { text: 'Amount (₹)', style: { fontSize: '12px' } },
      labels: {
        formatter: (val) => `₹${val.toLocaleString()}`,
        style: { fontSize: '11px' }
      }
    },
    fill: { opacity: 1 },
    tooltip: {
      y: {
        formatter: (val) => `₹${val.toLocaleString()}`
      }
    },
    colors: ['#556ee6', '#34c38f', '#f1b44c', '#f46a6a', '#50a5f1']
  };

  const chartSeries = [{
    name: 'Amount Spent',
    data: Object.values(categoryTotals)
  }];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <CardTitle className="h4 mb-0">Transaction Insights</CardTitle>
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn btn-sm ${activeTab === 'expenses' ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setActiveTab('expenses')}
            >
              Expenses
            </button>
            <button
              type="button"
              className={`btn btn-sm ${activeTab === 'income' ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setActiveTab('income')}
            >
              Income
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-5">
            <div className="table-responsive">
              <Table className="table-centered table-nowrap mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Category</th>
                    <th className="text-end">Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionData[activeTab].map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 me-2">
                            <div 
                              className="rounded-circle d-flex align-items-center justify-content-center" 
                              style={{ 
                                width: '28px', 
                                height: '28px', 
                                backgroundColor: item.type === 'debit' ? 'rgba(244, 106, 106, 0.1)' : 'rgba(52, 195, 143, 0.1)' 
                              }}
                            >
                              <i 
                                className={`ri-${item.type === 'debit' ? 'arrow-down-line' : 'arrow-up-line'} fs-16 ${item.type === 'debit' ? 'text-danger' : 'text-success'}`}
                              ></i>
                            </div>
                          </div>
                          <div>
                            <h6 className="mb-0">{item.category || item.source}</h6>
                            <small className="text-muted">{item.account}</small>
                          </div>
                        </div>
                      </td>
                      <td className={`text-end fw-medium ${item.type === 'debit' ? 'text-danger' : 'text-success'}`}>
                        {item.type === 'debit' ? '-' : ''}{formatCurrency(item.amount)}
                      </td>
                      <td>
                        <span className="text-muted">
                          {new Date(item.date).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short'
                          })}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="table-light">
                  <tr>
                    <th>Total</th>
                    <th className="text-end">
                      {formatCurrency(transactionData[activeTab].reduce((sum, item) => sum + item.amount, 0))}
                    </th>
                    <th></th>
                  </tr>
                </tfoot>
              </Table>
            </div>
          </div>
          <div className="col-lg-7">
            {activeTab === 'expenses' ? (
              <div className="mt-4 mt-lg-0">
                <h5 className="mb-3">Spending by Category</h5>
                <ReactApexChart 
                  options={chartOptions} 
                  series={chartSeries} 
                  type="bar" 
                  height={350} 
                />
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100">
                <div className="text-center">
                  <div className="avatar-lg mx-auto mb-4">
                    <div className="avatar-title bg-soft-primary text-primary rounded-circle font-size-24">
                      <i className="ri-money-dollar-circle-line"></i>
                    </div>
                  </div>
                  <h5>Income Sources</h5>
                  <p className="text-muted">Visualization of income sources will be displayed here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TransactionInsights;

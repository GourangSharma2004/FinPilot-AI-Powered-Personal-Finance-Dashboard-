import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, CardTitle } from 'reactstrap';

const ExpenseSummary = () => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();

  // Sample data for current month's expenses
  const expenses = [
    { category: 'Housing', amount: 25000, budget: 23000, icon: 'ri-home-4-line', color: '#556ee6' },
    { category: 'Food & Dining', amount: 18500, budget: 15000, icon: 'ri-restaurant-line', color: '#f1b44c' },
    { category: 'Transportation', amount: 8500, budget: 8000, icon: 'ri-car-line', color: '#50a5f1' },
    { category: 'Utilities', amount: 6500, budget: 7000, icon: 'ri-flashlight-line', color: '#34c38f' },
    { category: 'Entertainment', amount: 4500, budget: 5000, icon: 'ri-movie-2-line', color: '#f46a6a' },
    { category: 'Shopping', amount: 12500, budget: 10000, icon: 'ri-shopping-bag-line', color: '#ff6b6b' },
    { category: 'Healthcare', amount: 3200, budget: 3000, icon: 'ri-heart-pulse-line', color: '#f06595' },
    { category: 'Others', amount: 5800, budget: 5000, icon: 'ri-more-line', color: '#9775fa' }
  ];

  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const totalBudget = expenses.reduce((sum, item) => sum + item.budget, 0);
  const remainingBudget = totalBudget - totalExpense;
  const budgetUtilization = Math.min(100, (totalExpense / totalBudget) * 100);

  // Sort expenses by amount (highest first)
  const sortedExpenses = [...expenses].sort((a, b) => b.amount - a.amount);

  // Prepare data for chart
  const chartSeries = [{
    name: 'Spent',
    data: expenses.map(exp => exp.amount)
  }];

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 250,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        endingShape: 'rounded',
        borderRadius: 4,
        dataLabels: {
          position: 'top',
        },
      },
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
      categories: expenses.map(exp => exp.category),
      labels: {
        style: {
          fontSize: '11px',
          fontFamily: 'Poppins, sans-serif',
          colors: '#6c757d'
        },
        formatter: function(value) {
          return value.length > 10 ? value.substring(0, 8) + '..' : value;
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
    },
    yaxis: {
      labels: {
        formatter: function(value) {
          return '₹' + value.toLocaleString('en-IN');
        },
        style: {
          fontSize: '11px',
          colors: '#6c757d'
        }
      },
      title: {
        text: 'Amount (₹)',
        style: {
          fontSize: '12px',
          fontWeight: 500,
          color: '#6c757d'
        }
      }
    },
    fill: {
      opacity: 1,
      type: 'solid',
      colors: expenses.map(exp => exp.color)
    },
    colors: expenses.map(exp => exp.color),
    tooltip: {
      y: {
        formatter: function(value) {
          return '₹' + value.toLocaleString('en-IN');
        }
      },
      marker: {
        show: false
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Poppins, sans-serif'
      },
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        const amount = series[seriesIndex][dataPointIndex];
        const category = expenses[dataPointIndex];
        const isOver = category.amount > category.budget;
        const diff = Math.abs(((category.amount - category.budget) / category.budget) * 100).toFixed(1);
        
        return (
          '<div class="p-2">' +
          `  <div class="d-flex align-items-center mb-2">
               <i class="${category.icon} font-size-16 me-2" style="color: ${category.color}"></i>
               <h6 class="mb-0">${category.category}</h6>
             </div>` +
          `  <div class="d-flex justify-content-between">
               <span class="text-muted me-3">Budget:</span>
               <span>₹${category.budget.toLocaleString('en-IN')}</span>
             </div>` +
          `  <div class="d-flex justify-content-between">
               <span class="text-muted me-3">Spent:</span>
               <span class="fw-medium">₹${category.amount.toLocaleString('en-IN')}</span>
             </div>` +
          `  <div class="d-flex justify-content-between">
               <span class="text-muted me-3">Status:</span>
               <span class="${isOver ? 'text-danger' : 'text-success'}">
                 ${isOver ? 'Over by ' + diff + '%' : 'Under by ' + diff + '%'}
               </span>
             </div>` +
          '</div>'
        );
      }
    },
    grid: {
      borderColor: '#f1f1f1',
      strokeDashArray: 3
    }
  };

  return (
    <Card className="h-100">
      <CardBody className="p-0">
        <div className="p-3 border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1">Monthly Expenses</h5>
              <p className="text-muted mb-0">{currentMonth} {currentYear}</p>
            </div>
            <div className="text-end">
              <h3 className="mb-0 text-danger">₹{totalExpense.toLocaleString('en-IN')}</h3>
              <p className="text-muted mb-0">
                <span className={remainingBudget >= 0 ? 'text-success' : 'text-danger'}>
                  {remainingBudget >= 0 
                    ? '₹' + remainingBudget.toLocaleString('en-IN') + ' left' 
                    : '₹' + Math.abs(remainingBudget).toLocaleString('en-IN') + ' over'}
                </span>
                <span className="mx-1">•</span>
                {budgetUtilization.toFixed(0)}% of budget
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-3">
          <div style={{ height: '250px' }}>
            <ReactApexChart 
              options={chartOptions} 
              series={chartSeries} 
              type="bar" 
              height="100%" 
            />
          </div>
          
          <div className="mt-3">
            <h6 className="mb-3">Top Spending Categories</h6>
            <div className="d-flex flex-column gap-2">
              {sortedExpenses.slice(0, 3).map((expense, index) => (
                <div key={index} className="d-flex align-items-center">
                  <div className="flex-shrink-0 me-2">
                    <div className="avatar-xs">
                      <div 
                        className="avatar-title rounded-circle font-size-14"
                        style={{ backgroundColor: `${expense.color}15`, color: expense.color }}
                      >
                        <i className={expense.icon}></i>
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center">
                      <span className="text-truncate me-2">{expense.category}</span>
                      <span className="ms-auto">
                        <span className="text-muted">₹{expense.amount.toLocaleString('en-IN')}</span>
                        <span className={`ms-2 ${expense.amount > expense.budget ? 'text-danger' : 'text-success'}`}>
                          ({((expense.amount - expense.budget) / expense.budget * 100).toFixed(0)}% {expense.amount > expense.budget ? '↑' : '↓'})
                        </span>
                      </span>
                    </div>
                    <div className="progress mt-1" style={{ height: '4px' }}>
                      <div 
                        className="progress-bar" 
                        role="progressbar"
                        style={{
                          width: `${(expense.amount / totalExpense * 100)}%`,
                          backgroundColor: expense.color
                        }}
                        aria-valuenow={expense.amount}
                        aria-valuemin="0"
                        aria-valuemax={totalExpense}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-light border-top">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="text-muted">Budget:</span>{' '}
              <span className="fw-medium">₹{totalBudget.toLocaleString('en-IN')}</span>
            </div>
            <a href="#" className="text-primary">
              View All <i className="ri-arrow-right-s-line ms-1"></i>
            </a>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ExpenseSummary;

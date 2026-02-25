import React from 'react';
import { Card, CardBody, CardTitle, Table, Badge } from 'reactstrap';

const bills = [
  { 
    id: 1, 
    name: 'Home Loan EMI', 
    dueDate: 'Jul 10, 2023', 
    amount: 45250, 
    status: 'pending',
    icon: 'ri-bank-line',
    category: 'loan'
  },
  { 
    id: 2, 
    name: 'Car Loan EMI', 
    dueDate: 'Jul 12, 2023', 
    amount: 18500, 
    status: 'upcoming',
    icon: 'ri-car-line',
    category: 'loan'
  },
  { 
    id: 3, 
    name: 'Car Insurance', 
    dueDate: 'Jul 15, 2023', 
    amount: 26500, 
    status: 'upcoming',
    icon: 'ri-shield-check-line',
    category: 'insurance'
  },
  { 
    id: 4, 
    name: 'Electricity Bill', 
    dueDate: 'Jul 18, 2023', 
    amount: 7200, 
    status: 'upcoming',
    icon: 'ri-flashlight-line',
    category: 'utility'
  },
  { 
    id: 5, 
    name: 'Credit Card Payment', 
    dueDate: 'Jul 20, 2023', 
    amount: 38450, 
    status: 'pending',
    icon: 'ri-bank-card-line',
    category: 'credit'
  },
  { 
    id: 6, 
    name: 'Internet Bill', 
    dueDate: 'Jul 25, 2023', 
    amount: 1189, 
    status: 'upcoming',
    icon: 'ri-wifi-line',
    category: 'utility'
  },
  { 
    id: 7, 
    name: 'Mobile Recharge', 
    dueDate: 'Jul 28, 2023', 
    amount: 299, 
    status: 'upcoming',
    icon: 'ri-smartphone-line',
    category: 'utility'
  }
];

const statusColors = {
  pending: 'warning',
  upcoming: 'info',
  paid: 'success'
};

const categoryIcons = {
  loan: 'ri-bank-line text-primary',
  insurance: 'ri-shield-check-line text-success',
  utility: 'ri-flashlight-line text-warning',
  credit: 'ri-bank-card-line text-danger',
  other: 'ri-file-list-3-line text-secondary'
};

const formatCurrency = (amount) => {
  return '₹' + amount.toLocaleString('en-IN');
};

const UpcomingBills = () => (
  <Card>
    <CardBody>
      <CardTitle className="h4 mb-4 d-flex justify-content-between align-items-center">
        Upcoming Bills & EMIs
        <a href="/bills" className="btn btn-sm btn-outline-primary">View All</a>
      </CardTitle>
      <div className="table-responsive">
        <Table className="table-centered table-nowrap align-middle">
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id} className="border-bottom">
                <td style={{ width: '10%' }}>
                  <div className="avatar-xs">
                    <div className={`avatar-title rounded-circle ${categoryIcons[bill.category] || categoryIcons.other}`}>
                      <i className={bill.icon}></i>
                    </div>
                  </div>
                </td>
                <td style={{ width: '40%' }}>
                  <h5 className="font-size-14 mb-1">{bill.name}</h5>
                  <p className="text-muted mb-0">
                    <i className="ri-calendar-line align-middle me-1"></i>
                    {bill.dueDate}
                  </p>
                </td>
                <td className="text-end">
                  <h5 className="mb-0">{formatCurrency(bill.amount)}</h5>
                </td>
                <td className="text-end">
                  <Badge 
                    className="badge-soft-primary font-size-12" 
                    color={statusColors[bill.status]}
                    style={{ minWidth: '70px' }}
                  >
                    <i className={`ri-${bill.status === 'pending' ? 'time-line' : 'notification-line'} align-middle me-1`}></i>
                    {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </CardBody>
  </Card>
);

export default UpcomingBills;

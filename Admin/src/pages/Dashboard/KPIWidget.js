import React from 'react';
import { Card, CardBody } from 'reactstrap';

const KPIWidget = ({ title, value, icon, color = 'primary' }) => (
  <Card>
    <CardBody>
      <div className="d-flex align-items-center">
        <div className="flex-grow-1">
          <p className="text-truncate text-muted mb-2">{title}</p>
          <h4 className="mb-0">{value}</h4>
        </div>
        <div className={`text-${color}`}>
          <i className={`${icon} font-size-24`}></i>
        </div>
      </div>
    </CardBody>
  </Card>
);

export default KPIWidget;

import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, CardTitle } from 'reactstrap';

// TODO: replace hard-coded data with selectors once store slices are wired
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const incomeSeries = [1200, 1500, 1100, 1800, 1700, 2100];

const IncomeSummary = () => {
  const options = {
    chart: { toolbar: { show: false } },
    stroke: { width: 3, curve: 'smooth' },
    xaxis: { categories: months },
    colors: ['#45cb85'],
    dataLabels: { enabled: false },
  };

  const series = [{ name: 'Income', data: incomeSeries }];

  return (
    <Card>
      <CardBody>
        <CardTitle className="h4 mb-4">Income – last 6 months</CardTitle>
        <ReactApexChart options={options} series={series} type="area" height={260} />
      </CardBody>
    </Card>
  );
};

export default IncomeSummary;

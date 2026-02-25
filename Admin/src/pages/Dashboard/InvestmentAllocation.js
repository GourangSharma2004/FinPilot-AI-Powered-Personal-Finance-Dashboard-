import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';

const InvestmentAllocation = () => {
  const [timeRange, setTimeRange] = useState('1y');
  
  const investmentData = {
    '1m': {
      stocks: 12500,
      mutualFunds: 18500,
      fds: 7500,
      bonds: 6200,
      crypto: 3800,
      total: 38500,
      change: 4.2
    },
    '6m': {
      stocks: 11800,
      mutualFunds: 17200,
      fds: 7800,
      bonds: 6000,
      crypto: 3500,
      total: 46300,
      change: 8.7
    },
    '1y': {
      stocks: 15800,
      mutualFunds: 22500,
      fds: 8200,
      bonds: 7100,
      crypto: 5100,
      total: 58700,
      change: 15.3
    },
    'all': {
      stocks: 18500,
      mutualFunds: 24800,
      fds: 9200,
      bonds: 7800,
      crypto: 6200,
      total: 66500,
      change: 22.1
    }
  };

  const currentData = investmentData[timeRange];
  
  const options = {
    chart: {
      type: 'donut',
      toolbar: {
        show: false
      }
    },
    labels: ['Stocks', 'Mutual Funds', 'Fixed Deposits', 'Bonds', 'Crypto'],
    colors: ['#556ee6', '#34c38f', '#f1b44c', '#f46a6a', '#50a5f1'],
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      itemMargin: {
        horizontal: 5,
        vertical: 10
      },
      markers: {
        radius: 2,
        width: 8,
        height: 8
      },
      fontSize: '12px',
      fontWeight: 500
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              fontWeight: 600,
              color: '#495057',
              offsetY: 10
            },
            value: {
              show: true,
              fontSize: '20px',
              fontWeight: 700,
              color: '#343a40',
              offsetY: -10,
              formatter: function(val) {
                return '$' + Math.round(val).toLocaleString();
              }
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total Value',
              fontSize: '14px',
              fontWeight: 500,
              color: '#74788d',
              formatter: function(w) {
                return '$' + currentData.total.toLocaleString();
              }
            }
          }
        },
        customScale: 0.9
      }
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      y: {
        formatter: function(value, { seriesIndex, w }) {
          const total = w.globals.series.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `$${value.toLocaleString()} (${percentage}%)`;
        }
      },
      style: {
        fontSize: '12px'
      },
      marker: {
        show: true
      },
      fillSeriesColor: false
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: {
          height: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const series = [
    currentData.stocks,
    currentData.mutualFunds,
    currentData.fds,
    currentData.bonds,
    currentData.crypto
  ];

  const timeRanges = [
    { label: '1M', value: '1m' },
    { label: '6M', value: '6m' },
    { label: '1Y', value: '1y' },
    { label: 'ALL', value: 'all' }
  ];

  return (
    <Card>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <CardTitle className="h4 mb-0">Investment Portfolio</CardTitle>
          <div className="btn-group" role="group" aria-label="Time Range">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                type="button"
                className={`btn btn-sm ${timeRange === range.value ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => setTimeRange(range.value)}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            height={280}
          />
          
          <div className="mt-3">
            <div className="d-flex justify-content-center align-items-center">
              <h3 className="mb-0">${currentData.total.toLocaleString()}</h3>
              <span className={`badge bg-${currentData.change >= 0 ? 'success' : 'danger'} ms-2`}>
                <i className={`ri-arrow-${currentData.change >= 0 ? 'up' : 'down'}-line align-middle`}></i>
                {Math.abs(currentData.change)}%
              </span>
            </div>
            <p className="text-muted mb-0">Total Portfolio Value</p>
            
            <div className="mt-3">
              <Row className="g-2">
                {series.map((value, index) => {
                  const label = options.labels[index];
                  const color = options.colors[index];
                  const percentage = ((value / currentData.total) * 100).toFixed(1);
                  
                  return (
                    <Col key={index} xs={6} className="text-start">
                      <div className="d-flex align-items-center mb-2">
                        <div className="flex-shrink-0 me-2" style={{ width: '10px', height: '10px', backgroundColor: color, borderRadius: '50%' }}></div>
                        <div className="text-truncate" style={{ fontSize: '12px' }}>
                          {label}
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="fw-medium">${value.toLocaleString()}</div>
                        <small className="text-muted">{percentage}%</small>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default InvestmentAllocation;

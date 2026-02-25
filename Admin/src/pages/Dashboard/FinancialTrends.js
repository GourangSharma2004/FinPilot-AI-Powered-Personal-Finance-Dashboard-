import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, CardTitle } from 'reactstrap';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const FinancialTrends = () => {
  // Realistic financial data for Indian context (in INR)
  const incomeData = [
    125000, 118000, 135000, 128000, 142000, 138000, // Jan-Jun
    145000, 152000, 148000, 155000, 162000, 175000  // Jul-Dec
  ];

  const expenseData = [
    85000, 92000, 78000, 95000, 105000, 98000,      // Jan-Jun
    112000, 108000, 115000, 122000, 118000, 125000  // Jul-Dec
  ];

  const savingsData = incomeData.map((income, i) => income - expenseData[i]);

  const options = {
    chart: { 
      type: 'area',
      stacked: false,
      height: 380,
      toolbar: { 
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: true
        },
        export: {
          csv: {
            filename: 'income-vs-expense',
            headerCategory: 'Month'
          },
          svg: {
            filename: 'income-vs-expense',
          },
          png: {
            filename: 'income-vs-expense',
          }
        }
      },
      zoom: { 
        enabled: true,
        type: 'x',
        autoScaleYaxis: true
      },
      foreColor: '#6c757d',
      fontFamily: 'Poppins, sans-serif',
    },
    stroke: { 
      width: 3, 
      curve: 'smooth',
      lineCap: 'round'
    },
    xaxis: { 
      categories: months,
      labels: {
        style: {
          fontSize: '11px',
          fontWeight: 500,
          cssClass: 'apexcharts-xaxis-label'
        }
      },
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      },
      tooltip: {
        enabled: false
      }
    },
    yaxis: [
      {
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: '#34c38f'
        },
        labels: {
          formatter: (value) => `₹${(value / 1000).toFixed(0)}k`,
          style: {
            colors: '#6c757d',
            fontSize: '11px'
          }
        },
        title: {
          text: 'Amount (₹)',
          style: {
            color: '#6c757d',
            fontSize: '12px',
            fontWeight: 500,
          }
        }
      },
      {
        opposite: true,
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: '#f46a6a'
        },
        labels: {
          formatter: (value) => `₹${(value / 1000).toFixed(0)}k`,
          style: {
            colors: '#6c757d',
            fontSize: '11px'
          }
        },
        title: {
          text: 'Savings (₹)',
          style: {
            color: '#6c757d',
            fontSize: '12px',
            fontWeight: 500,
          }
        }
      }
    ],
    colors: ['#34c38f', '#f46a6a', '#556ee6'],
    legend: { 
      position: 'top',
      horizontalAlign: 'left',
      offsetY: -5,
      markers: {
        radius: 2,
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: '#fff',
        offsetX: -5,
        offsetY: 0
      },
      itemMargin: {
        horizontal: 15,
        vertical: 5
      },
      fontSize: '12px',
      fontWeight: 500,
      onItemClick: {
        toggleDataSeries: false
      },
      onItemHover: {
        highlightDataSeries: true
      },
      formatter: function(seriesName, opts) {
        // Show only main series in legend
        const mainSeries = ['Salary', 'Freelance', 'Other Income', 'Housing', 'Food', 'Transport', 'Utilities', 'Other Expenses', 'Savings', 'Savings Rate %'];
        if (mainSeries.includes(seriesName)) {
          return [
            '<span class="apexcharts-legend-marker" style="background: ' + opts.w.globals.colors[opts.seriesIndex] + '"></span>',
            '<span class="apexcharts-legend-text">' + seriesName + '</span>'
          ];
        }
        return '';
      }
    },
    dataLabels: { 
      enabled: false 
    },
    fill: { 
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    },
    tooltip: { 
      shared: true,
      intersect: false,
      y: {
        formatter: (value) => `₹${value.toLocaleString('en-IN')}`
      },
      marker: {
        show: true,
      },
      style: {
        fontSize: '12px',
        fontFamily: 'Poppins, sans-serif'
      },
      x: {
        show: true,
        format: 'MMM yyyy'
      },
      fixed: {
        enabled: false,
        position: 'topRight',
        offsetX: 0,
        offsetY: 30,
      },
    },
    grid: {
      borderColor: '#f1f1f1',
      strokeDashArray: 3,
      yaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
    },
    markers: {
      size: 0,
      strokeWidth: 2,
      strokeColors: ['#fff'],
      hover: {
        size: 5,
      }
    },
    annotations: {
      position: 'front',
      yaxis: [
        {
          y: 0,
          borderColor: '#dee2e6',
          strokeDashArray: 0,
          borderWidth: 1,
          opacity: 0.5
        }
      ]
    }
  };

  const series = [
    { 
      name: 'Income', 
      data: incomeData,
      type: 'area',
      fill: {
        gradient: {
          shadeIntensity: 0.9,
          opacityFrom: 0.7,
          opacityTo: 0.3,
          stops: [0, 100]
        }
      }
    },
    { 
      name: 'Expenses', 
      data: expenseData,
      type: 'area',
      fill: {
        gradient: {
          shadeIntensity: 0.9,
          opacityFrom: 0.7,
          opacityTo: 0.3,
          stops: [0, 100]
        }
      }
    },
    {
      name: 'Savings',
      data: savingsData,
      type: 'line',
      yAxisIndex: 1,
      stroke: {
        width: 3,
        dashArray: 0
      },
      markers: {
        size: 5,
        hover: {
          size: 7,
        }
      },
      fill: {
        type: 'solid',
        opacity: 0
      }
    }
  ];

  return (
    <Card>
      <CardBody>
        <CardTitle className="h4 mb-4">Income vs Expenses</CardTitle>
        <ReactApexChart 
          options={options} 
          series={series} 
          type="area" 
          height={320} 
        />
      </CardBody>
    </Card>
  );
};

export default FinancialTrends;

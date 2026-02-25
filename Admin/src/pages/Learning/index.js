import React, { useState } from 'react';
import { Card, CardBody, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Alert } from 'reactstrap';
import classnames from 'classnames';
import { withTranslation } from 'react-i18next';

const Learning = ({ t }) => {
  const [activeTab, setActiveTab] = useState('1');
  const [activeSubTab, setActiveSubTab] = useState('youtube');

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const toggleSubTab = (tab) => {
    if (activeSubTab !== tab) setActiveSubTab(tab);
  };

  // Financial Education Videos - Categorized by topics with YouTube URLs only
  const financialEducation = {
    'Investing Basics': [
      { 
        title: 'Stock Market for Beginners', 
        description: 'Learn the fundamentals of stock market investing, terminology, and how to get started.',
        url: 'https://www.youtube.com/watch?v=3UF0ymVdYLA',
        duration: '15:42',
        level: 'Beginner'
      },
      { 
        title: 'Mutual Funds Explained', 
        description: 'Understanding different types of mutual funds and how to choose the right ones.',
        url: 'https://www.youtube.com/watch?v=KYtJhT7HL-4',
        duration: '12:18',
        level: 'Beginner'
      },
      { 
        title: 'Diversification Strategies', 
        description: 'Learn how to diversify your investment portfolio to minimize risk.',
        url: 'https://www.youtube.com/watch?v=YCrJw0ddz4o',
        duration: '18:30',
        level: 'Intermediate'
      }
    ],
    'Tax Planning': [
      { 
        title: 'Income Tax Basics in India', 
        description: 'Complete guide to understanding income tax slabs, deductions, and filing process.',
        url: 'https://www.youtube.com/watch?v=3kY6Q6f0OVM',
        duration: '22:15',
        level: 'Beginner'
      },
      { 
        title: 'Tax Saving Investments', 
        description: 'Best tax-saving investment options under Section 80C and other sections.',
        url: 'https://www.youtube.com/watch?v=Hn6B9BzN9zY',
        duration: '16:45',
        level: 'Intermediate'
      }
    ],
    'Retirement Planning': [
      { 
        title: 'Retirement Planning in Your 20s & 30s', 
        description: 'Why starting early is crucial and how much you should be saving.',
        url: 'https://www.youtube.com/watch?v=7gbktdR2J5k',
        duration: '14:22',
        level: 'Beginner'
      },
      { 
        title: 'NPS vs PPF vs EPF', 
        description: 'Comparing different retirement saving options in India.',
        url: 'https://www.youtube.com/watch?v=JwXKqSv8i4c',
        duration: '19:10',
        level: 'Intermediate'
      }
    ]
  };

  // Personalized video recommendations based on user profile
  const personalizedRecommendations = {
    'Based on Your Goals': [
      { 
        title: 'Saving for Down Payment', 
        description: 'Strategies to save for your first home down payment efficiently.',
        url: 'https://www.youtube.com/watch?v=GgUpV2Wx5Yw',
        duration: '13:45',
        channel: 'Financial Freedom'
      },
      { 
        title: 'Investing for Children\'s Education', 
        description: 'How to build an education corpus for your child\'s future.',
        url: 'https://www.youtube.com/watch?v=7gbktdR2J5k',
        duration: '17:30',
        channel: 'Smart Parents'
      }
    ],
    'Based on Your Interests': [
      { 
        title: 'Value Investing Principles', 
        description: 'Learn how to identify undervalued stocks using fundamental analysis.',
        url: 'https://www.youtube.com/watch?v=ufRlYG5d9q8',
        duration: '21:15',
        channel: 'Value Investing Academy'
      },
      { 
        title: 'Real Estate vs Stock Market', 
        description: 'Comparing returns and risks of real estate and stock market investments.',
        url: 'https://www.youtube.com/watch?v=K1QICrgkn6k',
        duration: '18:45',
        channel: 'Investment Insights'
      }
    ]
  };

  // Top financial educators
  const topEducators = [
    { 
      title: 'CA Rachana Ranade', 
      description: 'Personal finance and investment advice from a Chartered Accountant.',
      url: 'https://www.youtube.com/c/CARachanaRanade',
      icon: 'ri-youtube-line text-danger',
      rating: '4.9/5',
      subscribers: '4.2M+',
      category: 'Investing & Stock Market'
    },
    { 
      title: 'Asset Yogi', 
      description: 'Investment and financial planning in simple terms.',
      url: 'https://www.youtube.com/c/AssetYogi',
      icon: 'ri-youtube-line text-danger',
      rating: '4.8/5',
      subscribers: '3.1M+',
      category: 'Personal Finance'
    },
    { 
      title: 'Labour Law Advisor', 
      description: 'Understanding employee benefits and financial rights.',
      url: 'https://www.youtube.com/c/LabourLawAdvisor',
      icon: 'ri-youtube-line text-danger',
      rating: '4.7/5',
      subscribers: '2.8M+',
      category: 'Employee Benefits'
    }
  ];

  const blogs = [
    { 
      title: 'Zerodha Varsity', 
      description: 'Comprehensive modules on stock market, mutual funds, and personal finance. Perfect for beginners and advanced investors alike.',
      url: 'https://zerodha.com/varsity/',
      icon: 'ri-global-line text-primary',
      category: 'Investing',
      readingTime: '30+ hours of content'
    },
    { 
      title: 'Freefincal', 
      description: 'Mutual funds, financial planning, and investment strategies with a focus on Indian investors.',
      url: 'https://freefincal.com/',
      icon: 'ri-global-line text-primary',
      category: 'Investing',
      readingTime: '15+ hours of content'
    },
    { 
      title: 'The Economic Times - Wealth', 
      description: 'Latest news and insights on personal finance, investments, and market trends.',
      url: 'https://economictimes.indiatimes.com/wealth',
      icon: 'ri-newspaper-line text-info',
      category: 'News & Analysis',
      readingTime: 'Daily updates'
    },
    { 
      title: 'The Financial Express - Money', 
      description: 'Comprehensive coverage of personal finance, mutual funds, and investment strategies.',
      url: 'https://www.financialexpress.com/money/',
      icon: 'ri-newspaper-line text-info',
      category: 'News & Analysis',
      readingTime: 'Daily updates'
    },
  ];

  const govtSchemes = [
    { 
      title: 'PMJJBY (Pradhan Mantri Jeevan Jyoti Bima Yojana)',
      description: 'Life insurance cover of ₹2 Lakh for just ₹330/year. Available to people in the age group of 18-50 years.',
      benefits: 'Life cover, Easy enrollment, Low premium',
      eligibility: '18-50 years, Bank account required',
      url: 'https://www.jansuraksha.gov.in/',
      icon: 'ri-government-line text-success',
      lastUpdated: 'Updated: June 2025'
    },
    { 
      title: 'EPF (Employees\' Provident Fund)',
      description: 'Retirement benefits for salaried employees with contributions from both employee and employer.',
      benefits: 'Tax benefits, Retirement corpus, Interest income',
      eligibility: 'Salaried employees in organizations with 20+ employees',
      url: 'https://www.epfindia.gov.in/',
      icon: 'ri-bank-line text-warning',
      lastUpdated: 'Updated: June 2025'
    },
    { 
      title: 'PMSBY (Pradhan Mantri Suraksha Bima Yojana)',
      description: 'Accidental insurance cover of ₹2 Lakh for just ₹12/year. Covers death and disability due to accident.',
      benefits: 'Accident cover, Low premium, Easy claim process',
      eligibility: '18-70 years, Bank account required',
      url: 'https://www.jansuraksha.gov.in/',
      icon: 'ri-shield-check-line text-info',
      lastUpdated: 'Updated: June 2025'
    },
    { 
      title: 'APY (Atal Pension Yojana)',
      description: 'Pension scheme for workers in unorganized sector. Guaranteed pension after 60 years of age.',
      benefits: 'Pension amount ₹1000-5000/month, Tax benefits, Government co-contribution',
      eligibility: '18-40 years, Must have savings account',
      url: 'https://www.jansuraksha.gov.in/',
      icon: 'ri-wallet-3-line text-primary',
      lastUpdated: 'Updated: June 2025'
    },
    { 
      title: 'Sukanya Samriddhi Yojana',
      description: 'Small deposit scheme for girl child with tax benefits and high interest rates.',
      benefits: 'Tax benefits, Higher interest rates, Long-term savings',
      eligibility: 'For girl child below 10 years',
      url: 'https://www.indiapost.gov.in/Financial/Pages/Content/Post-Office-Sukanya-Samriddhi-Account.aspx',
      icon: 'ri-women-line text-pink',
      lastUpdated: 'Updated: June 2025'
    },
  ];

  const roboAdvisors = [
    { 
      title: 'ET Money',
      description: 'AI-based investment recommendations and portfolio management. Offers direct mutual funds with zero commission.',
      features: 'Goal-based investing, Tax-saving funds, Portfolio tracking',
      minInvestment: '₹500',
      url: 'https://www.etmoney.com/',
      icon: 'ri-robot-line text-primary',
      rating: '4.6/5 (10K+ reviews)'
    },
    { 
      title: 'Kuvera',
      description: 'Commission-free direct mutual funds and US stocks. Advanced tools for portfolio analysis and goal planning.',
      features: 'Zero commission, US stocks, Tax harvesting',
      minInvestment: '₹100',
      url: 'https://kuvera.in/',
      icon: 'ri-line-chart-line text-success',
      rating: '4.7/5 (8K+ reviews)'
    },
    { 
      title: 'Groww',
      description: 'User-friendly platform for mutual funds, stocks, and IPOs. Great for beginners in the stock market.',
      features: 'Zero commission, SIP options, Educational content',
      minInvestment: '₹100',
      url: 'https://groww.in/',
      icon: 'ri-arrow-up-circle-line text-info',
      rating: '4.5/5 (1M+ downloads)'
    },
  ];
  
  const financialTools = [
    { 
      title: 'SIP Calculator',
      description: 'Calculate returns on your Systematic Investment Plans (SIP) with this easy-to-use tool.',
      icon: 'ri-calculator-line text-primary',
      url: '#'
    },
    { 
      title: 'EMI Calculator',
      description: 'Calculate your Equated Monthly Installments for loans and plan your finances better.',
      icon: 'ri-calculator-line text-success',
      url: '#'
    },
    { 
      title: 'Tax Calculator',
      description: 'Estimate your income tax liability and plan your tax-saving investments accordingly.',
      icon: 'ri-calculator-line text-info',
      url: '#'
    },
    { 
      title: 'Retirement Planner',
      description: 'Plan your retirement corpus and see how much you need to save for a comfortable retirement.',
      icon: 'ri-calculator-line text-warning',
      url: '#'
    },
  ];

  // Function to extract video ID from YouTube URL
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Video card component for financial education
  const VideoCard = ({ video }) => {
    const videoId = getYouTubeId(video.url);
    const thumbnailUrl = videoId 
      ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
      : 'https://images.unsplash.com/photo-1500989145603-8e7ef71d639e?ixlib=rb-4.0.3&auto=format&fit=crop&w=320&h=180&q=80';
    
    return (
      <Card className="h-100">
        <div className="position-relative" style={{ 
          backgroundColor: '#f8f9fa', 
          minHeight: '180px',
          backgroundImage: `url(${thumbnailUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
          <div className="w-100 h-100 d-flex align-items-center justify-content-center" style={{
            backgroundColor: 'rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onClick={() => window.open(video.url, '_blank')}
          >
            <i className="ri-play-circle-line text-white" style={{ 
              fontSize: '3rem',
              opacity: 0.8,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}></i>
          </div>
          <span className="position-absolute bottom-0 end-0 bg-dark text-white px-2 py-1 m-2 rounded small">
            {video.duration}
          </span>
        </div>
        <CardBody>
          <h6 className="card-title mb-2">
            <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-dark text-decoration-none">
              {video.title}
            </a>
          </h6>
          <p className="card-text small text-muted mb-2">{video.description}</p>
          <div className="d-flex flex-wrap align-items-center">
            {video.level && (
              <span className="badge bg-light text-dark me-2 mb-2">
                <i className="ri-flag-2-line me-1"></i> {video.level}
              </span>
            )}
            {video.channel && (
              <div className="text-muted small mb-2">
                <i className="ri-user-3-line me-1"></i> {video.channel}
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    );
  };

  const ResourceCard = ({ resource }) => (
    <Card className="mb-3 h-100">
      <CardBody>
        <div className="d-flex h-100">
          <div className="flex-shrink-0 me-3">
            <i className={`${resource.icon} font-size-24`}></i>
          </div>
          <div className="flex-grow-1">
            <h5 className="font-size-16 mb-2">
              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-dark">
                {resource.title}
              </a>
            </h5>
            <p className="text-muted mb-2">{resource.description}</p>
            
            {/* Additional metadata */}
            <div className="small text-muted mb-2">
              {resource.rating && (
                <div className="mb-1">
                  <i className="ri-star-fill text-warning"></i> {resource.rating}
                  {resource.subscribers && ` • ${resource.subscribers} subscribers`}
                </div>
              )}
              
              {resource.category && (
                <div className="mb-1">
                  <i className="ri-price-tag-3-line text-primary me-1"></i> {resource.category}
                  {resource.readingTime && ` • ${resource.readingTime}`}
                </div>
              )}
              
              {resource.benefits && (
                <div className="mb-1">
                  <i className="ri-award-line text-success me-1"></i> {resource.benefits}
                </div>
              )}
              
              {resource.eligibility && (
                <div className="mb-1">
                  <i className="ri-user-check-line text-info me-1"></i> {resource.eligibility}
                </div>
              )}
              
              {resource.minInvestment && (
                <div className="mb-1">
                  <i className="ri-money-rupee-circle-line text-success me-1"></i> Min. Investment: {resource.minInvestment}
                </div>
              )}
              
              {resource.lastUpdated && (
                <div className="text-muted small">
                  <i className="ri-time-line me-1"></i> {resource.lastUpdated}
                </div>
              )}
            </div>
            
            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-primary mt-2 d-inline-block">
              Learn More <i className="ri-arrow-right-line align-middle"></i>
            </a>
          </div>
        </div>
      </CardBody>
    </Card>
  );
  
  const ToolCard = ({ tool }) => (
    <Card className="h-100">
      <CardBody className="d-flex flex-column">
        <div className="mb-3">
          <i className={`${tool.icon} font-size-24`}></i>
        </div>
        <h5 className="font-size-16 mb-2">
          <a href={tool.url} className="text-dark">{tool.title}</a>
        </h5>
        <p className="text-muted mb-3 flex-grow-1">{tool.description}</p>
        <a href={tool.url} className="btn btn-outline-primary btn-sm align-self-start">
          Open Tool <i className="ri-arrow-right-line align-middle"></i>
        </a>
      </CardBody>
    </Card>
  );

  return (
    <div className="page-content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="mb-0">Learning & Advisory</h4>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <Card>
              <CardBody>
                <Nav pills className="nav-pills nav-justified gap-2 mb-4">
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '1' }, 'rounded')}
                      onClick={() => toggleTab('1')}
                    >
                      <i className="ri-youtube-line d-block mb-1"></i> Video Learning
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '2' }, 'rounded')}
                      onClick={() => toggleTab('2')}
                    >
                      <i className="ri-article-line d-block mb-1"></i> Articles & Blogs
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '3' }, 'rounded')}
                      onClick={() => toggleTab('3')}
                    >
                      <i className="ri-government-line d-block mb-1"></i> Government Schemes
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === '4' }, 'rounded')}
                      onClick={() => toggleTab('4')}
                    >
                      <i className="ri-robot-line d-block mb-1"></i> AI Advisory
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <div className="mb-4">
                      <h4 className="mb-3">Video Learning Center</h4>
                      <p className="text-muted">Enhance your financial knowledge with our curated collection of educational videos and personalized recommendations.</p>
                    </div>

                    {/* Financial Education Section */}
                    <div className="mb-5">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="mb-0">Financial Education</h5>
                        <a href="#" className="btn btn-sm btn-link">View All</a>
                      </div>
                      
                      {Object.entries(financialEducation).map(([category, videos]) => (
                        <div key={category} className="mb-4">
                          <h6 className="mb-3 text-uppercase text-muted">{category}</h6>
                          <Row className="g-4">
                            {videos.map((video, index) => (
                              <Col xl={4} lg={6} key={index}>
                                <VideoCard video={video} />
                              </Col>
                            ))}
                          </Row>
                        </div>
                      ))}
                    </div>

                    {/* Personalized Recommendations */}
                    <div className="mb-5">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="mb-0">Recommended For You</h5>
                        <a href="#" className="btn btn-sm btn-link">Refresh</a>
                      </div>
                      
                      {Object.entries(personalizedRecommendations).map(([title, videos]) => (
                        <div key={title} className="mb-4">
                          <h6 className="mb-3">{title}</h6>
                          <Row className="g-4">
                            {videos.map((video, index) => (
                              <Col xl={4} lg={6} key={index}>
                                <VideoCard video={video} />
                              </Col>
                            ))}
                          </Row>
                        </div>
                      ))}
                    </div>

                    {/* Top Financial Educators */}
                    <div>
                      <h5 className="mb-4">Top Financial Educators</h5>
                      <Row className="g-4">
                        {topEducators.map((educator, index) => (
                          <Col xl={4} lg={6} key={index}>
                            <ResourceCard resource={educator} />
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </TabPane>
                  
                  <TabPane tabId="2">
                    <div className="mb-4">
                      <h5 className="mb-3">Financial Blogs & Resources</h5>
                      <p className="text-muted">Expand your financial knowledge with these carefully curated blogs and educational resources.</p>
                    </div>
                    <Row className="g-4">
                      {blogs.map((blog, index) => (
                        <Col lg={6} key={index}>
                          <ResourceCard resource={blog} />
                        </Col>
                      ))}
                    </Row>
                  </TabPane>
                  
                  <TabPane tabId="3">
                    <div className="mb-4">
                      <h5 className="mb-3">Government Schemes & Benefits</h5>
                      <p className="text-muted">Explore various government schemes for financial security, insurance, and retirement planning.</p>
                    </div>
                    <Row className="g-4">
                      {govtSchemes.map((scheme, index) => (
                        <Col lg={6} key={index}>
                          <ResourceCard resource={scheme} />
                        </Col>
                      ))}
                    </Row>
                  </TabPane>
                  
                  <TabPane tabId="4">
                    <div className="mb-4">
                      <h5 className="mb-3">AI & Robo Advisory</h5>
                      <p className="text-muted">Leverage technology for smarter investment decisions with these AI-powered advisory platforms.</p>
                      <Alert color="info" className="mb-4">
                        <i className="ri-information-line me-2"></i>
                        Get personalized investment advice based on your financial goals and risk appetite.
                      </Alert>
                    </div>
                    
                    <h6 className="mb-3">Top Robo Advisors</h6>
                    <Row className="g-4 mb-5">
                      {roboAdvisors.map((advisor, index) => (
                        <Col lg={4} key={index}>
                          <ResourceCard resource={advisor} />
                        </Col>
                      ))}
                    </Row>
                    
                    <h6 className="mb-3">Financial Tools</h6>
                    <Row className="g-4">
                      {financialTools.map((tool, index) => (
                        <Col xl={3} lg={6} key={index}>
                          <ToolCard tool={tool} />
                        </Col>
                      ))}
                    </Row>
                    
                    <div className="mt-5">
                      <h6 className="mb-3">Financial Planning Guide</h6>
                      <Card>
                        <CardBody>
                          <Row>
                            <Col md={4} className="mb-3 mb-md-0">
                              <div className="d-flex align-items-center mb-3">
                                <div className="avatar-xs me-3">
                                  <span className="avatar-title rounded-circle bg-soft-primary text-primary font-size-16">1</span>
                                </div>
                                <h5 className="font-size-16 mb-0">Set Clear Goals</h5>
                              </div>
                              <p className="text-muted mb-0">Define your short-term and long-term financial objectives.</p>
                            </Col>
                            <Col md={4} className="mb-3 mb-md-0">
                              <div className="d-flex align-items-center mb-3">
                                <div className="avatar-xs me-3">
                                  <span className="avatar-title rounded-circle bg-soft-success text-success font-size-16">2</span>
                                </div>
                                <h5 className="font-size-16 mb-0">Assess Your Finances</h5>
                              </div>
                              <p className="text-muted mb-0">Analyze your income, expenses, and current investments.</p>
                            </Col>
                            <Col md={4}>
                              <div className="d-flex align-items-center mb-3">
                                <div className="avatar-xs me-3">
                                  <span className="avatar-title rounded-circle bg-soft-info text-info font-size-16">3</span>
                                </div>
                                <h5 className="font-size-16 mb-0">Create a Plan</h5>
                              </div>
                              <p className="text-muted mb-0">Develop a strategy to achieve your financial goals.</p>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </div>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(Learning);

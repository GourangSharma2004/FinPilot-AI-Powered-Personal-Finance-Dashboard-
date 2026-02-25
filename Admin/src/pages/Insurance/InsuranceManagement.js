import React, { useState, useEffect } from 'react';
import { Card, CardBody, Col, Container, Row, TabContent, TabPane, Nav, NavItem, NavLink, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, CardHeader, Table, Badge } from 'reactstrap';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

// Import Icons
import { FiPlus } from 'react-icons/fi';

// Import Components
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { withTranslation } from 'react-i18next';

const InsuranceManagement = () => {
    // Tab State
    const [activeTab, setActiveTab] = useState('1');
    const [modal, setModal] = useState(false);
    const [selectedInsurance, setSelectedInsurance] = useState(null);
    const [insuranceNeeds, setInsuranceNeeds] = useState({
        lifeStage: '',
        assets: [],
        familyStatus: '',
        income: ''
    });
    const [recommendations, setRecommendations] = useState([]);
    const [compareList, setCompareList] = useState([]);
    
    // Toggle tab
    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    // Toggle modal
    const toggleModal = (insurance = null) => {
        setSelectedInsurance(insurance);
        setModal(!modal);
    };

    // Handle insurance needs form input
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox') {
            setInsuranceNeeds(prev => ({
                ...prev,
                assets: checked
                    ? [...prev.assets, value]
                    : prev.assets.filter(asset => asset !== value)
            }));
        } else {
            setInsuranceNeeds(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Generate insurance recommendations
    const generateRecommendations = () => {
        // In a real app, this would be an API call
        const mockRecommendations = [
            {
                id: 'rec1',
                type: 'Health',
                provider: 'HealthGuard Gold',
                coverage: 750000,
                premium: 350,
                rating: 4.8,
                features: ['Full medical coverage', 'Dental included', 'Vision care', '24/7 support'],
                bestFor: 'Individuals with family history of medical conditions'
            },
            {
                id: 'rec2',
                type: 'Term Life',
                provider: 'LifeSecure Pro',
                coverage: 1500000,
                premium: 45,
                rating: 4.6,
                features: ['20-year term', 'Fixed premiums', 'Convertible option', 'Accelerated benefits'],
                bestFor: 'Primary breadwinners with dependents'
            },
            {
                id: 'rec3',
                type: 'Home',
                provider: 'HomeSafe Elite',
                coverage: 2000000,
                premium: 120,
                rating: 4.7,
                features: ['Property damage', 'Liability coverage', 'Natural disasters', 'Temporary living'],
                bestFor: 'Homeowners in disaster-prone areas'
            }
        ];
        
        setRecommendations(mockRecommendations);
    };

    // Toggle policy in compare list
    const toggleCompare = (policy) => {
        setCompareList(prev => 
            prev.some(p => p.id === policy.id)
                ? prev.filter(p => p.id !== policy.id)
                : [...prev, policy]
        );
    };

    // Initialize recommendations on component mount
    useEffect(() => {
        generateRecommendations();
    }, []);

    // Sample insurance data with various statuses
    const [insurances] = useState([
        // Active policies
        {
            id: 1,
            type: 'Health',
            provider: 'HealthGuard Inc.',
            policyNumber: 'HG-789456123',
            premium: 250,
            coverage: 500000,
            renewalDate: '2024-12-31',
            status: 'active',
            startDate: '2022-01-15',
            documents: ['policy_doc.pdf', 'terms.pdf'],
            description: 'Comprehensive health insurance covering hospitalization, surgery, and medication.'
        },
        {
            id: 3,
            type: 'Home',
            provider: 'HomeSafe Insurance',
            policyNumber: 'HS-123456789',
            premium: 1800,
            coverage: 1500000,
            renewalDate: '2023-11-15',
            status: 'active',
            startDate: '2021-11-15',
            documents: ['home_policy.pdf', 'property_details.pdf'],
            description: 'Homeowners insurance covering property damage and liability'
        },
        {
            id: 5,
            type: 'Travel',
            provider: 'Global Travel Shield',
            policyNumber: 'GTS-456123789',
            premium: 150,
            coverage: 50000,
            renewalDate: '2023-08-15',
            status: 'active',
            startDate: '2023-05-15',
            documents: ['travel_policy.pdf'],
            description: 'Annual multi-trip travel insurance with medical coverage'
        },
        
        // Expiring soon policies
        {
            id: 2,
            type: 'Vehicle',
            provider: 'AutoShield Insurance',
            policyNumber: 'AS-456789012',
            premium: 1200,
            coverage: 250000,
            renewalDate: '2023-09-30',
            status: 'expiring soon',
            startDate: '2022-10-01',
            documents: ['auto_policy.pdf', 'terms.pdf'],
            description: 'Full coverage auto insurance for 2020 Honda Accord'
        },
        {
            id: 6,
            type: 'Dental',
            provider: 'DentalCare Plus',
            policyNumber: 'DC-789123456',
            premium: 45,
            coverage: 2000,
            renewalDate: '2023-10-15',
            status: 'expiring soon',
            startDate: '2022-10-15',
            documents: ['dental_policy.pdf'],
            description: 'Comprehensive dental coverage including cleanings and procedures'
        },
        
        // Expired policies
        {
            id: 4,
            type: 'Life',
            provider: 'LifeSecure',
            policyNumber: 'LS-987654321',
            premium: 500,
            coverage: 1000000,
            renewalDate: '2023-06-30',
            status: 'expired',
            startDate: '2018-07-01',
            documents: ['life_policy.pdf', 'medical_report.pdf'],
            description: '20-year term life insurance policy'
        },
        {
            id: 7,
            type: 'Renters',
            provider: 'RentProtect',
            policyNumber: 'RP-321654987',
            premium: 180,
            coverage: 50000,
            renewalDate: '2023-05-01',
            status: 'expired',
            startDate: '2022-05-01',
            documents: ['renters_policy.pdf'],
            description: 'Renters insurance for apartment coverage'
        },
        {
            id: 6,
            type: 'Dental',
            provider: 'DentalCare Plus',
            policyNumber: 'DCP-321654987',
            premium: 35,
            coverage: 2500,
            renewalDate: '2024-03-20',
            status: 'Active',
            startDate: '2023-03-20',
            documents: ['dental_policy.pdf', 'terms.pdf'],
            description: 'Comprehensive dental coverage including cleanings, x-rays, and procedures'
        },
        {
            id: 7,
            type: 'Renters',
            provider: 'RenterShield',
            policyNumber: 'RS-159357486',
            premium: 25,
            coverage: 100000,
            renewalDate: '2023-12-10',
            status: 'Active',
            startDate: '2022-12-10',
            documents: ['renters_policy.pdf'],
            description: 'Renters insurance covering personal property and liability'
        }
    ]);

    // Get status badge class and display text
    const getStatusBadge = (status) => {
        const statusLower = status.toLowerCase();
        
        // Return both the badge class and display text
        switch (statusLower) {
            case 'active':
                return { class: 'success', display: 'Active' };
            case 'expired':
                return { class: 'danger', display: 'Expired' };
            case 'expiring soon':
                return { class: 'warning', display: 'Expiring Soon' };
            default:
                return { class: 'secondary', display: status };
        }
    };
    
    // Format status for display
    const formatStatus = (status) => {
        return getStatusBadge(status).display;
    };

    // Get insurance type icon
    const getInsuranceIcon = (type) => {
        switch (type.toLowerCase()) {
            case 'health':
                return 'ri-heart-line';
            case 'vehicle':
                return 'ri-car-line';
            case 'travel':
                return 'ri-flight-takeoff-line';
            case 'home':
                return 'ri-home-line';
            case 'life':
                return 'ri-user-heart-line';
            case 'dental':
                return 'ri-hospital-line';
            case 'renters':
                return 'ri-building-line';
            default:
                return 'ri-shield-check-line';
        }
    };

    // Debug: Log all policies and their statuses
    console.log('All policies with statuses:');
    insurances.forEach(policy => {
        console.log(`- ${policy.type}: ${policy.status} (${policy.renewalDate})`);
    });
    
    // Filter policies based on status (case-insensitive match)
    const activePolicies = insurances.filter(policy => {
        const status = policy.status ? policy.status.toLowerCase().trim() : '';
        return status === 'active';
    });
    
    const expiringSoonPolicies = insurances.filter(policy => {
        const status = policy.status ? policy.status.toLowerCase().trim() : '';
        return status === 'expiring soon' || status === 'expiring';
    });
    
    const expiredPolicies = insurances.filter(policy => {
        const status = policy.status ? policy.status.toLowerCase().trim() : '';
        return status === 'expired';
    });
    
    // Debug: Log the counts and policies in each category
    console.log('\nFiltered policies:');
    console.log('Active policies:', activePolicies);
    console.log('Expiring soon policies:', expiringSoonPolicies);
    console.log('Expired policies:', expiredPolicies);

    // Function to render policy cards
    const renderPolicyCards = (policies) => {
        if (policies.length === 0) {
            return (
                <Col lg={12}>
                    <div className="text-center py-5">
                        <div className="mb-3">
                            <i className="ri-information-line display-4 text-muted"></i>
                        </div>
                        <h5>No policies found</h5>
                        <p className="text-muted">There are no policies matching this filter</p>
                    </div>
                </Col>
            );
        }
        
        return policies.map((insurance) => (
            <Col lg={4} key={insurance.id}>
                <Card className="border">
                    <CardBody>
                        <div className="d-flex align-items-center mb-3">
                            <div className="avatar-sm me-3">
                                <span className={`avatar-title rounded-circle bg-soft-${getStatusBadge(insurance.status)} text-${getStatusBadge(insurance.status)} font-size-18`}>
                                    <i className={getInsuranceIcon(insurance.type)}></i>
                                </span>
                            </div>
                            <div className="flex-grow-1">
                                <h5 className="font-size-16 mb-1">{insurance.type} Insurance</h5>
                                <p className="text-muted mb-0">{insurance.provider}</p>
                            </div>
                            <div className="dropdown">
                                <button className="btn btn-link text-muted" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="ri-more-fill"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end">
                                    <button className="dropdown-item" onClick={() => toggleModal(insurance)}>
                                        <i className="ri-pencil-line align-bottom me-2 text-muted"></i> Edit
                                    </button>
                                    <button className="dropdown-item text-danger" onClick={() => window.confirm('Are you sure you want to delete this policy?')}>
                                        <i className="ri-delete-bin-line align-bottom me-2"></i> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <p className="text-muted mb-1">Policy Number: <span className="text-dark fw-medium">{insurance.policyNumber}</span></p>
                            <p className="text-muted mb-1">Coverage: <span className="text-dark fw-medium">${insurance.coverage.toLocaleString()}</span></p>
                            <p className="text-muted mb-1">Premium: <span className="text-dark fw-medium">${insurance.premium}/year</span></p>
                            <p className="text-muted mb-1">Renewal: <span className="text-dark fw-medium">{new Date(insurance.renewalDate).toLocaleDateString()}</span></p>
                        </div>
                        <div className="d-flex align-items-center">
                            <span className={`badge bg-soft-${getStatusBadge(insurance.status).class} text-${getStatusBadge(insurance.status).class} font-size-11`}>
                                {formatStatus(insurance.status)}
                            </span>
                            <div className="ms-auto">
                                <Link to="#" className="btn btn-sm btn-light me-1">View Details</Link>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        ));
    };

    return (
        <div className="page-content">
            <Container fluid>
                {/* Breadcrumb */}
                <Breadcrumbs 
                    title="Insurance" 
                    breadcrumbItems={[
                        { title: 'Dashboard', link: '/dashboard' },
                        { title: 'Insurance Management', link: '/insurance' }
                    ]} 
                />

                <Row>
                    <Col lg={12}>
                        <Card>
                            <CardBody>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h4 className="card-title mb-0">My Insurance Policies</h4>
                                    <Button color="primary" onClick={() => toggleModal()}>
                                        <FiPlus className="me-1" /> Add New Policy
                                    </Button>
                                </div>

                                {/* Tabs */}
                                <Nav tabs className="nav-tabs-custom">
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '1' })}
                                            onClick={() => { toggleTab('1'); }}
                                        >
                                            All Policies <span className="badge bg-soft-primary text-primary ms-1">{insurances.length}</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '2' })}
                                            onClick={() => { toggleTab('2'); }}
                                        >
                                            Active <span className="badge bg-soft-success text-success ms-1">{activePolicies.length}</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '3' })}
                                            onClick={() => { toggleTab('3'); }}
                                        >
                                            Expiring Soon <span className="badge bg-soft-warning text-warning ms-1">{expiringSoonPolicies.length}</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '4' })}
                                            onClick={() => { toggleTab('4'); }}
                                        >
                                            Expired <span className="badge bg-soft-danger text-danger ms-1">{expiredPolicies.length}</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '5' })}
                                            onClick={() => { toggleTab('5'); }}
                                        >
                                            <i className="ri-search-line me-1"></i> Find Insurance
                                        </NavLink>
                                    </NavItem>
                                </Nav>

                                <TabContent activeTab={activeTab} className="p-3 border border-top-0">
                                    {/* All Policies Tab */}
                                    <TabPane tabId="1">
                                        <Row>
                                            {renderPolicyCards(insurances)}
                                        </Row>
                                    </TabPane>

                                    {/* Active Policies Tab */}
                                    <TabPane tabId="2">
                                        <Row>
                                            {activePolicies.length > 0 ? (
                                                renderPolicyCards(activePolicies)
                                            ) : (
                                                <Col lg={12}>
                                                    <div className="text-center py-5">
                                                        <div className="mb-3">
                                                            <i className="ri-checkbox-circle-line display-4 text-success"></i>
                                                        </div>
                                                        <h5>No Active Policies</h5>
                                                        <p className="text-muted">You don't have any active insurance policies at the moment.</p>
                                                        <p className="text-muted">You don't have any insurance policies yet.</p>
                                                        <Button color="primary" className="mt-2" onClick={() => toggleModal()}>
                                                            <FiPlus className="me-1" /> Add Your First Policy
                                                        </Button>
                                                    </div>
                                                </Col>
                                            )}
                                        </Row>
                                    </TabPane>
                                    {/* Expiring Soon Tab */}
                                    <TabPane tabId="3">
                                        <Row>
                                            {expiringSoonPolicies.length > 0 ? (
                                                renderPolicyCards(expiringSoonPolicies)
                                            ) : (
                                                <Col lg={12}>
                                                    <div className="text-center py-5">
                                                        <div className="mb-3">
                                                            <i className="ri-time-line display-4 text-warning"></i>
                                                        </div>
                                                        <h5>No Expiring Policies</h5>
                                                        <p className="text-muted">You don't have any policies expiring soon.</p>
                                                        <Button color="primary" className="mt-2" onClick={() => toggleModal()}>
                                                            <FiPlus className="me-1" /> Add New Policy
                                                        </Button>
                                                    </div>
                                                </Col>
                                            )}
                                        </Row>
                                    </TabPane>

                                    {/* Expired Tab */}
                                    <TabPane tabId="4">
                                        <Row>
                                            {expiredPolicies.length > 0 ? (
                                                renderPolicyCards(expiredPolicies)
                                            ) : (
                                                <Col lg={12}>
                                                    <div className="text-center py-5">
                                                        <div className="mb-3">
                                                            <i className="ri-close-circle-line display-4 text-danger"></i>
                                                        </div>
                                                        <h5>No Expired Policies</h5>
                                                        <p className="text-muted">You don't have any expired insurance policies.</p>
                                                        <Button color="primary" className="mt-2" onClick={() => toggleModal()}>
                                                            <FiPlus className="me-1" /> Add New Policy
                                                        </Button>
                                                    </div>
                                                </Col>
                                            )}
                                        </Row>
                                    </TabPane>
                                    
                                    {/* Find Insurance Tab */}
                                    <TabPane tabId="5">
                                        <Row>
                                            <Col lg={4}>
                                                <Card className="border">
                                                    <CardHeader className="bg-light">
                                                        <h5 className="mb-0">Your Insurance Needs</h5>
                                                    </CardHeader>
                                                    <CardBody>
                                                        <Form>
                                                            <FormGroup>
                                                                <Label>Life Stage</Label>
                                                                <Input 
                                                                    type="select" 
                                                                    name="lifeStage"
                                                                    value={insuranceNeeds.lifeStage}
                                                                    onChange={handleInputChange}
                                                                >
                                                                    <option value="">Select your life stage</option>
                                                                    <option value="single">Single</option>
                                                                    <option value="married">Married</option>
                                                                    <option value="parent">Parent</option>
                                                                    <option value="retired">Retired</option>
                                                                </Input>
                                                            </FormGroup>
                                                            
                                                            <FormGroup>
                                                                <Label>Annual Income</Label>
                                                                <Input 
                                                                    type="select"
                                                                    name="income"
                                                                    value={insuranceNeeds.income}
                                                                    onChange={handleInputChange}
                                                                >
                                                                    <option value="">Select your income range</option>
                                                                    <option value="under50">Under $50,000</option>
                                                                    <option value="50-100">$50,000 - $100,000</option>
                                                                    <option value="100-200">$100,000 - $200,000</option>
                                                                    <option value="over200">Over $200,000</option>
                                                                </Input>
                                                            </FormGroup>
                                                            
                                                            <FormGroup check>
                                                                <Label check>
                                                                    <Input 
                                                                        type="checkbox" 
                                                                        value="home" 
                                                                        onChange={handleInputChange}
                                                                        checked={insuranceNeeds.assets.includes('home')}
                                                                    />{' '}
                                                                    I own a home
                                                                </Label>
                                                            </FormGroup>
                                                            
                                                            <FormGroup check>
                                                                <Label check>
                                                                    <Input 
                                                                        type="checkbox" 
                                                                        value="vehicle"
                                                                        onChange={handleInputChange}
                                                                        checked={insuranceNeeds.assets.includes('vehicle')}
                                                                    />{' '}
                                                                    I own a vehicle
                                                                </Label>
                                                            </FormGroup>
                                                            
                                                            <FormGroup check>
                                                                <Label check>
                                                                    <Input 
                                                                        type="checkbox" 
                                                                        value="business"
                                                                        onChange={handleInputChange}
                                                                        checked={insuranceNeeds.assets.includes('business')}
                                                                    />{' '}
                                                                    I own a business
                                                                </Label>
                                                            </FormGroup>
                                                            
                                                            <Button color="primary" className="mt-3 w-100" onClick={generateRecommendations}>
                                                                Get Recommendations
                                                            </Button>
                                                        </Form>
                                                    </CardBody>
                                                </Card>
                                                
                                                {compareList.length > 0 && (
                                                    <Card className="border mt-4">
                                                        <CardHeader className="bg-light">
                                                            <h5 className="mb-0">Compare ({compareList.length})</h5>
                                                        </CardHeader>
                                                        <CardBody>
                                                            <Table size="sm">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Policy</th>
                                                                        <th>Coverage</th>
                                                                        <th>Premium</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {compareList.map(policy => (
                                                                        <tr key={policy.id}>
                                                                            <td>{policy.type}</td>
                                                                            <td>${policy.coverage.toLocaleString()}</td>
                                                                            <td>${policy.premium}/mo</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </Table>
                                                            <Button color="primary" size="sm" className="w-100">
                                                                Compare Selected
                                                            </Button>
                                                        </CardBody>
                                                    </Card>
                                                )}
                                            </Col>
                                            
                                            <Col lg={8}>
                                                <Card className="border">
                                                    <CardHeader className="bg-light d-flex justify-content-between align-items-center">
                                                        <h5 className="mb-0">Recommended Policies</h5>
                                                        <div>
                                                            <span className="badge bg-soft-primary text-primary me-2">
                                                                {recommendations.length} policies found
                                                            </span>
                                                        </div>
                                                    </CardHeader>
                                                    <CardBody>
                                                        {recommendations.length > 0 ? (
                                                            <div className="vstack gap-3">
                                                                {recommendations.map(policy => (
                                                                    <Card key={policy.id} className="border">
                                                                        <CardBody>
                                                                            <div className="d-flex align-items-center mb-2">
                                                                                <div className="flex-grow-1">
                                                                                    <h5 className="mb-1">{policy.type} Insurance</h5>
                                                                                    <p className="text-muted mb-0">{policy.provider}</p>
                                                                                </div>
                                                                                <div className="text-end">
                                                                                    <Badge color="success" className="me-2">
                                                                                        {policy.rating} <i className="ri-star-fill"></i>
                                                                                    </Badge>
                                                                                    <Button 
                                                                                        size="sm" 
                                                                                        color={compareList.some(p => p.id === policy.id) ? 'danger' : 'outline-primary'}
                                                                                        onClick={() => toggleCompare(policy)}
                                                                                    >
                                                                                        {compareList.some(p => p.id === policy.id) ? 'Remove' : 'Compare'}
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            <div className="row mt-3">
                                                                                <div className="col-md-4">
                                                                                    <p className="mb-1 text-muted">Coverage</p>
                                                                                    <h6>${policy.coverage.toLocaleString()}</h6>
                                                                                </div>
                                                                                <div className="col-md-4">
                                                                                    <p className="mb-1 text-muted">Monthly Premium</p>
                                                                                    <h6>${policy.premium}/mo</h6>
                                                                                </div>
                                                                                <div className="col-md-4">
                                                                                    <p className="mb-1 text-muted">Best For</p>
                                                                                    <h6>{policy.bestFor}</h6>
                                                                                </div>
                                                                            </div>
                                                                            
                                                                            <div className="mt-3">
                                                                                <p className="mb-1 text-muted">Key Features:</p>
                                                                                <ul className="list-unstyled mb-0">
                                                                                    {policy.features.map((feature, idx) => (
                                                                                        <li key={idx} className="mb-1">
                                                                                            <i className="ri-checkbox-circle-fill text-success me-2"></i>
                                                                                            {feature}
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                            
                                                                            <div className="mt-3 d-flex justify-content-between">
                                                                                <Button color="light" size="sm">
                                                                                    <i className="ri-information-line me-1"></i> Details
                                                                                </Button>
                                                                                <Button color="primary" size="sm">
                                                                                    Get Quote <i className="ri-arrow-right-line ms-1"></i>
                                                                                </Button>
                                                                            </div>
                                                                        </CardBody>
                                                                    </Card>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <div className="text-center py-5">
                                                                <div className="mb-3">
                                                                    <i className="ri-search-line display-4 text-muted"></i>
                                                                </div>
                                                                <h5>No recommendations yet</h5>
                                                                <p className="text-muted">Complete the form to see personalized insurance recommendations</p>
                                                            </div>
                                                        )}
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                </TabContent>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Add/Edit Insurance Modal */}
            <Modal isOpen={modal} toggle={() => toggleModal()} size="lg">
                <ModalHeader toggle={() => toggleModal()}>{
                    selectedInsurance ? 'Edit Insurance Policy' : 'Add New Insurance Policy'
                }</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Insurance Type</label>
                            <select className="form-select">
                                <option value="">Select Type</option>
                                <option value="health">Health Insurance</option>
                                <option value="vehicle">Vehicle Insurance</option>
                                <option value="travel">Travel Insurance</option>
                                <option value="home">Home Insurance</option>
                                <option value="life">Life Insurance</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Insurance Provider</label>
                                    <input type="text" className="form-control" placeholder="Enter provider name" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Policy Number</label>
                                    <input type="text" className="form-control" placeholder="Enter policy number" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Premium Amount</label>
                                    <div className="input-group">
                                        <span className="input-group-text">$</span>
                                        <input type="number" className="form-control" placeholder="0.00" />
                                        <select className="form-select" style={{ maxWidth: '100px' }}>
                                            <option>Monthly</option>
                                            <option>Quarterly</option>
                                            <option>Yearly</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Coverage Amount</label>
                                    <div className="input-group">
                                        <span className="input-group-text">$</span>
                                        <input type="number" className="form-control" placeholder="0.00" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Start Date</label>
                                    <input type="date" className="form-control" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Renewal Date</label>
                                    <input type="date" className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Policy Documents</label>
                            <div className="dropzone">
                                <div className="dz-message needsclick">
                                    <div className="mb-3">
                                        <i className="display-4 text-muted ri-upload-cloud-2-line"></i>
                                    </div>
                                    <h5>Drop files here or click to upload.</h5>
                                </div>
                            </div>
                            <div className="small text-muted mt-2">Upload PDF, JPG, or PNG files (max 5MB)</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Notes</label>
                            <textarea className="form-control" rows="3" placeholder="Add any additional notes here..."></textarea>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button type="button" className="btn btn-light" onClick={() => toggleModal()}>Cancel</button>
                    <button type="button" className="btn btn-primary">{
                        selectedInsurance ? 'Update Policy' : 'Add Policy'
                    }</button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default withTranslation()(InsuranceManagement);

import React, { useState } from 'react';
import { 
  Container, Row, Col, Card, CardBody, CardHeader, CardTitle,
  Form, FormGroup, Label, Input, Button, TabContent, TabPane, 
  Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import classnames from 'classnames';

// Icons
import { 
  FiUser, FiLock, FiBell, FiCreditCard, FiSettings, 
  FiHelpCircle, FiMail, FiPhone, FiDollarSign
} from 'react-icons/fi';

const ProfileSettings = () => {
  // State for active tab and modal
  const [activeTab, setActiveTab] = useState('1');
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState(null);

  // Profile state
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    occupation: 'Software Engineer',
    address: '123 Main St',
    city: 'New York',
    country: 'United States',
    postalCode: '10001',
    bio: 'Financial enthusiast and tech lover',
    twoFactorEnabled: true,
    fingerprintAuth: false,
    currency: 'USD',
    language: 'en',
    theme: 'light'
  });

  // Toggle between tabs
  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  // Toggle modal visibility
  const toggleModal = (title = '', content = null) => {
    setModal(!modal);
    setModalTitle(title);
    setModalContent(content);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        {/* Page Title */}
        <Row className="page-title-box">
          <Col xs="12">
            <h4 className="page-title">Profile & Settings</h4>
          </Col>
        </Row>
        
        {/* Main Navigation Tabs */}
        <Row>
          <Col lg="12">
            <Nav tabs className="nav-tabs-custom nav-justified mb-4">
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => toggleTab('1')}
                >
                  <FiUser className="me-1" /> Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => toggleTab('2')}
                >
                  <FiLock className="me-1" /> Security
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '3' })}
                  onClick={() => toggleTab('3')}
                >
                  <FiCreditCard className="me-1" /> Banking
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '4' })}
                  onClick={() => toggleTab('4')}
                >
                  <FiBell className="me-1" /> Notifications
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '5' })}
                  onClick={() => toggleTab('5')}
                >
                  <FiSettings className="me-1" /> App Settings
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '6' })}
                  onClick={() => toggleTab('6')}
                >
                  <FiHelpCircle className="me-1" /> Help
                </NavLink>
              </NavItem>
            </Nav>
            
            {/* Tab Content */}
            <TabContent activeTab={activeTab}>
              {/* Profile Tab */}
              <TabPane tabId="1">
                <Row>
                  <Col lg="12">
                    <Card>
                      <CardBody>
                        <h5 className="card-title mb-4">Profile Information</h5>
                        <Form>
                          <Row>
                            <Col md="6">
                              <FormGroup className="mb-3">
                                <Label>First Name</Label>
                                <Input 
                                  type="text" 
                                  name="firstName" 
                                  value={profile.firstName} 
                                  onChange={handleInputChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup className="mb-3">
                                <Label>Last Name</Label>
                                <Input 
                                  type="text" 
                                  name="lastName" 
                                  value={profile.lastName} 
                                  onChange={handleInputChange}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="6">
                              <FormGroup className="mb-3">
                                <Label>Email</Label>
                                <Input 
                                  type="email" 
                                  name="email" 
                                  value={profile.email} 
                                  onChange={handleInputChange}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="6">
                              <FormGroup className="mb-3">
                                <Label>Phone</Label>
                                <Input 
                                  type="tel" 
                                  name="phone" 
                                  value={profile.phone} 
                                  onChange={handleInputChange}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="12">
                              <FormGroup className="mb-3">
                                <Label>Bio</Label>
                                <Input 
                                  type="textarea" 
                                  name="bio" 
                                  value={profile.bio} 
                                  onChange={handleInputChange}
                                  rows="3"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <div className="text-end mt-3">
                            <Button color="primary">Save Changes</Button>
                          </div>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              
              {/* Security Tab */}
              <TabPane tabId="2">
                <Card>
                  <CardBody>
                    <h5 className="card-title mb-4">Security Settings</h5>
                    
                    {/* Two-Factor Authentication */}
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                      <div>
                        <h6 className="mb-1">Two-Factor Authentication</h6>
                        <p className="text-muted mb-0">Add an extra layer of security to your account</p>
                      </div>
                      <div>
                        <div className="form-check form-switch">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="twoFactorEnabled" 
                            name="twoFactorEnabled"
                            checked={profile.twoFactorEnabled}
                            onChange={handleInputChange}
                          />
                          <label className="form-check-label" htmlFor="twoFactorEnabled">
                            {profile.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    {/* Fingerprint Authentication */}
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h6 className="mb-1">Fingerprint Authentication</h6>
                        <p className="text-muted mb-0">Use your fingerprint for quick login</p>
                      </div>
                      <div>
                        <div className="form-check form-switch">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="fingerprintAuth" 
                            name="fingerprintAuth"
                            checked={profile.fingerprintAuth}
                            onChange={handleInputChange}
                          />
                          <label className="form-check-label" htmlFor="fingerprintAuth">
                            {profile.fingerprintAuth ? 'Enabled' : 'Disabled'}
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    {/* Password */}
                    <div className="mt-4">
                      <h5 className="mb-3">Password</h5>
                      <Button 
                        color="primary" 
                        size="sm" 
                        onClick={() => toggleModal('Change Password', (
                          <Form>
                            <FormGroup className="mb-3">
                              <Label>Current Password</Label>
                              <Input type="password" name="currentPassword" />
                            </FormGroup>
                            <FormGroup className="mb-3">
                              <Label>New Password</Label>
                              <Input type="password" name="newPassword" />
                              <small className="form-text text-muted">Must be at least 8 characters long</small>
                            </FormGroup>
                            <FormGroup className="mb-3">
                              <Label>Confirm New Password</Label>
                              <Input type="password" name="confirmPassword" />
                            </FormGroup>
                          </Form>
                        ))}
                      >
                        Change Password
                      </Button>
                      <p className="text-muted mb-0">Last changed: 2 months ago</p>
                    </div>
                    
                    {/* Login History */}
                    <div className="mt-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0">Login History</h5>
                        <Button color="light" size="sm">View All</Button>
                      </div>
                      <div className="table-responsive">
                        <Table className="table-centered table-nowrap mb-0">
                          <thead className="table-light">
                            <tr>
                              <th>Date & Time</th>
                              <th>Device</th>
                              <th>Location</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Today, 10:45 AM</td>
                              <td>MacBook Pro (Chrome)</td>
                              <td>New York, USA</td>
                              <td><span className="badge bg-success">Success</span></td>
                            </tr>
                            <tr>
                              <td>Yesterday, 8:30 PM</td>
                              <td>iPhone 13 (Safari)</td>
                              <td>New York, USA</td>
                              <td><span className="badge bg-success">Success</span></td>
                            </tr>
                            <tr>
                              <td>Mar 15, 2023, 2:15 PM</td>
                              <td>Windows 10 (Firefox)</td>
                              <td>San Francisco, USA</td>
                              <td><span className="badge bg-warning">Suspicious</span></td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                    
                    {/* Session Management */}
                    <div className="mt-4">
                      <h5 className="mb-3">Active Sessions</h5>
                      <Card>
                        <CardBody>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <div className="avatar-xs me-3">
                                <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                  <i className="mdi mdi-laptop"></i>
                                </span>
                              </div>
                              <div>
                                <h6 className="mb-0">MacBook Pro (Chrome)</h6>
                                <p className="text-muted mb-0">New York, USA</p>
                              </div>
                            </div>
                            <div>
                              <Button color="danger" size="sm">Logout</Button>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                              <div className="avatar-xs me-3">
                                <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                  <i className="mdi mdi-cellphone"></i>
                                </span>
                              </div>
                              <div>
                                <h6 className="mb-0">iPhone 13 (Safari)</h6>
                                <p className="text-muted mb-0">New York, USA</p>
                              </div>
                            </div>
                            <div>
                              <Button color="danger" size="sm">Logout</Button>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </CardBody>
                </Card>
              </TabPane>
              
              {/* Notifications Tab */}
              <TabPane tabId="4">
                <Card>
                  <CardBody>
                    <h5 className="card-title mb-4">Notification Preferences</h5>
                    <p>Notification preferences will be implemented in the next update.</p>
                  </CardBody>
                </Card>
              </TabPane>
              
              {/* App Settings Tab */}
              <TabPane tabId="5">
                <Card>
                  <CardBody>
                    <h5 className="card-title mb-4">Application Settings</h5>
                    <p>Application settings will be implemented in the next update.</p>
                  </CardBody>
                </Card>
              </TabPane>
              
              {/* Help & Support Tab */}
              <TabPane tabId="6">
                <Card>
                  <CardBody>
                    <h5 className="card-title mb-4">Help & Support</h5>
                    <p>Help and support section will be implemented in the next update.</p>
                  </CardBody>
                </Card>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
        
        {/* Modal */}
        <Modal isOpen={modal} toggle={toggleModal} centered>
          <ModalHeader toggle={toggleModal}>{modalTitle}</ModalHeader>
          <ModalBody>
            {modalContent}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
            <Button color="primary">Save Changes</Button>
          </ModalFooter>
        </Modal>
      </Container>
    </div>
  );
};

export default ProfileSettings;
                        <div className="mt-4">
                          <h5 className="mb-3">Active Sessions</h5>
                          <Card>
                            <CardBody>
                              <div className="d-flex align-items-center justify-content-between mb-3">
                                <div className="d-flex align-items-center">
                                  <div className="avatar-xs me-3">
                                    <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                      <i className="mdi mdi-laptop"></i>
                                    </span>
                                  </div>
                                  <div>
                                    <h6 className="mb-0">MacBook Pro</h6>
                                    <p className="text-muted mb-0">Chrome on macOS</p>
                                  </div>
                                </div>
                                <div>
                                  <Button color="danger" size="sm">Logout</Button>
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                  <div className="avatar-xs me-3">
                                    <span className="avatar-title rounded-circle bg-soft-info text-info">
                                      <i className="mdi mdi-cellphone-iphone"></i>
                                    </span>
                                  </div>
                                  <div>
                                    <h6 className="mb-0">iPhone 13</h6>
                                    <p className="text-muted mb-0">Safari on iOS</p>
                                  </div>
                                </div>
                                <div>
                                  <Button color="danger" size="sm">Logout</Button>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                        
                        {/* Account Recovery */}
                        <div className="mt-4">
                          <h5 className="mb-3">Account Recovery</h5>
                          <Card>
                            <CardBody>
                              <div className="d-flex align-items-center justify-content-between">
                                <div>
                                  <h6 className="mb-1">Recovery Email</h6>
                                  <p className="text-muted mb-0">johndoe.backup@example.com</p>
                                </div>
                                <Button color="light" size="sm" onClick={() => toggleModal('Update Recovery Email')}>
                                  Update
                                </Button>
                              </div>
                              <hr />
                              <div className="d-flex align-items-center justify-content-between">
                                <div>
                                  <h6 className="mb-1">Recovery Phone</h6>
                                  <p className="text-muted mb-0">+1 (555) 987-6543</p>
                                </div>
                                <Button color="light" size="sm" onClick={() => toggleModal('Update Recovery Phone')}>
                                  Update
                                </Button>
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                        
                        <div className="mt-4 text-end">
                          <Button color="primary">Save Security Settings</Button>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              
              <TabPane tabId="3">
                <Row>
                  <Col lg="12">
                    <Card>
                      <CardBody>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h5 className="card-title mb-0">Bank Accounts</h5>
                          <Button 
                            color="primary" 
                            onClick={() => toggleModal('Link New Bank Account', (
                              <Form>
                                <FormGroup className="mb-3">
                                  <Label>Bank Name</Label>
                                  <Input type="select" name="bankName">
                                    <option value="">Select Bank</option>
                                    <option>Chase Bank</option>
                                    <option>Bank of America</option>
                                    <option>Wells Fargo</option>
                                    <option>Citibank</option>
                                    <option>Capital One</option>
                                    <option>Other Bank</option>
                                  </Input>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                  <Label>Account Type</Label>
                                  <Input type="select" name="accountType">
                                    <option value="checking">Checking</option>
                                    <option value="savings">Savings</option>
                                    <option value="credit">Credit Card</option>
                                    <option value="investment">Investment</option>
                                  </Input>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                  <Label>Account Holder Name</Label>
                                  <Input type="text" name="accountHolderName" />
                                </FormGroup>
                                <FormGroup className="mb-3">
                                  <Label>Account Number</Label>
                                  <Input type="text" name="accountNumber" placeholder="Enter last 4 digits" />
                                </FormGroup>
                                <FormGroup className="mb-3">
                                  <Label>Routing Number</Label>
                                  <Input type="text" name="routingNumber" />
                                </FormGroup>
                              </Form>
                            ))}
                          >
                            <i className="mdi mdi-plus me-1"></i> Link New Account
                          </Button>
                        </div>
                        
                        {/* Bank Accounts List */}
                        <div className="table-responsive">
                          <Table className="table-centered table-nowrap mb-0">
                            <thead className="table-light">
                              <tr>
                                <th>Bank</th>
                                <th>Account Type</th>
                                <th>Account Number</th>
                                <th>Balance</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <div className="avatar-xs me-3">
                                      <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                        <i className="mdi mdi-bank"></i>
                                      </span>
                                    </div>
                                    <div>
                                      <h6 className="mb-0">Chase Bank</h6>
                                      <p className="text-muted mb-0">Primary</p>
                                    </div>
                                  </div>
                                </td>
                                <td>Checking</td>
                                <td>•••• 4532</td>
                                <td>$12,450.67</td>
                                <td><span className="badge bg-success">Active</span></td>
                                <td>
                                  <UncontrolledDropdown>
                                    <DropdownToggle tag="a" className="text-muted font-size-16">
                                      <i className="mdi mdi-dots-horizontal"></i>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-end">
                                      <DropdownItem onClick={() => toggleModal('Edit Bank Account')}>
                                        <i className="mdi mdi-pencil-outline me-2"></i>Edit
                                      </DropdownItem>
                                      <DropdownItem>
                                        <i className="mdi mdi-bank-transfer me-2"></i>Make Primary
                                      </DropdownItem>
                                      <DropdownItem className="text-danger">
                                        <i className="mdi mdi-trash-can-outline me-2"></i>Remove
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <div className="avatar-xs me-3">
                                      <span className="avatar-title rounded-circle bg-soft-success text-success">
                                        <i className="mdi mdi-credit-card"></i>
                                      </span>
                                    </div>
                                    <div>
                                      <h6 className="mb-0">Chase Freedom</h6>
                                      <p className="text-muted mb-0">Credit Card</p>
                                    </div>
                                  </div>
                                </td>
                                <td>Credit Card</td>
                                <td>•••• 7821</td>
                                <td>-$1,234.56</td>
                                <td><span className="badge bg-success">Active</span></td>
                                <td>
                                  <UncontrolledDropdown>
                                    <DropdownToggle tag="a" className="text-muted font-size-16">
                                      <i className="mdi mdi-dots-horizontal"></i>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-end">
                                      <DropdownItem>
                                        <i className="mdi mdi-pencil-outline me-2"></i>Edit
                                      </DropdownItem>
                                      <DropdownItem className="text-danger">
                                        <i className="mdi mdi-trash-can-outline me-2"></i>Remove
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <div className="avatar-xs me-3">
                                      <span className="avatar-title rounded-circle bg-soft-info text-info">
                                        <i className="mdi mdi-bank"></i>
                                      </span>
                                    </div>
                                    <div>
                                      <h6 className="mb-0">Bank of America</h6>
                                      <p className="text-muted mb-0">Savings</p>
                                    </div>
                                  </div>
                                </td>
                                <td>Savings</td>
                                <td>•••• 9012</td>
                                <td>$45,678.90</td>
                                <td><span className="badge bg-success">Active</span></td>
                                <td>
                                  <UncontrolledDropdown>
                                    <DropdownToggle tag="a" className="text-muted font-size-16">
                                      <i className="mdi mdi-dots-horizontal"></i>
                                    </DropdownToggle>
                                    <DropdownMenu className="dropdown-menu-end">
                                      <DropdownItem>
                                        <i className="mdi mdi-pencil-outline me-2"></i>Edit
                                      </DropdownItem>
                                      <DropdownItem>
                                        <i className="mdi mdi-bank-transfer me-2"></i>Make Primary
                                      </DropdownItem>
                                      <DropdownItem className="text-danger">
                                        <i className="mdi mdi-trash-can-outline me-2"></i>Remove
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </UncontrolledDropdown>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                        
                        {/* Recent Transactions */}
                        <div className="mt-4">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="mb-0">Recent Transactions</h5>
                            <Button color="light" size="sm">View All</Button>
                          </div>
                          <Card>
                            <CardBody>
                              <div className="table-responsive">
                                <Table className="table-centered table-nowrap mb-0">
                                  <thead className="table-light">
                                    <tr>
                                      <th>Date</th>
                                      <th>Description</th>
                                      <th>Category</th>
                                      <th>Account</th>
                                      <th>Amount</th>
                                      <th>Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>Mar 28, 2023</td>
                                      <td>Grocery Store</td>
                                      <td>Groceries</td>
                                      <td>Chase •••• 4532</td>
                                      <td className="text-danger">-$156.78</td>
                                      <td><span className="badge bg-success">Completed</span></td>
                                    </tr>
                                    <tr>
                                      <td>Mar 27, 2023</td>
                                      <td>Salary Deposit</td>
                                      <td>Income</td>
                                      <td>Chase •••• 4532</td>
                                      <td className="text-success">+$5,200.00</td>
                                      <td><span className="badge bg-success">Completed</span></td>
                                    </tr>
                                    <tr>
                                      <td>Mar 26, 2023</td>
                                      <td>Electric Bill</td>
                                      <td>Utilities</td>
                                      <td>Chase •••• 4532</td>
                                      <td className="text-danger">-$89.50</td>
                                      <td><span className="badge bg-success">Completed</span></td>
                                    </tr>
                                    <tr>
                                      <td>Mar 25, 2023</td>
                                      <td>Restaurant</td>
                                      <td>Dining</td>
                                      <td>Chase Freedom •••• 7821</td>
                                      <td className="text-danger">-$67.89</td>
                                      <td><span className="badge bg-warning">Pending</span></td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                        
                        {/* Account Preferences */}
                        <div className="mt-4">
                          <h5 className="mb-3">Account Preferences</h5>
                          <Card>
                            <CardBody>
                              <div className="d-flex align-items-center justify-content-between mb-3">
                                <div>
                                  <h6 className="mb-1">Automatically Categorize Transactions</h6>
                                  <p className="text-muted mb-0">Use AI to automatically categorize your transactions</p>
                                </div>
                                <div>
                                  <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="autoCategorize" defaultChecked />
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex align-items-center justify-content-between">
                                <div>
                                  <h6 className="mb-1">Send Low Balance Alerts</h6>
                                  <p className="text-muted mb-0">Get notified when your account balance is low</p>
                                </div>
                                <div>
                                  <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="lowBalanceAlert" defaultChecked />
                                  </div>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
              
              <TabPane tabId="4">
                <Card>
                  <CardBody>
                    <h5 className="card-title mb-4">Notification Preferences</h5>
                    <p>Notification preferences will be implemented in the next update.</p>
                  </CardBody>
                </Card>
              </TabPane>
              
              <TabPane tabId="5">
                <Card>
                  <CardBody>
                    <h5 className="card-title mb-4">App Settings</h5>
                    <p>App settings will be implemented in the next update.</p>
                  </CardBody>
                </Card>
              </TabPane>
              
              <TabPane tabId="6">
                <Card>
                  <CardBody>
                    <h5 className="card-title mb-4">Help & Support</h5>
                    <p>Help and support section will be implemented in the next update.</p>
                  </CardBody>
                </Card>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
        
        {/* Modal */}
        <Modal isOpen={modal} toggle={toggleModal} centered>
          <ModalHeader toggle={toggleModal}>{modalTitle}</ModalHeader>
          <ModalBody>
            {modalContent || 'Modal content will appear here.'}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
            <Button color="primary">Save Changes</Button>
          </ModalFooter>
        </Modal>
      </Container>
    </div>
  );
};

export default ProfileSettings;
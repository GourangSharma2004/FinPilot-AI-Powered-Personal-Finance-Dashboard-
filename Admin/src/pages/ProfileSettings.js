import React, { useState } from 'react';
import { 
  Container, Row, Col, Card, CardBody, Button, 
  Form, FormGroup, Label, Input, TabContent, TabPane, 
  Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter,
  Table
} from 'reactstrap';
import classnames from 'classnames';
import { 
  FiUser, FiLock, FiBell, FiCreditCard, FiSettings, 
  FiHelpCircle, FiMail, FiPhone, FiDollarSign 
} from 'react-icons/fi';

// Sample data
const loginHistory = [
  { id: 1, date: 'Today, 10:45 AM', device: 'MacBook Pro (Chrome)', location: 'New York, USA', status: 'Success' },
  { id: 2, date: 'Yesterday, 8:30 PM', device: 'iPhone 13 (Safari)', location: 'New York, USA', status: 'Success' },
  { id: 3, date: 'Mar 15, 2023, 2:15 PM', device: 'Windows 10 (Firefox)', location: 'San Francisco, USA', status: 'Suspicious' },
];

const supportedBanks = [
  { id: 1, name: 'Chase Bank', icon: 'mdi mdi-bank' },
  { id: 2, name: 'Bank of America', icon: 'mdi mdi-bank' },
  { id: 3, name: 'Wells Fargo', icon: 'mdi mdi-bank' },
  { id: 4, name: 'Citibank', icon: 'mdi mdi-bank' },
];

const demoAccounts = [
  {
    id: 1,
    bank: 'Chase Bank',
    type: 'Checking',
    lastFour: '4582',
    balance: 12540.50,
    status: 'active',
    lastUpdated: '2 hours ago'
  },
  {
    id: 2,
    bank: 'Bank of America',
    type: 'Savings',
    lastFour: '7361',
    balance: 35670.25,
    status: 'active',
    lastUpdated: '1 day ago'
  },
  {
    id: 3,
    bank: 'Wells Fargo',
    type: 'Credit Card',
    lastFour: '9012',
    balance: 2450.75,
    status: 'active',
    lastUpdated: '3 days ago'
  }
];

const notifications = [
  {
    id: 1,
    title: 'Payment Received',
    message: 'You have received a payment of $1,250.00 from Acme Corp',
    time: '2 hours ago',
    read: false,
    type: 'payment'
  },
  {
    id: 2,
    title: 'Account Alert',
    message: 'Your monthly statement for Chase Credit Card is ready',
    time: '1 day ago',
    read: false,
    type: 'alert'
  },
  {
    id: 3,
    title: 'Security Notification',
    message: 'New login detected from New York, NY',
    time: '2 days ago',
    read: true,
    type: 'security'
  },
  {
    id: 4,
    title: 'Bill Reminder',
    message: 'Your electricity bill of $78.50 is due in 3 days',
    time: '3 days ago',
    read: true,
    type: 'reminder'
  }
];

// Helper functions for notifications
const getNotificationIcon = (type) => {
  switch(type) {
    case 'payment':
      return 'mdi-credit-card-check';
    case 'alert':
      return 'mdi-alert-circle';
    case 'security':
      return 'mdi-shield-check';
    case 'reminder':
      return 'mdi-bell-alert';
    default:
      return 'mdi-bell';
  }
};

const getNotificationIconClass = (type) => {
  switch(type) {
    case 'payment':
      return 'bg-soft-success text-success';
    case 'alert':
      return 'bg-soft-warning text-warning';
    case 'security':
      return 'bg-soft-danger text-danger';
    case 'reminder':
      return 'bg-soft-info text-info';
    default:
      return 'bg-soft-primary text-primary';
  }
};

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deletionRequested, setDeletionRequested] = useState(false);
  const [activeHelpTab, setActiveHelpTab] = useState('faq'); // For help modal tabs

  // State for 2FA setup
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [twoFACode, setTwoFACode] = useState('');
  const [twoFASecret, setTwoFASecret] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  
  // State for fingerprint setup
  const [fingerprintSetupStep, setFingerprintSetupStep] = useState(0); // 0: not started, 1: scanning, 2: completed
  
  const [profile, setProfile] = useState({
    // Personal Info
    firstName: 'Gourang',
    lastName: 'Sharma',
    email: 'gourangs2004@gmail.com',
    phone: '+91 98765 43210',
    bio: 'Financial enthusiast and tech lover',
    joinDate: '2023-01-15',
    lastLogin: new Date().toISOString(),
    accountStatus: 'Active',
    verificationStatus: 'Verified',
    
    // Security
    twoFactorEnabled: false,
    fingerprintAuth: false,
    lastPasswordChange: '2025-05-15',
    backupCodes: [],
    trustedDevices: [],
    securityQuestions: [
      { question: 'What was your first pet\'s name?', answer: '' },
      { question: 'In what city were you born?', answer: '' },
      { question: 'What is your mother\'s maiden name?', answer: '' }
    ],
    
    // Financial Overview
    totalBalance: 48210.75,
    connectedAccounts: 4,
    monthlyIncome: 8500.00,
    monthlySpending: 5240.50,
    investmentValue: 35670.25,
    
    // Preferences
    currency: 'INR',
    language: 'English',
    timezone: 'America/New_York',
    
    // Activity
    recentTransactions: [
      { id: 1, description: 'Grocery Store', amount: 124.50, date: '2025-06-28', category: 'Shopping' },
      { id: 2, description: 'Electric Bill', amount: 89.75, date: '2025-06-25', category: 'Utilities' },
      { id: 3, description: 'Salary Deposit', amount: 4250.00, date: '2025-06-25', category: 'Income' }
    ],
    
    // Goals
    financialGoals: [
      { id: 1, name: 'Emergency Fund', target: 15000, current: 8750, progress: 58 },
      { id: 2, name: 'Vacation Fund', target: 5000, current: 3200, progress: 64 },
      { id: 3, name: 'Retirement', target: 1000000, current: 35670, progress: 3.6 }
    ]
  });

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const toggleModal = (title = '', content = null) => {
    // If no parameters are provided, just toggle the modal state
    if (title === '' && content === null) {
      setModal(!modal);
    } else {
      // If parameters are provided, set the title and content, then show the modal
      setModalTitle(title);
      setModalContent(content);
      setModal(true);
    }
  };
  
  // Handle modal close
  const handleModalClose = () => {
    setModal(false);
    // Small delay before resetting the content to avoid flickering
    setTimeout(() => {
      setModalTitle('');
      setModalContent(null);
      setActiveHelpTab('faq'); // Reset to default tab
    }, 300);
  };
  
  // Show help modal with specific content
  const showHelpModal = (type) => {
    setActiveHelpTab(type);
    
    const helpContent = {
      contact: (
        <div>
          <h5>Contact Support</h5>
          <p className="text-muted">Our team is here to help you with any questions or issues.</p>
          
          <div className="mb-4">
            <h6 className="mb-3">Contact Information</h6>
            <div className="d-flex align-items-center mb-3">
              <div className="avatar-sm rounded-circle bg-soft-primary text-primary me-3 flex-shrink-0">
                <i className="mdi mdi-email-outline font-size-20"></i>
              </div>
              <div>
                <p className="mb-0 font-size-14">Email Us</p>
                <p className="text-muted mb-0">support@finpilot.com</p>
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="avatar-sm rounded-circle bg-soft-success text-success me-3 flex-shrink-0">
                <i className="mdi mdi-phone-outline font-size-20"></i>
              </div>
              <div>
                <p className="mb-0 font-size-14">Call Us</p>
                <p className="text-muted mb-0">+1 (800) 123-4567</p>
                <small className="text-muted">Available 24/7</small>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h6 className="mb-3">Send us a message</h6>
            <Form>
              <div className="mb-3">
                <Label>Subject</Label>
                <Input type="text" placeholder="How can we help you?" />
              </div>
              <div className="mb-3">
                <Label>Message</Label>
                <Input type="textarea" rows="4" placeholder="Please describe your issue in detail..." />
              </div>
              <Button color="primary">Send Message</Button>
            </Form>
          </div>
        </div>
      ),
      faq: (
        <div>
          <h5>Frequently Asked Questions</h5>
          <p className="text-muted mb-4">Find answers to common questions about our platform.</p>
          
          <div className="accordion" id="faqAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                  How do I connect my bank account?
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  To connect your bank account, go to the Banking tab and click on 'Add Account'. 
                  Search for your bank and follow the instructions to securely link your account.
                </div>
              </div>
            </div>
            
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                  Is my financial data secure?
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  Yes, we use bank-level encryption and security measures to protect your data. 
                  We never store your banking credentials on our servers and use read-only access to your accounts.
                </div>
              </div>
            </div>
            
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                  How can I update my profile information?
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                  You can update your profile information in the Profile tab. Click on the 'Edit Profile' button, 
                  make your changes, and click 'Save Changes' to update your information.
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      tutorials: (
        <div>
          <h5>Video Tutorials</h5>
          <p className="text-muted mb-4">Learn how to make the most of our platform with these helpful tutorials.</p>
          
          <div className="row g-3">
            <div className="col-md-6">
              <div className="card border">
                <div className="position-relative">
                  <img src="https://via.placeholder.com/300x180" className="card-img-top" alt="Getting Started" />
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <Button color="primary" className="rounded-circle" size="lg">
                      <i className="mdi mdi-play"></i>
                    </Button>
                  </div>
                </div>
                <div className="card-body">
                  <h6 className="card-title">Getting Started with FinPilot</h6>
                  <p className="text-muted font-size-13 mb-0">3:45 min</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border">
                <div className="position-relative">
                  <img src="https://via.placeholder.com/300x180" className="card-img-top" alt="Bank Connections" />
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <Button color="primary" className="rounded-circle" size="lg">
                      <i className="mdi mdi-play"></i>
                    </Button>
                  </div>
                </div>
                <div className="card-body">
                  <h6 className="card-title">Connecting Your Bank Accounts</h6>
                  <p className="text-muted font-size-13 mb-0">5:12 min</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h6>Helpful Articles</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-primary">
                  <i className="mdi mdi-file-document-outline me-1"></i> Understanding Your Dashboard
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-primary">
                  <i className="mdi mdi-file-document-outline me-1"></i> Setting Up Budgets and Goals
                </a>
              </li>
              <li>
                <a href="#" className="text-primary">
                  <i className="mdi mdi-file-document-outline me-1"></i> Using Reports and Analytics
                </a>
              </li>
            </ul>
          </div>
        </div>
      ),
      chat: (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0">Live Chat Support</h5>
            <span className="badge bg-success">Online</span>
          </div>
          
          <div className="chat-conversation p-3 border rounded" style={{height: '300px', overflowY: 'auto', backgroundColor: '#f8f9fa'}}>
            <div className="chat-message mb-3">
              <div className="d-flex">
                <div className="flex-shrink-0 me-2">
                  <div className="avatar-xs">
                    <div className="avatar-title rounded-circle bg-soft-primary text-primary">
                      S
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-light p-2 rounded mb-1">
                    <p className="mb-0">Hello! How can I help you today?</p>
                  </div>
                  <p className="text-muted font-size-12 mb-0">Support Agent • Just now</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="input-group">
              <Input type="text" className="form-control" placeholder="Type your message..." />
              <Button color="primary">
                <i className="mdi mdi-send"></i>
              </Button>
            </div>
          </div>
        </div>
      )
    }[type] || <p>Content not available.</p>;
    
    setModalTitle(
      type === 'contact' ? 'Contact Support' :
      type === 'faq' ? 'Frequently Asked Questions' :
      type === 'tutorials' ? 'Tutorials & Guides' :
      type === 'chat' ? 'Live Chat Support' :
      'Help Center'
    );
    
    setModalContent(helpContent);
    setModal(true);
  };

  // Generate and download user data
  const handleDownloadData = async () => {
    try {
      setIsLoading(true);
      
      // Create a JSON string of user data
      const userData = {
        profile: profile,
        accounts: demoAccounts,
        notifications: notifications,
        lastUpdated: new Date().toISOString()
      };
      
      // Create a Blob with the data
      const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Create a temporary link and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = `user-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIsLoading(false);
        
        // Show success message
        toggleModal('Download Complete', (
          <div>
            <p>Your data has been downloaded successfully.</p>
            <p className="mb-0">File: <code>{a.download}</code></p>
          </div>
        ));
      }, 100);
    } catch (error) {
      console.error('Error downloading data:', error);
      setIsLoading(false);
      toggleModal('Download Failed', 'There was an error downloading your data. Please try again.');
    }
  };
  
  // Show terms of service or privacy policy
  const showTerms = (type = 'terms') => {
    const contentMap = {
      terms: {
        title: 'Terms of Service',
        icon: 'mdi-file-document-outline',
        content: (
          <div className="terms-content">
            <h5>Terms of Service</h5>
            <div className="terms-text" style={{ maxHeight: '400px', overflowY: 'auto', padding: '10px', border: '1px solid #eee', borderRadius: '4px', margin: '15px 0' }}>
              <h6>Last Updated: June 29, 2025</h6>
              <p>Please read these Terms of Service ("Terms") carefully before using our service.</p>
              
              <h6>1. Account Terms</h6>
              <p>You are responsible for maintaining the security of your account and for all activities that occur under your account.</p>
              
              <h6>2. Privacy</h6>
              <p>Your use of our service is also governed by our Privacy Policy. Please review our Privacy Policy, which explains how we collect, use, and share your information.</p>
              
              <h6>3. User Responsibilities</h6>
              <p>You agree not to misuse the services or help anyone else do so. This includes not doing any of the following:</p>
              <ul>
                <li>Use our services for any illegal purpose</li>
                <li>Upload or share content that violates any law or the rights of others</li>
                <li>Attempt to gain unauthorized access to our services</li>
              </ul>
              
              <h6>4. Changes to Terms</h6>
              <p>We may update these Terms from time to time. We will notify you of any changes by posting the new Terms on this page.</p>
            </div>
          </div>
        )
      },
      privacy: {
        title: 'Privacy Policy',
        icon: 'mdi-shield-account',
        content: (
          <div className="privacy-content">
            <h5>Privacy Policy</h5>
            <div className="privacy-text" style={{ maxHeight: '400px', overflowY: 'auto', padding: '10px', border: '1px solid #eee', borderRadius: '4px', margin: '15px 0' }}>
              <h6>Last Updated: June 29, 2025</h6>
              <p>This Privacy Policy explains how we collect, use, and protect your personal information.</p>
              
              <h6>1. Information We Collect</h6>
              <p>We collect information you provide directly to us, including:</p>
              <ul>
                <li>Account information (name, email, phone number)</li>
                <li>Financial information (bank accounts, transactions)</li>
                <li>Usage data and analytics</li>
              </ul>
              
              <h6>2. How We Use Your Information</h6>
              <p>We use your information to:</p>
              <ul>
                <li>Provide and maintain our services</li>
                <li>Process transactions</li>
                <li>Improve our services</li>
                <li>Communicate with you</li>
              </ul>
              
              <h6>3. Data Security</h6>
              <p>We implement appropriate security measures to protect your personal information.</p>
            </div>
          </div>
        )
      }
    };
    
    const selectedContent = contentMap[type] || contentMap.terms;
    toggleModal(selectedContent.title, selectedContent.content);
  };
  
  // Handle account deletion request
  const handleDeleteRequest = () => {
    if (deletionRequested) {
      // Show confirmation for final deletion
      toggleModal('Confirm Account Deletion', (
        <div>
          <div className="alert alert-danger" role="alert">
            <i className="mdi mdi-alert-circle-outline me-2"></i>
            This action cannot be undone. All your data will be permanently deleted.
          </div>
          <Form>
            <FormGroup>
              <Label for="confirmPassword">Enter your password to confirm:</Label>
              <Input 
                type="password" 
                id="confirmPassword"
                className="mb-3" 
                placeholder="Enter your password" 
                required
              />
            </FormGroup>
            <div className="d-flex gap-2">
              <Button color="secondary" onClick={toggleModal} className="flex-grow-1">
                Cancel
              </Button>
              <Button 
                color="danger" 
                className="flex-grow-1" 
                onClick={confirmAccountDeletion}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                    Deleting...
                  </>
                ) : (
                  'Permanently Delete My Account'
                )}
              </Button>
            </div>
          </Form>
        </div>
      ));
    } else {
      // Initial deletion request
      toggleModal('Request Account Deletion', (
        <div>
          <div className="alert alert-warning" role="alert">
            <i className="mdi mdi-alert-outline me-2"></i>
            Please read this carefully before proceeding.
          </div>
          
          <p>We're sorry to see you go. Before you proceed, please note:</p>
          <ul className="mb-4">
            <li>This action will permanently delete all your data</li>
            <li>This cannot be undone</li>
            <li>You will lose access to all your financial information</li>
            <li>Any active subscriptions will be cancelled</li>
          </ul>
          
          <div className="form-check mb-4">
            <Input type="checkbox" className="form-check-input" id="confirmDelete" required />
            <Label className="form-check-label" for="confirmDelete">
              I understand that this action cannot be undone and all my data will be permanently deleted.
            </Label>
          </div>
          
          <div className="d-flex gap-2">
            <Button color="secondary" onClick={toggleModal} className="flex-grow-1">
              Cancel
            </Button>
            <Button 
              color="danger" 
              className="flex-grow-1" 
              onClick={() => {
                setDeletionRequested(true);
                toggleModal();
                setTimeout(handleDeleteRequest, 300); // Small delay for modal transition
              }}
              disabled={isLoading}
            >
              Continue to Deletion
            </Button>
          </div>
        </div>
      ));
    }
  };
  
  // Confirm and process account deletion
  const confirmAccountDeletion = async () => {
    const passwordInput = document.getElementById('confirmPassword');
    if (!passwordInput || !passwordInput.value) {
      alert('Please enter your password to confirm deletion.');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset state and show success message
      setIsLoading(false);
      setDeletionRequested(false);
      toggleModal();
      
      // Show success message
      toggleModal('Deletion Request Received', (
        <div className="text-center p-4">
          <div className="avatar-lg mx-auto mb-4">
            <div className="avatar-title bg-soft-success text-success rounded-circle">
              <i className="mdi mdi-check-all mdi-36px"></i>
            </div>
          </div>
          <h4>Request Received</h4>
          <p className="text-muted mb-4">
            Your account deletion request has been received. We will process it within 48 hours.
            You will receive a confirmation email once the process is complete.
          </p>
          <Button color="success" onClick={() => {
            toggleModal();
            // In a real app, you would log the user out here
            // history.push('/auth-login');
          }}>
            Return to Dashboard
          </Button>
        </div>
      ));
    } catch (error) {
      console.error('Error deleting account:', error);
      setIsLoading(false);
      alert('An error occurred while processing your request. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Special handling for security settings
    if (name === 'twoFactorEnabled' && checked) {
      // Generate a new 2FA secret when enabling 2FA
      const secret = generate2FASecret();
      setTwoFASecret(secret);
      setQrCodeUrl(generateQRCode(profile.email, 'FinPilot', secret));
      setShow2FASetup(true);
    } else if (name === 'fingerprintAuth' && checked) {
      // Start fingerprint enrollment
      setFingerprintSetupStep(1);
      // Simulate fingerprint scan (in a real app, this would use WebAuthn API)
      setTimeout(() => {
        setFingerprintSetupStep(2);
        setProfile(prev => ({
          ...prev,
          fingerprintAuth: true
        }));
      }, 2000);
    }
    
    // Update the profile state
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Generate a random 2FA secret
  const generate2FASecret = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let secret = '';
    for (let i = 0; i < 32; i++) {
      secret += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return secret;
  };
  
  // Generate QR code URL for 2FA setup
  const generateQRCode = (email, company, secret) => {
    const encodedEmail = encodeURIComponent(email);
    const encodedCompany = encodeURIComponent(company);
    return `https://chart.googleapis.com/chart?chs=200x200&chld=M|0&cht=qr&chl=otpauth://totp/${encodedCompany}:${encodedEmail}?secret=${secret}&issuer=${encodedCompany}`;
  };
  
  // Verify 2FA code
  const verify2FACode = () => {
    // In a real app, you would verify the code against the secret
    // For demo, we'll just check if it's 6 digits
    if (/^\d{6}$/.test(twoFACode)) {
      // Generate backup codes
      const backupCodes = Array(10).fill().map(() => 
        Math.random().toString(36).substring(2, 8).toUpperCase()
      );
      
      setProfile(prev => ({
        ...prev,
        twoFactorEnabled: true,
        backupCodes
      }));
      
      setShow2FASetup(false);
      setTwoFACode('');
      
      // Show success message
      alert('Two-factor authentication has been enabled successfully!');
    } else {
      alert('Please enter a valid 6-digit code');
    }
  };
  
  // Handle fingerprint setup
  const handleFingerprintSetup = () => {
    if (fingerprintSetupStep === 0) {
      setFingerprintSetupStep(1);
      // In a real app, this would initialize the WebAuthn API
      setTimeout(() => {
        setFingerprintSetupStep(2);
        setProfile(prev => ({
          ...prev,
          fingerprintAuth: true
        }));
      }, 2000);
    } else if (fingerprintSetupStep === 2) {
      setFingerprintSetupStep(0);
      setProfile(prev => ({
        ...prev,
        fingerprintAuth: false
      }));
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Row className="page-title-box">
          <Col xs="12">
            <h4 className="page-title">Profile & Settings</h4>
          </Col>
        </Row>
        
        <Row>
          <Col lg="12">
            <Nav tabs className="nav-tabs-custom nav-justified mb-4">
              <NavItem>
                <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => toggleTab('1')}>
                  <FiUser className="me-1" /> Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => toggleTab('2')}>
                  <FiLock className="me-1" /> Security
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: activeTab === '3' })} onClick={() => toggleTab('3')}>
                  <FiCreditCard className="me-1" /> Banking
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: activeTab === '4' })} onClick={() => toggleTab('4')}>
                  <FiBell className="me-1" /> Notifications
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: activeTab === '5' })} onClick={() => toggleTab('5')}>
                  <FiSettings className="me-1" /> App Settings
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: activeTab === '6' })} onClick={() => toggleTab('6')}>
                  <FiHelpCircle className="me-1" /> Help
                </NavLink>
              </NavItem>
            </Nav>
            
            <TabContent activeTab={activeTab}>
              {/* Profile Tab */}
              <TabPane tabId="1">
                <Row>
                  <Col lg={4}>
                    {/* Profile Card */}
                    <Card className="profile-card">
                      <CardBody className="text-center">
                        <div className="mb-4">
                          <div className="avatar-lg mx-auto">
                            <div className="avatar-title rounded-circle bg-soft-primary text-primary font-size-24">
                              {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                            </div>
                          </div>
                        </div>
                        <h4 className="mb-1">{profile.firstName} {profile.lastName}</h4>
                        <p className="text-muted mb-3">{profile.bio}</p>
                        <div className="d-flex gap-2 justify-content-center mb-4">
                          <Button color="primary" size="sm" className="btn-rounded">
                            <i className="mdi mdi-pencil me-1"></i> Edit Profile
                          </Button>
                          <Button color="light" size="sm" className="btn-rounded">
                            <i className="mdi mdi-share-variant me-1"></i> Share
                          </Button>
                        </div>
                        
                        <div className="mt-4 pt-3 border-top">
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Member Since</span>
                            <span className="fw-medium">{new Date(profile.joinDate).toLocaleDateString()}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Last Login</span>
                            <span className="fw-medium">{new Date(profile.lastLogin).toLocaleString()}</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span className="text-muted">Account Status</span>
                            <span className="badge bg-success">{profile.accountStatus}</span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                    
                    {/* Financial Overview */}
                    <Card className="mt-4">
                      <CardBody>
                        <h5 className="card-title mb-4">Financial Overview</h5>
                        <div className="mb-3">
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Total Balance</span>
                            <span className="fw-medium">₹{profile.totalBalance.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                          </div>
                          <div className="progress" style={{height: '6px'}}>
                            <div className="progress-bar bg-success" style={{width: '100%'}}></div>
                          </div>
                        </div>
                        
                        <div className="d-flex justify-content-between mb-2">
                          <span className="text-muted">Monthly Income</span>
                          <span className="fw-medium text-success">+₹{profile.monthlyIncome.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                          <span className="text-muted">Monthly Spending</span>
                          <span className="fw-medium text-danger">-₹{profile.monthlySpending.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="text-muted">Connected Accounts</span>
                          <span className="badge bg-primary">{profile.connectedAccounts} Accounts</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-muted">Investment Value</span>
                          <span className="fw-medium">₹{profile.investmentValue.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  
                  <Col lg={8}>
                    {/* Account Details */}
                    <Card className="mb-4">
                      <CardBody>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h5 className="card-title mb-0">Account Details</h5>
                          <Button color="light" size="sm" className="btn-sm">
                            <i className="mdi mdi-pencil-outline me-1"></i> Edit
                          </Button>
                        </div>
                        
                        <Row>
                          <Col md={6} className="mb-3">
                            <div className="p-3 border rounded">
                              <p className="text-muted mb-1">Full Name</p>
                              <h6 className="mb-0">{profile.firstName} {profile.lastName}</h6>
                            </div>
                          </Col>
                          <Col md={6} className="mb-3">
                            <div className="p-3 border rounded">
                              <p className="text-muted mb-1">Email</p>
                              <h6 className="mb-0">{profile.email}</h6>
                            </div>
                          </Col>
                          <Col md={6} className="mb-3">
                            <div className="p-3 border rounded">
                              <p className="text-muted mb-1">Phone</p>
                              <h6 className="mb-0">{profile.phone}</h6>
                            </div>
                          </Col>
                          <Col md={6} className="mb-3">
                            <div className="p-3 border rounded">
                              <p className="text-muted mb-1">Verification Status</p>
                              <span className="badge bg-success">{profile.verificationStatus}</span>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="p-3 border rounded">
                              <p className="text-muted mb-1">Default Currency</p>
                              <h6 className="mb-0">{profile.currency} - {profile.currency === 'INR' ? 'Indian Rupee' : 'Currency'}</h6>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="p-3 border rounded">
                              <p className="text-muted mb-1">Language</p>
                              <h6 className="mb-0">{profile.language}</h6>
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                    
                    {/* Recent Activity */}
                    <Card className="mb-4">
                      <CardBody>
                        <h5 className="card-title mb-4">Recent Activity</h5>
                        <div className="table-responsive">
                          <table className="table table-centered mb-0">
                            <thead>
                              <tr>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {profile.recentTransactions.map(transaction => (
                                <tr key={transaction.id}>
                                  <td>{transaction.description}</td>
                                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                  <td><span className="badge bg-light text-dark">{transaction.category}</span></td>
                                  <td className={transaction.amount > 0 ? 'text-success' : 'text-danger'}>
                                    {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toFixed(2)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardBody>
                    </Card>
                    
                    {/* Financial Goals */}
                    <Card>
                      <CardBody>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h5 className="card-title mb-0">Financial Goals</h5>
                          <Button color="primary" size="sm" className="btn-sm">
                            <i className="mdi mdi-plus me-1"></i> Add Goal
                          </Button>
                        </div>
                        
                        {profile.financialGoals.map(goal => (
                          <div key={goal.id} className="mb-3">
                            <div className="d-flex justify-content-between mb-1">
                              <span className="fw-medium">{goal.name}</span>
                              <span>₹{goal.current.toLocaleString()} of ₹{goal.target.toLocaleString()}</span>
                            </div>
                            <div className="progress" style={{height: '6px'}}>
                              <div 
                                className="progress-bar bg-primary" 
                                role="progressbar" 
                                style={{width: `${goal.progress}%`}}
                                aria-valuenow={goal.progress} 
                                aria-valuemin="0" 
                                aria-valuemax="100"
                              ></div>
                            </div>
                            <div className="d-flex justify-content-between mt-1">
                              <small className="text-muted">{goal.progress}% Complete</small>
                              <small className="text-muted">₹{(goal.target - goal.current).toLocaleString()} to go</small>
                            </div>
                          </div>
                        ))}
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
                    <Card className="mb-4">
                      <CardBody>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div>
                            <h6 className="mb-1">
                              <i className="mdi mdi-shield-lock-outline me-2"></i>
                              Two-Factor Authentication (2FA)
                            </h6>
                            <p className="text-muted mb-0">Add an extra layer of security to your account</p>
                          </div>
                          <div className="form-check form-switch">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              id="twoFactorEnabled" 
                              name="twoFactorEnabled"
                              checked={profile.twoFactorEnabled}
                              onChange={handleInputChange}
                              disabled={show2FASetup}
                            />
                            <label className="form-check-label" htmlFor="twoFactorEnabled">
                              {profile.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                            </label>
                          </div>
                        </div>
                        
                        {show2FASetup && (
                          <div className="border rounded p-3 bg-light mt-3">
                            <h6 className="mb-3">Set Up Two-Factor Authentication</h6>
                            <ol className="mb-4">
                              <li className="mb-2">Download an authenticator app like Google Authenticator or Authy</li>
                              <li className="mb-2">Scan the QR code below or enter this secret key: 
                                <code className="bg-white p-1 rounded ms-2">{twoFASecret}</code>
                              </li>
                              <li>Enter the 6-digit code from the app</li>
                            </ol>
                            
                            <div className="text-center mb-4">
                              {qrCodeUrl && (
                                <img src={qrCodeUrl} alt="QR Code" className="img-fluid mb-3" style={{ maxWidth: '200px' }} />
                              )}
                            </div>
                            
                            <FormGroup>
                              <Label>Enter 6-digit code</Label>
                              <div className="d-flex gap-2">
                                <Input 
                                  type="text" 
                                  maxLength="6" 
                                  value={twoFACode}
                                  onChange={(e) => setTwoFACode(e.target.value.replace(/\D/g, ''))}
                                  placeholder="123456"
                                  className="text-center"
                                />
                                <Button color="primary" onClick={verify2FACode}>
                                  Verify
                                </Button>
                                <Button color="light" onClick={() => {
                                  setShow2FASetup(false);
                                  setProfile(prev => ({ ...prev, twoFactorEnabled: false }));
                                }}>
                                  Cancel
                                </Button>
                              </div>
                            </FormGroup>
                          </div>
                        )}
                        
                        {profile.twoFactorEnabled && profile.backupCodes && (
                          <div className="mt-3">
                            <h6>Backup Codes</h6>
                            <p className="text-muted small mb-2">
                              Save these codes in a secure place. Each code can only be used once.
                            </p>
                            <div className="d-flex flex-wrap gap-2 mb-3">
                              {profile.backupCodes.map((code, index) => (
                                <div key={index} className="bg-white p-2 border rounded text-center" style={{ minWidth: '80px' }}>
                                  <code>{code}</code>
                                </div>
                              ))}
                            </div>
                            <Button color="outline-primary" size="sm" onClick={() => {
                              // Generate new backup codes
                              const newBackupCodes = Array(10).fill().map(() => 
                                Math.random().toString(36).substring(2, 8).toUpperCase()
                              );
                              setProfile(prev => ({
                                ...prev,
                                backupCodes: newBackupCodes
                              }));
                            }}>
                              Generate New Codes
                            </Button>
                          </div>
                        )}
                      </CardBody>
                    </Card>
                    
                    {/* Fingerprint Authentication */}
                    <Card className="mb-4">
                      <CardBody>
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <h6 className="mb-1">
                              <i className="mdi mdi-fingerprint me-2"></i>
                              Fingerprint Authentication
                            </h6>
                            <p className="text-muted mb-0">Use your fingerprint for quick and secure login</p>
                          </div>
                          <div className="form-check form-switch">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              id="fingerprintAuth" 
                              name="fingerprintAuth"
                              checked={profile.fingerprintAuth}
                              onChange={handleInputChange}
                              disabled={fingerprintSetupStep === 1}
                            />
                            <label className="form-check-label" htmlFor="fingerprintAuth">
                              {profile.fingerprintAuth ? 'Enabled' : 'Disabled'}
                            </label>
                          </div>
                        </div>
                        
                        {fingerprintSetupStep === 1 && (
                          <div className="mt-3 text-center p-3 bg-light rounded">
                            <div className="spinner-border text-primary mb-2" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mb-0">Waiting for fingerprint scan...</p>
                            <small className="text-muted">Place your finger on the sensor</small>
                          </div>
                        )}
                        
                        {profile.fingerprintAuth && (
                          <div className="mt-3">
                            <h6>Registered Fingerprints</h6>
                            <div className="d-flex gap-2 mb-3">
                              <div className="p-2 border rounded text-center">
                                <i className="mdi mdi-fingerprint d-block fs-3 mb-1"></i>
                                <small>Right Thumb</small>
                              </div>
                              <div className="p-2 border rounded text-center">
                                <i className="mdi mdi-fingerprint d-block fs-3 mb-1"></i>
                                <small>Left Thumb</small>
                              </div>
                              <Button color="light" size="sm" className="align-self-center">
                                <i className="mdi mdi-plus"></i> Add
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardBody>
                    </Card>
                    
                    {/* Password Change */}
                    <div className="mb-4">
                      <h6 className="mb-3">Password</h6>
                      <Button 
                        color="primary" 
                        size="sm"
                        onClick={() => toggleModal('Change Password', (
                          <Form>
                            <FormGroup>
                              <Label>Current Password</Label>
                              <Input type="password" name="currentPassword" />
                            </FormGroup>
                            <FormGroup>
                              <Label>New Password</Label>
                              <Input type="password" name="newPassword" />
                              <small className="text-muted">Must be at least 8 characters long</small>
                            </FormGroup>
                            <FormGroup>
                              <Label>Confirm New Password</Label>
                              <Input type="password" name="confirmPassword" />
                            </FormGroup>
                          </Form>
                        ))}
                      >
                        Change Password
                      </Button>
                      <p className="text-muted mt-2 mb-0">Last changed: 2 months ago</p>
                    </div>
                    
                    {/* Login History */}
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Login History</h6>
                        <Button color="light" size="sm">View All</Button>
                      </div>
                      <div className="table-responsive">
                        <Table className="table-centered table-nowrap">
                          <thead className="table-light">
                            <tr>
                              <th>Date & Time</th>
                              <th>Device</th>
                              <th>Location</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loginHistory.map((item) => (
                              <tr key={item.id}>
                                <td>{item.date}</td>
                                <td>{item.device}</td>
                                <td>{item.location}</td>
                                <td>
                                  <span className={`badge bg-${item.status === 'Success' ? 'success' : 'warning'}`}>
                                    {item.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </TabPane>
              
              {/* Banking Tab */}
              <TabPane tabId="3">
                <Card>
                  <CardBody>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="mb-0">Bank Accounts</h5>
                      <Button 
                        color="primary" 
                        size="sm"
                        onClick={() => toggleModal('Add Bank Account', (
                          <div>
                            <h6>Select your bank</h6>
                            <div className="row mt-3">
                              {supportedBanks.map(bank => (
                                <div key={bank.id} className="col-6 mb-3">
                                  <Button 
                                    color="light" 
                                    className="w-100 text-start"
                                    onClick={() => toggleModal('Connect Bank Account', (
                                      <div>
                                        <p>You'll be redirected to {bank.name} to securely connect your account.</p>
                                        <Button color="primary" className="mt-2">Continue to {bank.name}</Button>
                                      </div>
                                    ))}
                                  >
                                    <i className={`${bank.icon} me-2`}></i>
                                    {bank.name}
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      >
                        <i className="mdi mdi-plus me-1"></i> Add Account
                      </Button>
                    </div>
                    
                    <div className="alert alert-info mb-4">
                      <i className="mdi mdi-information-outline me-2"></i>
                      Your accounts are synced and up to date. Last updated: Just now
                    </div>
                    
                    <div className="accounts-list">
                      {demoAccounts.map(account => (
                        <Card key={account.id} className="mb-3 border">
                          <CardBody>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex align-items-center">
                                <div className="avatar-sm me-3">
                                  <div className="avatar-title bg-soft-primary text-primary rounded-circle">
                                    <i className="mdi mdi-bank"></i>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="mb-0">{account.bank}</h5>
                                  <p className="text-muted mb-0">•••• {account.lastFour} • {account.type}</p>
                                </div>
                              </div>
                              <div className="text-end">
                                <h5 className="mb-0">${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h5>
                                <small className="text-success">
                                  <i className="mdi mdi-check-circle-outline me-1"></i>
                                  {account.status}
                                </small>
                              </div>
                            </div>
                            <div className="mt-3 d-flex justify-content-between align-items-center">
                              <small className="text-muted">Last updated: {account.lastUpdated}</small>
                              <div>
                                <Button color="light" size="sm" className="me-2">
                                  <i className="mdi mdi-eye-outline"></i>
                                </Button>
                                <Button color="light" size="sm">
                                  <i className="mdi mdi-dots-vertical"></i>
                                </Button>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="mt-3">
                      <Button color="primary" className="w-100" outline>
                        <i className="mdi mdi-plus-circle-outline me-1"></i> Add Another Account
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </TabPane>
              
              {/* Notifications Tab */}
              <TabPane tabId="4">
                <Card>
                  <CardBody>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5 className="mb-0">Notifications</h5>
                      <div>
                        <Button color="light" size="sm" className="me-2">
                          <i className="mdi mdi-check-all me-1"></i> Mark all as read
                        </Button>
                        <Button color="light" size="sm">
                          <i className="mdi mdi-cog"></i>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="notification-list">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`notification-item p-3 border-bottom ${!notification.read ? 'bg-light' : ''}`}
                        >
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className={`avatar-sm rounded-circle ${getNotificationIconClass(notification.type)}`}>
                                <i className={`mdi ${getNotificationIcon(notification.type)}`}></i>
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <h6 className="mb-1">
                                {notification.title}
                                {!notification.read && <span className="badge bg-danger ms-2">New</span>}
                              </h6>
                              <p className="mb-1">{notification.message}</p>
                              <small className="text-muted">
                                <i className="mdi mdi-clock-outline me-1"></i>
                                {notification.time}
                              </small>
                            </div>
                            <div className="ms-3">
                              <Button color="light" size="sm" className="rounded-circle">
                                <i className="mdi mdi-dots-vertical"></i>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center mt-3">
                      <Button color="light" className="w-100">
                        <i className="mdi mdi-refresh me-1"></i> Load More
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </TabPane>
              
              {/* App Settings Tab */}
              <TabPane tabId="5">
                <Row>
                  <Col xs={12}>
                    <Card className="mb-4">
                      <CardBody>
                        <h5 className="card-title mb-4 d-flex align-items-center">
                          <i className="mdi mdi-palette-outline me-2 text-primary"></i>
                          <span>Appearance</span>
                        </h5>
                        
                        <div className="theme-options">
                          <Row className="g-3">
                            <Col md={4}>
                              <div className="form-check card-radio">
                                <input 
                                  type="radio" 
                                  className="form-check-input" 
                                  id="lightTheme" 
                                  name="theme" 
                                  defaultChecked 
                                />
                                <label className="form-check-label w-100" htmlFor="lightTheme">
                                  <div className="card h-100 mb-0">
                                    <div className="card-body p-2">
                                      <div className="rounded overflow-hidden">
                                        <div className="bg-light p-3">
                                          <div className="d-flex align-items-center justify-content-between mb-3">
                                            <span className="bg-primary rounded" style={{width: '20px', height: '20px'}}></span>
                                            <span className="bg-light border rounded" style={{width: '60%', height: '16px'}}></span>
                                          </div>
                                          <div className="bg-white p-4 rounded"></div>
                                        </div>
                                      </div>
                                      <div className="text-center mt-3">
                                        <span className="fw-medium">Light</span>
                                      </div>
                                    </div>
                                  </div>
                                </label>
                              </div>
                            </Col>
                            
                            <Col md={4}>
                              <div className="form-check card-radio">
                                <input 
                                  type="radio" 
                                  className="form-check-input" 
                                  id="darkTheme" 
                                  name="theme" 
                                />
                                <label className="form-check-label w-100" htmlFor="darkTheme">
                                  <div className="card h-100 mb-0">
                                    <div className="card-body p-2">
                                      <div className="rounded overflow-hidden">
                                        <div className="bg-dark p-3">
                                          <div className="d-flex align-items-center justify-content-between mb-3">
                                            <span className="bg-primary rounded" style={{width: '20px', height: '20px'}}></span>
                                            <span className="bg-secondary rounded" style={{width: '60%', height: '16px'}}></span>
                                          </div>
                                          <div className="bg-dark bg-opacity-25 p-4 rounded"></div>
                                        </div>
                                      </div>
                                      <div className="text-center mt-3">
                                        <span className="fw-medium">Dark</span>
                                      </div>
                                    </div>
                                  </div>
                                </label>
                              </div>
                            </Col>
                            
                            <Col md={4}>
                              <div className="form-check card-radio">
                                <input 
                                  type="radio" 
                                  className="form-check-input" 
                                  id="systemTheme" 
                                  name="theme" 
                                />
                                <label className="form-check-label w-100" htmlFor="systemTheme">
                                  <div className="card h-100 mb-0">
                                    <div className="card-body p-2">
                                      <div className="rounded overflow-hidden">
                                        <div className="position-relative">
                                          <div className="bg-light p-3">
                                            <div className="position-absolute top-0 end-0 bottom-0 w-50 bg-dark"></div>
                                            <div className="position-relative d-flex align-items-center justify-content-between mb-3">
                                              <span className="bg-primary rounded" style={{width: '20px', height: '20px'}}></span>
                                              <span className="bg-light border rounded" style={{width: '60%', height: '16px'}}></span>
                                            </div>
                                            <div className="position-relative">
                                              <div className="bg-white p-4 rounded"></div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="text-center mt-3">
                                        <span className="fw-medium">System Default</span>
                                      </div>
                                    </div>
                                  </div>
                                </label>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </CardBody>
                    </Card>
                    
                    <Row className="mt-4">
                      <Col md={6}>
                        <Card className="h-100">
                          <CardBody>
                            <h6 className="mb-3 d-flex align-items-center">
                              <i className="mdi mdi-translate me-2 text-primary"></i>
                              <span>Regional Settings</span>
                            </h6>
                            
                            <FormGroup className="mb-3">
                              <Label for="language" className="form-label">Language</Label>
                              <Input 
                                type="select" 
                                id="language" 
                                name="language" 
                                className="form-select"
                                defaultValue="en"
                              >
                                <option value="en">English</option>
                                <option value="es">Español</option>
                                <option value="fr">Français</option>
                                <option value="de">Deutsch</option>
                                <option value="hi">हिंदी</option>
                              </Input>
                            </FormGroup>
                            
                            <FormGroup className="mb-0">
                              <Label for="currency" className="form-label">Currency</Label>
                              <Input 
                                type="select" 
                                id="currency" 
                                name="currency" 
                                className="form-select"
                                defaultValue="USD"
                              >
                                <option value="USD">US Dollar (USD)</option>
                                <option value="EUR">Euro (EUR)</option>
                                <option value="GBP">British Pound (GBP)</option>
                                <option value="JPY">Japanese Yen (JPY)</option>
                                <option value="INR">Indian Rupee (INR)</option>
                              </Input>
                            </FormGroup>
                          </CardBody>
                        </Card>
                      </Col>
                      
                      <Col md={6}>
                        <Card className="h-100">
                          <CardBody>
                            <h6 className="mb-3 d-flex align-items-center">
                              <i className="mdi mdi-bell-outline me-2 text-primary"></i>
                              <span>Notification Preferences</span>
                            </h6>
                            
                            <div className="vstack gap-3">
                              <div className="form-check form-switch">
                                <Input 
                                  type="checkbox" 
                                  className="form-check-input" 
                                  id="emailNotifications" 
                                  defaultChecked 
                                />
                                <Label className="form-check-label" for="emailNotifications">
                                  <div className="d-flex flex-column">
                                    <span className="fw-medium">Email Notifications</span>
                                    <small className="text-muted">Receive email notifications</small>
                                  </div>
                                </Label>
                              </div>
                              
                              <div className="form-check form-switch">
                                <Input 
                                  type="checkbox" 
                                  className="form-check-input" 
                                  id="pushNotifications" 
                                  defaultChecked 
                                />
                                <Label className="form-check-label" for="pushNotifications">
                                  <div className="d-flex flex-column">
                                    <span className="fw-medium">Push Notifications</span>
                                    <small className="text-muted">Get updates via push notifications</small>
                                  </div>
                                </Label>
                              </div>
                              
                              <div className="form-check form-switch">
                                <Input 
                                  type="checkbox" 
                                  className="form-check-input" 
                                  id="transactionAlerts" 
                                  defaultChecked 
                                />
                                <Label className="form-check-label" for="transactionAlerts">
                                  <div className="d-flex flex-column">
                                    <span className="fw-medium">Transaction Alerts</span>
                                    <small className="text-muted">Get notified for transactions</small>
                                  </div>
                                </Label>
                              </div>
                              
                              <div className="form-check form-switch">
                                <Input 
                                  type="checkbox" 
                                  className="form-check-input" 
                                  id="marketingEmails" 
                                />
                                <Label className="form-check-label" for="marketingEmails">
                                  <div className="d-flex flex-column">
                                    <span className="fw-medium">Marketing Emails</span>
                                    <small className="text-muted">Receive promotional content</small>
                                  </div>
                                </Label>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    
                    <Row className="mt-4">
                      <Col xs={12}>
                        <Card>
                          <CardBody>
                            <h6 className="mb-3 d-flex align-items-center">
                              <i className="mdi mdi-shield-account-outline me-2 text-primary"></i>
                              <span>Data & Privacy</span>
                            </h6>
                            
                            <div className="vstack gap-2">
                              <Button 
                                color="light" 
                                className="text-start d-flex justify-content-between align-items-center p-3 rounded"
                                onClick={handleDownloadData}
                                disabled={isLoading}
                              >
                                <div>
                                  <div className="fw-medium">
                                    {isLoading ? 'Preparing Data...' : 'Download My Data'}
                                  </div>
                                  <small className="text-muted">
                                    {isLoading ? 'This may take a moment...' : 'Export your personal data'}
                                  </small>
                                </div>
                                {isLoading ? (
                                  <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                  </div>
                                ) : (
                                  <i className="mdi mdi-download ms-2"></i>
                                )}
                              </Button>
                              
                              <Button 
                                color="light" 
                                className="text-start d-flex justify-content-between align-items-center p-3 rounded"
                                onClick={handleDeleteRequest}
                                disabled={isLoading}
                              >
                                <div>
                                  <div className="fw-medium">
                                    {deletionRequested ? 'Complete Deletion' : 'Request Account Deletion'}
                                  </div>
                                  <small className="text-muted">
                                    {deletionRequested ? 'Complete the account deletion process' : 'Permanently delete your account'}
                                  </small>
                                </div>
                                <i className={`mdi ${deletionRequested ? 'mdi-alert-circle-outline text-danger' : 'mdi-delete-outline'} ms-2`}></i>
                              </Button>
                              
                              <Button 
                                color="light" 
                                className="text-start d-flex justify-content-between align-items-center p-3 rounded"
                                onClick={() => showTerms('privacy')}
                              >
                                <div>
                                  <div className="fw-medium">Privacy Policy</div>
                                  <small className="text-muted">Learn how we handle your data</small>
                                </div>
                                <i className="mdi mdi-shield-account ms-2"></i>
                              </Button>
                              
                              <Button 
                                color="light" 
                                className="text-start d-flex justify-content-between align-items-center p-3 rounded"
                                onClick={showTerms}
                              >
                                <div>
                                  <div className="fw-medium">Terms of Service</div>
                                  <small className="text-muted">Review our terms and conditions</small>
                                </div>
                                <i className="mdi mdi-file-document-outline ms-2"></i>
                              </Button>
                            </div>
                            
                            <div className="d-flex justify-content-end mt-4 pt-2 border-top">
                              <Button color="primary" className="px-4">
                                <i className="mdi mdi-content-save-outline me-1"></i> Save Changes
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </TabPane>
              
              {/* Help & Support Tab */}
              <TabPane tabId="6">
                <Row>
                  <Col lg={8}>
                    <Card className="mb-4">
                      <CardBody>
                        <h4 className="card-title mb-4">Help & Support Center</h4>
                        
                        {/* Search Help */}
                        <div className="search-box mb-4">
                          <div className="position-relative">
                            <Input 
                              type="text" 
                              className="form-control" 
                              placeholder="How can we help you?"
                            />
                            <i className="mdi mdi-magnify search-icon"></i>
                          </div>
                        </div>
                        
                        {/* Quick Actions */}
                        <Row className="mb-4">
                          <Col md={4} className="mb-3">
                            <Button color="light" className="w-100 text-start p-3" onClick={() => showHelpModal('contact')}>
                              <div className="d-flex align-items-center">
                                <div className="avatar-sm rounded-circle bg-soft-primary text-primary me-3 flex-shrink-0">
                                  <i className="mdi mdi-email-outline font-size-20"></i>
                                </div>
                                <div>
                                  <h6 className="mb-1">Contact Support</h6>
                                  <p className="text-muted mb-0 font-size-12">Get in touch with our team</p>
                                </div>
                              </div>
                            </Button>
                          </Col>
                          <Col md={4} className="mb-3">
                            <Button color="light" className="w-100 text-start p-3" onClick={() => showHelpModal('faq')}>
                              <div className="d-flex align-items-center">
                                <div className="avatar-sm rounded-circle bg-soft-success text-success me-3 flex-shrink-0">
                                  <i className="mdi mdi-help-circle-outline font-size-20"></i>
                                </div>
                                <div>
                                  <h6 className="mb-1">FAQs</h6>
                                  <p className="text-muted mb-0 font-size-12">Find answers to common questions</p>
                                </div>
                              </div>
                            </Button>
                          </Col>
                          <Col md={4} className="mb-3">
                            <Button color="light" className="w-100 text-start p-3" onClick={() => showHelpModal('tutorials')}>
                              <div className="d-flex align-items-center">
                                <div className="avatar-sm rounded-circle bg-soft-info text-info me-3 flex-shrink-0">
                                  <i className="mdi mdi-book-open-variant font-size-20"></i>
                                </div>
                                <div>
                                  <h6 className="mb-1">Tutorials</h6>
                                  <p className="text-muted mb-0 font-size-12">Learn how to use our platform</p>
                                </div>
                              </div>
                            </Button>
                          </Col>
                        </Row>
                        
                        {/* System Status */}
                        <Card className="border">
                          <CardBody>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <h5 className="mb-0">System Status</h5>
                              <span className="badge bg-success">All Systems Operational</span>
                            </div>
                            <div className="progress mb-2" style={{height: '6px'}}>
                              <div className="progress-bar bg-success" style={{width: '100%'}}></div>
                            </div>
                            <p className="text-muted mb-0">Last updated: Just now</p>
                          </CardBody>
                        </Card>
                      </CardBody>
                    </Card>
                    
                    {/* Popular Articles */}
                    <Card>
                      <CardBody>
                        <h5 className="card-title mb-4">Popular Help Articles</h5>
                        <div className="list-group list-group-flush">
                          <a href="#" className="list-group-item list-group-item-action border-0" onClick={(e) => {e.preventDefault(); showHelpModal('article1');}}>
                            <div className="d-flex align-items-center">
                              <div className="me-3">
                                <i className="mdi mdi-file-document-outline text-primary"></i>
                              </div>
                              <div>
                                <h6 className="mb-1">How to connect your bank account</h6>
                                <p className="text-muted mb-0 font-size-12">Step-by-step guide to link your bank</p>
                              </div>
                            </div>
                          </a>
                          <a href="#" className="list-group-item list-group-item-action border-0" onClick={(e) => {e.preventDefault(); showHelpModal('article2');}}>
                            <div className="d-flex align-items-center">
                              <div className="me-3">
                                <i className="mdi mdi-file-document-outline text-primary"></i>
                              </div>
                              <div>
                                <h6 className="mb-1">Understanding your dashboard</h6>
                                <p className="text-muted mb-0 font-size-12">Learn about all the features</p>
                              </div>
                            </div>
                          </a>
                          <a href="#" className="list-group-item list-group-item-action border-0" onClick={(e) => {e.preventDefault(); showHelpModal('article3');}}>
                            <div className="d-flex align-items-center">
                              <div className="me-3">
                                <i className="mdi mdi-file-document-outline text-primary"></i>
                              </div>
                              <div>
                                <h6 className="mb-1">Troubleshooting common issues</h6>
                                <p className="text-muted mb-0 font-size-12">Quick fixes for common problems</p>
                              </div>
                            </div>
                          </a>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  
                  <Col lg={4}>
                    {/* Contact Card */}
                    <Card className="mb-4">
                      <CardBody>
                        <h5 className="card-title mb-4">Contact Us</h5>
                        <div className="mb-4">
                          <h6 className="mb-3">Email Support</h6>
                          <p className="text-muted mb-1">For general inquiries</p>
                          <p><i className="mdi mdi-email-outline me-2"></i> support@finpilot.com</p>
                          
                          <h6 className="mt-4 mb-3">Phone Support</h6>
                          <p className="text-muted mb-1">Available 24/7</p>
                          <p><i className="mdi mdi-phone-outline me-2"></i> +1 (800) 123-4567</p>
                          
                          <h6 className="mt-4 mb-3">Live Chat</h6>
                          <p className="text-muted mb-3">Chat with our support team</p>
                          <Button color="primary" className="w-100" onClick={() => showHelpModal('chat')}>
                            <i className="mdi mdi-chat-outline me-1"></i> Start Chat
                          </Button>
                        </div>
                        
                        <div className="mt-4 pt-3 border-top">
                          <h6 className="mb-3">Follow Us</h6>
                          <div className="d-flex gap-2">
                            <Button color="light" className="btn-icon"><i className="mdi mdi-facebook"></i></Button>
                            <Button color="light" className="btn-icon"><i className="mdi mdi-twitter"></i></Button>
                            <Button color="light" className="btn-icon"><i className="mdi mdi-linkedin"></i></Button>
                            <Button color="light" className="btn-icon"><i className="mdi mdi-youtube"></i></Button>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                    
                    {/* Feedback */}
                    <Card>
                      <CardBody>
                        <h5 className="card-title mb-4">Send Feedback</h5>
                        <p className="text-muted mb-4">We'd love to hear your thoughts, suggestions, or concerns.</p>
                        <Form>
                          <div className="mb-3">
                            <Label>Your Feedback</Label>
                            <Input type="textarea" rows="4" placeholder="Tell us what you think..." />
                          </div>
                          <div className="mb-3">
                            <Label>Email (Optional)</Label>
                            <Input type="email" placeholder="Enter your email if you'd like a response" />
                          </div>
                          <Button color="primary" className="w-100">Send Feedback</Button>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
        
        {/* Modal */}
        <Modal 
          isOpen={modal} 
          toggle={handleModalClose}
          onClosed={() => {
            setModalTitle('');
            setModalContent(null);
          }}
          centered
          size="lg"
          className="modal-dialog-scrollable"
        >
          <ModalHeader toggle={handleModalClose}>
            <i className={`mdi ${
              modalTitle === 'Privacy Policy' ? 'mdi-shield-account' : 
              modalTitle === 'Terms of Service' ? 'mdi-file-document-outline' :
              'mdi-information-outline'
            } me-2`}></i>
            {modalTitle}
          </ModalHeader>
          <ModalBody style={{ maxHeight: '70vh' }} className="modal-body-scrollable">
            {modalContent}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleModalClose} disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Close'}
            </Button>
            {!modalTitle.includes('Terms') && 
             !modalTitle.includes('Policy') && 
             !modalTitle.includes('Complete') && 
             !modalTitle.includes('Received') && (
              <Button color="primary" onClick={handleModalClose} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            )}
          </ModalFooter>
        </Modal>
      </Container>
    </div>
  );
};

export default ProfileSettings;

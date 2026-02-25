import React, { useState, useRef } from 'react';
import { 
  Card, CardBody, Row, Col, Button, Table, Badge, Form, Input, FormGroup, 
  Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert 
} from 'reactstrap';
import classnames from 'classnames';
import { withTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Sample data for each category
const bankDocuments = [
  { id: 'b1', name: 'HDFC_Statement_June_2025.pdf', type: 'pdf', category: 'Bank Statements', date: '2025-06-15', size: '2.4 MB' },
  { id: 'b2', name: 'ICICI_Statement_May_2025.pdf', type: 'pdf', category: 'Bank Statements', date: '2025-05-15', size: '1.9 MB' },
  { id: 'b3', name: 'SBI_Statement_April_2025.pdf', type: 'pdf', category: 'Bank Statements', date: '2025-04-15', size: '2.1 MB' },
];

const loanDocuments = [
  { id: 'l1', name: 'Home_Loan_Agreement.pdf', type: 'pdf', category: 'Loan Documents', date: '2025-05-20', size: '1.8 MB' },
  { id: 'l2', name: 'Personal_Loan_EMI_Schedule.xlsx', type: 'xlsx', category: 'Loan Documents', date: '2025-03-10', size: '0.8 MB' },
  { id: 'l3', name: 'Car_Loan_Insurance.pdf', type: 'pdf', category: 'Loan Documents', date: '2025-02-15', size: '1.2 MB' },
];

const insuranceDocuments = [
  { id: 'i1', name: 'Health_Insurance_Policy.pdf', type: 'pdf', category: 'Insurance Policies', date: '2025-06-01', size: '3.2 MB' },
  { id: 'i2', name: 'Term_Insurance_Policy.pdf', type: 'pdf', category: 'Insurance Policies', date: '2024-11-15', size: '2.8 MB' },
  { id: 'i3', name: 'Car_Insurance_Renewal.pdf', type: 'pdf', category: 'Insurance Policies', date: '2025-01-20', size: '2.5 MB' },
];

const investmentDocuments = [
  { id: 'inv1', name: 'Mutual_Fund_Statement_Q2_2025.pdf', type: 'pdf', category: 'Investment Records', date: '2025-06-30', size: '1.5 MB' },
  { id: 'inv2', name: 'Stock_Portfolio_2025.xlsx', type: 'xlsx', category: 'Investment Records', date: '2025-06-01', size: '0.9 MB' },
  { id: 'inv3', name: 'FD_Certificate_ICICI.pdf', type: 'pdf', category: 'Investment Records', date: '2025-05-15', size: '1.1 MB' },
];

const identityDocuments = [
  { id: 'id1', name: 'Aadhar_Card.pdf', type: 'pdf', category: 'Identity Documents', date: '2025-04-10', size: '0.5 MB' },
  { id: 'id2', name: 'PAN_Card.pdf', type: 'pdf', category: 'Identity Documents', date: '2025-04-10', size: '0.4 MB' },
  { id: 'id3', name: 'Passport_Scanned.pdf', type: 'pdf', category: 'Identity Documents', date: '2025-03-20', size: '2.8 MB' },
];

const taxDocuments = [
  { id: 't1', name: 'ITR_AY_2024-25.pdf', type: 'pdf', category: 'Tax Documents', date: '2025-03-31', size: '1.2 MB' },
  { id: 't2', name: 'Form_16_2024-25.pdf', type: 'pdf', category: 'Tax Documents', date: '2025-04-15', size: '0.8 MB' },
  { id: 't3', name: 'Capital_Gains_Statement_2025.pdf', type: 'pdf', category: 'Tax Documents', date: '2025-02-28', size: '0.9 MB' },
];

const documentCategories = [
  { id: '1', name: 'Bank Statements', icon: 'ri-bank-line', count: bankDocuments.length },
  { id: '2', name: 'Loan Documents', icon: 'ri-bank-card-line', count: loanDocuments.length },
  { id: '3', name: 'Insurance Policies', icon: 'ri-health-book-line', count: insuranceDocuments.length },
  { id: '4', name: 'Investment Records', icon: 'ri-line-chart-line', count: investmentDocuments.length },
  { id: '5', name: 'Identity Documents', icon: 'ri-profile-line', count: identityDocuments.length },
  { id: '6', name: 'Tax Documents', icon: 'ri-file-text-line', count: taxDocuments.length },
];

const Documents = ({ t }) => {
  const [activeTab, setActiveTab] = useState('1');
  const [documents, setDocuments] = useState({
    '1': [...bankDocuments],
    '2': [...loanDocuments],
    '3': [...insuranceDocuments],
    '4': [...investmentDocuments],
    '5': [...identityDocuments],
    '6': [...taxDocuments]
  });
  const [newFolderModal, setNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  // Initialize folders state with some sample folders for each category
  const [folders, setFolders] = useState({
    '1': [{ id: 'f1', name: 'Statements 2025' }],
    '2': [{ id: 'f2', name: 'Home Loan' }, { id: 'f3', name: 'Car Loan' }],
    '3': [{ id: 'f4', name: 'Health Insurance' }, { id: 'f5', name: 'Vehicle Insurance' }],
    '4': [{ id: 'f6', name: 'Stocks' }, { id: 'f7', name: 'Mutual Funds' }],
    '5': [{ id: 'f8', name: 'Personal IDs' }, { id: 'f9', name: 'Address Proofs' }],
    '6': [{ id: 'f10', name: 'IT Returns' }, { id: 'f11', name: 'Form 16' }]
  });
  const fileInputRef = useRef(null);
  
  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const newDocs = files.map(file => ({
        id: Date.now() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.name.split('.').pop(),
        size: (file.size / (1024 * 1024).toFixed(2)) + ' MB',
        date: new Date().toLocaleDateString(),
        category: documentCategories.find(cat => cat.id === activeTab)?.name || 'Other',
        status: 'Uploaded'
      }));
      
      setDocuments(prev => ({
        ...prev,
        [activeTab]: [...newDocs, ...prev[activeTab]]
      }));
      
      toast.success(`${files.length} file(s) uploaded successfully!`);
    }
  };
  
  const handleNewFolder = () => {
    if (newFolderName.trim()) {
      setFolders(prev => ({
        ...prev,
        [activeTab]: [...prev[activeTab], {
          id: Date.now().toString(),
          name: newFolderName.trim()
        }]
      }));
      setNewFolderName('');
      setNewFolderModal(false);
      toast.success('Folder created successfully!');
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };


  
  const getFileIcon = (fileType) => {
    const iconMap = {
      'pdf': 'ri-file-pdf-line text-danger',
      'xlsx': 'ri-file-excel-line text-success',
      'xls': 'ri-file-excel-line text-success',
      'doc': 'ri-file-word-line text-primary',
      'docx': 'ri-file-word-line text-primary',
      'jpg': 'ri-image-line text-info',
      'jpeg': 'ri-image-line text-info',
      'png': 'ri-image-line text-info',
    };
    return iconMap[fileType ? fileType.toLowerCase() : ''] || 'ri-file-line';
  };

  // Initialize ToastContainer
  const ToastContainer = () => (
    <div className="toast-container position-fixed top-0 end-0 p-3">
      <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <strong className="me-auto">Notification</strong>
          <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div className="toast-body"></div>
      </div>
    </div>
  );

  return (
    <div className="page-content">
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="mb-0">Documents & Reports</h4>
              <div>
                <Button color="primary" className="me-2" onClick={triggerFileInput}>
                  <i className="ri-upload-line align-middle me-1"></i> Upload Document
                  <input 
                    type="file" 
                    className="file-upload-input" 
                    onChange={handleFileChange}
                    multiple
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                  />
                </Button>
                <Button color="success" onClick={() => setNewFolderModal(true)}>
                  <i className="ri-folder-add-line align-middle me-1"></i> New Folder
                </Button>
              </div>
            </div>
            
            {/* New Folder Modal */}
            <Modal isOpen={newFolderModal} toggle={() => setNewFolderModal(false)}>
              <ModalHeader toggle={() => setNewFolderModal(false)}>Create New Folder</ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="folderName">Folder Name</Label>
                  <Input 
                    type="text" 
                    id="folderName" 
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    placeholder="Enter folder name"
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => setNewFolderModal(false)}>Cancel</Button>
                <Button color="primary" onClick={handleNewFolder}>Create</Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>

        <Row className="mt-4">
          <Col xl={3}>
            <Card>
              <CardBody>
                <h5 className="card-title mb-4">Categories</h5>
                <div className="d-grid gap-2">
                  {documentCategories.map((category) => (
                    <Button 
                      key={category.id}
                      color="light" 
                      className="text-start mb-2 d-flex justify-content-between align-items-center"
                      onClick={() => toggleTab(category.id)}
                      active={activeTab === category.id}
                    >
                      <span>
                        <i className={`${category.icon} me-2`}></i>
                        {category.name}
                      </span>
                      <Badge color="primary" className="ms-2">{documents[category.id]?.length || 0}</Badge>
                    </Button>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xl={9}>
            <Card>
              <CardBody>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="card-title mb-0">
                    {documentCategories.find(cat => cat.id === activeTab)?.name || 'All Documents'}
                  </h5>
                  <FormGroup className="mb-0">
                    <Input type="text" className="form-control" placeholder="Search documents..." />
                  </FormGroup>
                </div>

                <div className="table-responsive">
                  <Table className="table-centered mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Date Added</th>
                        <th>Size</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documents[activeTab]?.map((doc) => (
                        <tr key={doc.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <i className={`${getFileIcon(doc.type)} font-size-24 me-3`}></i>
                              <div>
                                <h6 className="mb-0">{doc.name}</h6>
                                <p className="text-muted mb-0">{doc.type.toUpperCase()} Document</p>
                              </div>
                            </div>
                          </td>
                          <td>{doc.category}</td>
                          <td>{doc.date}</td>
                          <td>{doc.size}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button color="light" size="sm">
                                <i className="ri-download-line"></i>
                              </Button>
                              <Button color="light" size="sm">
                                <i className="ri-share-line"></i>
                              </Button>
                              <Button color="light" size="sm">
                                <i className="ri-delete-bin-line text-danger"></i>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default withTranslation()(Documents);

import React, { useState } from 'react';
import { Badge } from 'reactstrap';

const CreditCard = ({ card }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    
    const handleFlip = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFlipped(!isFlipped);
    };

    const calculateUtilization = (used, limit) => {
        return Math.round((used / limit) * 100);
    };

    return (
        <div className={`credit-card-wrapper ${isFlipped ? 'flipped' : ''}`}>
            {/* Front of Card */}
            <div className={`credit-card ${card.cardColor} ${card.borderColor} ${card.textColor} rounded-3 p-4 position-relative overflow-hidden`} 
                style={{
                    minHeight: '220px',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)',
                    transition: 'transform 0.6s',
                    position: isFlipped ? 'absolute' : 'relative',
                    width: '100%',
                    zIndex: isFlipped ? 1 : 2
                }}>
                
                {/* Card Brand and Type */}
                <div className="d-flex justify-content-between align-items-start mb-4">
                    <div>
                        <div className="d-flex align-items-center mb-2">
                            <div className="card-brand me-2">
                                {card.cardBrand === 'visa' && (
                                    <i className="ri-visa-fill" style={{fontSize: '24px'}}></i>
                                )}
                                {card.cardBrand === 'mastercard' && (
                                    <i className="ri-mastercard-fill" style={{fontSize: '24px'}}></i>
                                )}
                                {card.cardBrand === 'amex' && (
                                    <i className="ri-american-express-fill" style={{fontSize: '24px'}}></i>
                                )}
                                {card.cardBrand === 'discover' && (
                                    <i className="ri-bank-card-fill" style={{fontSize: '24px'}}></i>
                                )}
                            </div>
                            <span className="text-uppercase small fw-bold">{card.type}</span>
                        </div>
                        <h5 className="mb-0">{card.bank}</h5>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="card-chip me-2"></div>
                        <Badge color={card.status === 'Active' ? 'success' : 'danger'} className="rounded-pill">
                            {card.status}
                        </Badge>
                    </div>
                </div>

                {/* Card Number */}
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-uppercase small text-white-50">Card Number</span>
                        <span className="small text-white-50">{card.cardNetwork}</span>
                    </div>
                    <div className="card-number d-flex align-items-center" style={{letterSpacing: '1.5px'}}>
                        <span className="me-2">••••</span>
                        <span className="me-2">••••</span>
                        <span className="me-2">••••</span>
                        <span>{card.cardNumber}</span>
                    </div>
                </div>

                {/* Card Footer */}
                <div className="d-flex justify-content-between align-items-center mt-4">
                    <div>
                        <div className="small text-white-50 mb-1">Card Holder</div>
                        <div className="text-uppercase">{card.cardHolder}</div>
                    </div>
                    <div className="text-end me-3">
                        <div className="small text-white-50 mb-1">Valid Thru</div>
                        <div>{card.validThru}</div>
                    </div>
                    <div className="contactless-symbol"></div>
                </div>

                {/* Flip Button */}
                <button 
                    className="flip-card-btn"
                    onClick={handleFlip}
                    title="Flip card"
                >
                    <i className="ri-refresh-line"></i>
                </button>
            </div>

            {/* Back of Card */}
            <div className="credit-card-back rounded-3 p-4" style={{
                background: 'linear-gradient(135deg, #f5f5f5, #e0e0e0)',
                minHeight: '220px',
                border: '1px solid #ddd',
                position: 'relative',
                overflow: 'hidden',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                transition: 'transform 0.6s',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1
            }}>
                <div className="card-strip"></div>
                
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="card-hologram"></div>
                    <div className="text-end">
                        <small className="text-muted d-block">CVV</small>
                        <div className="cvv-strip">
                            {card.cvv}
                        </div>
                    </div>
                </div>
                
                <div className="mt-4">
                    <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted small">Credit Limit</span>
                        <span className="fw-medium">₹{card.creditLimit.toLocaleString()}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted small">Used Amount</span>
                        <span className="fw-medium">₹{card.usedAmount.toLocaleString()}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted small">Available</span>
                        <span className="fw-bold">₹{(card.creditLimit - card.usedAmount).toLocaleString()}</span>
                    </div>
                    
                    <div className="progress mb-2" style={{height: '6px'}}>
                        <div 
                            className="progress-bar" 
                            role="progressbar" 
                            style={{
                                width: `${calculateUtilization(card.usedAmount, card.creditLimit)}%`,
                                backgroundColor: calculateUtilization(card.usedAmount, card.creditLimit) > 70 ? '#dc3545' : '#198754',
                                borderRadius: '3px'
                            }}
                        ></div>
                    </div>
                    
                    <div className="d-flex justify-content-between">
                        <small className="text-muted">
                            {calculateUtilization(card.usedAmount, card.creditLimit)}% utilized
                        </small>
                        <small className={`fw-medium ${calculateUtilization(card.usedAmount, card.creditLimit) > 70 ? 'text-danger' : 'text-success'}`}>
                            {calculateUtilization(card.usedAmount, card.creditLimit) > 70 ? 'High Usage' : 'Good'}
                        </small>
                    </div>
                </div>
                
                <div className="mt-3 pt-3 border-top">
                    <div className="row">
                        <div className="col-6">
                            <p className="text-muted mb-1 small">Due Date</p>
                            <p className="mb-0 fw-medium">{card.dueDate}</p>
                        </div>
                        <div className="col-6 text-end">
                            <p className="text-muted mb-1 small">Min. Due</p>
                            <p className="mb-0 fw-medium">₹{card.minDue.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Flip Button */}
                <button 
                    className="flip-card-btn"
                    onClick={handleFlip}
                    title="Flip card"
                >
                    <i className="ri-refresh-line"></i>
                </button>
            </div>
        </div>
    );
};

export default CreditCard;

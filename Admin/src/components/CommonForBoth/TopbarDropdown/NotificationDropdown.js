import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";

//i18b
import { withTranslation } from "react-i18next";

// Icons
const getNotificationIcon = (type) => {
  switch(type) {
    case 'bill':
      return 'ri-bill-line';
    case 'investment':
      return 'ri-line-chart-line';
    case 'transaction':
      return 'ri-exchange-line';
    case 'alert':
      return 'ri-alert-line';
    case 'reminder':
      return 'ri-alarm-warning-line';
    default:
      return 'ri-information-line';
  }
};

class NotificationDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            menu: !prevState.menu
        }));
    }
    render() {
        return (
            <React.Fragment>
                <Dropdown isOpen={this.state.menu} toggle={this.toggle} className="d-inline-block">
                    <DropdownToggle tag="button" className="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown">
                        <i className="ri-notification-3-line"></i>
                        <span className="noti-dot"></span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end dropdown-menu-lg p-0"
                        aria-labelledby="page-header-notifications-dropdown">
                        <div className="p-3">
                            <Row className="align-items-center">
                                <Col>
                                    <h6 className="m-0"> {this.props.t('Notifications')} </h6>
                                </Col>
                                <div className="col-auto">
                                    <Link to="#" className="small"> {this.props.t('View All')}</Link>
                                </div>
                            </Row>
                        </div>
                        <SimpleBar style={{ maxHeight: "350px" }}>
                            {/* Bill Payment Reminder */}
                            <Link to="/bills" className="text-reset notification-item">
                                <div className="d-flex">
                                    <div className="avatar-xs me-3">
                                        <span className="avatar-title bg-warning rounded-circle font-size-16">
                                            <i className={getNotificationIcon('bill')}></i>
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h6 className="mt-0 mb-1">Bill Payment Due</h6>
                                        <div className="font-size-12 text-muted">
                                            <p className="mb-1">Your electricity bill of ₹1,245 is due in 2 days</p>
                                            <p className="mb-0"><i className="mdi mdi-clock-outline"></i> 15 min ago</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Investment Update */}
                            <Link to="/investments" className="text-reset notification-item">
                                <div className="d-flex">
                                    <div className="avatar-xs me-3">
                                        <span className="avatar-title bg-success rounded-circle font-size-16">
                                            <i className={getNotificationIcon('investment')}></i>
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h6 className="mt-0 mb-1">Investment Update</h6>
                                        <div className="font-size-12 text-muted">
                                            <p className="mb-1">Your mutual fund investment has grown by 2.5% this week</p>
                                            <p className="mb-0"><i className="mdi mdi-clock-outline"></i> 2 hours ago</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Transaction Alert */}
                            <Link to="/transactions" className="text-reset notification-item">
                                <div className="d-flex">
                                    <div className="avatar-xs me-3">
                                        <span className="avatar-title bg-info rounded-circle font-size-16">
                                            <i className={getNotificationIcon('transaction')}></i>
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h6 className="mt-0 mb-1">Transaction Successful</h6>
                                        <div className="font-size-12 text-muted">
                                            <p className="mb-1">Paid ₹1,200 to Amazon via UPI</p>
                                            <p className="mb-0"><i className="mdi mdi-clock-outline"></i> 5 hours ago</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Budget Alert */}
                            <Link to="/budget" className="text-reset notification-item">
                                <div className="d-flex">
                                    <div className="avatar-xs me-3">
                                        <span className="avatar-title bg-danger rounded-circle font-size-16">
                                            <i className={getNotificationIcon('alert')}></i>
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h6 className="mt-0 mb-1">Budget Alert</h6>
                                        <div className="font-size-12 text-muted">
                                            <p className="mb-1">You've reached 85% of your monthly dining budget</p>
                                            <p className="mb-0"><i className="mdi mdi-clock-outline"></i> 1 day ago</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Payment Reminder */}
                            <Link to="/reminders" className="text-reset notification-item">
                                <div className="d-flex">
                                    <div className="avatar-xs me-3">
                                        <span className="avatar-title bg-primary rounded-circle font-size-16">
                                            <i className={getNotificationIcon('reminder')}></i>
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h6 className="mt-0 mb-1">Upcoming Payment</h6>
                                        <div className="font-size-12 text-muted">
                                            <p className="mb-1">Credit card payment of ₹15,200 due in 3 days</p>
                                            <p className="mb-0"><i className="mdi mdi-clock-outline"></i> 1 day ago</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </SimpleBar>
                        <div className="p-2 border-top">
                            <Link to="#" className="btn btn-sm btn-link font-size-14 btn-block text-center">
                                <i className="mdi mdi-arrow-right-circle me-1"></i>{this.props.t(' View More')}
                            </Link>
                        </div>
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment>
        );
    }
}
export default withTranslation()(NotificationDropdown);

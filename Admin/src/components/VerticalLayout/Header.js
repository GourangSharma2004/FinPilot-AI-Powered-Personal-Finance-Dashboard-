import React, { Component } from "react";

import { connect } from "react-redux";
import {
    Row,
    Col,
    Form,
    FormGroup,
    InputGroup,
    Input,
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
} from "reactstrap";

import { Link } from "react-router-dom";

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

//Import i18n
import { withTranslation } from "react-i18next";

//Import Megamenu
import MegaMenu from "./MegaMenu";

// Redux Store
import { toggleRightSidebar } from "../../store/actions";

// Import logo
import finpilotLogo from "../../assets/images/finpilot-logo.svg";

// Payment Apps
const paymentApps = [
  { name: 'Google Pay', url: 'https://pay.google.com' },
  { name: 'Paytm', url: 'https://paytm.com' },
  { name: 'PhonePe', url: 'https://www.phonepe.com' },
  { name: 'Amazon Pay', url: 'https://pay.amazon.in' },
  { name: 'BHIM UPI', url: 'https://www.npci.org.in/what-we-do/upi/product-overview' },
  { name: 'Mobikwik', url: 'https://www.mobikwik.com' }
];

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearch: false,
            isSocialPf: false
        };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleRightbar = this.toggleRightbar.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
    }
    /**
     * Toggle sidebar
     */
    toggleMenu() {
        this.props.toggleMenuCallback();
    }

    /**
     * Toggles the sidebar
     */
    toggleRightbar() {
        this.props.toggleRightSidebar();
    }


    toggleFullscreen() {
        if (
            !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
            !document.webkitFullscreenElement
        ) {
            // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(
                    Element.ALLOW_KEYBOARD_INPUT
                );
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <header id="page-topbar">
                    <div className="navbar-header">
                        <div className="d-flex">

                            <div className="navbar-brand-box" style={{ padding: '0 1rem', backgroundColor: '#fff', borderRadius: '4px', marginRight: '1rem' }}>
                                <Link to="/" className="logo" style={{ lineHeight: '70px' }}>
                                    <span className="logo-lg">
                                        <img src={finpilotLogo} alt="FinPilot" height="40" style={{ verticalAlign: 'middle' }} />
                                    </span>
                                </Link>
                            </div>

                            <Button size="sm" color="none" type="button" onClick={this.toggleMenu} className="px-3 font-size-24 header-item waves-effect" id="vertical-menu-btn">
                                <i className="ri-menu-2-line align-middle"></i>
                            </Button>

                            <Form className="app-search d-none d-lg-block">
                                <div className="position-relative">
                                    <Input type="text" className="form-control" placeholder={this.props.t('Search')} />
                                    <span className="ri-search-line"></span>
                                </div>
                            </Form>

                            <MegaMenu />
                        </div>

                        <div className="d-flex">
                            <div className="dropdown d-inline-block d-lg-none ms-2">
                                <button type="button" onClick={() => { this.setState({ isSearch: !this.state.isSearch }); }} className="btn header-item noti-icon waves-effect" id="page-header-search-dropdown">
                                    <i className="ri-search-line"></i>
                                </button>
                                <div className={this.state.isSearch === true ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show" : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"}
                                    aria-labelledby="page-header-search-dropdown">

                                    <Form className="p-3">
                                        <FormGroup className="m-0">
                                            <InputGroup>
                                                <Input type="text" className="form-control" placeholder={this.props.t('Search')} />
                                                <div className="input-group-append">
                                                    <Button color="primary" type="submit"><i className="ri-search-line"></i></Button>
                                                </div>
                                            </InputGroup>
                                        </FormGroup>
                                    </Form>
                                </div>
                            </div>

                            <LanguageDropdown />

                            <Dropdown isOpen={this.state.isSocialPf} toggle={() => this.setState({ isSocialPf: !this.state.isSocialPf })} className="d-none d-lg-inline-block ms-1">
                                <DropdownToggle tag="button" className="btn header-item noti-icon waves-effect">
                                    <i className="ri-wallet-3-line"></i>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end">
                                    <div className="px-2 py-2">
                                        <h6 className="dropdown-header text-uppercase">Payment Apps</h6>
                                        {paymentApps.map((app, idx) => (
                                            <a 
                                                key={idx} 
                                                href={app.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="dropdown-item py-2"
                                            >
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-shrink-0 me-2">
                                                        <i className={`ri-wallet-${idx % 2 === 0 ? '2' : '3'}-line align-middle text-primary`}></i>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        {app.name}
                                                    </div>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </DropdownMenu>
                            </Dropdown>

                            <div className="dropdown d-none d-lg-inline-block ms-1">
                                <Button color="none" type="button" className="header-item noti-icon waves-effect" onClick={this.toggleFullscreen}>
                                    <i className="ri-fullscreen-line"></i>
                                </Button>
                            </div>

                            <NotificationDropdown />

                            <ProfileMenu />

                            <div className="dropdown d-inline-block">
                                <Button color="none" onClick={this.toggleRightbar} type="button" className="header-item noti-icon right-bar-toggle waves-effect">
                                    <i className="ri-settings-2-line"></i>
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const { layoutType } = state.Layout;
    return { layoutType };
};

export default connect(mapStatetoProps, { toggleRightSidebar })(withTranslation()(Header));

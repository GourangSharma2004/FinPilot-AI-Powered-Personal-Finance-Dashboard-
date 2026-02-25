import React, { Component } from "react";

// MetisMenu
import MetisMenu from "metismenujs";
// import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from 'react-i18next';

import { connect } from "react-redux";
import {
  changeLayout,
  changeLayoutWidth,
  changeSidebarTheme,
  changeSidebarType,
  changePreloader
} from "../../store/actions";
import withRouter from "../Common/withRouter";

class SidebarContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pathName: this.props.router.location.pathname,
    };

  }

  componentDidMount() {
    this.initMenu();
  }

  UNSAFE_componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {

        if (this.props.type !== prevProps.type) {
            this.initMenu();
        }

    }
    if (this.props.router.location.pathname !== prevProps.router.location.pathname) {
      this.setState({ pathName: this.props.router.location.pathname }, () => {
        this.initMenu();
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  initMenu() {
    new MetisMenu("#side-menu");
    const { pathName } = this.state;


    var matchingMenuItem = null;
    var ul = document.getElementById("side-menu");
    var items = ul.getElementsByTagName("a");
    for (var i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }

  activateParentDropdown = item => {
    item.classList.add("active");
    const parent = item.parentElement;

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-active");
          }
        }
      }
      return false;
    }
    return false;
  };

  handleNavigation = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    console.log('Navigation clicked:', href);
    this.props.router.navigate(href);
  };

  render() {
    console.log('Current path:', this.props.router.location.pathname);
    return (
      <React.Fragment>
        <div id="sidebar-menu">

          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{this.props.t('Menu')}</li>

            <li>
              <Link to="/dashboard" className="waves-effect">
                <i className="ri-dashboard-line"></i><span className="badge rounded-pill bg-success float-end">3</span>
                <span className="ms-1">{this.props.t('Dashboard')}</span>
              </Link>
            </li>

            <li>
              <Link to="/income" className="waves-effect" onClick={this.handleNavigation}>
                <i className="ri-money-dollar-circle-line"></i>
                <span className="ms-1">Income Encounter</span>
              </Link>
            </li>
            <li>
              <Link to="/#" className="has-arrow waves-effect">
                <i className="ri-profile-line"></i>
                <span className="ms-1">Expense Encounter</span>
              </Link>
              <ul className="sub-menu">
                <li><Link to="/expenses/recurring">Recurring (Fixed)</Link></li>
                <li><Link to="/expenses/variable">Variable (Flexible)</Link></li>
                <li><Link to="/expenses/one-time">One Time Expense (Unexpected)</Link></li>
              </ul>
            </li>
            <li>
              <Link to="/insurance" className="waves-effect">
                <i className="ri-shield-star-line"></i>
                <span className="ms-1">Insurance Management</span>
              </Link>
            </li>
            <li>
              <Link to="/account" className="waves-effect">
                <i className="ri-bank-line"></i>
                <span className="ms-1">Account Management</span>
              </Link>
            </li>
            <li>
              <Link to="/credit-loans" className="waves-effect">
                <i className="ri-bank-card-line"></i>
                <span className="ms-1">Credit & Loans</span>
              </Link>
            </li>

            <li>
              <Link to="/documents" className="waves-effect">
                <i className="ri-health-book-line"></i>
                <span className="ms-1">Documents & Reports</span>
              </Link>
            </li>
            <li>
              <Link to="/investment-portfolio" className="waves-effect">
                <i className="ri-briefcase-line"></i>
                <span className="ms-1">Investment Portfolio</span>
              </Link>
            </li>

            <li>
              <Link to="/financial-calendar" className="waves-effect">
                <i className="ri-calendar-event-line"></i>
                <span className="ms-1">Financial Calendar</span>
              </Link>
            </li>
            <li>
              <Link to="/learning" className="waves-effect">
                <i className="ri-book-read-line"></i>
                <span className="ms-1">Learning & Advisory</span>
              </Link>
            </li>
            <li>
              <Link to="/profile-settings" className="waves-effect">
                <i className="ri-user-settings-line"></i>
                <span className="ms-1">Profile & Settings</span>
              </Link>
            </li>


          </ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  return { ...state.Layout };
};

export default withRouter(connect(mapStatetoProps, {
  changeLayout,
  changeSidebarTheme,
  changeSidebarType,
  changeLayoutWidth,
  changePreloader
})(withTranslation()(SidebarContent)));

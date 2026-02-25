import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

//i18n
import i18n from '../../../i18n';
import { withTranslation } from 'react-i18next';

// flags
import usFlag from "../../../assets/images/flags/us.jpg";
import spain from "../../../assets/images/flags/spain.jpg";
import germany from "../../../assets/images/flags/germany.jpg";
import italy from "../../../assets/images/flags/italy.jpg";
import russia from "../../../assets/images/flags/russia.jpg";
// Using a base64 encoded Indian flag SVG for better quality
const indiaFlag = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5MDAiIGhlaWdodD0iNjAwIj48cGF0aCBmaWxsPSIjZmY5OTMzIiBkPSJtMCwwaDkwMHY2MDBoLTE4MDB6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTAsMjI1aDkwMHYxNTBoLTkwMHoiLz48cGF0aCBmaWxsPSIjMDA4NzQ2IiBkPSJtMCwzMDBoOTAwdjE1MGgtOTAweiIvPjxjaXJjbGUgY3g9IjQ1MCIgY3k9IjMwMCIgcj0iODUiIGZpbGw9IiMwMDg3NDYiLz48Y2lyY2xlIGN4PSI0NTAiIGN5PSIzMDAiIHI9Ijc1IiBmaWxsPSIjZmY5OTMzIi8+8J+Uu++4jyI+PC9jaXJjbGU+PC9zdmc+";

class LanguageDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      lng: "India",
      flag: indiaFlag
    };
    this.toggle = this.toggle.bind(this);
    this.changeLanguageAction.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      menu: !prevState.menu
    }));
  }

  changeLanguageAction = (lng) => {

    //set the selected language to i18n
    i18n.changeLanguage(lng);

    if (lng === "in")
      this.setState({ lng: "India", flag: indiaFlag });
    else if (lng === "sp")
      this.setState({ lng: "Spanish", flag: spain });
    else if (lng === "gr")
      this.setState({ lng: "German", flag: germany });
    else if (lng === "rs")
      this.setState({ lng: "Russian", flag: russia });
    else if (lng === "it")
      this.setState({ lng: "Italian", flag: italy });
    else if (lng === "eng")
      this.setState({ lng: "English", flag: usFlag });
  }

  render() {

    return (
      <React.Fragment>
        <Dropdown isOpen={this.state.menu} toggle={this.toggle} className="d-none d-sm-inline-block">
          <DropdownToggle tag="button" className="btn header-item waves-effect d-flex align-items-center" style={{ padding: '0.5rem 0.75rem' }}>
            <div className="d-flex align-items-center">
              <div style={{
                width: '20px',
                height: '14px',
                backgroundImage: `url(${this.state.flag})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid #dee2e6',
                borderRadius: '2px',
                marginRight: '0.5rem'
              }} />
              <span>{this.state.lng}</span>
            </div>
          </DropdownToggle>

          <DropdownMenu className="dropdown-menu-end">
            <DropdownItem active={this.state.lng === "India" ? true : false} href="" onClick={() => this.changeLanguageAction('in')} className="notify-item">
              <div className="d-flex align-items-center">
                <img 
                  src={indiaFlag} 
                  alt="Indian Flag" 
                  className="me-2" 
                  style={{
                    width: '16px',
                    height: '12px',
                    objectFit: 'cover',
                    border: '1px solid #dee2e6',
                    borderRadius: '2px'
                  }} 
                />
                <span>India</span>
              </div>
            </DropdownItem>

            <DropdownItem active={this.state.lng === "English" ? true : false} href="" onClick={() => this.changeLanguageAction('eng')} className="notify-item">
              <img src={usFlag} alt="US Flag" className="me-1" height="12" /> <span className="align-middle">English</span>
            </DropdownItem>

            <div className="dropdown-divider"></div>
            
            <DropdownItem href="" active={this.state.lng === "Spanish" ? true : false} onClick={() => this.changeLanguageAction('sp')} className="notify-item">
              <img src={spain} alt="Spanish Flag" className="me-1" height="12" /> <span className="align-middle">Spanish</span>
            </DropdownItem>

            <DropdownItem href="" active={this.state.lng === "German" ? true : false} onClick={() => this.changeLanguageAction('gr')} className="notify-item">
              <img src={germany} alt="German Flag" className="me-1" height="12" /> <span className="align-middle">German</span>
            </DropdownItem>

            <DropdownItem href="" active={this.state.lng === "Italian" ? true : false} onClick={() => this.changeLanguageAction('it')} className="notify-item">
              <img src={italy} alt="Italian Flag" className="me-1" height="12" /> <span className="align-middle">Italian</span>
            </DropdownItem>

            <DropdownItem href="" active={this.state.lng === "Russian" ? true : false} onClick={() => this.changeLanguageAction('rs')} className="notify-item">
              <img src={russia} alt="Russian Flag" className="me-1" height="12" /> <span className="align-middle">Russian</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    );
  }
}

export default withTranslation()(LanguageDropdown);

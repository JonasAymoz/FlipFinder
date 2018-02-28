import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Contact extends Component {
  render() {
    return (
      <div className="contactDiv">
          <div>
              <h3>Contact:</h3>
              <h2>jonas.aymoz@gmail.com</h2>
          </div>
      </div>
    );
  }
}

Contact.propTypes = {};
Contact.defaultProps = {};

export default Contact;
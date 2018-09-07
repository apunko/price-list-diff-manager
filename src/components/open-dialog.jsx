import React from 'react';
import PropTypes from 'prop-types';
import * as Logger from 'electron-log';

const { dialog } = require('electron').remote;

class OpenDisalog extends React.Component {
  constructor(props) {
    super(props);

    this.state = { path: '' };

    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleClick() {
    dialog.showOpenDialog(
      {
        title: this.props.label,
      },
      this.handleSelect,
    );
  }

  handleSelect(filePaths) {
    Logger.info(filePaths);
    this.setState({ path: filePaths[0] });
  }

  render() {
    return (
      <>
        <span>
          {this.props.label}
          -
          {this.state.path}
        </span>
        <button type="button" onClick={this.handleClick}>Select</button>
      </>
    );
  }
}

OpenDisalog.propTypes = {
  label: PropTypes.string.isRequired,
};

export default OpenDisalog;

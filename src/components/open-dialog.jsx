import React from 'react';
import PropTypes from 'prop-types';
import * as Logger from 'electron-log';

const { dialog } = require('electron').remote;

class OpenDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = { path: null };

    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleClick() {
    dialog.showOpenDialog(
      {
        title: this.props.label,
        properties: [this.props.type],
        filters: [
          { name: 'Excel', extensions: ['xls', 'xlsx'] },
        ],
      },
      this.handleSelect,
    );
  }

  handleSelect(filePaths) {
    Logger.info(filePaths);
    this.setState({ path: filePaths ? filePaths[0] : null });
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

OpenDialog.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
};

OpenDialog.defaultProps = {
  type: 'openFile',
};

export default OpenDialog;

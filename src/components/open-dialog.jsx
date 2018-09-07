import React from 'react';
import PropTypes from 'prop-types';

const { dialog } = require('electron').remote;

class OpenDialog extends React.Component {
  constructor(props) {
    super(props);

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
    this.props.updatePath(this.props.name, filePaths ? filePaths[0] : null);
  }

  render() {
    return (
      <>
        <button type="button" onClick={this.handleClick}>{this.props.label}</button>
      </>
    );
  }
}

OpenDialog.propTypes = {
  label: PropTypes.string.isRequired,
  updatePath: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
};

OpenDialog.defaultProps = {
  type: 'openFile',
};

export default OpenDialog;

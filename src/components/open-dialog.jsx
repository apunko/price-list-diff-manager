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
        title: this.props.title,
        properties: [this.props.type],
        filters: [
          { name: 'Excel', extensions: ['xls', 'xlsx'] },
        ],
      },
      this.handleSelect,
    );
  }

  handleSelect(filePaths) {
    this.props.onSelect(filePaths ? filePaths[0] : null);
  }

  render() {
    return (
      <>
        <button type="button" onClick={this.handleClick}>{this.props.title}</button>
      </>
    );
  }
}

OpenDialog.propTypes = {
  onSelect: PropTypes.func.isRequired,
  type: PropTypes.string,
  title: PropTypes.string,
};

OpenDialog.defaultProps = {
  type: 'openFile',
  title: 'Select',
};

export default OpenDialog;

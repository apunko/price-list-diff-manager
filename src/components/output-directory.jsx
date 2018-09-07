import React from 'react';
import PropTypes from 'prop-types';
import OpenDialog from './open-dialog';

class OutputDirectory extends React.Component {
  render() {
    return (
      <>
        Pass to the file: {this.props.path ? this.props.path : 'No file'}
        <OpenDialog
          label={this.props.label}
          name={this.props.name}
          updatePath={this.props.updatePath}
          type="openFile"
        />
      </>
    );
  }
}

OutputDirectory.propTypes = {
  label: PropTypes.string.isRequired,
  updatePath: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string,
};

OutputDirectory.defaultProps = {
  path: null,
};

export default OutputDirectory;

import React from 'react';
import PropTypes from 'prop-types';
import * as Log from 'electron-log';
import OpenDialog from './open-dialog';

class FileParsingConfig extends React.Component {
  constructor(props) {
    super(props);

    this.handlePathUpdate = this.handlePathUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handlePathUpdate(path) {
    this.props.change(this.props.name, { ...this.props.file, path });
  }

  handleChange(event) {
    const { name, value } = event.target;
    Log.info(name);
    Log.info(value);
    this.props.change(this.props.name, { ...this.props.file, [name]: value });
  }

  render() {
    return (
      <>
        <h2>{this.props.title}</h2>
        <label htmlFor="idColumn">
          ID column number:
          <input
            type="number"
            name="idColumn"
            min="1"
            onChange={this.handleChange}
            value={this.props.file.idColumn}
          />
        </label>
        <label htmlFor="startRow">
          Parsing start row:
          <input
            type="number"
            name="startRow"
            min="1"
            onChange={this.handleChange}
            value={this.props.file.startRow}
          />
        </label>
        Pass to the file: {this.props.file.path ? this.props.file.path : 'No file'}
        <OpenDialog
          title={`Select ${this.props.title}`}
          onSelect={this.handlePathUpdate}
        />
      </>
    );
  }
}

FileParsingConfig.propTypes = {
  title: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  file: PropTypes.shape({
    path: PropTypes.string,
    idColumn: PropTypes.number.isRequired,
    startRow: PropTypes.number.isRequired,
  }).isRequired,
};

export default FileParsingConfig;

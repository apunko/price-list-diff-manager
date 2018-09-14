import React from 'react';
import PropTypes from 'prop-types';
import { NumberInput, SelectFile } from './fields';

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
    this.props.change(this.props.name, { ...this.props.file, [name]: value });
  }

  render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <NumberInput
          onChange={this.handleChange}
          value={this.props.file.idColumn}
          name="idColumn"
          label="ID Column:"
        />
        <NumberInput
          onChange={this.handleChange}
          value={this.props.file.priceColumn}
          name="priceColumn"
          label="Price Column:"
        />
        <NumberInput
          onChange={this.handleChange}
          value={this.props.file.startRow}
          name="startRow"
          label="Parsing start row:"
        />
        <SelectFile
          title={this.props.title}
          path={this.props.file.path}
          onSelect={this.handlePathUpdate}
        />
      </div>
    );
  }
}

FileParsingConfig.propTypes = {
  title: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  file: PropTypes.shape({
    path: PropTypes.string,
    idColumn: PropTypes.string.isRequired,
    startRow: PropTypes.string.isRequired,
    priceColumn: PropTypes.string.isRequired,
  }).isRequired,
};

export default FileParsingConfig;

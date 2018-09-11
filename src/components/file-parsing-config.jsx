import React from 'react';
import PropTypes from 'prop-types';
import OpenDialog from './open-dialog';
import NumberField from './number-field';

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
        <NumberField
          onChange={this.handleChange}
          value={this.props.file.idColumn}
          name="idColumn"
          label="ID Column number:"
        />
        <NumberField
          onChange={this.handleChange}
          value={this.props.file.priceColumn}
          name="priceColumn"
          label="Price Column:"
        />
        <NumberField
          onChange={this.handleChange}
          value={this.props.file.startRow}
          name="startRow"
          label="Parsing start row:"
        />
        <div className="grid-item">
          <OpenDialog
            title={`Select ${this.props.title}`}
            onSelect={this.handlePathUpdate}
          />
          Selected file:
          {this.props.file.path ? this.props.file.path : ' - '}
        </div>
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

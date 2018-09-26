import React from 'react';
import PropTypes from 'prop-types';
import OpenDialog from '../open-dialog';
import './select-file.css';

const SelectFile = ({ title, path, onSelect }) => (
  <div className="grid-item">
    <OpenDialog
      title={`Select ${title}`}
      onSelect={onSelect}
    />
    <div className="selected-file">
      <div>Selected file:</div>
      <div className="file-path">{`${path || '-'}`}</div>
    </div>
  </div>
);

SelectFile.propTypes = {
  title: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  path: PropTypes.string,
};

SelectFile.defaultProps = {
  path: null,
};

export default SelectFile;

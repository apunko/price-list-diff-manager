import React from 'react';
import PropTypes from 'prop-types';
import OpenDialog from '../open-dialog';

const SelectFile = ({ title, path, onSelect }) => (
  <div className="grid-item">
    <OpenDialog
      title={`Select ${title}`}
      onSelect={onSelect}
    />
    <div>
      {`Selected file: ${path || '-'}`}
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

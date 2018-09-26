// eslint-disable-next-line import/no-extraneous-dependencies
import { shell } from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import './external-link.css';

const ExternalLink = ({ href, title }) => (
  <button
    type="button"
    className="external"
    onClick={() => (shell.openExternal(href))}
  >
    {title}
  </button>
);

ExternalLink.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default ExternalLink;

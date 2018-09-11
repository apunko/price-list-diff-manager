const FileConfigHelper = {
  isValid: config => (
    config.path !== null && config.idColumn > 0 && config.startRow > 0
  ),
};

export default FileConfigHelper;

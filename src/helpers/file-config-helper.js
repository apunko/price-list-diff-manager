const FileConfigHelper = {
  isValid: config => (
    config.path !== null && config.idColumn > 0 && config.priceColumn > 0 && (!config.startRow || config.startRow > 0)
  ),
};

export default FileConfigHelper;

const FileConfigHelper = {
  isValid: config => (
    config.path !== null && config.idColumn > 0 && config.priceColumn > 0 && (!config.startRow || config.startRow > 0)
  ),
  columnToSymbol: column => (
    String.fromCharCode(64 + Number(column))
  ),
};

export default FileConfigHelper;

module.exports = {
  wrapRes: (data, meta, isError, error) => {
    if (isError) {
      return { error: true, message: error.message };
    }
    return { ...meta, error: false, data };
  }
};

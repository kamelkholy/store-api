module.exports = {
  read: async (Model, query) => {
    const data = await Model.find({});
    const meta = {};
    return { data, meta };
  }
};

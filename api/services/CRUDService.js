module.exports = {
  create: async (req, res, Model, validator) => {
    try {
      const data = req.body;
      const result = validator.validate(data);
      if (result.error) {
        return res
          .status(422)
          .send(UtilsService.wrapRes(null, null, true, err));
      }
      const record = await Model.create(data).fetch();
      return res.ok(UtilsService.wrapRes(record, null));
    } catch (err) {
      res.status(400).send(UtilsService.wrapRes(null, null, true, err));
    }
  },
  read: async (req, res, Model, validator) => {
    const id = req.params.id;
    try {
      if (_.isUndefined(id)) {
        const result = await SearchService.read(Model, req.query);
        return res.ok(UtilsService.wrapRes(result.data, result.meta));
      }
      if (!(await Model.Exists(id))) {
        return res.status(400).send(
          UtilsService.wrapRes(null, null, true, {
            code: 400,
            message: "Record Not Found"
          })
        );
      }
      const record = await Model.findById(id);
      return res.ok(UtilsService.wrapRes(record, null));
    } catch (err) {
      res.status(400).send(UtilsService.wrapRes(null, null, true, err));
    }
  },
  update: async (req, res, Model, validator) => {
    const id = req.params.id;
    try {
      const data = req.body;
      if (_.isUndefined(id) || !(await Model.Exists(id))) {
        return res.status(400).send(
          UtilsService.wrapRes(null, null, true, {
            code: 400,
            message: "Record Not Found"
          })
        );
      }
      const result = validator.validate(data);
      if (result.error) {
        return res
          .status(422)
          .send(UtilsService.wrapRes(null, null, true, err));
      }
      const record = await Model.update({ id: id }).set(data);
      return res.ok(UtilsService.wrapRes(record, null));
    } catch (err) {
      res.status(400).send(UtilsService.wrapRes(null, null, true, err));
    }
  },
  delete: async (req, res, Model, validator) => {
    const id = req.params.id;
    try {
      if (_.isUndefined(id) || !(await Model.Exists(id))) {
        return res.status(400).send(
          UtilsService.wrapRes(null, null, true, {
            code: 400,
            message: "Record Not Found"
          })
        );
      }
      const record = await Model.destroy({ id: id });
      return res.ok(UtilsService.wrapRes({}, null));
    } catch (err) {
      res.status(400).send(UtilsService.wrapRes(null, null, true, err));
    }
  }
};

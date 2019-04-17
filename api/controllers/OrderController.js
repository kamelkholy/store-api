/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Model = Orders;
const validator = () => {}; //TODO: Create Validation Service
module.exports = {
  create: async (req, res) => {
    CRUDService.create(req, res, Model, validator);
  },
  read: async (req, res) => {
    CRUDService.read(req, res, Model, validator);
  },
  update: async (req, res) => {
    CRUDService.update(req, res, Model, validator);
  },
  delete: async (req, res) => {
    CRUDService.delete(req, res, Model, validator);
  }
};

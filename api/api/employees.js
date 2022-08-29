const express = require('express');
const router = express.Router();
const data = {};
data.employees = require('../../model/employees.json');
const controller = require('../../controllers/EmployeeController')
router
  .route('/')
  .get(controller.getAllEmployees)
  .post(controller.createEmployee)
  .put(controller.updateEmployee)
  .delete(controller.deleteEmployee);

router.route('/:id').get(controller.getEmployeeById);

module.exports = router;

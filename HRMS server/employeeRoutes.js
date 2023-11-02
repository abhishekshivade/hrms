const express = require('express');
const router = express.Router();
const Employee = require('./Employee');

// Create an employee

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EmployeeID:
 *                 type: string
 *               FirstName:
 *                 type: string
 *               LastName:
 *                 type: string
 *               Designation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee created successfully
 *       400:
 *         description: Bad request
 */

router.post('/', async (req, res) => {
  try {
    const employee = new Employee({
      EmployeeID: req.body.EmployeeID,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Designation: req.body.Designation,
    });
    const savedEmployee = await employee.save();
    res.json(savedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all employees

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all employees
 *     responses:
 *       200:
 *         description: List of employees retrieved successfully
 *       500:
 *         description: Internal server error
 */


router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Find an employee by EmployeeID

/**
 * @swagger
 * /employees/{EmployeeID}:
 *   get:
 *     summary: Get an employee by EmployeeID
 *     parameters:
 *       - in: path
 *         name: EmployeeID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee found
 *       404:
 *         description: Employee not found
 */

router.get('/:EmployeeID', async (req, res) => {
  try {
    const employee = await Employee.findOne({ EmployeeID: req.params.EmployeeID });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an employee by EmployeeID

/**
 * @swagger
 * /employees/{EmployeeID}:
 *   put:
 *     summary: Update an employee by EmployeeID
 *     parameters:
 *       - in: path
 *         name: EmployeeID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               EmployeeID:
 *                 type: string
 *               FirstName:
 *                 type: string
 *               LastName:
 *                 type: string
 *               Designation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       404:
 *         description: Employee not found
 */

router.put('/:EmployeeID', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findOneAndUpdate(
      { EmployeeID: req.params.EmployeeID },
      {
        EmployeeID: req.body.EmployeeID,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Designation: req.body.Designation,
      },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an employee by EmployeeID

/**
 * @swagger
 * /employees/{EmployeeID}:
 *   delete:
 *     summary: Delete an employee by EmployeeID
 *     parameters:
 *       - in: path
 *         name: EmployeeID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employee deleted
 *       404:
 *         description: Employee not found
 */

router.delete('/:EmployeeID', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findOneAndDelete({ EmployeeID: req.params.EmployeeID });

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;

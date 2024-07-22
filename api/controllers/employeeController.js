const Employee = require('../models/employee');

exports.addEmployee = async (req, res) => {
    try {
        const {
            employeeName,
            employeeId,
            designation,
            phoneNumber,
            dateOfBirth,
            joiningDate,
            activeEmployee,
            salary,
            address,
        } = req.body;

        // Create a new Employee
        const newEmployee = new Employee({
            employeeName,
            employeeId,
            designation,
            phoneNumber,
            dateOfBirth,
            joiningDate,
            activeEmployee,
            salary,
            address,
        });

        await newEmployee.save();

        res
            .status(201)
            .json({ message: "Employee saved successfully", employee: newEmployee });
    } catch (error) {
        console.error("Error creating employee", error);
        res.status(500).json({ message: "Failed to add an employee" });
    }
};

exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error("Error retrieving employees", error);
        res.status(500).json({ message: "Failed to retrieve the employees" });
    }
};


// Update an employee
exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedEmployee = await Employee.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee });
    } catch (error) {
        console.error("Error updating employee", error);
        res.status(500).json({ message: "Failed to update employee" });
    }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error("Error deleting employee", error);
        res.status(500).json({ message: "Failed to delete employee" });
    }
};

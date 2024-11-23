const moment = require("moment");
const Attendance = require("../models/attendance");
const Employee = require("../models/employee");

exports.generateSalarySlips = async (req, res) => {
  try {
    const { month, year } = req.query;

    console.log("Query parameters:", month, year);

    // Calculate the start and end dates for the selected month and year
    const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD")
      .startOf("month")
      .toDate();
    const endDate = moment(startDate).endOf("month").toDate();

    // Get attendance data for the month
    const attendanceData = await Attendance.aggregate([
      /*
        Summary of the Entire Pipeline:
        
        1. $match: Filters attendance records to include only those within the specified date range (`startDate` to `endDate`).

        2. $group: Groups the filtered records by `employeeId` and calculates counts of different attendance statuses (`present`, `absent`, `halfday`, `holiday`).
    */

      {
        $match: {
          $expr: {
            $and: [
              {
                $gte: [{ $dateFromString: { dateString: "$date" } }, startDate],
              },
              {
                $lte: [{ $dateFromString: { dateString: "$date" } }, endDate],
              },
            ],
          },
        },
      },
      {
        $group: {
          _id: "$employeeId",
          present: {
            $sum: {
              $cond: { if: { $eq: ["$status", "present"] }, then: 1, else: 0 },
            },
          },
          absent: {
            $sum: {
              $cond: { if: { $eq: ["$status", "absent"] }, then: 1, else: 0 },
            },
          },
          halfday: {
            $sum: {
              $cond: { if: { $eq: ["$status", "halfday"] }, then: 1, else: 0 },
            },
          },
          holiday: {
            $sum: {
              $cond: { if: { $eq: ["$status", "holiday"] }, then: 1, else: 0 },
            },
          },
        },
      },
    ]);

    const salarySlips = [];

    for (const attendance of attendanceData) {
      const employee = await Employee.findOne({ employeeId: attendance._id });

      if (!employee) {
        console.log(`Employee not found for ID: ${attendance._id}`);
        continue;
      }

      const totalDays = moment(endDate).diff(startDate, "days") + 1;
      const totalWorkingDays = totalDays - attendance.holiday;
      const basicSalary = employee.salary;
      const perDaySalary = basicSalary / totalWorkingDays;
      const earnedSalary =
        attendance.present * perDaySalary +
        attendance.halfday * perDaySalary * 0.5;
      const deductions = basicSalary - earnedSalary;
      const netSalary = earnedSalary - deductions;

      const salarySlip = {
        employeeId: employee.employeeId,
        employeeName: employee.employeeName,
        designation: employee.designation,
        month: moment(startDate).format("MMMM"),
        year: moment(startDate).format("YYYY"),
        salary: {
          basicSalary,
          earnedSalary,
          deductions,
          netSalary,
        },
      };

      salarySlips.push(salarySlip);
    }

    res.status(200).json(salarySlips);
  } catch (error) {
    console.error("Error generating salary slips", error);
    res.status(500).json({ message: "Failed to generate salary slips" });
  }
};

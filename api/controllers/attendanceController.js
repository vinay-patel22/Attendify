const Attendance = require('../models/attendance');
const moment = require('moment');

exports.submitAttendance = async (req, res) => {
    try {
        const { employeeId, employeeName, date, status } = req.body;

        const existingAttendance = await Attendance.findOne({ employeeId, date });

        if (existingAttendance) {
            existingAttendance.status = status;
            await existingAttendance.save();
            res.status(200).json(existingAttendance);
        } else {
            const newAttendance = new Attendance({
                employeeId,
                employeeName,
                date,
                status,
            });
            await newAttendance.save();
            res.status(200).json(newAttendance);
        }
    } catch (error) {
        console.error("Error submitting attendance", error);
        res.status(500).json({ message: "Error submitting attendance" });
    }
};

exports.getAttendance = async (req, res) => {
    try {
        const { date } = req.query;

        // Find attendance records for the specified date
        const attendanceData = await Attendance.find({ date });

        res.status(200).json(attendanceData);
    } catch (error) {
        console.error("Error fetching attendance data", error);
        res.status(500).json({ message: "Error fetching attendance data" });
    }
};

exports.getAttendanceReport = async (req, res) => {
    try {
        const { month, year } = req.query;

        console.log("Query parameters:", month, year);

        // Calculate the start and end dates for the selected month and year
        const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD")
            .startOf("month")
            .toDate();
        const endDate = moment(startDate).endOf("month").toDate();

        // Aggregate attendance data for all employees and date range
        const report = await Attendance.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            {
                                $eq: [
                                    { $month: { $dateFromString: { dateString: "$date" } } },
                                    parseInt(month),
                                ],
                            },
                            {
                                $eq: [
                                    { $year: { $dateFromString: { dateString: "$date" } } },
                                    parseInt(year),
                                ],
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
            {
                $lookup: {
                    from: "employees", // Name of the employee collection
                    localField: "_id",
                    foreignField: "employeeId",
                    as: "employeeDetails",
                },
            },
            {
                $unwind: "$employeeDetails", // Unwind the employeeDetails array
            },
            {
                $project: {
                    _id: 1,
                    present: 1,
                    absent: 1,
                    halfday: 1,
                    name: "$employeeDetails.employeeName",
                    designation: "$employeeDetails.designation",
                    salary: "$employeeDetails.salary",
                    employeeId: "$employeeDetails.employeeId",
                },
            },
        ]);

        res.status(200).json({ report });
    } catch (error) {
        console.error("Error generating attendance report:", error);
        res.status(500).json({ message: "Error generating the report" });
    }
};

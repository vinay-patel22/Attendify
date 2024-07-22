const Employee = require('../models/employee');

// Get today's birthdays
// exports.getTodayBirthdays = async (req, res) => {
//     try {
//         const today = new Date();
//         const todayDayMonth = `${today.getDate()}-${today.getMonth() + 1}`; // Format as DD-MM

//         const todayBirthdays = await Employee.find({
//             dateOfBirth: { $regex: `^${todayDayMonth}`, $options: 'i' },
//         });

//         res.status(200).json(todayBirthdays);
//     } catch (error) {
//         console.error('Error fetching today\'s birthdays:', error);
//         res.status(500).json({ message: 'Failed to fetch today\'s birthdays' });
//     }
// };

// Get today's birthdays
exports.getTodayBirthdays = async (req, res) => {
    try {
        const today = new Date();
        const day = today.getDate().toString().padStart(2, '0'); // Zero-padding for single digits
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Zero-padding for single digits
        const todayDayMonth = `${day}-${month}`; // Format as DD-MM

        // Adjust the regex to match with zero-padded days and months
        const todayBirthdays = await Employee.find({
            dateOfBirth: { $regex: `^${todayDayMonth}`, $options: 'i' },
        });

        res.status(200).json(todayBirthdays);
    } catch (error) {
        console.error('Error fetching today\'s birthdays:', error);
        res.status(500).json({ message: 'Failed to fetch today\'s birthdays' });
    }
};


// Get upcoming birthdays
exports.getUpcomingBirthdays = async (req, res) => {
    try {
        const today = new Date();
        const currentYear = today.getFullYear();
        const upcomingDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

        // Find employees with birthdays in the next 30 days
        const employees = await Employee.find();

        const upcomingBirthdays = employees.filter(employee => {
            const [day, month] = employee.dateOfBirth.split('-').map(Number);
            const birthdayDate = new Date(currentYear, month - 1, day);

            // If the birthday date this year has already passed, check next year
            if (birthdayDate < today) {
                birthdayDate.setFullYear(currentYear + 1);
            }

            const daysToBirthday = Math.ceil((birthdayDate - today) / (1000 * 60 * 60 * 24));
            return daysToBirthday >= 0 && daysToBirthday <= 30;
        }).map(employee => {
            const [day, month] = employee.dateOfBirth.split('-').map(Number);
            const birthdayDate = new Date(currentYear, month - 1, day);

            // If the birthday date this year has already passed, check next year
            if (birthdayDate < today) {
                birthdayDate.setFullYear(currentYear + 1);
            }

            const daysToBirthday = Math.ceil((birthdayDate - today) / (1000 * 60 * 60 * 24));
            return { ...employee.toObject(), daysToBirthday };
        });

        res.status(200).json(upcomingBirthdays);
    } catch (error) {
        console.error('Error fetching upcoming birthdays:', error);
        res.status(500).json({ message: 'Failed to fetch upcoming birthdays' });
    }
};

const { DAYS, DESIGNATION, HOUR } = require("./constant");

/**
 * Get user month wise data
 * @param {Number} month 
 * @param {Number} year 
 * @returns 
 */
async function getUsersMonthlyData(month, year) {
    return await _models.User.find({
        $expr: {
            $and: [
                {
                    "$eq": [{
                        "$month": "$date"
                    },
                    Number(month)
                    ]
                },
                {
                    "$eq": [{
                        "$year": "$date"
                    },
                    Number(year)
                    ]
                }
            ]
        }
    })
}

/**
 * Convert month number to month name
 * @param {Number} monthNumber 
 * @returns 
 */
function monthNumberToMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString('en-US', {
        month: 'long',
    });
}

/**
 * Calculate basic salary
 * @param {Object} user 
 * @returns 
 */
function calculateBasicSalary(user) {
    let basicSalary = 0
    if (![DAYS.SATURDAY, DAYS.SUNDAY].includes(user.weekday)) {
        if (user.total_hours < HOUR.FULL_TIME && user.total_hours >= HOUR.HALF_TIME) {
            basicSalary += (user.per_day_salary / 2)
        } else if (user.total_hours >= HOUR.FULL_TIME) {
            basicSalary += user.per_day_salary
        }
    }
    return basicSalary
}

/**
 * Calculate over time salary
 * @param {Object} user 
 * @returns 
 */
function overTimeSalary(user) {
    let overTime = 0
    if (user.designation === DESIGNATION.WORKER) {
        if (![DAYS.SATURDAY, DAYS.SUNDAY].includes(user.weekday)) {
            if (user.total_hours > HOUR.FULL_TIME) {
                const overTimeHours = user.total_hours - HOUR.FULL_TIME
                const hourRate = user.per_day_salary / HOUR.FULL_TIME
                const dayOverTime = overTimeHours * hourRate
                overTime += (2 * dayOverTime)
            }
        }

        if ([DAYS.SATURDAY, DAYS.SUNDAY].includes(user.weekday)) {
            const overTimeHours = user.total_hours
            const hourRate = user.per_day_salary / HOUR.FULL_TIME
            const dayOverTime = overTimeHours * hourRate
            overTime += (2 * dayOverTime)
        }
    }
    return overTime
}

// {
//     "rec_id": 5,
//     "emp_id": 5,
//     "date": "Jan 22, 2020",
//     "time_in": "10:28",
//     "time_out": "21:11",
//     "total_hours": 10.72,
//     "weekday": 4,
//     "name": "Janka Waitland",
//     "gender": "Female",
//     "designation": "Worker",
//     "department": "Production",
//     "calculate": "",
//     "basic_salary": 15000,
//     "per_day_salary": 750
// },

/**
 * Calculate total one day salary
 * @param {Object} user 
 * @returns 
 */
function calculateOneDaySalary(user) {
    return oneDaySalary = 0 + calculateBasicSalary(user) + overTimeSalary(user)
}

/**
 * Calculate bonus
 * @param {Number} maleSalary 
 * @param {Number} femaleSalary 
 * @returns 
 */
function calculateBonus(maleSalary, femaleSalary) {
    let bonus = 0
    if (maleSalary < femaleSalary) {
        bonus = maleSalary / 100
    } else {
        bonus = femaleSalary / 100
    }
    return bonus
}



module.exports = {
    getUsersMonthlyData,
    monthNumberToMonthName,
    calculateBasicSalary,
    overTimeSalary,
    calculateOneDaySalary,
    calculateBonus
}
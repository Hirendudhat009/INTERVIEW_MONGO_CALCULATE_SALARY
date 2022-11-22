const { GENDER } = require('../helpers/constant')
const { getUsersMonthlyData, monthNumberToMonthName, calculateBonus, calculateOneDaySalary } = require('../helpers/helper')

async function totalSalary(req, res) {
    const { month, year } = req.query
    if (!month || !year) {
        res.send({ status: 'error', message: 'please add month and year for calculation in request query.' })
    }
    const users = await getUsersMonthlyData(month, year)
    let totalSalary = 0
    let maleSalary = 0
    let femaleSalary = 0
    await Promise.all(
        users.map(user => {
            const userOneDaySalary = calculateOneDaySalary(user)
            if (user.gender === GENDER.MALE) {
                maleSalary += userOneDaySalary
            } else {
                femaleSalary += userOneDaySalary
            }
        })
    )
    const bonus = calculateBonus(maleSalary, femaleSalary)
    totalSalary = maleSalary + femaleSalary + bonus
    return res.send({ month: monthNumberToMonthName(month), year, totalSalary })
}

module.exports = totalSalary
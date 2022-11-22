const { GENDER } = require('../helpers/constant')
const { getUsersMonthlyData, monthNumberToMonthName, calculateOneDaySalary, calculateBonus } = require('../helpers/helper')

async function getBonus(req, res) {
    const { month, year } = req.query
    if (!month || !year) {
        res.send({ status: 'error', message: 'please add month and year for calculation in request query.' })
    }
    const users = await getUsersMonthlyData(month, year)
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
    return res.send({ month: monthNumberToMonthName(month), year, bonus })
}

module.exports = getBonus
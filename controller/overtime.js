const { getUsersMonthlyData, monthNumberToMonthName, overTimeSalary } = require('../helpers/helper')

async function overTime(req, res) {
    const { month, year } = req.query
    if (!month || !year) {
        res.send({ status: 'error', message: 'please add month and year for calculation in request query.' })
    }
    const users = await getUsersMonthlyData(month, year)
    let overTime = 0
    await Promise.all(
        users.map(user => {
            overTime += overTimeSalary(user)
        }))
    return res.send({ month: monthNumberToMonthName(month), year, overTime })
}




module.exports = overTime
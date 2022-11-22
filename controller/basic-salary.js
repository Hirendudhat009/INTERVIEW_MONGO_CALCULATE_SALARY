const { getUsersMonthlyData, monthNumberToMonthName, calculateBasicSalary } = require('../helpers/helper')

async function basicSalary(req, res) {
    const { month, year } = req.query
    if (!month || !year) {
        res.send({ status: 'error', message: 'please add month and year for calculation in request query.' })
    }
    const users = await getUsersMonthlyData(month, year)
    let basicSalary = 0
    await Promise.all(
        users.map(user => {
            basicSalary += calculateBasicSalary(user)
        }))
    return res.send({ month: monthNumberToMonthName(month), year, basicSalary })
}

module.exports = basicSalary


var sample = [{
    "rec_id": 1,
    "emp_id": 1,
    "date": "Jan 22, 2020",
    "time_in": "09:20",
    "time_out": "19:56",
    "total_hours": 10.6,
    "weekday": 4,
    "name": "Carlina Dahlberg",
    "gender": "Female",
    "designation": "Supervisor",
    "department": "Production",
    "calculate": "",
    "basic_salary": 20000,
    "per_day_salary": 1000
},
{
    "rec_id": 2,
    "emp_id": 2,
    "date": "Jan 22, 2020",
    "time_in": "08:33",
    "time_out": "13:16",
    "total_hours": 4.72,
    "weekday": 4,
    "name": "Brenden Greenacre",
    "gender": "Male",
    "designation": "Executive",
    "department": "Marketing",
    "calculate": "",
    "basic_salary": 25000,
    "per_day_salary": 1250
},
{
    "rec_id": 3,
    "emp_id": 3,
    "date": "Jan 22, 2020",
    "time_in": "10:21",
    "time_out": "13:38",
    "total_hours": 3.28,
    "weekday": 4,
    "name": "Gualterio Date",
    "gender": "Male",
    "designation": "Manager",
    "department": "Sales",
    "calculate": "",
    "basic_salary": 50000,
    "per_day_salary": 2500
},
{
    "rec_id": 4,
    "emp_id": 4,
    "date": "Jan 22, 2020",
    "time_in": "11:22",
    "time_out": "14:10",
    "total_hours": 2.8,
    "weekday": 4,
    "name": "Jeanna Fernando",
    "gender": "Female",
    "designation": "Manager",
    "department": "Marketing",
    "calculate": "",
    "basic_salary": 50000,
    "per_day_salary": 2500
},
{
    "rec_id": 5,
    "emp_id": 5,
    "date": "Jan 22, 2020",
    "time_in": "10:28",
    "time_out": "21:11",
    "total_hours": 10.72,
    "weekday": 6,
    "name": "Janka Waitland",
    "gender": "Female",
    "designation": "Worker",
    "department": "Production",
    "calculate": "",
    "basic_salary": 15000,
    "per_day_salary": 750
},
]
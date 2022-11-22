const moment = require('moment');
const request = require('request-promise');

function getUserAPI() {
    const api = `https://gist.githubusercontent.com/azizansari/03779d4c8953698214e856a21a6c4132/raw/4c1f1463e53e53b2285300788909cbe8f25dc62c/sampleData`;
    return request.get(api)
}

async function addUsers(req, res) {
    let usersDb = [];
    await _models.User.deleteMany({})
    let users = JSON.parse(await getUserAPI());
    for (let user of users) {
        let obj = {
            ...user,
            date: moment(user.date).utc('YYYY-MM-DD HH:mm:ss')
        }
        usersDb.push(obj);
    }
    _models.User.insertMany(usersDb);
    console.log("operation completed")
    return res.send({ message: "success" })
}

module.exports = addUsers

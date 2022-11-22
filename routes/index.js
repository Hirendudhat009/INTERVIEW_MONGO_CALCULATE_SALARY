function get(router) {
    router.get('/', async(req, res) => {
        res.send('success');
    });
    router.get("/users", require('../controller/dump-user'))
    router.get("/basic-salary", require('../controller/basic-salary'))
    router.get("/over-time", require('../controller/overtime'))
    router.get("/bonus", require('../controller/bonus'))
    router.get("/total-salary", require('../controller/total-salary'))
    return router;
}


module.exports = {
    get,
};
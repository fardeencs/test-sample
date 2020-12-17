module.exports = (app)=>{
    // controller
    //console.log('routes');
    const empCtrl = require('../controllers/employee.controller.js');

    app.get('/list', empCtrl.list);

    app.post('/save', empCtrl.save);

    app.post('/update', empCtrl.update);

    app.post('/delete', empCtrl.delete);
}
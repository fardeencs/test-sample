
const Employee = require('../models/employee.model');



exports.list = async (req, res) => {
    try {
        const result = await Employee.find();
        res.send(result);
    } catch (error) {
        res.status(500).send({
            'error': err.message || 'Technical Error.'
        });
    }
}

exports.save = (req, res) => {
    const { name, jobTitle } = req.body;
    if (!name || !jobTitle) {
        return res.status(400).send({
            'error': 'User object cannot be empty'
        });
    }

    const emp = new Employee({
        name,
        jobTitle
    });

    emp.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            'error': err.message || 'Technical Error.'
        });
    });
}

exports.update = (req, res) => {
    const { name, jobTitle, id } = req.body;
    if (!name && !jobTitle && !id) {
        return res.status(400).send({
            'error': 'User object cannot be empty'
        });
    }
    
    Employee.findByIdAndUpdate(id, {
        jobTitle,
        name
    }, {new : true}).then(result =>{
      if(!result){
       return res.status(404).send({
            'error': `User not found with id ${id}`
        });
      }
      res.send(result);
    }).catch(err =>{
        if(err.kind === 'ObjectId'){
            return res.status(500).send({
                'error': `User not found with id ${id}`
            });
        }
        return res.status(500).send({
            'error': `Error updating with id ${id}`
        });
    }) 
}

exports.delete = (req, res) => {
    const { id } = req.body;
  Employee.findByIdAndRemove(id).then(result =>{
    if(!result){
        return res.status(404).send({
             'error': `User not found with id ${id}`
         });
       }
       res.send({msg: 'User deleted successfully.'});
     }).catch(err =>{
         if(err.kind === 'ObjectId' || err === 'NotFound'){
             return res.status(404).send({
                 'error': `User not found with id ${id}`
             });
         }
         return res.status(500).send({
             'error': `Could not delete with id ${id}`
         });
     })
}



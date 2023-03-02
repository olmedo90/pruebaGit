const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const routes = Router();
const User = require('../models/model.User');

const authenticate = require('../middleware/authenticate');

routes.get('/' ,authenticate, async(req, res)=>{
    try {
        const arrayUser = await User.find();
        res.json(arrayUser);
    } catch (error) {
        console.log(error);
    }
});

routes.post('/login', async(req, res) => {
  const nombre=req.body.nombre;
  const edad = req.body.edad;
  await User.findOne({$or: [{nombre:nombre},{edad}]})
  .then(user=>{
    if(user){
        bcrypt.compare(nombre, user.nombre, function(err, result){
            if(err){
                res.json({error:err});
            }
            if(result){
                let token = jwt.sign({name:user.edad}, 'verifySecret')
                res.json({
                    sms: 'login successful',
                    token
                })
            }else{
                res.json({sms:'nombre does not matched'})
            }
        })
    }else{
        res.json({error: 'No user Found'});
    }
  })
  
})

routes.post ('/', (req, res, next) => {

    bcrypt.hash(req.body.nombre, 10,async(err, hashpass)=>{
        if (err){
            res.json(err)
        }else{
            try {
                let userdb = new User({
                 nombre: hashpass,
                 edad: req.body.edad,
                 email: req.body.email
                });
                await userdb.save();
                res.json('save user successfully:');
             } catch (error) {
                 console.error(error);
             }
        }

    });
   
});
//edit user
routes.get('/:id', async(req, res)=>{
    const id = req.params.id;

    try {
        const userDB = await User.findOne({_id:id});
        res.json({
            error: true,
            data:userDB,
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: false,
            sms: 'El usuario no existe'
        });
    }
});

routes.put('/:id', async (req, res) => {
    const id = req.params.id;
    const dataUser = req.body;

    try {
        await User.findByIdAndUpdate(id, dataUser);
        res.json({
            error: false,
            sms: 'successfully edited'
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            sms: 'failed edit'
        })
    }
});

//deleted
routes.delete('/:id', async(req, res)=>{
    const id = req.params.id;

    try {
        const userDB = await User.findByIdAndDelete({_id: id});
        if(userDB){
            res.json({
                error:true,
                sms: 'delete successfully'
            });
        }else{
            res.json({
                error: false,
                sms: 'deleted failed'
            })
        }

    } catch (error) {
        console.log(error);
    }
})

 module.exports = routes;
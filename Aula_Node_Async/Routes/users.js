const express = require ('express');
const router = express.Router();
const User = require('../model/users.js');
const bcrypt = require('bcrypt-nodejs');

router.get('/', async (req,res) => {
    
    try{       
        
        var user = await User.find({});
        
        return res.send(user);
    }
    
    catch (err) {
        return res.send ({error: 'Erro na Consulta de Usuário'});

    } 
});

router.get('/email', async (req,res) => {
    
    const {email, password} = req.body;

    try{       
        
        var user = await User.findOne({email});
        
        return res.send(user);
    }
    
    catch (err) {
        return res.send ({error: 'Erro na Consulta de Usuário'});

    } 
});


router.get('/auth', async (req,res) => {
    
    const {email, password} = req.body;

    if (!email || !password) return res.send ({error: 'Dados inseridos invalidos e/ou insuficientes'});
    
    try{       
        
        var user = await User.findOne({email}).select('+password');
        if (!user) return res.send ({error: 'Usuário não cadastrado'});

        var pass = bcrypt.compareSync(password, user.password);     
        
        if (!pass) return res.send ({error: 'Senha não confere'});

        user.password = undefined;
        return res.send(user);
    }
    
    catch (err) {
        return res.send ({error: 'Erro na Consulta de Usuário'});

    } 
});

router.post('/create', async (req,res) => {

    const {email, password} = req.body;

    if (!email || !password) return res.send ({error: 'Dados inseridos invalidos e/ou insuficientes'});

    try{
        
        if (await User.findOne({email})) return res.send ({error: 'Usuário já cadastrado'});
        
        var user = await User.create(req.body);

        user.password = undefined;
        return res.send(user);
       
    }
    catch (err) {
        
        if (err) return res.send ({error: 'Erro no Cadastro do Usuário'});
    }
    
});


module.exports = router;
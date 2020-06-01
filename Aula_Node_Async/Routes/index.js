const express = require ('express');
const router = express.Router();

router.get('/', function (req,res){

    return res.send({message: 'tudo ok com o get da raiz'});

});

router.post('/', function (req,res){

    return res.send({message: 'tudo ok com o post da raiz'});

});


module.exports = router;
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var novedadesModel = require('../models/novedadesModel')
var cloudinary = require('cloudinary').v2;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/',async function(req, res, next) {

    var novedadesGanadores = await novedadesGanadoresModel.getNovedadesGanadores()


    novedadesGanadores = cloudinary.map (novedad => {

    if (novedad.img_id) {
      const imagen = cloudinary.url(novedad.img_id, {
      width: 460,
      crop: 'fill'
    });
    return {
      ...novedad,
      imagen
    }
    } else {
      return {
        ...novedad,
        imagen: 'no-imagen'
      }
    }
  });







  res.render('index', {
    novedadesGanadores
  });
  });

router.post('/',async(req,res,next)=>{
    var nombre = req.body.nombre;
    var apellido = req.body.apellido;
    var email = req.body.email;
    var steam = req.body.steam;  

    console.log('req.body')
    
  /*  var obj={
        to:'jicarnevale@outlook.com',
        subject:'Inscripción LAF',
        html: nombre + " " + apellido + " quiere inscribirse en la liga, éste es su mail: " + 
        email + ". <br> Su nickname de Steam es: " + steam 
        }
    var transport=nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    }); */

    var obj = {
      nombre : req.body.nombre,
      apellido : req.body.apellido,
      email : req.body.email,
      steam : req.body.steam 
    }


    var result = await novedadesModel.insertNovedad(obj);    
    console.log(result)
    res.render('contacto',{
        message:'Enviado correctamente'
    });
});






module.exports = router;


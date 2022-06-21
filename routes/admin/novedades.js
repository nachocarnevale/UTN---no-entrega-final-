var express = require('express');
const pool = require('../../models/db');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');
var novedadesGanadoresModel = require('../../models/novedadesGanadoresModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;

var uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);



/* GET users listing. */
router.get('/', async function (req, res, next) {

  var novedades = await novedadesModel.getNovedades();
  var novedadesGanadores = await novedadesGanadoresModel.getNovedadesGanadores();



  novedadesGanadores = novedadesGanadores.map(novedad => {
  if (novedad.img_id) {
    const imagen = cloudinary.image(novedad.img_id, {
    width: 80,
    height: 80,
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



  res.render('admin/novedades', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    novedades,
    novedadesGanadores
  });
});

router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;
  await novedadesModel.deleteNovedadesById(id);
  res.redirect('/admin/novedades')
});

router.get('/agregar-inscripciones', (req, res, next) => {
  res.render('admin/agregar-inscripciones', {
    layout: 'admin/layout'
  })
});



router.post('/agregar-inscripciones', async (req, res, next) => {

  //console.log(req.body)//
  try {
    if (req.body.nombre != "" && req.body.apellido != "" && req.
      body.email != "" && req.body.steam != "") {
      await novedadesModel.insertNovedad(req.body);
      res.redirect('/admin/novedades')

    } else {
      res.render('admin/agregar-inscripciones', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      })
    }
  } catch (error) {
    console.log(error)
    res.render('admin/agregar-inscripciones', {
      layout: 'admin/layout',
      error: true,
      message: 'No se cargo la novedad'
    })
  }
})

router.get('/modificar/:id', async (req, res, next) => {
  var id = req.params.id;
  var novedad = await novedadesModel.getNovedadesById(id);

  res.render('admin/modificar-inscripciones', {
    layout: 'admin/layout',
    novedad
  });
});


router.post('/modificar', async (req, res, next) => {
  try {
    var obj = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      steam: req.body.steam
    }

    console.log(obj)
    await novedadesModel.modificarNovedadById(obj, req.body.id);
    res.redirect('/admin/novedades');
  } catch (error) {
    console.log(error)
    res.render('admin/modificar-inscripciones', {
      layout: 'admin/layout',
      error: true,
      message: 'no se modificó la inscripción'
    })
  }
});



// GANADORES GANADORES GANADORES GANADORES GANADORES //





router.get('/eliminar-ganadores/:id', async (req, res, next) => {
  var id = req.params.id;
  await novedadesGanadoresModel.deleteNovedadesGanadoresById(id);
  res.redirect('/admin/novedades')
});

router.get('/agregar-ganadores', (req, res, next) => {
  res.render('admin/agregar-ganadores', {
    layout: 'admin/layout'
  })
});



router.post('/agregar-ganadores', async (req, res, next) => {

  // console.log(req.body) //
  try {

    var img_id = '';
    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilepath)).
        public_id;
    }


    if (req.body.nombre != "" && req.body.apellido != "" && req.body.equipo != "" &&
      req.body.liga != "" && req.body.temporada != "") {
      await novedadesGanadoresModel.insertNovedadGanadores({
        ...req.body,
        img_id
      });


      res.redirect('/admin/novedades')

    } else {
      res.render('admin/agregar-ganadores', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      })
    }
  } catch (error) {
    console.log(error)
    res.render('admin/agregar-ganadores', {
      layout: 'admin/layout',
      error: true,
      message: 'No se cargó el ganador'
    })
  }
})

router.get('/modificar-ganadores/:id', async (req, res, next) => {
  var id = req.params.id;
  var novedad = await novedadesGanadoresModel.getNovedadesGanadoresById(id);

  res.render('admin/modificar-ganadores', {
    layout: 'admin/layout',
    novedad
  });
});


router.post('/modificar-ganadores', async (req, res, next) => {
  try {

    let img_id = req.body.img_original;
    let borrar_img_vieja = false;
    if (req.body.img_delete === "1") {
      img_id = null;
      borrar_img_vieja = true;
    } else {
      if (req.files && Object.keys(req.files).length > 0) {
        imagen = req.files.imagen;
        img_id = (await uploader(imagen.tempFilepath)).public_id;
        borrar_img_vieja = true;
    }
  }

  if (borrar_img_vieja && req.body.img_original) {
    await (destroy(req.body.img_original));
  }


    var obj = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      equipo: req.body.equipo,
      liga: req.body.liga,
      temporada: req.body.temporada
    }

    console.log(obj)
    await novedadesGanadoresModel.modificarNovedadGanadoresById(obj, req.body.id);
    res.redirect('/admin/novedades');
  } catch (error) {
    console.log(error)
    res.render('admin/modificar-ganadores', {
      layout: 'admin/layout',
      error: true,
      message: 'No se modificó el ganador'
    })
  }
});




module.exports = router;
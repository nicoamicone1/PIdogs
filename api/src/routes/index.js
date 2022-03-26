const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Dogs= require('./dogs.js')
const Dog= require('./dog.js')
const Temps= require('./temperament.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', Dogs);
router.use('/dog', Dog);
router.use('/temperament',Temps)


module.exports = router;

const express = require('express');
const router = express.Router();

const {cogerEntries,actualizarEntries, crearEntries,deletarUna} = require('../controllers/entriesControllers')

//getEntrie
router.get('/',cogerEntries)

//createEntry
router.post('/',crearEntries)


//updateEntry
router.put('/update/:id_entry',actualizarEntries)

//deleteENtry
router.delete('/:id_entry', deletarUna)

module.exports = router
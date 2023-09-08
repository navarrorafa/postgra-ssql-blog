const { getAllEntries, getAllEntriesByEmail, getById, postEntries, putEntries, deleteOne, deleteALL } = require('../models/entriesModel');


//getEntries //getEntriesByEmail ok

const cogerEntries = async (req, res) => {
    //   
    let data;
    try {
        const { email, id_entry } = req.body;
        
        if (email) {
            data = await getAllEntriesByEmail(email);

        } else if (id_entry) {
            data = await getById(id_entry)

        } else {
            data = await getAllEntries();

        }

        res.status(200).json({
            ok: true,
            data
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'Hable con el admin'
        });

    }
};

//crear OK

const crearEntries = async (req, res) => {
    let data;
    try {
        const { id_author, title, content, category } = req.body;

        if (!id_author || !title || !content || !category) {
            return res.status(400).json({
                ok: false,
                msg: "Debes completar todos los campos"
            });
        }

        data = await postEntries(title, content, id_author, category);

        if (data) {
            res.status(200).json({
                ok: true,
                msg: 'Entrada creada con éxito',
                data
            });
        } else {
            throw new Error('Error al crear la entrada');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};


// ACTUALIZAR OK
const actualizarEntries = async (req, res) => {
    let data;
    try {
        const id_entry = req.params.id_entry; // Obtém o id_entry da URL
        const { title, content } = req.body; // Obtém title e content do corpo da solicitação

        // Verifica se os campos title e content estão presentes na solicitação
        if (!title || !content) {
            return res.status(400).json({
                ok: false,
                msg: 'El título y el contenido son campos obligatorios para la actualización.',
            });
        }

        // Obtenha os dados originais da notícia
        const originalData = await getById(id_entry);

        // Verifique se tanto o título quanto o conteúdo são iguais aos dados originais
        if (title === originalData.title && content === originalData.content) {
            return res.status(200).json({
                ok: true,
                msg: 'La noticia ya está actualizada.',
            });
        }

        // Atualize a notícia se os dados forem diferentes
        data = await putEntries(title, content, id_entry);

        // Obtenha os dados atualizados da notícia
        const updatedData = await getById(id_entry);

        res.status(200).json({
            ok: true,
            msg: 'Noticia actualizada con éxito',
            data: updatedData, // Retorne os dados atualizados da notícia
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin',
        });
    }
};


//DELETE OK
const deletarUna = async (req, res) => {
    try {
        let data ;
        const id_entry = req.params.id_entry; 
        if (isNaN(id_entry)) {
            return res.status(400).json({
                ok: false,
                msg: 'Id invalido.',
            });
        }

         data = await deleteOne(id_entry);

        if (data) {
            res.status(200).json({
                ok: true,
                msg: 'Entrada eliminada con éxito',
            });
        } else {
            res.status(404).json({
                ok: false,
                msg: 'La entrada no existe',
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin',
        });
    }
};


const deletarTodas = async () => {

}



module.exports = {
    cogerEntries,
    actualizarEntries,
    crearEntries,
    deletarUna
}
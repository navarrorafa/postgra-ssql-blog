const { querieAuthors } = require('./queries');
const { pool } = require('../utils/connectPool');


const modelTodas = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(querieAuthors.byTodas);
        result = data.rows;
    } catch (error) {
        console.error(error);
        throw new Error('Error a mostrar los autores');
    } finally {
        client.release();
    }
    return result;
};

const modelEmail = async (email) => {
    let client, result;
    try {
       
        client = await pool.connect();
        const data = await pool.query(querieAuthors.byEmail, [email]);

        result = data.rows;
    } catch (error) {
        console.error(error);
        throw new Error('Error a buscar por email');
    } finally {
        client.release();
    }
    return result;
};

const modelName = async (name) => {
    let client , result ;
    try {
      
        client = await pool.connect();
        const data  = await pool.query(querieAuthors.byNombre, [name]);

        result = data.rows

      
    } catch (error) {
        console.error(error);
        throw new Error('Error a buscar por nombre');
    } finally {
        client.release();
    }
    return result;
};

//modelo para recoger todas
const modelCrear = async (name, surname, email, image) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(querieAuthors.byCrear, [name, surname, email, image]);
        result = await data.rows[0];
    } catch (error) {
        console.error(error);
        throw new Error('Error al crear el autor');
    } finally {
        client.release();
    }
    return result;
};

//modelo para actualizar 

const modelActualizar = async (id_author, name, surname, email, image) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(
            querieAuthors.byActualizar,
            [name, surname, email, image, id_author]
        );
        result = data.rows[0];
    } catch (error) {
        console.error(error);
        throw new Error('Error al actualizar el autor por ID');
    } finally {
        client.release();
    }
    return result;
};

//modelo deletar
const modelDeletar = async (id_author) => {
    let client;
    try {
        client = await pool.connect();
        await client.query(querieAuthors.byDeletar, [id_author]);
    } catch (error) {
        console.error(error);
        throw new Error('Error al eliminar el autor por ID');
    } finally {
        client.release();
    }
};






module.exports = {
    modelTodas,
    modelName,
    modelEmail,
    modelCrear,
    modelActualizar,
    modelDeletar

}
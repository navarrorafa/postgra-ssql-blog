const {modelTodas,modelEmail,modelName,modelCrear,modelActualizar,modelDeletar} = require('../models/authorModel');


//recoger todas , nombre y email


    const getAllAuthors = async (req, res) => {
      try {
        const { email, name } = req.body;
        let authors;
    
        if (email) {
          authors = await modelEmail(email);
        } else if (name) {
          authors = await modelName(name);
        } else {
          authors = await modelTodas();
        }
    
        if (authors.length === 0) {
          return res.status(404).json({
            ok: false,
            msg: 'Nenhum autor encontrado.',
          });
        }
    
        return res.status(200).json({
          ok: true,
          authors,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          ok: false,
          msg: 'Contacte el adm',
        });
      }
    };

  const createAuthor = async (req, res) => {
    try {
      const { name, surname, email, image } = req.body;
      console.log(req.body)
      const author = await modelCrear(name, surname, email, image);
  
      res.status(201).json({
        ok: true,
        msg: 'Autor creado ',
        data: await author,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        msg: 'Contacte el adm'
      });
    }
  };

  const updateAuthorById = async (req, res) => {
    try {
      const { id_author } = req.params;
      const { name, surname, email, image } = req.body;
      const author = await modelActualizar(id_author, name, surname, email, image);
  
      if (author) {
        res.status(200).json({
          ok: true,
          msg: 'Autor actualizado',
          data: author,
        });
      } else {
        res.status(404).json({
          ok: false,
          msg: 'autor no existe',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        msg: 'Contacte el adm'
      });
    }
  };

  const deleteAuthorById = async (req, res) => {
    try {
      const { id_author } = req.params;
      await modelDeletar(id_author);
      res.status(200).json({
        ok: true,
        msg: 'Autor eliminado',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        msg: 'Contacte el adm'
      });
    }
  };
  
  










  module.exports = {
    getAllAuthors,
    createAuthor,
    updateAuthorById,
    deleteAuthorById
    
    
}
  
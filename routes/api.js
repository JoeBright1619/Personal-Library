'use strict';

const library = require('../models');
module.exports = function (app) {

  app.route('/api/books')
    .get(async (req, res) => {
      try {
        let result = await library.find();
        res.json(result);
      } catch (err) {
       
        res.status(500).send('An error occurred while fetching the books');
      }
    })
    
    .post(async (req, res) => {
      let title = req.body.title;
      if (!title) {
        return res.send('missing required field title');
      }

      try {
        let addBook = new library({ title });
        let result = await addBook.save();
        res.json({
          title: result.title,
          _id: result._id
        });
      } catch (err) {
       
        res.status(500).send('An error occurred while saving the book');
      }
    })
    
    .delete(async (req, res) => {
      try {
        await library.deleteMany({});
        res.send('complete delete successful');
      } catch (err) {
    
        res.send('failed to delete');
      }
    });

  app.route('/api/books/:id')
    .get(async (req, res) => {
      let bookid = req.params.id;
      try {
        const result = await library.findById(bookid);
        if (!result) {
          return res.send('no book exists');
        }
        else{
        res.json({
          title: result.title,
          _id: result._id,
          comments: result.comments
        });
        }
      } catch (err) {
    
        return res.send('no book exists');
      }
    }
    )
    
    .post(async (req, res) => {
      let bookid = req.params.id;
      let comment = req.body.comment;
      if (!comment) {
        return res.send('missing required field comment');
        return;
      }

      try {
        let addBook = await library.findById(bookid);
        if (!addBook) {
          return res.send('no book exists');
        }

        addBook.comments.push(comment);
        addBook.commentcount = addBook.comments.length;
        let result = await addBook.save();
        res.json(result);
      } catch (err) {
      
        return res.send('no book exists');
      }
    })
    
    .delete(async (req, res) => {
      let bookid = req.params.id;
      try {
        let deleteBook = await library.findByIdAndDelete(bookid);
        if (!deleteBook) {
          return res.send('no book exists');
        }
        res.send('delete successful');
      } catch (err) {
       
        res.status(500).send('An error occurred while deleting the book');
      }
    });
};

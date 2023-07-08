import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Book from '../models/Book';

const CreateBook = (req: Request, res: Response, next: NextFunction) => {
    const { title, author } = req.body;

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title,
        author
    });
    return book
        .save()
        .then((book) => res.status(201).json(book))
        .catch((error) => res.status(500).json({ error }));
};
const readBook = (req: Request, res: Response, next: NextFunction) => {
    const { bookId } = req.params;
    return Book.findById(bookId)
        .populate('author')
        .then((book) => (book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Book Not Found' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Book.find()
        .populate('author')
        .then((books) => res.status(200).json({ books }))
        .catch((e) => res.status(500).json({ error: e }));
};
const updateBook = (req: Request, res: Response, next: NextFunction) => {
    const { bookId } = req.params;
    return Book.findById(bookId)
        .then((book) => {
            if (book) {
                book.set(req.body);
                return book
                    .save()
                    .then((book) => res.status(201).json(book))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Book Not Found' });
            }
        })
        .catch((e) => res.status(500).json({ error: e }));
};
const deleteBook = (req: Request, res: Response, next: NextFunction) => {
    const { bookId } = req.params;
    return Book.findByIdAndDelete(bookId)
        .then((book) => (book ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Book Not Found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { CreateBook, readBook, readAll, updateBook, deleteBook };

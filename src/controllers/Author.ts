import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Author from '../models/Author';

const CreateAuthor = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name
    });
    return author
        .save()
        .then((author) => res.status(201).json(author))
        .catch((error) => res.status(500).json({ error }));
};
const readAuthor = (req: Request, res: Response, next: NextFunction) => {
    const { authorId } = req.params;
    return Author.findById(authorId)
        .then((author) => (author ? res.status(200).json({ author }) : res.status(404).json({ message: 'Author Not Found' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Author.find()
        .then((authors) => res.status(200).json({ authors }))
        .catch((e) => res.status(500).json({ error: e }));
};
const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
    const { authorId } = req.params;
    return Author.findById(authorId)
        .then((author) => {
            if (author) {
                author.set(req.body);
                return author
                    .save()
                    .then((author) => res.status(201).json(author))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Author Not Found' });
            }
        })
        .catch((e) => res.status(500).json({ error: e }));
};
const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
    const { authorId } = req.params;
    return Author.findByIdAndDelete(authorId)
        .then((author) => (author ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Author Not Found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { CreateAuthor, readAuthor, readAll, updateAuthor, deleteAuthor };

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Author_1 = __importDefault(require("../models/Author"));
const CreateAuthor = (req, res, next) => {
    const { name } = req.body;
    const author = new Author_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name
    });
    return author
        .save()
        .then((author) => res.status(201).json(author))
        .catch((error) => res.status(500).json({ error }));
};
const readAuthor = (req, res, next) => {
    const { authorId } = req.params;
    return Author_1.default.findById(authorId)
        .then((author) => (author ? res.status(200).json({ author }) : res.status(404).json({ message: 'Author Not Found' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAll = (req, res, next) => {
    return Author_1.default.find()
        .then((authors) => res.status(200).json({ authors }))
        .catch((e) => res.status(500).json({ error: e }));
};
const updateAuthor = (req, res, next) => {
    const { authorId } = req.params;
    return Author_1.default.findById(authorId)
        .then((author) => {
        if (author) {
            author.set(req.body);
            return author
                .save()
                .then((author) => res.status(201).json(author))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'Author Not Found' });
        }
    })
        .catch((e) => res.status(500).json({ error: e }));
};
const deleteAuthor = (req, res, next) => {
    const { authorId } = req.params;
    return Author_1.default.findByIdAndDelete(authorId)
        .then((author) => (author ? res.status(201).json({ message: 'Deleted' }) : res.status(404).json({ message: 'Author Not Found' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { CreateAuthor, readAuthor, readAll, updateAuthor, deleteAuthor };

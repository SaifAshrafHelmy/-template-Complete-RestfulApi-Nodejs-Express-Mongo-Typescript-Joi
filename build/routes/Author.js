"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Author_1 = __importDefault(require("../controllers/Author"));
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const router = express_1.default.Router();
router.post('/create', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.author.create), Author_1.default.CreateAuthor);
router.get('/get/:authorId', Author_1.default.readAuthor);
router.get('/get/', Author_1.default.readAll);
router.patch('/update/:authorId', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.author.update), Author_1.default.updateAuthor);
router.delete('/delete/:authorId', Author_1.default.deleteAuthor);
module.exports = router;

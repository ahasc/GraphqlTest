import data from './datas.json';
import { getVideoInfosById } from './clients/dailymotion.js';

export const getBooks = () => data.Books;

export const getBookById = (id) => data.Books.find((book) => book.id === id);

export const getAuthors = () => data.Authors;

export const getAuthorById = (id) =>
  data.Authors.find((author) => author.id === id);

export const getVideoInfos = getVideoInfosById;

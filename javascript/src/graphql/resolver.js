import { getVideoInfosById } from '../clients/dailymotion.js';
import {
  getBooks,
  getBookById,
  getAuthors,
  getAuthorById,
} from '../service.js';

export const queries = {
  books: () => getBooks(),
  book: (_, args) => getBookById(args.id),
  authors: () => getAuthors(),
  author: (_, args) => getAuthorById(args.id),
};

export const fieldResolvers = {
  Book: {
    author: ({ authorId }) => getAuthorById(authorId),
    video: ({ videoId }) => getVideoInfosById(videoId),
  },
};

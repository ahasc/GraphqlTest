import data from '../datas.json'

export const getBooks = () => {
    return data.Books;
}

export const getBookById = (id) => {
    return data.Books.find(book => book.id === id);
}

export const getAuthors = () => {
    return data.Authors;
}

export const getAuthorById = (id) => {
    return data.Authors.find(author => author.id === id);
}

export const getVideoInfos = (videoId) => {
    return data.Authors.find(author => author.id === id);
}
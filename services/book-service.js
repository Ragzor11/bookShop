import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }

            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount >= filterBy.price)
            }

            return books
        })
}

function get(bookId) {
    return storageService.get(KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(KEY, book)
    } else {
        return storageService.post(KEY, book)
    }
}

function getEmptyBook(title = '', price = '') {
    return { id: '', title, listPrice:{amount:price} }
}

function getDefaultFilter() {
    return { txt: '', price: '' }
}

function _createBooks() {
    let books = utilService.loadFromStorage(KEY)
    if (!books || !books.length) {
        books = []
        books.push(_createBook('metus hendrerit', 300))
        books.push(_createBook('metus hendrerit', 120))
        books.push(_createBook('metus hendrerit', 50))
        books.push(_createBook('metus hendrerit', 150))
        utilService.saveToStorage(KEY, books)
    }
}

function _createBook(vendor, price = 250) {
    const book = getEmptyBook(vendor, price)
    book.id = utilService.makeId()
    return book
}
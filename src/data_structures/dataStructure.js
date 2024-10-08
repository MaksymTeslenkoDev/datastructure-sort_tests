'use strict';

// Data structure class
class DataStructure {

    getLength() {
        throw new Error('Method getLength() must be implemented.');
    }

    insert(value) {
        throw new Error('Method insert() must be implemented.');
    }

    search(value) {
        throw new Error('Method search() must be implemented.');
    }

    delete(value) {
        throw new Error('Method delete() must be implemented.');
    }

    clear() {
        throw new Error('Method clear() must be implemented.');
    }

    serialize() {
        throw new Error('Method serialize() must be implemented.');
    }
}

module.exports = DataStructure;
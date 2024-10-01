'use strict';

const DataStructure = require('./dataStructure');

class Node {
  constructor(value, tree) {
    this.value = value;
    this.color = 'red'; // New nodes are red by default
    this.left = tree.nil;
    this.right = tree.nil;
    this.parent = tree.nil;
  }
}

class RedBlackTree extends DataStructure {
  constructor() {
    super();
    this.nil = {}; // Sentinel node
    this.nil.color = 'black';
    this.nil.left = this.nil.right = this.nil.parent = this.nil;
    this.root = this.nil;
    this.length = 0;
  }

  getLength() {
    return this.length;
  }

  // Left Rotation
  leftRotate(x) {
    let y = x.right;
    x.right = y.left;
    if (y.left !== this.nil) y.left.parent = x;
    y.parent = x.parent;
    if (x.parent === this.nil) this.root = y;
    else if (x === x.parent.left) x.parent.left = y;
    else x.parent.right = y;
    y.left = x;
    x.parent = y;
  }

  // Right Rotation
  rightRotate(y) {
    let x = y.left;
    y.left = x.right;
    if (x.right !== this.nil) x.right.parent = y;
    x.parent = y.parent;
    if (y.parent === this.nil) this.root = x;
    else if (y === y.parent.left) y.parent.left = x;
    else y.parent.right = x;
    x.right = y;
    y.parent = x;
  }

  // Insert method
  insert(value) {
    let z = new Node(value, this);
    let y = this.nil;
    let x = this.root;

    while (x !== this.nil) {
      y = x;
      if (z.value < x.value) x = x.left;
      else x = x.right;
    }

    z.parent = y;
    if (y === this.nil) this.root = z;
    else if (z.value < y.value) y.left = z;
    else y.right = z;

    z.left = this.nil;
    z.right = this.nil;
    z.color = 'red';
    this.length++;
    this.insertFixup(z);
  }

  // Insert Fixup
  insertFixup(z) {
    while (z.parent.color === 'red') {
      if (z.parent === z.parent.parent.left) {
        let y = z.parent.parent.right;
        if (y.color === 'red') {
          // Case 1
          z.parent.color = 'black';
          y.color = 'black';
          z.parent.parent.color = 'red';
          z = z.parent.parent;
        } else {
          if (z === z.parent.right) {
            // Case 2
            z = z.parent;
            this.leftRotate(z);
          }
          // Case 3
          z.parent.color = 'black';
          z.parent.parent.color = 'red';
          this.rightRotate(z.parent.parent);
        }
      } else {
        let y = z.parent.parent.left;
        if (y.color === 'red') {
          // Mirror Case 1
          z.parent.color = 'black';
          y.color = 'black';
          z.parent.parent.color = 'red';
          z = z.parent.parent;
        } else {
          if (z === z.parent.left) {
            // Mirror Case 2
            z = z.parent;
            this.rightRotate(z);
          }
          // Mirror Case 3
          z.parent.color = 'black';
          z.parent.parent.color = 'red';
          this.leftRotate(z.parent.parent);
        }
      }
    }
    this.root.color = 'black';
  }

  // Search method
  search(value) {
    let current = this.root;
    while (current !== this.nil) {
      if (value === current.value) return current;
      else if (value < current.value) current = current.left;
      else current = current.right;
    }
    return null;
  }

  // Transplant method
  transplant(u, v) {
    if (u.parent === this.nil) this.root = v;
    else if (u === u.parent.left) u.parent.left = v;
    else u.parent.right = v;
    v.parent = u.parent;
  }

  // Minimum method
  minimum(node) {
    while (node.left !== this.nil) node = node.left;
    return node;
  }

  // Delete method
  delete(value) {
    let z = this.search(value);
    if (z === null) return;

    let y = z;
    let yOriginalColor = y.color;
    let x;

    if (z.left === this.nil) {
      x = z.right;
      this.transplant(z, z.right);
    } else if (z.right === this.nil) {
      x = z.left;
      this.transplant(z, z.left);
    } else {
      y = this.minimum(z.right);
      yOriginalColor = y.color;
      x = y.right;
      if (y.parent === z) {
        x.parent = y;
      } else {
        this.transplant(y, y.right);
        y.right = z.right;
        y.right.parent = y;
      }
      this.transplant(z, y);
      y.left = z.left;
      y.left.parent = y;
      y.color = z.color;
    }
    if (yOriginalColor === 'black') this.deleteFixup(x);
  }

  // Delete Fixup
  deleteFixup(x) {
    while (x !== this.root && x.color === 'black') {
      if (x === x.parent.left) {
        let w = x.parent.right;
        if (w.color === 'red') {
          w.color = 'black';
          x.parent.color = 'red';
          this.leftRotate(x.parent);
          w = x.parent.right;
        }
        if (w.left.color === 'black' && w.right.color === 'black') {
          w.color = 'red';
          x = x.parent;
        } else {
          if (w.right.color === 'black') {
            w.left.color = 'black';
            w.color = 'red';
            this.rightRotate(w);
            w = x.parent.right;
          }
          w.color = x.parent.color;
          x.parent.color = 'black';
          w.right.color = 'black';
          this.leftRotate(x.parent);
          x = this.root;
        }
      } else {
        let w = x.parent.left;
        if (w.color === 'red') {
          w.color = 'black';
          x.parent.color = 'red';
          this.rightRotate(x.parent);
          w = x.parent.left;
        }
        if (w.right.color === 'black' && w.left.color === 'black') {
          w.color = 'red';
          x = x.parent;
        } else {
          if (w.left.color === 'black') {
            w.right.color = 'black';
            w.color = 'red';
            this.leftRotate(w);
            w = x.parent.left;
          }
          w.color = x.parent.color;
          x.parent.color = 'black';
          w.left.color = 'black';
          this.rightRotate(x.parent);
          x = this.root;
        }
      }
    }
    x.color = 'black';
  }
  // Clear method to reset the tree
  clear() {
    this.root = null;
    this.length = 0;
  }

  serialize() {
    const traverse = (node) => {
      if (node === this.nil) {
        return null;
      }

      return {
        value: node.value,
        color: node.color,
        left: traverse(node.left),
        right: traverse(node.right),
      };
    };

    return traverse(this.root);
  }
}
module.exports = RedBlackTree;

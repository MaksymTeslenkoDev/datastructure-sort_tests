class RedBlackTree {
  constructor() {
    this.root = null;
  }

  // Left Rotation O(1)
  leftRotate(x) {
    let y = x.right;
    x.right = y.left;
    if (y.left !== null) y.left.parent = x;
    y.parent = x.parent;
    if (x.parent === null) this.root = y;
    else if (x === x.parent.left) x.parent.left = y;
    else x.parent.right = y;
    y.left = x;
    x.parent = y;
  }

  // Right Rotation O(1)
  rightRotate(y) {
    let x = y.left;
    y.left = x.right;
    if (x.right !== null) x.right.parent = y;
    x.parent = y.parent;
    if (y.parent === null) this.root = x;
    else if (y === y.parent.left) y.parent.left = x;
    else y.parent.right = x;
    x.right = y;
    y.parent = x;
  }

  // Insert method O(log n)
  insert(value) {
    let node = new Node(value);
    let y = null;
    let x = this.root;

    while (x !== null) {
      y = x;
      if (node.value < x.value) x = x.left;
      else x = x.right;
    }

    node.parent = y;
    if (y === null) this.root = node;
    else if (node.value < y.value) y.left = node;
    else y.right = node;

    node.left = null;
    node.right = null;
    node.color = 'red';

    this.insertFixup(node);
  }

  // Insert Fixup to maintain Red-Black properties O(log n)
  insertFixup(z) {
    while (z.parent && z.parent.color === 'red') {
      if (z.parent === z.parent.parent.left) {
        let y = z.parent.parent.right;
        if (y && y.color === 'red') {
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
        if (y && y.color === 'red') {
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

  // Search method O(log n)
  search(value) {
    let current = this.root;
    while (current !== null) {
      if (value === current.value) return current;
      else if (value < current.value) current = current.left;
      else current = current.right;
    }
    return null;
  }

  // Delete method O(log n)
  delete(value) {
    let z = this.search(value);
    if (z === null) return;

    let y = z;
    let yOriginalColor = y.color;
    let x;

    if (z.left === null) {
      x = z.right;
      this.transplant(z, z.right);
    } else if (z.right === null) {
      x = z.left;
      this.transplant(z, z.left);
    } else {
      y = this.minimum(z.right);
      yOriginalColor = y.color;
      x = y.right;
      if (y.parent === z) {
        if (x) x.parent = y;
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

  // Delete Fixup to maintain Red-Black properties O(log n)
  deleteFixup(x) {
    while (x !== this.root && (!x || x.color === 'black')) {
      if (x === x.parent.left) {
        let w = x.parent.right;
        if (w.color === 'red') {
          w.color = 'black';
          x.parent.color = 'red';
          this.leftRotate(x.parent);
          w = x.parent.right;
        }
        if (
          (!w.left || w.left.color === 'black') &&
          (!w.right || w.right.color === 'black')
        ) {
          w.color = 'red';
          x = x.parent;
        } else {
          if (!w.right || w.right.color === 'black') {
            if (w.left) w.left.color = 'black';
            w.color = 'red';
            this.rightRotate(w);
            w = x.parent.right;
          }
          w.color = x.parent.color;
          x.parent.color = 'black';
          if (w.right) w.right.color = 'black';
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
        if (
          (!w.right || w.right.color === 'black') &&
          (!w.left || w.left.color === 'black')
        ) {
          w.color = 'red';
          x = x.parent;
        } else {
          if (!w.left || w.left.color === 'black') {
            if (w.right) w.right.color = 'black';
            w.color = 'red';
            this.leftRotate(w);
            w = x.parent.left;
          }
          w.color = x.parent.color;
          x.parent.color = 'black';
          if (w.left) w.left.color = 'black';
          this.rightRotate(x.parent);
          x = this.root;
        }
      }
    }
    if (x) x.color = 'black';
  }

  // Transplant method O(1)
  transplant(u, v) {
    if (u.parent === null) this.root = v;
    else if (u === u.parent.left) u.parent.left = v;
    else u.parent.right = v;
    if (v !== null) v.parent = u.parent;
  }

  // Find minimum node O(log n)
  minimum(node) {
    while (node.left !== null) node = node.left;
    return node;
  }
}

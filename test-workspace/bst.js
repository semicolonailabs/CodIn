class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = { value, left: null, right: null };
        
        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode;
                    break;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    break;
                }
                current = current.right;
            }
        }
    }

    search(value) {
        let current = this.root;
        while (current !== null) {
            if (value === current.value) {
                return true;
            } else if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }
}

// Usage example
const bst = new BinarySearchTree();
[50, 30, 70, 20, 40, 60, 80].forEach(value => bst.insert(value));
console.log("Search for 40:", bst.search(40)); // true
console.log("Search for 25:", bst.search(25)); // false

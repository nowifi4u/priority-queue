const Node = require('./node');

class MaxHeap {
    constructor() {
        this.clear();
    }

    parentNodeIndex(node) {
		return this.parentNodes.indexOf(node);
	}

	parentNodeFirst() {
		if (this.parentNodes.length)
			return this.parentNodes[0];
	}
	
	parentNodeLast() {
		if (this.parentNodes.length) 
			return this.parentNodes[this.parentNodes.length - 1]; 
	}

	static isParent(node) {
		return !node.left || !node.right;
	}

    push(data, priority) {
        const node = new Node(data, priority);
		this.insertNode(node);
		this.heapSize++;
        this.shiftNodeUp(node);
    }

    pop() {
        if (this.isEmpty()) return;

        const detached = this.detachRoot();

        this.restoreRootFromLastInsertedNode(detached);
        this.shiftNodeDown(this.root);

        return detached.data;
    }

    detachRoot() {
        const detachedRoot = this.root;

        if (MaxHeap.isParent(this.root)) {
            this.parentNodes.shift();
		}
		this.root = null;
		this.heapSize--;
        return detachedRoot;
    }

    restoreRootFromLastInsertedNode(detached) {
        if (this.isEmpty()) return;

		this.root = this.parentNodes.pop();
		if (this.root.parent) {
			if (this.root.parent !== detached && this.root.parent.right == this.root) this.parentNodes.unshift(this.root.parent);
			this.root.remove();
			if (detached.left !== this.root && detached.left) this.root.appendChild(detached.left);
			if (detached.right !== this.root && detached.right) this.root.appendChild(detached.right);
			if (!this.root.right) this.parentNodes.unshift(this.root);
		}
    }

    size() {
        return this.heapSize;
    }


    isEmpty() {
        return !this.root && !this.parentNodes.length;
    }

    clear() {
        this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
    }

    insertNode(node) {
        if (this.isEmpty()) {
            this.root = node;
            this.parentNodes.push(node);
        } else {
            this.parentNodes[0].appendChild(node);
            this.parentNodes.push(node);
		}
		if (!MaxHeap.isParent(this.parentNodes[0])) this.parentNodes.shift();
    }

    shiftNodeUp(node) {
		if (!node.parent) this.root = node;
		
        else if (node.priority > node.parent.priority) {
            const nodeIndex = this.parentNodes.indexOf(node);
            if (nodeIndex !== -1) {
                const parentIndex = this.parentNodeIndex(node.parent);
                this.parentNodes[nodeIndex] = node.parent;
                if (parentIndex !== -1) this.parentNodes[parentIndex] = node;
            }
            node.swapWithParent();
            this.shiftNodeUp(node);
        }
    }

    shiftNodeDown(node) {
        if (this.isEmpty()) return;

        if (node.left && node.priority < node.left.priority) {
            let child = !node.right ? node.left : node.right.priority > node.left.priority ? node.right : node.left;
            const childIndex = this.parentNodes.indexOf(child);
            if (childIndex !== -1) {
                const nodeIndex = this.parentNodes.indexOf(node);
                this.parentNodes[childIndex] = node;
                if (nodeIndex !== -1) this.parentNodes[nodeIndex] = child;
            }
            child.swapWithParent();
            if (!child.parent) this.root = child;
            this.shiftNodeDown(node);
        }
    }
}

module.exports = MaxHeap;
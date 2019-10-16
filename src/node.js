class Node {
	
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this._resetLinks();
	}

	setInfo(data, priority) {
		this.data = data;
		this.priority = priority;
	}

	getLinks() {
		return {
			parent: this.parent,
			left: this.left,
			right: this.right
		};
	}

	_resetLinks() {
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	_setLinks(links) {
		this.parent = links.parent;
		this.left = links.left;
		this.right = links.right;
	}

	whatChild(node) {
		if (this.left === node) return "left";
		else if (this.right === node) return "right";
		else return null;
	}

	whichChild() {
		if (this.parent) {
			return this.parent.whatChild(this);
		} else {
			return null;
		}
	}

	getOtherParentChild() {
		if (this.parent) {
			switch(this.whichChild()) {
				case "left":  return this.parent.right;
				case "right": return this.parent.left;
				default:	  return name;
			};
		} else {
			return null;
		}
	}

	_connectLeft(node) {
		if (node) {
			this.left = node;
			node.parent = this;
		}
	}

	_connectRight(node) {
		if (node) {
			this.right = node;
			node.parent = this;
		}
	}

	appendChild(node) {
		//node.remove();
		if (!this.left) {
			this._connectLeft(node);
			return "left";
		}
		else if (!this.right) {
			this._connectRight(node);
			return "right";
		}
		return null;
	}

	removeChild(node) {
		if (this.left === node) {
			this.left.parent = null;
			this.left = null;
			return "left";
		}
		else if (this.right === node) {
			this.right.parent = null;
			this.right = null;
			return "right";
		}
		else throw "Given node is not 'left' or 'right' for this node.";
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
			this.parent = null;
		}
	}

	_replaceChild(child, node) {
		if (this.left === child) {
			this.left = node;
			return "left";
		}
		else if (this.right === child) {
			this.right = node;
			return "right";
		}
	}

	swapWithParent() {
		if (this.parent) {
			const parent = this.parent;
			this.swapWithNode(parent);
			this._replaceChild(this, parent);
			parent.parent = this;
		}
	}

	swapWithNode(node){
		if (node) {
			const thisOld = this.getLinks();
			const nodeOld = node.getLinks();

			if (this.parent) this.parent._replaceChild(this, node);
			if (node.parent) node.parent._replaceChild(node, this);

			if (this.left) this.left.parent = node;
			if (this.right) this.right.parent = node;
			if (node.left) node.left.parent = this;
			if (node.right) node.right.parent = this;

			this._setLinks(nodeOld);
			node._setLinks(thisOld);
		}
	}
}

module.exports = Node;

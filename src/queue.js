const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.size() === this.maxSize) throw "Cannot push: Max size reached.";
		else this.heap.push(data, priority);
	}

	shift() {
		if (this.isEmpty()) throw "Cannot shift: Heap is empty.";
		else return this.heap.pop();
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;

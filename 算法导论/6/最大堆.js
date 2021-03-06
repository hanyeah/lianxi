function heapSort(a){
	buildMaxHeap(a);
	for(var i = a.length-1; i>0;i--){
		exchange(a, 0, i);
		a.heapSize--;
		maxHeapify(a, 0);
	}
}

function heapMaximum(a){
	return a[0];
}

function heapExtractMax(a){
	if(a.heapSize<0){
		throw(new Error('heap underflow'));
	}
	max = a[0];
	a[0] = a[a.heapSize - 1];
	a.heapSize--;
	maxHeapify(a, 0);
	return max;
}

function heapIncreaseKey(a, i, key){
	if(key < a[i]){
		throw(new Error('new key is smaller then current key'));
	}
	a[i] = key;
	var pi;
	while(i>0){
		pi = parent(i);
		if(a[pi] < a[i]){
			exchange(a, i, pi);
			i = pi;
		} else {
			break;
		}
	}
}

function maxHeapInsert(a, key){
	a[a.heapSize] = -Infinity;
	a.heapSize++;
	heapIncreaseKey(a, a.heapSize - 1, key);
}

function buildMaxHeap(a){
	for(var i = a.length>>1; i>=0;i--){
		maxHeapify(a, i);
	}
}

function buildMaxHeap2(a){
	a.heapSize = 1;
	for(var i = 1; i < a.length; i++){
		maxHeapInsert(a, a[i]);
	}
}

function heapDelete(a, i){
	a.heapSize--;
	a[i] = a[a.heapSize];
	maxHeapify(a, i);
	a[a.heapSize] = null;
}

function maxHeapify(a, i){
	var l = left(i);
	var r = right(i);
	var largest;
	if(l<a.heapSize && a[l]>a[i]){
		largest = l;
	} else {
		largest = i;
	}
	if(r<a.heapSize && a[r]>a[largest]){
		largest = r;
	}
	if(largest!=i){
		exchange(a,i,largest);
		maxHeapify(a,largest);
	}
}

function exchange(a,i,largest){
	var temp = a[i];
	a[i] = a[largest];
	a[largest] = temp;
}

function left(i){
	return i<<1 | 0x1;
}
function right(i){
	return (i<<1) + 2;
}

function parent(i){
	return (i-1)>>1;
}

/*function left(i){
	return i<<1;
}

function right(i){
	return i<<1 | 0x1;
}

function parent(i){
	return i>>1;
}*/
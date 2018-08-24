function heapSort(a){
	buildMinHeap(a);
	for(var i = a.length-1; i>0;i--){
		exchange(a, 0, i);
		a.heapSize--;
		minHeapify(a, 0);
	}
}

function heapMinimum(a){
	return a[0];
}

function heapExtractMin(a){
	if(a.heapSize<0){
		throw(new Error('heap underflow'));
	}
	min = a[0];
	a[0] = a[a.heapSize - 1];
	a.heapSize--;
	minHeapify(a, 0);
	return min;
}

function heapIncreaseKey(a, i, key){
	if(key > a[i]){
		throw(new Error('new key is bigger then current key'));
	}
	a[i] = key;
	var pi;
	while(i>0){
		pi = parent(i);
		if(a[pi] > a[i]){
			exchange(a, i, pi);
			i = pi;
		} else {
			break;
		}
	}
}

function minHeapInsert(a, key){
	a[a.heapSize] = Infinity;
	a.heapSize++;
	heapIncreaseKey(a, a.heapSize - 1, key);
}

function buildMinHeap(a){
	for(var i = a.length>>1; i>=0;i--){
		minHeapify(a, i);
	}
}

function buildMinHeap2(a){
	a.heapSize = 1;
	for(var i = 1; i < a.length; i++){
		minHeapInsert(a, a[i]);
	}
}

function heapDelete(a, i){
	a.heapSize--;
	a[i] = a[a.heapSize];
	minHeapify(a, i);
	a[a.heapSize] = null;
}

function minHeapify(a, i){
	var l = left(i);
	var r = right(i);
	var least;
	if(l<a.heapSize && a[l]<a[i]){
		least = l;
	} else {
		least = i;
	}
	if(r<a.heapSize && a[r]<a[least]){
		least = r;
	}
	if(least!=i){
		exchange(a,i,least);
		minHeapify(a,least);
	}
}

function exchange(a,i,least){
	var temp = a[i];
	a[i] = a[least];
	a[least] = temp;
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
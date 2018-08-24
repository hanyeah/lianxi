function heapSort(a){
	buildMaxHeap(a);
	for(var i = a.length-1; i>0;i--){
		exchange(a, 0, i);
		a.heapSize--;
		maxHeapify(a, 0);
	}
}

function buildMaxHeap(a){
	for(var i = a.length>>1; i>=0;i--){
		maxHeapify(a, i);
	}
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
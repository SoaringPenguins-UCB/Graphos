var cadena=" ";
var separate = [];

function getData (){
  array = []
  var valor = document.getElementById("data").value;
  array.push(valor)
  console.log(array)
  return array
}

function toStr(){
  array = getData()
  a = array.toString();
  arr = []
  var arra = a.split(",");
  arra.forEach(a => {
      x = parseInt(a);
      arr.push(x);
  });

  console.log(arr)
  return arr
}

function ran(){
    var numero_random = parseInt( prompt("Ingrese cantidad de numeros: "));
    var lim = parseInt(prompt("Ingresar limite inferior: "));
    var sup  = parseInt(prompt("Ingresar limite superior: "));
    while (lim<0 || numero_random<0 || sup<0){
        var numero_random = parseInt( prompt("No se ingreso nada vuelva a ingresar: "));
        var lim = parseInt(prompt("Ingrese el limite inferior: "));
        var sup  = parseInt(prompt("Ingrese el limite superior: "));    
    }
     document.getElementById("data").value = " ";
    
    var imprimir = " ";

    var numeros = []
    for (var i=0; i<numero_random;i++){
        var n = Math.floor((Math.random()*(sup -lim))+lim);
        numeros.push(n);
    }
    console.log(numeros);
    for (var i=0;i<numeros.length; i++){
        if(i==0){
            imprimir += numeros[i].toString();
        }
        else{
        imprimir += ", "+numeros[i].toString();
        }
    }
    console.log(imprimir);
    document.getElementById("data").value = imprimir;
}
function envio(){
  cadena = document.getElementById('data').value;
  /*var input = "";
  if(cadena){
      input = cadena.value;
  }*/
  console.log(cadena);
  cadena.split(',');
  console.log(cadena); 
  separate = cadena.split(',').map(Number);
  var observar =separate.includes(String)
  if(observar){
      console.log("si hay elementos string oye :c");
  }
  else{
  console.log(separate);
  console.log("BUBBLE SORT");
  return separate;
  
}
}
function bsort(){
  document.getElementById("res").value = " ";
  var sep = envio();
  let start = new Date().getTime()
  console.time('Time:');
  
  bubble_sort(sep);
  
      bubble_sort_1(sep);
  
      let end = new Date().getTime()
  console.timeEnd('Time:');

  alert(end - start+" ms");

  
}
function bubble_sort_1(inputArr){

  function bblSort_1(arr){
       
      for(var i = 0; i < arr.length; i++){
          
        // Last i elements are already in place  
        for(var j = 0; j < ( arr.length - i -1 ); j++){
          if(arr[j] < arr[j+1]){
              
            var temp = arr[j]
            arr[j] = arr[j + 1]
            arr[j+1] = temp
          }
        }
      }
      // Print the sorted array
      console.log(arr);
      cad = "";
      for (var i =0;i<arr.length; i++){
          if(i==0){
              cad+=arr[i].toString();
          }
          else{
              cad+=", "+arr[i].toString();
          }
  
      }
      document.getElementById("res2").value = cad;
     }
     var arr = [];
     for (var i =0 ; i<separate.length;i++){
         var n = parseInt(separate[i]);
         arr.push(n);
    }
    console.log("arrr ",arr );
 
      
      
    // Now pass this array to the bblSort() function
   
    bblSort_1(arr);
  }
function bubble_sort(inputArr){


// Bubble sort Implementation using Javascript


// Creating the bblSort function
function bblSort(arr){
   
  for(var i = 0; i < arr.length; i++){
      
    // Last i elements are already in place  
    for(var j = 0; j < ( arr.length - i -1 ); j++){
        
      // Checking if the item at present iteration 
      // is greater than the next iteration
      if(arr[j] > arr[j+1]){//para que sea de mayor a menor cambiar > por <
          
        // If the condition is true then swap them
        var temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j+1] = temp
      }
    }
  }
  // Print the sorted array
  console.log(arr);
  cad = "";
  for (var i =0;i<arr.length; i++){
      if(i==0){
          cad+=arr[i].toString();
      }
      else{
          cad+=", "+arr[i].toString();
      }

  }
  document.getElementById("res").value = cad;
 }
   
   
 // This is our unsorted array
 var arr = [];
  for (var i =0 ; i<separate.length;i++){
      var n = parseInt(separate[i]);
      arr.push(n);
 }
 console.log("arrr ",arr );

 bblSort(arr);
 

;
}
function selec(){
  document.getElementById("res").value = " ";
  var sep = envio();
  let start = new Date().getTime()
  console.time('Time:');

      var arr = selectionSort(sep);
      cad = "";
      for (var i =0;i<arr.length; i++){
          if(i==0){
              cad+=arr[i].toString();
          }
          else{
              cad+=", "+arr[i].toString();
          }
  
      }
      document.getElementById("res").value = cad;

      var arr = selectionSort_1(sep);
      cad = "";
      for (var i =0;i<arr.length; i++){
          if(i==0){
              cad+=arr[i].toString();
          }
          else{
              cad+=", "+arr[i].toString();
          }
        }
          let end = new Date().getTime()
          console.timeEnd('Time:');
        
        //  alert(end - start+" ms");
     // document.getElementById("res2").value = cad;
 
}
function selectionSort(inputArr) { 
  let n = inputArr.length;
      
  for(let i = 0; i < n; i++) {
      
      let min = i;
      for(let j = i+1; j < n; j++){
          if(inputArr[j] < inputArr[min]) {//< to > 
              min=j; 
          }
       }
       if (min != i) {
          
           let tmp = inputArr[i]; 
           inputArr[i] = inputArr[min];
           inputArr[min] = tmp;      
      }
  }
  return inputArr;
}
function selectionSort_1(inputArr) { 
  let n = inputArr.length;
      
  for(let i = 0; i < n; i++) {
      
      let min = i;
      for(let j = i+1; j < n; j++){
          if(inputArr[j] > inputArr[min]) {//< to > 
              min=j; 
          }
       }
       if (min != i) {
          
           let tmp = inputArr[i]; 
           inputArr[i] = inputArr[min];
           inputArr[min] = tmp;      
      }
  }
  return inputArr;
}
function isort(){
  document.getElementById("res").value = " ";
  var sep = envio();
  let start = new Date().getTime()
  console.time('Time:');
 
      var arr = insertionSort(sep);
      cad = "";
      for (var i =0;i<arr.length; i++){
          if(i==0){
              cad+=arr[i].toString();
          }
          else{
              cad+=", "+arr[i].toString();
          }
  
      }
      document.getElementById("res").value = cad;
  
      var arr = insertionSort_1(sep);
      cad = "";
      for (var i =0;i<arr.length; i++){
          if(i==0){
              cad+=arr[i].toString();
          }
          else{
              cad+=", "+arr[i].toString();
          }
        }
          let end = new Date().getTime()
          console.timeEnd('Time:');
        
       //   alert(end - start+" ms");
     // document.getElementById("res2").value = cad;
  
  

}
function insertionSort(inputArr) {
  let n = inputArr.length;
      for (let i = 1; i < n; i++) {
          // Choosing the first element in our unsorted subarray
          let current = inputArr[i];
          // The last element of our sorted subarray
          let j = i-1; 
          while ((j > -1) && (current < inputArr[j])) {//< to >
              inputArr[j+1] = inputArr[j];
              j--;
          }
          inputArr[j+1] = current;
      }
  return inputArr;
}
function insertionSort_1(inputArr) {
  let n = inputArr.length;
      for (let i = 1; i < n; i++) {
          // Choosing the first element in our unsorted subarray
          let current = inputArr[i];
          // The last element of our sorted subarray
          let j = i-1; 
          while ((j > -1) && (current > inputArr[j])) {//< to >
              inputArr[j+1] = inputArr[j];
              j--;
          }
          inputArr[j+1] = current;
      }
  return inputArr;
}
function qsort(){
  document.getElementById("res").value = " ";
  var sep = envio();
  let start = new Date().getTime()
  console.time('Time:');
  
      var arr = quickSort(sep, 0, sep.length - 1);
      cad = "";
      for (var i =0;i<arr.length; i++){
          if(i==0){
              cad+=arr[i].toString();
          }
          else{
              cad+=", "+arr[i].toString();
          }
  
      }
      document.getElementById("res").value = cad;
  
 
      var arr = quick_Sort(sep);
     
      cad = "";
      for (var i =0;i<arr.length; i++){
          if(i==0){
              cad+=arr[i].toString();
          }
          else{
              cad+=", "+arr[i].toString();
          }
        }
          let end = new Date().getTime()
          console.timeEnd('Time:');
        
        //  alert(end - start+" ms");
    //  document.getElementById("res2").value = cad;
  

}
function swap(items, leftIndex, rightIndex){
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}
function partition(items, left, right) {
  var pivot   = items[Math.floor((right + left) / 2)], //middle element
      i       = left, //left pointer
      j       = right; //right pointer
  while (i <= j) {
      while (items[i] < pivot) {//< to >
          i++;
      }
      while (items[j] > pivot) {//> to <
          j--;
      }
      if (i <= j) {
          swap(items, i, j); //sawpping two elements
          i++;
          j--;
      }
  }
  return i;
}

function quickSort(items, left, right) {
  var index;
  if (items.length > 1) {
      index = partition(items, left, right);
      if (left < index - 1) { 
          quickSort(items, left, index - 1);
      }
      if (index < right) { 
          quickSort(items, index, right);
      }
  }
  return items;
}
function quick_Sort(origArray) {
if (origArray.length <= 1) { 
  return origArray;
} else {

  var left = [];
  var right = [];
  var newArray = [];
  var pivot = origArray.pop();
  var length = origArray.length;

  for (var i = 0; i < length; i++) {
    if (origArray[i] >= pivot) {
      left.push(origArray[i]);
    } else {
      right.push(origArray[i]);
    }
  }

  return newArray.concat(quick_Sort(left), pivot, quick_Sort(right));
}
}
function msort(){
  document.getElementById("res").value = " ";
  var sep = envio();
  let start = new Date().getTime()
  console.time('Time:');
  
      var arr = mergesort(sep);
      cad = "";
      for (var i =0;i<arr.length; i++){
          if(i==0){
              cad+=arr[i].toString();
          }
          else{
              cad+=", "+arr[i].toString();
          }
  
      }
      document.getElementById("res").value = cad;
  
      var arr = mergesort_1(sep);
     
      cad = "";
      for (var i =0;i<arr.length; i++){
          if(i==0){
              cad+=arr[i].toString();
          }
          else{
              cad+=", "+arr[i].toString();
          }
        }
          let end = new Date().getTime()
          console.timeEnd('Time:');
        
       //   alert(end - start+" ms");
    //  document.getElementById("res2").value = cad;
  
}

function merge(leftArr, rightArr) {
  var sortedArr = [];
    while (leftArr.length && rightArr.length) {
      if (leftArr[0] <= rightArr[0]) {//< to >
        sortedArr.push(leftArr[0]);
        leftArr = leftArr.slice(1)
     } else {
        sortedArr.push(rightArr[0]);
        rightArr = rightArr.slice(1)
       }
     }
    while (leftArr.length)
      sortedArr.push(leftArr.shift());
    while (rightArr.length)
      sortedArr.push(rightArr.shift());
    return sortedArr;
  }
  function mergesort(arr) {
    if (arr.length < 2) {
      return arr; }
    else {
      var midpoint = parseInt(arr.length / 2);
      var leftArr   = arr.slice(0, midpoint);
      var rightArr  = arr.slice(midpoint, arr.length);
      return merge(mergesort(leftArr), mergesort(rightArr));
    }
  }
  function merge_1(leftArr, rightArr) {
      var sortedArr = [];
        while (leftArr.length && rightArr.length) {
          if (leftArr[0] >= rightArr[0]) {//< to >
            sortedArr.push(leftArr[0]);
            leftArr = leftArr.slice(1)
         } else {
            sortedArr.push(rightArr[0]);
            rightArr = rightArr.slice(1)
           }
         }
        while (leftArr.length)
          sortedArr.push(leftArr.shift());
        while (rightArr.length)
          sortedArr.push(rightArr.shift());
        return sortedArr;
      }
      function mergesort_1(arr) {
        if (arr.length < 2) {
          return arr; }
        else {
          var midpoint = parseInt(arr.length / 2);
          var leftArr   = arr.slice(0, midpoint);
          var rightArr  = arr.slice(midpoint, arr.length);
          return merge_1(mergesort_1(leftArr), mergesort_1(rightArr));
        }
      }


    function mostrar2(result){
      var tabla = document.getElementById("data");
      val = ""
      for(let j=0; j<result.length; j++){
          val=""+ result
      }
      tabla.append(val)
  }
      function save(){
        const array = toStr();
        filename=prompt("Ingrese el nombre del archivo: ");
        let file=new Blob([JSON.stringify(array)],{type:"aplication/.json"});
        let a=document.createElement("a");
        a.href= URL.createObjectURL(file);
        a.download= filename+'.txt';
        a.click();
    }
    
    function leerArchivo(e){
        var archivo= e.target.files[0];
        if(!archivo){
          return;
        }
        var lector= new FileReader();
        lector.onload= function(e){
            var contenido= e.target.result;
            gf=JSON.parse(contenido);
            mostrar2(gf)
       }
       lector.readAsText(archivo);
    }

    
function shell_sort(arr) {
	let n = arr.length;

	for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2))	{
		for (let i = gap; i < n; i += 1)  {
			let temp = arr[i];
			
			let j;
			for (j = i; j >= gap && arr[j-gap] > temp; j-=gap)  {
				arr[j] = arr[j-gap];
			}

			arr[j] = temp;
		}
	}

	return arr;

}

//////
function shellSort() {
  document.getElementById("res").value = " ";
  var sep = envio();
  let start = new Date().getTime()
  console.time('Time:');
  
      var arr = shell_sort(sep);
      cad = "";
      for (var i =0;i<arr.length; i++){
          if(i==0){
              cad+=arr[i].toString();
          }
          else{
              cad+=", "+arr[i].toString();
          }
  
      }
      
          let end = new Date().getTime()
          console.timeEnd('Time:');
        
        //  alert(end - start+" ms");
          document.getElementById("res").value = cad;
     // document.getElementById("res2").value = cad;
      }
  //////
      
    document.getElementById('import').addEventListener('change', leerArchivo, false);
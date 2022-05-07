const canvas = document.getElementById('myCanvas');

canvas.width = window.innerWidth - 500;
canvas.height = window.innerHeight*2;

const ctx = canvas.getContext("2d");
ctx.font = "20px Arial";

function makeNode(x, y, data) {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.stroke();
}

function createText(x, y, data) {
    ctx.fillStyle = "red";
    ctx.fillText(data, x - 12, y + 8);
}

function joinNode(x, y, toX, toY) {
    ctx.moveTo(x, y); 
    ctx.lineTo(toX, toY); 
    ctx.stroke(); 
}

class Node {
    constructor(data, x, y) {
        this.value = data;
        this.frequency = 1;
        this.x = x;
        this.y = y;
        this.left = null;
        this.right = null;
    }
}
class BST {
    constructor() {
        this.root = null;
    }

    insertHelper(value, node, parentNode, gap, x, y) {
        gap = (gap / 2 > 60) ? gap / 2 : gap;
        if (node === null) {
            node = new Node(value, x, y);
            if (parentNode !== null) {
                joinNode(x, y, parentNode.x, parentNode.y);
                makeNode(parentNode.x, parentNode.y, parentNode.value);
                createText(parentNode.x, parentNode.y, parentNode.value);
            }
            makeNode(x, y, value);
            createText(x, y, value);

            return node;
        }

        if (node.value === value) {
            node.frequency++;
            return node;
        }else if (node.value > value) {
            node.left = this.insertHelper(value, node.left, node, gap, x - gap, y + 100);
        }else if (node.value < value) {
            node.right = this.insertHelper(value, node.right, node, gap, x + gap, y + 100);
        }
        return node;
    }

    insert(value) {
        this.root = this.insertHelper(value, this.root, null, 500, 300, 30);
    }

    pre(){
        let visited = [], current = this.root;
        let traverse = node =>{
            visited.push(node.value);
            if(node.left) traverse (node.left);
            if (node.right) traverse (node.right);
        }

        traverse(current);
        alert("Pre-order= " + visited);
        return visited;
    }

    in(){
        let visited = [], current = this.root;
        let traverse = node =>{
            if(node.left) traverse (node.left);
            visited.push(node.value);
            if (node.right) traverse (node.right);
        }

        traverse(current);
        alert("In-order= " + visited);
        return visited;
    }

    post(){
        let visited = [], current = this.root;
        let traverse = node =>{
            if(node.left) traverse (node.left);
            if (node.right) traverse (node.right);
            visited.push(node.value);
        }

        traverse(current);
        alert("Post-order= " + visited);
        return visited;
    }
}

var tree = new BST();
var bstForm = document.getElementById('form-trees');
array = []

bstForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let valor = document.querySelector('[name="nodos"]').value;
    tree.insert(parseInt(valor));
    array.push(parseInt(valor))
    console.log(array)
}); 

function recorrido(task){
    if(task == "preOrder"){
        tree.pre();
    }
    if(task == "inOrder"){
        tree.in();
    }
    if(task == "postOrder"){
        tree.post();
    }
}

//Guardar
function save(){
    filename=prompt("Ingrese el nombre del archivo: ");
    let file=new Blob([JSON.stringify(array)],{type:"aplication/.json"});
    let a=document.createElement("a");
    a.href= URL.createObjectURL(file);
    a.download= filename+'.json';
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
        gf = JSON.parse(contenido);
        console.log(gf)
        gf.forEach(a => {
            tree.insert(a);
        });
   }
   lector.readAsText(archivo);    
}
  
document.getElementById('import').addEventListener('change', leerArchivo, false);

//Limpiar
function Limpiar() {
    location.reload();
}


// Nodes and Edges counter.
var nodeIdCounter = 0;
var edgesIdCounter = 0;

// Create the network.
var container = document.getElementById("mynetwork");

// Default array with nodes.
var nodes = new vis.DataSet([]);

// Default array with edges.
var edges = new vis.DataSet([]);
const names_nodo = [];

// Savew Data.
var data = {
  nodes: nodes,
  edges: edges,
};
var men1 = {
  mensaje: mensaje
};

var options = {
  interaction: {
    hover: false,
  },
  physics: {
    enabled: false,
  },

  manipulation: {
    enabled: true,
    initiallyActive: false,
    addNode: function (nodeData, callback) {
      addNode(nodeData, callback);
    },
    editNode: function (nodeData, callback) {
      editNode(nodeData, callback);
    },
    addEdge: function (edgeData, callback) {
      addEdge(edgeData, callback);
    },
    editEdge: function (edgeData, callback) {
      editEdge(edgeData, callback);
    },
    // editEdge: true,
    deleteNode: true,
    deleteEdge: false,
  },

  edges: {
    arrows: {
      to: {
        enabled: true
      }
    }
  },
};


// Add new custom Node.
function addNode(nodeData, callback) {

  if (nodes.length === 0) {
    nodeIdCounter = 0;
  }
  // Verify if it's Empty.
  var label;
  var nr;
  console.log(names_nodo);
  while (!valueIsEmpty(label)) {
    label = prompt("Ingresar el nombre del nodo:");
    console.log("wsadas")
    if (names_nodo.length!=0){
      console.log("banif")
      for(var i=0; i<names_nodo.length; i++ ){
        console.log(names_nodo[i])
        if(label==names_nodo[i]){
          label="";
          nr=1;
          alert("El nombre del nodo ya esta en uso, por favor ingresa otro nombre");
        }
      }
      if(nr!=1){
        names_nodo.push(label);
      }
    }else{
      console.log("banelse")
      if(names_nodo.length==0 || nr != 1){
        names_nodo.push(label);
      }
    }
  }


  nodeData.id = nodeIdCounter++;
  nodeData.label = label;
  nodeData.title = "Node " + label;

  callback(nodeData);
}
// Add new custom Node.
function editNode(nodeData, callback) {

  if (nodes.length === 0) {
    nodeIdCounter = 0;
  }
  // Verify if it's Empty.
  var label;
  while (!valueIsEmpty(label)) {
    label = prompt("Ingresar el nuevo nombre del nodo:");
  }

  nodeData.label = label;
  nodeData.title = "Node " + label;
  callback(nodeData);
}

// Add new custom Edge.
function addEdge(edgeData, callback) {

  if (edges.length === 0) {
    edgesIdCounter = 0;
  }
  // Verify if it's Empty.
  var label;
  while (!valueIsEmpty(label)) {
    label = prompt("Ingrese el valor:");
  }

  if (edgeData.from === edgeData.to) {

    edgeData.id = edgesIdCounter++;
    edgeData.label = label;
    callback(edgeData);

  } else {
    edgeData.id = edgesIdCounter++;
    edgeData.label = label;
    callback(edgeData);
  }
}
function editEdge(edgeData, callback) {

  if (edges.length === 0) {
    edgesIdCounter = 0;
  }
  // Verify if it's Empty.
  var label;
  while (!valueIsEmpty(label)) {
    label = prompt("Ingrese el nuevo valor:");
  }

  if (edgeData.from === edgeData.to) {

    callback(edgeData);

  } else {

    edgeData.label = label;
    callback(edgeData);
  }
}

// Verify if the string is Empty.
function valueIsEmpty(label) {
  return label && label !== "";
}

// Enable the network.
var network = new vis.Network(container, data, options);

const generarMatriz = () => {
  let matrix = Array(nodes.length).fill(0).map(() => Array(nodes.length).fill(0));

  edges.forEach((edge) => {
    matrix[parseInt(edge.from)][parseInt(edge.to)] = edge.label;
  });

  rowList = [];
  colList = [];

  for (let i = 0; i < matrix.length; i++) {
    sumRow = 0;
    sumCol = 0;
    for (let j = 0; j < matrix.length; j++) {
      sumRow += parseFloat(matrix[i][j]);
      sumCol += parseFloat(matrix[j][i]);
    }
    rowList.push(sumRow);
    colList.push(sumCol);
  }
  nombresNodos = [];

  let showMatrix = " ,";
  nodes.forEach((node) => {
    showMatrix += node.label + ",";
    nombresNodos.push(node.label);
  });

  showMatrix += "SUMA|";

  for (let i = 0; i < matrix.length; i++) {
    showMatrix += nombresNodos[i] + ",";
    for (let j = 0; j < matrix.length; j++) {
      showMatrix += matrix[i][j] + ",";
    }

    showMatrix += rowList[i] + "|";
  }

  showMatrix += "SUMA,";
  colList.forEach((col) => (showMatrix += col + ","));

  console.log("ShowMatrix ", showMatrix)
  //parseArray(showMatrix);
};

const parseArray = (matriz) => {
  let final = Array(nodes.length + 2).fill(0).map(() => Array(nodes.length + 2).fill(0));
  let rows = matriz.split(["|"]);

  for (let i = 0; i < rows.length; i++) {
    let cols = rows[i].split(",");

    for (let j = 0; j < cols.length; j++) {
      final[i][j] = cols[j];
    }
  }
  crearTabla(final);
};

const crearTabla = (datos) => {
  document.getElementById("matrizFinal").innerHTML = "";
  var tabla = document.getElementById("matrizFinal");

  var cuerpo = createCustomElement("tbody");

  tabla.innerHTML = "";

  datos.forEach(function (datosFilas) {
    var fila = createCustomElement("tr");
    datosFilas.forEach(function (data) {
      var celda = createCustomElement("th");

      celda.appendChild(document.createTextNode(data));
      fila.appendChild(celda);
    });

    cuerpoTabla.appendChild(fila);
  });

  tabla.appendChild(cuerpo);
};
function MostrarMatriz() {
  var arrayNodos = [];
  var arrayEnlaces = [];
  let aux = 0;

  if (edges.length !== null) {
    while (aux < edges.length) {
      const nodes = edges.get(aux).from.toString() + "-" + edges.get(aux).to.toString(); //Obtiene el id del nodo origen y destino
      const values = edges.get(aux).label; //Obtiene el valor entre dos nodos
      console.log("Nodos");
      console.log(nodes);
      console.log("Valores");
      console.log(values);
      arrayNodos.push(nodes);
      arrayEnlaces.push(values);
      aux++;
    }

    aux = 0;
    var matrix = Array(nodes.length).fill(0).map(() => Array(nodes.length).fill(0)); //Construccion bruta de la matriz
    while (aux < arrayNodos.length) {
      var split = arrayNodos[aux].split("-");
      matrix[parseInt(split[1])][parseInt(split[0])] = arrayEnlaces[aux];
      aux++;
    }

    var Filas = [];
    var Columnas = [];
    // Suma de filas y columnas
    for (let i = 0; i < matrix.length; i++) {
      var sumaFilas = 0;
      var sumaColumnas = 0;
      for (let j = 0; j < matrix.length; j++) {
        sumaFilas += parseFloat(matrix[i][j]);
        sumaColumnas += parseFloat(matrix[j][i]);
      }
      Filas.push(sumaColumnas);
      Columnas.push(sumaFilas);
    }

    var matriz = ",";
    aux = 0;
    while (aux < nodes.length) {
      matriz += nodes.get(aux).label + ",";
      aux++;
    }
    matriz += "|";

    // Construir la matriz e insertar resultantes de la sumatoria

    for (let i = 0; i < matrix.length; i++) {
      matriz += nodes.get(i).label + ",";
      for (let j = 0; j < matrix.length; j++) {
        matriz += matrix[j][i] + ",";

      }
      matriz += Filas[i] + "|";
    }

    aux = 0;
    matriz += ",";
    while (aux < Columnas.length) {
      matriz += Columnas[aux] + ",";
      aux++;

    }
  }
  console.log(matriz);
  toMatrix(matriz);
}

const toMatrix = (matriz) => {
  let aux = Array(nodes.length + 2).fill(0).map(() => Array(nodes.length + 2).fill(0));

  let filas = matriz.split("|");

  for (let i = 0; i < filas.length; i++) {
    let columnas = filas[i].split(",");
    console.log(columnas);

    for (let j = 0; j < columnas.length; j++) {
      aux[i][j] = columnas[j];
    }
    aux[0][columnas.length - 1] = "SUMA";
  }
  aux[filas.length - 1][0] = "SUMA";
  aux[0][0] = "NODOS";


  tablx(aux);
}

const tablx = (datos) => {
  var tabla = document.getElementById("matrizFinal");

  var cuerpo = document.createElement("tbody");

  tabla.innerText = "";

  datos.forEach(function (datosFilas) {
    var fila = document.createElement("tr");

    datosFilas.forEach(function (data) {

      var celda = document.createElement("th");

      celda.appendChild(document.createTextNode(data));
      fila.appendChild(celda);

    });
    cuerpo.appendChild(fila);
  })

  tabla.appendChild(cuerpo);
}

const createCustomElement = (element, attributes, children) => {
  let customElement = document.createElement(element);

  if (children !== undefined) {
    children.forEach((child) => {
      if (child.nodeType) {
        if (child.nodeType === 1 || child.nodeType === 11)
          customElement.appendChild(child);
        else customElement.innerHTML += child;
      }
    });
  }
  addAtributes(customElement, attributes);
  return customElement;
};

const addAtributes = (element, attrObj) => {
  for (let attr in attrObj) {
    if (attrObj.hasOwnProperty(attr)) {
      element.setAttribute(attr, attrObj[attr]);
    }
  }
};

let permutations = []

function johnson() {
  let matrixad = Array(nodes.length).fill(0).map(() => Array(nodes.length).fill(0));

  edges.forEach((edge) => {
    matrixad[parseInt(edge.from)][parseInt(edge.to)] = parseInt(edge.label);
  });

  let colors = ["#800000", "#FF0000", "#FFA500", "#808000", "#800080", "#FF00FF", "#008000", "#000080", "#0000FF", "#008080", "#000000", "#808080"];
  let response = {
    array: [],
    message: "",
  }

  let info = {
    sources: [],
    destinies: []
  };

  console.log("matriz????")
  console.log(matrixad)
  console.log("matriz????")
  var matrix = correctMatrix(matrixad, info);


    johnsonFinal(matrixad, response);
  //asignacionFinal(ff,false);
  alert(response.message);
  return response;
}


function consegirlabel(id1) {
  var label = "";
  nodes.forEach((node) => {
    if (node.id == id1) {
      label = node.label;
    }
  });
  return label;
}

const deepCopy = (arr) => {
  let copy = [];
  arr.forEach(elem => {
    if (Array.isArray(elem)) {
      copy.push(deepCopy(elem))
    } else {
      if (typeof elem === 'object') {
        copy.push(deepCopyObject(elem))
      } else {
        copy.push(elem)
      }
    }
  })
  return copy;
}

// Helper function to deal with Objects
const deepCopyObject = (obj) => {
  let tempObj = {};
  for (let [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      tempObj[key] = deepCopy(value);
    } else {
      if (typeof value === 'object') {
        tempObj[key] = deepCopyObject(value);
      } else {
        tempObj[key] = value
      }
    }
  }
  return tempObj;
}

//Algoritmo de johnson
function johnsonFinal(matcostos, response) {
  console.log("empieza matriz")
  console.log(matcostos)
  console.log("termina matriz")

  let izquierda = Array(matcostos.length)
      //los espacios set = 0
      for (let i = 0; i < izquierda.length; i++) {
            izquierda[i] = 0
      }

  let derecha = Array(matcostos.length)
      //los espacios set = 10000
      for (let i = 0; i < derecha.length; i++) {
            derecha[i] = 0
      }

//encontrar nodo inicial
let inicial = -1
      for (let j = 0; j < matcostos[0].length; j++) {
        let llegadas = 0
        for (let i = 0; i < matcostos.length; i++) {
          if (matcostos[i][j] > 0 ) {
            llegadas++
          }
        }
        if(llegadas == 0){
          inicial = j
        }
      }

      //encontrar nodo final
      let final = -1
      for (let i = 0; i < matcostos.length; i++) {
        let salidas = 0
        for (let j = 0; j < matcostos[0].length; j++) {
          if (matcostos[i][j] > 0 ) {
            salidas++
          }
        }
        if(salidas == 0){
          final = i
        }
      }

console.log("nodo inicial" +inicial)
console.log("nodo final" +final)

console.log("izquierda")
console.log(izquierda)
console.log("derecha")
console.log(derecha)

let llegoFinal = false
let aux = inicial
let pendiente = []
pendiente.push(inicial)
//valor izquierda = max(valores anteriores+ sus aristas)
do{
  for (let j = 0; j < matcostos[0].length; j++) {
    if (matcostos[aux][j] > 0 ) {
      pendiente.push(j)
    }
  }
  while(pendiente.length >0){
    for (let i = 0; i < matcostos.length; i++) {
      //console.log("suma"+(matcostos[i][pendiente[0]] + izquierda[i] )+ "> "+izquierda[pendiente[0]])
      if(matcostos[i][pendiente[0]]>0){
      if (matcostos[i][pendiente[0]] + izquierda[i] > izquierda[pendiente[0]]) {
        izquierda[pendiente[0]] =  matcostos[i][pendiente[0]] + izquierda[i] 
      }
      }
    }
    if(pendiente[0]==final){
      llegoFinal = true
    }

    aux = pendiente[0]
    pendiente.shift()
  }

}while(llegoFinal == false)

console.log("3")


      //los espacios set = mayor
        for (let j = 0; j < matcostos.length; j++) {
            derecha[j]=izquierda[final]
        }

//valor derecha = min(valores posteriores- sus aristas)

llegoInicio = false
aux = final
pendiente = []
pendiente.push(final)

do{
  for (let j = 0; j < matcostos.length; j++) {
    if (matcostos[j][aux] > 0 ) {
      pendiente.push(j)
    }
  }



  while(pendiente.length >0){
    for (let i = 0; i < matcostos.length; i++) {
      if(matcostos[i][pendiente[0]]>0){
      if (derecha[i] >  derecha[pendiente[0]]- matcostos[i][pendiente[0]]) {
        derecha[i] =  derecha[pendiente[0]] - matcostos[i][pendiente[0]]
      }
    }
    }
    if(pendiente[0]==inicial){
      llegoInicio = true
    }

    aux = pendiente[0]
    pendiente.shift()
  }



}while(llegoInicio == false)




console.log("5")
console.log("izquierda fin")
console.log(izquierda)
console.log("derecha fin")
console.log(derecha)



let matrizSol = deepCopy(matcostos)
for (let i = 0; i < matcostos.length; i++) {
  for (let j = 0; j < matcostos[0].length; j++) {
    if(matcostos[i][j]== 0){
      matrizSol[i][j]=-1
    }else{
      matrizSol[i][j]=derecha[j]-izquierda[i]-matcostos[i][j]
    }
  }
}

console.log("matriz final zorras")
console.log(matrizSol)



//sacar el path
let pathAux = inicial
let critico = []
critico.push(inicial)
let flagAux = false

console.log("iniciallllll")
console.log(pathAux)
console.log("pathhhhh")
console.log(critico)
do{
  flagAux = false
  for (let i = 0; i < derecha.length; i++) {
    if(matrizSol[pathAux][i]==0 && izquierda[i]==derecha[i] && flagAux ==false){
      
      critico.push(i)
      pathAux=i    
      flagAux==true
  }
  }
}while(pathAux != final)


     


        console.log("minimizado exitoso; costo = " +derecha[final])
        console.log("path")
        console.log(critico)
        response.message = response.message.concat("minimizado exitoso \n costo = ", derecha[final], "");
        //console.log(matsol)
        mostrarMatrizsol(matrizSol);
        
}



function mostrarMatrizsol(matrizsol) {
  let mosmatriz = "Matriz Solucion: <br>";

  let la = matrizsol.length;
  for (var i = 0; i < la; i++) {
    let las = matrizsol[i].length;
    for (var j = 0; j < las; j++) {
      mosmatriz = mosmatriz + matrizsol[i][j] + " | ";
    }
    mosmatriz = mosmatriz + "<br>";
  }
  document.getElementById("Matrizsol").innerHTML = mosmatriz;
}

function swap(alphabets, index1, index2) {
  let temp = alphabets[index1];
  alphabets[index1] = alphabets[index2];
  alphabets[index2] = temp;
  return alphabets;
}

function permute(alphabets, startIndex, endIndex) {
  let aux = [];
  if (startIndex === endIndex) {
    for (let i = 0; i < alphabets.length; i++) {
      aux.push(alphabets[i]);
    }
    permutations.push(aux);
  } else {
    for (let i = startIndex; i <= endIndex; i++) {
      alphabets = swap(alphabets, startIndex, i);
      permute(alphabets, startIndex + 1, endIndex);
      alphabets = swap(alphabets, i, startIndex);
    }
  }
}

function correctMatrix(matrixad, info) {
  let sources = [];
  let destinies = [];
  for (let i = 0; i < matrixad.length; i++) {
    let isDestiny = true;
    for (let j = 0; j < matrixad.length; j++) {
      if (matrixad[i][j] != 0) {
        isDestiny = false;
      }
    }
    if (isDestiny) {
      destinies.push(i);
    }
  }
  info.destinies = destinies;

  for (let i = 0; i < matrixad.length; i++) {
    let isSource = true;
    for (let j = 0; j < matrixad.length; j++) {
      if (matrixad[j][i] != 0) {
        isSource = false;
      }
    }
    if (isSource) {
      sources.push(i);
    }
  }
  info.sources = sources;
  let newMatrix = [];

  for (let i = 0; i < sources.length; i++) {
    let newRow = [];
    for (let j = 0; j < destinies.length; j++) {
      newRow.push(matrixad[sources[i]][destinies[j]]);
    }
    newMatrix.push(newRow);
  }
  return newMatrix;
}

function mat(matriz1) {
  nodo1 = [];

  nodes.forEach((node) => {
    nodo1.push({ id: node.id, label: node.label, title: node.title, color: node.color });
  });
  var cad = '<table class="table table-striped><tr><td></td>';
  for (i = 0; i < nodes.length; i++) {
    cad = cad + '<td>' + nodo1[i]["label"] + '</td>';
  }

  cad = cad + '</tr>';

  for (j = 0; j < nodes.length; j++) {
    cad = cad + '<tr><td>' + nodo1[j]["label"] + '</td>';

    for (k = 0; k < nodes.length; k++) {
      cad = cad + '<td>' + matriz1[j][k] + '</td>';
    }
    cad = cad + '</tr>';
  }

  cad = cad + '</table>';
  let ma = {
    ca: cad
  };
  return ma;
}

function genera_tabla(matriz1) {
  nodo1 = [];

  nodes.forEach((node) => {
    nodo1.push({ id: node.id, label: node.label, title: node.title, color: node.color });
  });
  var body = document.getElementsByTagName("body")[0];
  let finalTable = document.getElementById("matrizFinal");

  var tabla = document.createElement("table");
  var tblBody = document.createElement("tbody");

  for (var i = 0; i < 1; i++) {
    var hilera = document.createElement("tr");
    for (var j = 0; j < 1; j++) {
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(" ");
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }
    for (var j = nodes.length / 2; j < nodes.length; j++) {
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(nodo1[j]["label"]);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }
    tblBody.appendChild(hilera);
  }

  for (var i = 0; i < nodes.length / 2; i++) {
    var hilera = document.createElement("tr");
    var celda = document.createElement("td");
    var textoCelda = document.createTextNode(nodo1[i]["label"]);
    celda.appendChild(textoCelda);
    hilera.appendChild(celda);

    for (var j = 0; j < nodes.length / 2; j++) {
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(matriz1[i][j]);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }

    tblBody.appendChild(hilera);
  }

  tabla.appendChild(tblBody);
  finalTable.appendChild(tblBody);
  body.appendChild(tabla);
  tabla.setAttribute("border", "2");
}

//Guardar archivo
function Arraydenodos() {
  var array1 = [];
  var array2 = [];
  const s = nodes.forEach((nodo) => {
    array1.push({ id: nodo.id, label: nodo.label });
  });
  const n = edges.forEach((linea) => {
    array2.push({ from: linea.from, to: linea.to, id: linea.id, label: linea.label });
  });
  var data1 = {
    node: array1,
    edge: array2,
    

  };
  console.log(data1);
  return (data1);
}

function descarga2() {
  filename = prompt("Ingrese el nombre del archivo: ");

  let file = new Blob([JSON.stringify(Arraydenodos())], { type: "aplication/.json" });
  let a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = filename + '.json';
  a.click();
}

//Recuperar
var network2 = null;

function cargar(dn, de) {
  nodeIdCounter == dn[dn.length - 1]["id"];
  nodeIdCounter++;
  nodes = new vis.DataSet(dn);
  edges = new vis.DataSet(de);
  edgesIdCounter = de[de.length - 1]["id"];
  edgesIdCounter++;
  data = {
    nodes: nodes,
    edges: edges,
  };
  network2 = new vis.Network(container, data, options);
}

if (network2 != null) {
  network = network2;
}

function leerArchivo(e) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function (e) {
    var contenido = e.target.result;
    gf = JSON.parse(contenido);
    cargar(gf["node"], gf["edge"]);
  }
  lector.readAsText(archivo);
}

function mostrar(contenido) {
  var gf;
  gf = JSON.parse(contenido);
}

document.getElementById('import').addEventListener('change', leerArchivo, false);

//Limpiar Area
function Limpiar() {
  location.reload();
}

var network = new vis.Network(container, data, options);
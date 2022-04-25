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

function asignacion(task) {
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

  var matrix = correctMatrix(matrixad, info);
  if (info.sources.length >= info.destinies.length) {
    permute(info.sources, 0, info.sources.length - 1);
    let resultCost;
    let solution;
    if (task == "max") {
      document.getElementById("matrizFinal").innerHTML = "";
      resultCost = -1000000;
      for (let i = 0; i < permutations.length; i++) {
        let iterationCost = 0;
        for (let j = 0; j < info.destinies.length; j++) {
          iterationCost += matrixad[permutations[i][j]][info.destinies[j]];
        }
        if (iterationCost > resultCost) {
          resultCost = iterationCost;
          solution = permutations[i];
        }
      }
      response.message = response.message.concat("El costo maximo es = ", resultCost, "\n");
    }
    if (task == "min") {
      document.getElementById("matrizFinal").innerHTML = "";
      resultCost = 1000000;
      for (let i = 0; i < permutations.length; i++) {
        let iterationCost = 0;
        for (let j = 0; j < info.destinies.length; j++) {
          iterationCost += matrixad[permutations[i][j]][info.destinies[j]];
        }
        if (iterationCost < resultCost) {
          resultCost = iterationCost;
          solution = permutations[i];
        }
      }
      response.message = response.message.concat("El costo minimo es = ", resultCost, "\n");
    }
    for (let i = 0; i < info.destinies.length; i++) {
      a = consegirlabel(solution[i]);
      b = consegirlabel(info.destinies[i]);

      edges.forEach((edge) => {
        if (parseInt(edge.from) == solution[i] && parseInt(edge.to) == info.destinies[i]) {
          matrixad[parseInt(edge.from)][parseInt(edge.to)] = "(" + parseInt(edge.label) + ")";
        }

      });
      let object1 = {
        type: "node",
        id: solution[i],
        color: colors[i]
      };
      let object2 = {
        type: "edge",
        source: solution[i],
        target: info.destinies[i],
        color: colors[i]
      };
      let object3 = {
        type: "node",
        id: info.destinies[i],
        color: colors[i]
      };
      response.array.push(object1);
      response.array.push(object2);
      response.array.push(object3);
    }
  }
  else {
    let resultCost;
    let solution;
    permute(info.destinies, 0, info.destinies.length - 1);
    if (task == "max") {

      document.getElementById("matrizFinal").innerHTML = "";
      resultCost = -1000000;
      for (let i = 0; i < permutations.length; i++) {
        let iterationCost = 0;
        for (let j = 0; j < info.sources.length; j++) {
          iterationCost += matrixad[info.sources[j]][permutations[i][j]];
        }
        if (iterationCost > resultCost) {
          resultCost = iterationCost;
          solution = permutations[i];
        }
      }
      //alert("El costo maximo es = ",resultCost,"\n");
    }
    if (task == "min") {


      document.getElementById("matrizFinal").innerHTML = "";
      resultCost = 1000000;
      for (let i = 0; i < permutations.length; i++) {
        let iterationCost = 0;
        for (let j = 0; j < info.sources.length; j++) {
          iterationCost += matrixad[info.sources[j]][permutations[i][j]];
        }
        if (iterationCost < resultCost) {
          resultCost = iterationCost;
          solution = permutations[i];
        }
      }
      //response.message = response.message.concat("El costo minimo es = ",resultCost," <br> \n");
    }
    for (let i = 0; i < info.sources.length; i++) {
      a = consegirlabel(info.sources[i]);
      b = consegirlabel(solution[i]);
      edges.forEach((edge) => {
        // if(parseInt(edge.from)==info.sources[i]&&parseInt(edge.to)==solution[i]){
        //   matrixad[parseInt(edge.from)][parseInt(edge.to)] = "("+parseInt(edge.label)+")";
        //}              
      });
      let object1 = {
        type: "node",
        id: info.sources[i],
        color: colors[i]
      };
      let object2 = {
        type: "edge",
        source: info.sources[i],
        target: solution[i],
        color: colors[i]
      };

      let object3 = {
        type: "node",
        id: solution[i],
        color: colors[i]
      };
      response.array.push(object1);
      response.array.push(object2);
      response.array.push(object3);
    }
  }

  var gg = matrixad.slice(0, matrixad.length / 2)
  console.log("tipo de gg", typeof (gg))
  console.log("gg", gg)
  var ff = gg.map(f => {
    return f.slice(f.length / 2);
  })

  console.log(gg)

  console.log("Matriz Cortada: ", ff)

  //genera_tabla(ff);

  //edit comienzo
  // Add new custom Node.

  /* function addNode(nodeData, callback) {
 if (nodes.length === 0) {
   nodeIdCounter = 0;
 }
 // Verify if it's Empty.
 var label;
 while (!valueIsEmpty(label)) {
   label = prompt("Ingresar el nombre del nodo:");
 }
 
 nodeData.id = nodeIdCounter++;
 nodeData.label = label;
 nodeData.title = "Node " + label;
 callback(nodeData);
}*/
  //edit fin

  if (task == "min") {
    asignacionFinal(ff, false, response);
  } else {
    asignacionFinal(ff, true, response);
  }
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

//Algoritmo de asignacion que depende de las dos funciones superiores
function asignacionFinal(matcostos, maximizando, response) {
  //let matcostos = [[2,2,4,7], [5,1,1,1], [4,1,2,1]];
  let disponibilidades = Array(matcostos.length)
  let demandas = Array(matcostos[0].length)
  let labelInput = null;
  for (let i = 0; i < disponibilidades.length; i++) {
    labelInput = null
    while (!valueIsEmpty(labelInput) || labelInput == null) {
      labelInput = prompt("Ingresa la disponibilidad " + (i + 1));
    }
    disponibilidades[i] = labelInput
  }
  for (let j = 0; j < demandas.length; j++) {
    labelInput = null
    while (!valueIsEmpty(labelInput) || labelInput == null) {
      labelInput = prompt("Ingresa la demanda " + (j + 1));
    }
    demandas[j] = labelInput
  }


  //console.log("disponib"+disponibilidades.length)
  //console.log("demandas"+demandas.length)
  //disponibilidades = [5,9,5]
  //demandas = [2,7,7,3]

  let copydisponibilidades = deepCopy(disponibilidades)
  let copydemandas = deepCopy(demandas)


  let matsol = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  let matbool = [[false, false, false, false], [false, false, false, false], [false, false, false, false]];



  //Noroeste
  var j = 0
  for (var i = 0; i < copydisponibilidades.length; i++) {
    while (copydisponibilidades[i] > 0) {

      if (copydisponibilidades[i] == copydemandas[j]) {
        matsol[i][j] += copydisponibilidades[i]
        matbool[i][j] = true
        copydisponibilidades[i] = 0
        copydemandas[j] = 0
        j++
      }
      else if (copydisponibilidades[i] > copydemandas[j]) {
        matsol[i][j] += copydemandas[j]
        matbool[i][j] = true
        copydisponibilidades[i] -= copydemandas[j]
        copydemandas[j] = 0
        j++
      }
      else if (copydisponibilidades[i] < copydemandas[j]) {
        matsol[i][j] += copydisponibilidades[i]
        matbool[i][j] = true
        copydemandas[j] -= copydisponibilidades[i]
        copydisponibilidades[i] = 0

      }
      else {
        //do nothing
      }

    }
  }

  //bis
  let falta = true
  do {

    //copia de matriz de costos (se controla con matbool)

    let copymatcostos = deepCopy(matcostos);

    let costo = 0
    for (let i = 0; i < copymatcostos.length; i++) {
      for (let j = 0; j < copymatcostos[0].length; j++) {
        if (matbool[i][j] == true)
          costo += copymatcostos[i][j] * matsol[i][j]
      }
    }

    //los espacios vacios de la copymatcostos se vuelven 10000
    for (let i = 0; i < copymatcostos.length; i++) {
      for (let j = 0; j < copymatcostos[0].length; j++) {
        if (matbool[i][j] == false) {
          copymatcostos[i][j] = 10000
        }
      }
    }

    let fil = Array(copydemandas.length)
    let col = Array(copydisponibilidades.length)
    for (let i = 0; i < fil.length; i++) {
      fil[i] = 10000
    }
    for (let i = 0; i < col.length; i++) {
      col[i] = 10000
    }

    let minval = 10000
    for (let i = 0; i < copymatcostos.length; i++) {
      for (let j = 0; j < copymatcostos[0].length; j++) {
        if (matbool[i][j] == true) {
          if (copymatcostos[i][j] < minval) {
            minval = copymatcostos[i][j]
          }
        }
      }
    }

    //asignar valor minimo a primer valor columna
    col[0] = minval

    var algunVacio = true;
    var noSeLleno = false;
    while (algunVacio) {
      //recorrido matriz llenando matriz, fil y col
      noSeLleno = true
      for (let i = 0; i < fil.length; i++) {
        for (let j = 0; j < col.length; j++) {
          if (copymatcostos[j][i] == 10000 && fil[i] != 10000 && col[j] != 10000) {
            copymatcostos[j][i] = fil[i] + col[j]
            noSeLleno = false
          } else if (copymatcostos[j][i] != 10000 && fil[i] == 10000 && col[j] != 10000) {
            fil[i] = copymatcostos[j][i] - col[j]
            noSeLleno = false
          } else if (copymatcostos[j][i] != 10000 && fil[i] != 10000 && col[j] == 10000) {
            col[j] = copymatcostos[j][i] - fil[i]
            noSeLleno = false
          } else {
            //do nothing
          }
        }
      }

      //siguientes 3 recorridos para identificar espacios vacios
      algunVacio = false
      //recorrido fila
      for (let i = 0; i < fil.length; i++) {
        if (fil[i] == 10000) {
          algunVacio = true
        }
      }
      //recorrido columna
      for (let i = 0; i < col.length; i++) {
        if (col[i] == 10000) {
          algunVacio = true
        }
      }
      //recorrido matriz
      for (let i = 0; i < copymatcostos.length; i++) {
        for (let j = 0; j < copymatcostos[0].length; j++) {
          if (copymatcostos[i][j] == 10000) {
            algunVacio = true
          }
        }
      }

      //if se ha llenado al menos 1 espacio no se hace nada
      //else se aniade un 1 al primer espacio vacio de la columna
      if (noSeLleno == true && algunVacio == true) {
        let llenado = false
        for (let i = 0; i < col.length; i++) {
          if (col[i] == 10000 && llenado == false) {
            col[i] = minval
            llenado = true
          }
        }
      } else {
        //do nothing
      }
    }

    var matresta = deepCopy(matcostos)
    for (let i = 0; i < matresta.length; i++) {
      for (let j = 0; j < matresta[i].length; j++) {
        matresta[i][j] = matcostos[i][j] - copymatcostos[i][j]
      }
    }

    let mayor = 0
    let menor = 0
    let filmayor = -1
    let colmayor = -1
    let filmenor = -1
    let colmenor = -1

    for (let i = 0; i < matcostos.length; i++) {
      for (let j = 0; j < matcostos[i].length; j++) {
        if (matresta[i][j] < menor) {
          menor = matresta[i][j]
          filmenor = i
          colmenor = j
        } else {
          if (matresta[i][j] > mayor) {
            mayor = matresta[i][j]
            filmayor = i
            colmayor = j
          } else {
            //DOES NOTHING
          }
        }
      }
    }

    //matriz donde 0 es un espacio posible
    //1 es x
    //-1 es -x
    //3 es un espacio no posible
    let matx = deepCopy(matcostos);
    for (let i = 0; i < matx.length; i++) {
      for (let j = 0; j < matx[0].length; j++) {
        matx[i][j] = 0
        if (matbool[i][j] == true) {
          matx[i][j] = 0
        } else {
          matx[i][j] = 3
        }
      }
    }

    if (maximizando) {

      if (mayor == 0) {
        //finished maximizacion
        //imprimir costo maximo y matsol
        console.log("maximizado exitoso; costo = " + costo)
        response.message = response.message.concat("maximizado exitoso \n costo = ", costo, "");
        console.log(matsol)
        mostrarMatrizsol(matsol);
        falta = false
      } else {
        matx[filmayor][colmayor] = 1
      }
    } else {
      if (menor == 0) {
        //finished minimizacion
        //imprimir costo minimo y matsol
        console.log("minimizado 2 exitoso; costo = " + costo)
        response.message = response.message.concat("minimizado exitoso \n costo = ", costo, "");
        console.log(matsol)
        mostrarMatrizsol(matsol);
        falta = false
      } else {
        matx[filmenor][colmenor] = 1
      }
    }

    //equilibrado
    let equilibrado = false
    let flageq = false
    let suma = 0
    let position = 0
    let value = 0
    let auxiliar = 0
    do {
      equilibrado = true;
      //filas
      for (let i = 0; i < matx.length; i++) {
        suma = 0

        for (let j = 0; j < matx[0].length; j++) {
          if (matx[i][j] == 1 || matx[i][j] == -1) {
            suma += matx[i][j]
          } else {
            //do nothing
          }
        }

        position = -1
        value = 0

        for (let j = 0; j < matx[0].length; j++) {
          auxiliar = 0
          for (let k = 0; k < matx.length; k++) {
            if (matx[k][j] == 0) {
              auxiliar++
            }
          }
          if (auxiliar > value && matx[i][j] == 0) {
            position = j
          }
        }

        if (suma == 1) {
          flageq = false
          if (position != -1) {
            matx[i][position] = -1
            flageq = true
            equilibrado = false
          } else {
            //do nothing
          }


        } else if (suma == -1) {
          flageq = false

          if (position != -1) {
            matx[i][position] = 1
            flageq = true
            equilibrado = false
          } else {
            //do nothing
          }

        } else {
          //do nothing
        }

      }

      //columnas
      for (let j = 0; j < matx[0].length; j++) {
        suma = 0

        for (let i = 0; i < matx.length; i++) {
          if (matx[i][j] == 1 || matx[i][j] == -1) {
            suma += matx[i][j]
          } else {
            //do nothing
          }
        }

        position = -1
        value = 0

        for (let i = 0; i < matx.length; i++) {
          auxiliar = 0
          for (let k = 0; k < matx[0].length; k++) {
            if (matx[i][k] == 0) {
              auxiliar++
            }
          }
          if (auxiliar > value && matx[i][j] == 0) {
            position = i
          }
        }

        if (suma == 1) {
          flageq = false
          if (position != -1) {
            matx[position][j] = -1
            flageq = true
            equilibrado = false
          } else {
            //do nothing
          }


        } else if (suma == -1) {
          flageq = false

          if (position != -1) {
            matx[position][j] = 1
            flageq = true
            equilibrado = false
          } else {
            //do nothing
          }

        } else {
          //do nothing
        }

      }

    } while (equilibrado == false)



    //si no esta equilibrada sacar solucion
    let eqaux = 0
    let noeqaux = false
    for (let i = 0; i < matx.length; i++) {
      eqaux = 0
      for (let j = 0; j < matx[0].length; j++) {
        if (matx[i][j] == 1 || matx[i][j] == -1) {
          eqaux += matx[i][j]
        }
      }
      if (eqaux != 0) {
        noeqaux = true
      }
    }
    for (let j = 0; j < matx[0].length; j++) {
      eqaux = 0
      for (let i = 0; i < matx.length; i++) {
        if (matx[i][j] == 1 || matx[i][j] == -1) {
          eqaux += matx[i][j]
        }
      }
      if (eqaux != 0) {
        noeqaux = true
      }
    }
    if (noeqaux == true) {
      if (maximizando) {
        console.log("maximizado exitoso; costo = " + costo)
        response.message = response.message.concat("maximizado exitoso \n costo = ", costo, "");
        console.log(matsol)
        mostrarMatrizsol(matsol);
        falta = false
      } else {
        console.log("minimizado exitoso; costo = " + costo)
        response.message = response.message.concat("minimizado exitoso \n costo = ", costo, "");
        console.log(matsol)
        mostrarMatrizsol(matsol);
        falta = false
      }
    } else {
      //continua
      let valorx = 10000;
      for (var i = 0; i < matx.length; i++) {
        for (var j = 0; j < matx[0].length; j++) {
          if (matx[i][j] == -1) {
            if (matsol[i][j] < valorx) {
              valorx = matsol[i][j]
            }
          } else {
            //do nothing
          }
        }
      }

      for (var i = 0; i < matsol.length; i++) {
        for (var j = 0; j < matsol[0].length; j++) {

          if (matx[i][j] == 1) {
            if (matbool[i][j] == true) {
              matsol[i][j] += valorx
            } else {
              matbool[i][j] = true
              matsol[i][j] = valorx
            }
          } else if (matx[i][j] == -1) {
            matsol[i][j] -= valorx
            //check if 0 to delete from solution
            if (matsol[i][j] == 0) {
              matbool[i][j] = false
            }
          } else {
            //do nothing   
          }

        }
      }

    }



    //matsol es la solucion pero sale en la siguiente iteracion
    //bis
  } while (falta == true)
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

  return (data1);
}

function descarga() {
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
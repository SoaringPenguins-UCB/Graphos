// Nodes and Edges counter.
var nodeIdCounter = 0;
var edgesIdCounter = 0;

// Create the network.
var container = document.getElementById("mynetwork");

// Default array with nodes.
var nodes = new vis.DataSet([]);

// Default array with edges.
var edges = new vis.DataSet([]);

var sumita = 0

var edgeList = [];
var g, gFinal;
var numneg=1;
nodeNum=0;
let namesnodosmts = [];
var idtest = 100;

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
            console.log(data);
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
        },
        color: { color: 'black' }
    },
};


// Add new custom Node.
function addNode(nodeData, callback) {

    if (nodes.length === 0) {
        nodeIdCounter = 0;
    }
    // Verify if it's Empty.
    var label;
    while (!valueIsEmpty(label)) {
        label = prompt("Ingresar el nombre del nodo:");
    }

    namesnodosmts.push(label);
    nodeData.id = nodeIdCounter++;
    nodeData.label = label;
    nodeData.title = "Node " + label;
    addnodemts();
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
    addedgemts(edgeData.from, edgeData.to, label);

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
        //edges.update({color:"#e80505"});
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
            response.message = response.message.concat("El atributo maximo es = ", resultCost, "\n");
            //edges.update({color:"#FFFFFF"});
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
            response.message = response.message.concat("El atributo minimo es = ", resultCost, "\n");
            // edges.update({color:"#e80505"});
        }
        for (let i = 0; i < info.destinies.length; i++) {
            a = consegirlabel(solution[i]);
            b = consegirlabel(info.destinies[i]);

            edges.forEach((edge) => {
                if (parseInt(edge.from) == solution[i] && parseInt(edge.to) == info.destinies[i]) {
                    matrixad[parseInt(edge.from)][parseInt(edge.to)] = "(" + parseInt(edge.label) + ")";
                    if (edge.label == parseInt(edge.label)) {
                        edges.update({ id: edge.id, label: edge.label, color: "#F90C0C" });
                        console.log(parseInt(edge.label) + "r");
                    }
                }
                if (parseInt(edge.from) != solution[i] && parseInt(edge.to) == info.destinies[i]) {
                    edges.update({ id: edge.id, label: edge.label, color: "black" });
                    console.log(parseInt(edge.label) + "g");
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
            alert("El atributo maximo es = ", resultCost, "\n");
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
            response.message = response.message.concat("El atributo minimo es = ", resultCost, " <br> \n");
            // console.log("minimus");

        }
        for (let i = 0; i < info.sources.length; i++) {
            a = consegirlabel(info.sources[i]);
            b = consegirlabel(solution[i]);
            edges.forEach((edge) => {
                if (parseInt(edge.from) == info.sources[i] && parseInt(edge.to) == solution[i]) {
                    matrixad[parseInt(edge.from)][parseInt(edge.to)] = "(" + parseInt(edge.label) + ")";
                    edges.update({ id: edge.id, label: edge.label, color: "#4CFF04" });
                    console.log(parseInt(edge.label) + "mmm");
                    //console.log("parseInt(edge.label)")
                    //console.log("Color waw");
                }
                /* if(edges.label==parseInt(edge.label)) {
                     edges.update({color:"#FF0000"});
                     console.log("Color Rojo");
                 }      */
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
            //console.log("Colores");
        }
    }

    var gg = matrixad.slice(0, matrixad.length / 2)
    //edges.update({color:"#e80505"});

    console.log("gg", gg)
    var ff = gg.map(f => {
        return f.slice(f.length / 2);
    })

    console.log("Matriz Cortada: ", ff)
    genera_tabla(ff);
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

function addnodemts() {
    nodeNum++;
    g = new jsgraphs.WeightedGraph(nodeNum);
    edgeList.forEach(edge => {
        g.addEdge(new jsgraphs.Edge(edge.node1, edge.node2, edge.weight));
    })
    console.log("aqui??????????????????")
    console.log(g)
    updateGraph();
}

function addedgemts(from, to, weight ) {
    g.addEdge(new jsgraphs.Edge(from, to, weight));
      updateTable(from, to, weight);

      updateGraph();
}
function updateTable(from, to, weight) {
    edgeList.push({
        node1: from,
        node2: to,
        weight: weight
    });
    
}
function respuestk(){
    idtest=110;
    if(numneg==-1){
        for(var i=0; i<edgeList.length;i++){
            edgeList[i].weight=edgeList[i].weight*-1 
        }
    }
    numneg=1;
    console.log("min")
    console.log(edgeList)
    addnodemts();
    alert("suma de la ruta = "+sumita);
}
function respuestkmin(){
    idtest=110;
    if(1==1){
        for(var i=0; i<edgeList.length;i++){
            edgeList[i].weight=edgeList[i].weight*-1 
        }
    }
    numneg=-1;
    console.log("max")
    console.log(edgeList)
    addnodemts();
    alert("suma de la ruta = "+sumita);
}
function updateGraph() {
    gFinal = g;
    var kruskal = new jsgraphs.KruskalMST(g); 
    console.log(g.V)
    var mst = kruskal.mst;
    

    var g_nodes = [];
    var g_edges = [];
    for (var v=0; v < g.V; ++v){
      g.node(v).label =namesnodosmts[v]; // assigned 'Node {v}' as label for node v
      console.log(v);
      g_nodes.push({
          id: v,
          label: g.node(v).label
          
      });
    }
    
    
    for (var i=0; i < mst.length; ++i) {
      var e = mst[i];
      var v = e.either();
      var w = e.other(v);
      e.highlighted = true;
      console.log('(' + v + ', ' + w + '): ' + e.weight);
      g_edges.push({
          from: v,
          to: w,
          length: e.weight,
          label: '' + (e.weight*numneg),
          color: '#ff0000',
          value: 2
      });
    }
    if(idtest==110){
        var t=g_nodes.length-1;
        g_nodes[t].color="#c4e9ff";
        idtest=100;
        
    }
    
    for (var v = 0; v < g.V; ++v) {
      var adj_v = g.adj(v);
      for (var i = 0; i < adj_v.length; ++i) {
          var e = adj_v[i];
          var w = e.other(v);
          console.log("fff "+ v + " y "+w)
          if (w > v){
            
            continue; // make sure only one edge between w and v since the graph is undirected
          } 
          if (e.highlighted) {
            console.log("fffs22");
            continue;
          }

          g_edges.push({
              from: v,
              to: w,
              length: e.weight,
              label: '' + (e.weight *numneg)
          });
      };
    }

    console.log(g.V); // display the number of vertices
    console.log(g.adj(0)); // display the adjacency list to vertex 0
    
    var nodes = new vis.DataSet(g_nodes);

    // create an array with edges
    var edges = new vis.DataSet(g_edges);
    console.log("dasdsadsadasdsadasdasdsa");
    console.log(g_edges); 

    sumita = 0
    g_edges.forEach(edge => {
        console.log("abc: "+edge.color)
        if(edge.color!=undefined){
            console.log("dentro "+edge.label)
            console.log(typeof(edge.label))
            sumita+=parseInt(edge.label)
        }
        
    })

    console.log("sumita: "+sumita)
    
    // create a network
    var container = document.getElementById('mynetwork2');
    var data = {
      nodes: nodes,
      edges: edges
    };
    var options = {};
    var network = new vis.Network(container, data, options);

    
    
  }

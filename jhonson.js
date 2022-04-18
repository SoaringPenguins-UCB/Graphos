
      var nodos_dia;
      var id_dia;

      // Default array with nodes.
      var nodes = new vis.DataSet([]);
// Default array with edges.
var edges = new vis.DataSet([]);
      var nodos
        var aristas
      
      

        // Savew Data.
var data = {
  nodes: nodes,
  edges: edges,
};

        function ver() {
        //var ele=network.body.data.nodes._data;
        var mostrar = "\t\t\t";
        //onsole.log(network.body);
        nodos = network.body.data.nodes.length;
        aristas = network.body.data.edges.length;
        var id_nod = "";
        var temp_nodo = "";
        var id_arit = "";
        var temp_arit = "";
        //console.log("Nodos: "+nodos+" Aristas: "+aristas);

        //
        //En esta parte obtengo los  los nodos
        // mostrar+="Estos son los nodos\n";
        nodos_dia = [];
        id_dia = [];
        nodos_posix = [];
        nodos_posiy = [];
        for (var i = 0; i < nodos; i++) {
          id_nod = network.body.nodeIndices[i];//Obtencion del id
          temp_nodo = network.body.data.nodes._data[id_nod];
          //temp_nodo.label=i; //se captura el nodo como un objeto
          id_dia.push(temp_nodo.id);
          nodos_dia.push(temp_nodo.label);
          nodos_posix.push(temp_nodo.x);
          nodos_posiy.push(temp_nodo.y);
        }
        var aristas_a = [];
        var aristas_a2 = [];
        for (var i = 0; i < aristas; i++) {
          aristas_a[i] = [];
          id_arit = network.body.edgeIndices[i];
          temp_arit = network.body.data.edges._data[id_arit];
          aristas_a2.push(temp_arit.id);
          var origen = indexofarray_b(temp_arit.from, id_dia);//ubicar_nodo(temp_arit.from);
          aristas_a[i].push(origen);
          var destino = indexofarray_b(temp_arit.to, id_dia); //ubicar_nodo(temp_arit.to);
          aristas_a[i].push(destino);
          var valor = temp_arit.label;
          aristas_a[i].push(valor);
          // console.log(origen+" "+destino);

          //console.log(valor);
          //mostrar+="Arista DE: "+origen+" HACIA: "+destino+" VALOR: "+valor+"\n";
        }
        //console.log(aristas_a2.length);
        var nueva_matriz = new construir_matriz(nodos_dia, id_dia, aristas_a, aristas);
        var inicio = def_ini(nueva_matriz.mat2, nodos);
        var fin = def_fin(nueva_matriz.mat2, nodos);
        var parti = new array_inicio(nueva_matriz.mat1, nueva_matriz.mat2, inicio, fin, nodos);
        console.log('Inicio');
        console.log(parti.i);
        console.log('Llegada');
        console.log(parti.l);
        console.log('Holguras');
        console.log(parti.h);
        recorrido(parti.h);
        //console.log(nueva_matriz);
        redibujar(id_dia, nodos_dia, nodos_posix, nodos_posiy, parti.i, parti.l, nueva_matriz.mat1, parti.h, nueva_matriz.mat2);
        //document.getElementById("resultado").innerHTML = mostrar;
        document.getElementById("vernodos").textContent = nodos_dia;
        console.log("aaaaaaaa");
      }
      function contarceros(matriz) {
        var n = 0;
        for (var i = 0; i < matriz.length; i++) {
          for (var j = 0; j < matriz.length; j++) {
            if (matriz[i][j] == 0)
              n++;
          }
        }
        return n;
      }
      function recorrido(matriz) {
        var dir = [];
        dir.push(1);
        var n = 0;
        var c = contarceros(matriz);
        for (var e = 0; e < c; e++) {
          for (var i = 0; i < matriz.length; i++) {
            if (matriz[n][i] == 0) {
              n = i;
              dir.push(i + 1);
              break;
            }
          }
        }
        console.log(dir);
      }

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
      function ubicar_nodo(id) {
        return network.body.data.nodes._data[id].label;
      }
      function indexofarray_b(val, arreglo) {
        // console.log("Tengo: "+arreglo.length);
        for (var i = 0; i < arreglo.length; i++) {
          var n = val.localeCompare(arreglo[i])
          if (n == 0) {
            return i;
          }
        }
      }
      function actualizar() {
        location.reload();
      }
      function construir_matriz(nodos_dia, id_dia, aristas_a, aristas_a2) {

        //var tipo_g=document.getElementById('grafo').value;
        var matriz1 = [];
        var matriz_pos = [];
        //console.log(nodos_dia.length);
        for (var i = 0; i < nodos_dia.length; i++) {
          matriz1[i] = [];
          for (var j = 0; j < nodos_dia.length; j++) {
            matriz1[i][j] = 0;
          }
        }
        for (var i = 0; i < nodos_dia.length; i++) {
          matriz_pos[i] = [];
          for (var j = 0; j < nodos_dia.length; j++) {
            matriz_pos[i][j] = 0;
          }
        }

        for (var i = 0; i < aristas_a2; i++) {
          matriz1[aristas_a[i][0]][aristas_a[i][1]] = parseInt(aristas_a[i][2]);
          matriz_pos[aristas_a[i][0]][aristas_a[i][1]] = 1;
        }
        mostrarMatrizsol(matriz1);
        console.log("matriz z")
        console.log(matriz1);
        return {

          mat1: matriz1,
          mat2: matriz_pos

        };
      }
      function mostrarMatrizsol(matrizsol) {
        let mosmatriz = "Matriz Solucion: ";
        console.log("bbbbbbbbbbb")
        console.log(matrizsol)
        let la = matrizsol.length;
        for (var i = 0; i < la; i++) {
          let las = matrizsol[i].length;
          for (var j = 0; j < las; j++) {
            mosmatriz = mosmatriz + matrizsol[i][j] + " | ";
          }
          mosmatriz = mosmatriz + "<br>";
        }
        console.log(mosmatriz)
        document.getElementById("mostrarmat").innerHTML = mosmatriz;
      }

      function def_ini(matriz, len) {
        var s;
        var inicios = new Array();
        for (var i = 0; i < len; i++) {
          s = 0;
          for (var j = 0; j < len; j++) {
            s += parseInt(matriz[j][i]);
          }
          if (s == 0) {
            inicios.push(i);
          }
        }
        return inicios;
      }
      function def_fin(matriz, len) {
        var s;
        var fin = new Array();
        for (var i = 0; i < len; i++) {
          s = 0;
          for (var j = 0; j < len; j++) {
            s += parseInt(matriz[i][j]);
          }
          if (s == 0) {
            fin.push(i);
          }
        }
        return fin;
      }
      function array_inicio(matriz, matriz_pos, inicio, fin, len) {
        //llena la cola
        var cola = [];
        //iniciar el vector de llegada
        var partida = new Array();
        for (var i = 0; i < len; i++) {
          partida[i] = -1;
        }
        var llega = new Array();
        for (var i = 0; i < len; i++) {
          llega[i] = Number.MAX_VALUE;
        }
        for (i = 0; i < inicio.length; i++) {
          partida[inicio[i]] = 0;
        }
        console.log(partida);
        //recorrido del inicio para adelante
        for (var i = 0; i < inicio.length; i++) {
          for (var j = 0; j < len; j++) {
            if (matriz_pos[inicio[i]][j] == 1) {
              cola.push(inicio[i]);
              cola.push(j);
            }
          }
        }
        //console.log('Cola dinamica');
        while (cola.length > 0) {

          var suma_temp = partida[cola[0]] + matriz[cola[0]][cola[1]];
          if (suma_temp > partida[cola[1]]) {
            partida[cola[1]] = suma_temp;
          }
          console.log(partida);
          for (var i = 0; i < len; i++) {
            if (matriz_pos[cola[1]][i] != 0) {
              cola.push(cola[1]); cola.push(i);//almacenamos posiciones
              console.log(cola);
            }
          }

          cola.shift(); cola.shift();
        }
        llega[fin[0]] = partida[fin[0]];
        //console.log(llega);
        //console.log(partida);
        //recorrido de fin hacia atras
        for (var i = 0; i < fin.length; i++) {
          for (var j = 0; j < len; j++) {
            if (matriz_pos[j][fin[i]] == 1) {
              cola.push(j);
              cola.push(fin[i]);
            }
          }
        }
        while (cola.length > 0) {

          var resta_temp = llega[cola[1]] - matriz[cola[0]][cola[1]];
          if (resta_temp < llega[cola[0]]) {
            llega[cola[0]] = resta_temp;
          }
          console.log(llega);
          for (var i = 0; i < len; i++) {
            if (matriz_pos[i][cola[0]] != 0) {
              cola.push(i); cola.push(cola[0]);//almacenamos posiciones
              console.log(cola);
            }
          }

          cola.shift(); cola.shift();
        }
        //matriz de holguras
        var mat_h = [];
        for (var i = 0; i < len; i++) {
          mat_h[i] = [];
          for (var j = 0; j < len; j++) {
            mat_h[i][j] = -1;
          }
        }
        for (var i = 0; i < len; i++) {
          for (var j = 0; j < len; j++) {
            if (matriz_pos[i][j] == 1) {
              mat_h[i][j] = llega[j] - partida[i] - matriz[i][j];
            }
          }
        }
        return { i: partida, l: llega, h: mat_h };
      }

      function redibujar(id_dia, nodos_dia, nodos_posix, nodos_posiy, partida, llega, matriz, matriz_h, matriz_p) {
        destroy();
        var len = id_dia.length;
        var array_nodos = [];
        for (var i = 0; i < len; i++) {
          array_nodos.push({ id: i, label: nodos_dia[i] + "\n" + partida[i] + "|" + llega[i], shape: 'box', color: '#97C2FC', x: nodos_posix[i], y: nodos_posiy[i] });
        }
        var nodes = new vis.DataSet(array_nodos);
        var array_aristas = [];
        for (var i = 0; i < len; i++) {
          for (var j = 0; j < len; j++) {
            if (matriz_p[i][j] == 1) {
              if (matriz_h[i][j] == 0) {
                array_aristas.push({ from: i, to: j, label: "A=" + matriz[i][j] + "\nH=" + matriz_h[i][j], font: { align: 'top' }, color: { color: 'red' }, arrows: 'to' });
              } else {
                array_aristas.push({ from: i, to: j, label: "A=" + matriz[i][j] + "\nH=" + matriz_h[i][j], font: { align: 'top' }, color: { color: 'black' }, arrows: 'to' });
              }
            }
          }
        }
        // create an array with edges
        var edges = new vis.DataSet(array_aristas);
        /* {from: 1, to: 8, color:{color:'red'},arrows:'to'},
         {from: 1, to: 3, color:'rgb(20,24,200)'},
         {from: 1, to: 2, color:{color:'rgba(30,30,30,0.2)', highlight:'blue'}},
         {from: 2, to: 4, color:{inherit:'to'}},
         {from: 2, to: 5, color:{inherit:'from'}},
         {from: 5, to: 6, color:{inherit:'both'}},
         {from: 6, to: 7, color:{color:'#ff0000', opacity:0.3}},
         {from: 6, to: 8, color:{opacity:0.3}},
       ]);*/

        // create a network
        var container = document.getElementById('mynetwork');
        var data = {
          nodes: nodes,
          edges: edges
        };
        var options = {
          nodes: {
            shape: 'circle'
          },
          physics: false
        };
        var network = new vis.Network(container, data, options);
      }

      function abrir() {
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
      }


//Guardar archivo
function Arraydenodos() {
  var array1 = [];
  var array2 = [];
  
  const s = nodes.forEach((nodos_dia) => {
    console.log(nodes)
    array1.push({ id: arrayNodos.id, label: arrayNodos.label });
  });
  const n = edges.forEach((aristas) => {
    array2.push({ from: aristas.from, to: aristas.to, id: aristas.id, label: aristas.label });
  });
  var data1 = {
    node: array1,
    edge: array2,

  };
  console.log(data1);
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
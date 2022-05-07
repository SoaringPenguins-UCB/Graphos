//Graphos
var nodeIdCounter = 0;
var edgesIdCounter = 0;

var nodes = new vis.DataSet([]);

var edges = new vis.DataSet([]);

var container = document.getElementById("mynetwork");

var data = {
    nodes: nodes,
    edges: edges,
};

var options = {
  width: "100%",
  height: "400px",
  manipulation: {
    addNode: function (nodeData, callback) {
        añadirNodo(nodeData, callback)
    },

    editNode: function (nodeData, callback){
      editarNodo(nodeData, callback)
    },
    addEdge: function (edgeData, callback) {
      añadirEnlace(edgeData, callback)
    },
    editEdge: function (edgeData, callback){
      editarEnlace(edgeData, callback)
    },
    "initiallyActive": true
  },


  edges:{
    arrows:{
        to:{
            enabled: true
        }
    }
},

  
};

const añadirNodo = (nodeData, callback) => {
    if (nodes.length === 0) {
        nodeIdCounter = 0;
    }
    var label = prompt("Nombre del nodo:");
    
    nodeData.id = nodeIdCounter++;
    nodeData.label = label;
    nodeData.title = "Nodo " + label;
    callback(nodeData);
}

const editarNodo = (nodeData, callback) => {
  var label = prompt("Nuevo nombre del nodo:");
  nodeData.label = label;
  nodeData.title = "Nodo " + label;
  callback(nodeData);
}

const añadirEnlace = (edgeData, callback) => {
    if (edges.length === 0) {
        edgesIdCounter = 0;
    }

    if (edgeData.from === edgeData.to) {
        var r = confirm("Esta seguro de querer unir el mismo nodo");
        if (r === true) {
            var label = prompt("Ingrese el valor del atributo: ");
            edgeData.id = edgesIdCounter++;
            edgeData.label = label;
            callback(edgeData);
        }
    } 
    else {
        var label = prompt("Ingrese el valor del atributo: ");
        edgeData.id = edgesIdCounter++;
        edgeData.label = label;
        callback(edgeData);
    }
}

const editarEnlace = (edgeData, callback) => {
    var label = prompt("Ingrese el nuevo valor del atributo: ");
    edgeData.label = label;
    callback(edgeData);
}

//Matriz de relacion

function MostrarMatriz () {
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
  let aux = Array(nodes.length +2).fill(0).map(() => Array(nodes.length +2).fill(0));

  let filas = matriz.split("|");

  for(let i=0; i<filas.length; i++){
    let columnas = filas[i].split(",");
    console.log(columnas);

    for(let j=0; j<columnas.length; j++){
      aux[i][j] = columnas[j];
    }
    aux[0][columnas.length-1] = "SUMA";
  }
  aux[filas.length-1][0] = "SUMA";
  aux[0][0] = "NODOS";
  

  tablx(aux);
}

const tablx = (datos) =>{
  var tabla = document.getElementById("matrizFinal");

  var cuerpo = document.createElement("tbody");

  tabla.innerText = "";

  datos.forEach(function(datosFilas){
      var fila = document.createElement("tr");
    
    datosFilas.forEach(function(data){

      var celda = document.createElement("th");
  
      celda.appendChild(document.createTextNode(data));
      fila.appendChild(celda);
      
    });
    cuerpo.appendChild(fila);
  })
  
  tabla.appendChild(cuerpo);
}
//Johnson
                     //johnson
                     function array() {
                      var nodoA = [];
                      var valoresA = [];
                      var auxs=[];
                      let c = 0;
                      
                      if (c < edges.length) {
                        const n = edges.forEach((element) => {
                          //console.log(element);
                          
                          const nodes = element.from.toString() + "-" + element.to.toString();
                          const values = parseInt(element.label);
                          auxs.push(nodes);
                          nodoA.push(nodes);
                          valoresA.push(values);
                          console.log(nodes);
                          //console.log(nodoA);
                          console.log(valoresA);
                          //console.log(auxs);
                    
                        });
                        
                      }
                     
                      c = 0;      
                      var matrix = Array(nodes.length).fill(0).map(() => Array(nodes.length).fill(0));
                        
                      console.log(matrix);
                      while (c <nodoA.length) {
                        var split =nodoA[c].split("-");
                        matrix[parseInt(split[1])][parseInt(split[0])] = valoresA[c];
                        console.log(matrix);
                        Jhonson(matrix);
                        c++;        
                      }
                    }
                    
                    function Jhonson() {
                      Arrayen=[];
                      ArrayAppi = [];
                      ArrayAtpf = [];
                    
                      punt=[];
                      p=0;
                      edges.forEach((enlace)=>{
                        
                        if (enlace.from == p) {
                          dato = new llenarAppi(enlace.from,enlace.from);
                          ArrayAppi.push(dato);
                          
                          punt=[enlace.to,enlace.label];
                          appiant=parseFloat(enlace.from);
                          a=parseFloat(enlace.label);
                          var appi = appiant + a;
                          dato = new llenarAppi(enlace.to,appi);
                          ArrayAppi.push(dato);
                          var antt=enlace.to;
                          p=-1;
                        }else{
                          console.log(enlace+'\n....'+antt+' antt......punt0 '+punt[0]);
                          if(antt != enlace.to && punt[0] == enlace.from){
                              appiant=parseFloat(punt[1]);
                              a=parseFloat(enlace.label);
                              var appi = appiant + a;
                              dato = new llenarAppi(enlace.to,appi);
                              ArrayAppi.push(dato);
                              antt=enlace.to;
                          }else{
                            if (antt != enlace.to && punt[0] != enlace.from) {
                               for (let app of ArrayAppi){
                                  if (app.id==enlace.from) {
                                    appiant=parseFloat(app.appi);
                                    a=parseFloat(enlace.label);
                                    var appi = appiant + a;
                                    dato = new llenarAppi(enlace.to,appi);
                                    console.log(dato);
                                    ArrayAppi.push(dato);
                                    break;
                                  }
                                }
                                    antt=enlace.to;
                                    punt=[enlace.from,appi];
                            }else{
                                  for (let app of ArrayAppi){
                                    if (app.id==enlace.from) {
                                      appiant=parseFloat(app.appi);
                                      a=parseFloat(enlace.label);
                                      var appi = appiant + a;
                                      if (appi > parseFloat(punt[1])) {
                                        change=false;
                                        for (let ap of ArrayAppi){
                                          if (ap.id==enlace.to) {
                                            ap.appi=appi;
                                            change=true;
                                            break;
                                          }
                                        }
                                        if(change==false){
                                            dato = new llenarAppi(enlace.to,appi);
                                            console.log(dato);
                                            ArrayAppi.push(dato);break;
                                          
                                        }
                                        punt=[enlace.to,appi];antt=enlace.to;break;
                                      }else{
                                        
                                        punt=[enlace.to,punt[1]];antt=enlace.to;break;
                                      }
                    
                                    }
                                }
                            }
                            
                          }
                          
                        }
                      });
                    
                      edges.forEach((enlace)=>{
                        dato = new llenarAen(enlace.from,enlace.to,enlace.label);
                        Arrayen.push(dato);
                      });
                    
                      antf=0;
                      j =ArrayAppi.length-1;
                      p =ArrayAppi[j].id;
                      console.log(Arrayen);
                      for (var i = Arrayen.length - 1; i >= 0; i--) {
                        console.log(Arrayen[i].to+' to ..........id '+ArrayAppi[j].id);
                        if (Arrayen[i].to == p) {
                            dato = new llenarAtpf(Arrayen[i].to,ArrayAppi[j].appi);
                            //console.log(dato);
                            ArrayAtpf.push(dato);
                            atpfant=parseFloat(ArrayAppi[j].appi);
                            a=parseFloat(Arrayen[i].label);
                            //console.log('att = '+a);
                            atpf = atpfant - a;
                            dato = new llenarAtpf(Arrayen[i].from,atpf);
                            ArrayAtpf.push(dato);
                            antf=Arrayen[i].from;
                            punt=[Arrayen[i].from,atpf];
                            //console.log(punt);
                            p=-1;
                        }else{
                          if (antf != Arrayen[i].from && punt[0] == Arrayen[i].to) {
                            ex=false;aux=0;
                            for (let atp of ArrayAtpf) {
                              if(Arrayen[i].from==atp.id){
                                atpfant=parseFloat(punt[1]);
                                a=parseFloat(Arrayen[i].label);
                                atpfA = atpfant - a;aux=atp.atpf;ex=true;break;
                              }
                            }
                            if (ex) {
                              if (atpfA<aux) {
                                for (let atp of ArrayAtpf) {
                                  if(Arrayen[i].from==atp.id){
                                    atp.atpf=atpfA;break;
                                  }
                                }
                              }
                            }else{
                              atpfant=parseFloat(punt[1]);
                              a=parseFloat(Arrayen[i].label);
                              atpf = atpfant - a;
                              dato = new llenarAtpf(Arrayen[i].from,atpf);
                              //console.log(dato);
                              ArrayAtpf.push(dato);
                            }
                            
                            anft=Arrayen[i].from;
                          }else{
                            
                            if (Arrayen[i].to != punt[0] &&  antf != Arrayen[i].from) {
                              for (let atp of ArrayAtpf) {
                                if (Arrayen[i].to==atp.id) {
                                  atpfant=parseFloat(atp.atpf);
                                  console.log('atpfant ='+atpfant);
                                  a=parseFloat(Arrayen[i].label);
                    
                                  atpf = atpfant - a;
                                  dato = new llenarAtpf(Arrayen[i].from,atpf);
                                  ArrayAtpf.push(dato);
                                  antf=Arrayen[i].from;
                                  punt=[Arrayen[i].from,atpf];
                                  break;
                                }
                              }        
                              
                            }else{
                              for (let atp of ArrayAtpf) {
                                if (Arrayen[i].to==atp.id) {
                                  atpfant=parseFloat(atp.atpf);
                                  a=parseFloat(Arrayen[i].label);
                                  atpf = atpfant - a;
                                  if (atpf < parseFloat(punt[1])) {
                                    change=false;
                                        
                                    for (let at of ArrayAtpf) {
                                      if(at.id == punt[0]){
                                        at.atpf = atpf;
                                        break;
                                      }
                                    }
                                    antf=Arrayen[i].from;
                                    punt=[Arrayen[i].from,atpf];
                                  }else{
                                    antf=Arrayen[i].from;
                                    punt=[Arrayen[i].from,punt[1]];
                                    break;
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    
                      AddElement(ArrayAppi,ArrayAtpf);
                      rutaCritica(ArrayAppi,ArrayAtpf);
                    }
                    
                    function llenarAen(from,to,label){
                      this.from=from;
                      this.to=to;
                      this.label=label;
                    }
                    
                    function llenarAppi(id,appi){
                      this.id=id;
                      this.appi=appi;
                    }
                    
                    function llenarAtpf(id,atpf){
                      this.id=id;
                      this.atpf=atpf;
                    }
                    
                    const AddElement=(ArrayAppi,ArrayAtpf)=>{
                      var aux = ArrayAtpf.reverse();
                      console.log(ArrayAppi);
                      console.log(aux);
                      console.log(aux.length);
                      console.log(ArrayAppi.length);
                      for (var i = 0; i < ArrayAppi.length-1; i++) {
                        if (ArrayAppi[i].id == aux[i].id) {
                          nodes.forEach((nodo)=>{
                            if (nodo.id == aux[i].id) {
                              //t=String('appi:'+ArrayAppi[i].appi+' | atpf:'+aux[i].atpf);
                              t=String(''+ArrayAppi[i].appi+' | '+aux[i].atpf);
                              nodes.update({id: nodo.id, title:t});
                            }
                          });
                        }
                      }
                    
                    }
                    
                    const rutaCritica=(ArrayAppi,ArrayAtpf)=>{
                      Nodo = [];
                      for (var i = 0; i <= ArrayAppi.length - 1; i++) {  
                        if (ArrayAppi[i].id == ArrayAtpf[i].id) {
                          dato = new llenarNodo(ArrayAppi[i].id,ArrayAppi[i].appi,ArrayAtpf[i].atpf);
                          Nodo.push(dato);
                          console.log(dato);
                        }
                      
                    }
                      
                    edges.forEach((enlace)=>{
                        console.log(ArrayAppi.length);
                        for (var i = 0; i <= Nodo.length-1; i++) {  
                          if (enlace.from == Nodo[i].id) {
                            ap=Nodo[i].appi;
                          }else{
                            if (enlace.to == Nodo[i].id) {
                              at=Nodo[i].atpf;
                            }
                          }
                        }
                        h = at - ap - parseFloat(enlace.label);
                        t = String(enlace.label+"\nh="+h);
                        edges.update({id: enlace.id, label:t});
                        
                        if (h==0) {
                          //t= enlace.label+"\nh="+h;
                          edges.update({id: enlace.id, color:"#e80505"});
                        }
                        
                      });
                    }
                    
                    function llenarNodo(id,appi,atpf){
                      this.id=id;
                      this.appi=appi;
                      this.atpf=atpf;
                    }


//Guardar archivo
function Arraydenodos() {
  var array1=[];
  var array2=[];
  const s = nodes.forEach((nodo) => {
    array1.push({id:nodo.id, label: nodo.label});
  });
  const n = edges.forEach((linea) => {
     array2.push({from: linea.from, to:linea.to, id:linea.id, label: linea.label});
 });
 var data1={
   node:array1,
   edge:array2,

 };

  return(data1);
} 

function descarga(){
  filename=prompt("Ingrese el nombre del archivo: ");

  let file=new Blob([JSON.stringify(Arraydenodos())],{type:"aplication/.json"});
  let a=document.createElement("a");
  a.href= URL.createObjectURL(file);
  a.download= filename+'.json';
  a.click();
}

//Recuperar
var network2=null;

function cargar(dn,de){
  nodeIdCounter ==dn[dn.length-1]["id"];
  nodeIdCounter ++;
  nodes= new vis.DataSet(dn);
  edges=new vis.DataSet(de);
  edgesIdCounter=de[de.length-1]["id"];
  edgesIdCounter++;
  data={
    nodes: nodes,
    edges: edges,
  };
network2= new vis.Network(container,data,options);
}

if(network2!=null){
  network=network2;
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
   cargar(gf["node"],gf["edge"]);
 }
 lector.readAsText(archivo);
}

function mostrar(contenido){
  var gf
  gf=JSON.parse(contenido);
  console.log(gf["node"]);
}

document.getElementById('import').addEventListener('change', leerArchivo, false);

//Limpiar area
function Limpiar() {
  location.reload();
}

var network = new vis.Network(container, data, options);

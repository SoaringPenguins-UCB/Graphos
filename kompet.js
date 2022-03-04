var nCount=0;
var nc=[];
var nodos = new vis.DataSet([
        ]);
        
var container = document.getElementById("mynetwork");

var data = {
    nodes: nodos
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

    "initiallyActive": true
  },
 
};
  /*      
var contenedor = document.getElementById("mynetwork");
        var datos = {
            nodes: nodos,
            //edges: aristas
        };
        var opciones = {
            manipulation:{
                addNode:function(nodeData, callback){
                    addNode(nodeData, callback);
                }
               
           // configure:{
             //   enabled: true,
               // container: undefined,
               // showButton: true
           // }
        }
        };*/
        //var grafo = new vis.Network(contenedor, datos, opciones);

        /*
        function addNode(nodeData, callback) {
            if (nodos.length === 0) {
                nCount = 0;
                }
                var label=null;
                while (label===null) {
                    label = prompt("Nombre del nodo que dese agregar:");
                    }
                
                    nodeData.id = nCount++;
                    nodeData.label = label;
                    nodeData.title = "Nodo= "+nCount;
                    callback(nodeData);
              

                    };*/
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

                    
                     
                      function ingreso(){
                       // mat= Array(nodos.length).fill(0).map(() => Array(nodos.length).fill(0));
                        var sumax=0;
                        var sumay=0;
                        var t;
                        var dats=prompt("Ingresar cantidad de datos a usar:");
                       // for(var i=1;i<=mat.length;i++){
                        for(var i=1;i<=dats;i++){
                            var lab = prompt("Nombre del nodo "+i+":");
                            var valx = prompt("Ingrese el valor de x"+i+"=");
                            var valy = prompt("Ingrese el valor de y"+i+"=");
                            sumax+=parseInt(valx);
                            sumay+=parseInt(valy);
                            console.log(sumax+"....."+sumay);
                            t="x= "+valx+" y= "+valy;
                            nodos.update({id: i,label:lab,title:t});
                            
                        }
                        
                          
                          console.log(sumax+"....."+sumay);
                        
                        
                        //var promx=sumax/mat.length;
                        //var promy=sumay/mat.length;
                        var promx=sumax/dats;
                        var promy=sumay/dats;
                        console.log(promx+"-"+promy);
                        t2="x= "+promx+" y= "+promy;
                        nodos.update({id: dats+1,label:"tot",title:t2});
                        alert("x= "+promx+" y= "+promy);
                      }


              
function Arraydenodos() {
  var array1=[];
  const s = nodos.forEach((nodo) => {
    array1.push({id:nodo.id, label: nodo.label, title: nodo.title});
  });
 var data1={
   node:array1

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

function cargar(dn){
  nCount ==dn[dn.length-1]["id"];
  nCount ++;
  nodos= new vis.DataSet(dn);
  data={
    nodes: nodos
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


                      /*
function Arraydenodos() {
    var array1=[];
    const s = nodos.forEach((nodo) => {
      array1.push({id:nodo.id, label: nodo.label, title: nodo.title});
    });
   var data1={
     node:array1
  
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
  
  function cargar(dn){
    nCount ==dn[dn.length-1]["id"];
    nCount ++;
    nodes= new vis.DataSet(dn);
    data={
      nodes: nodos
    };
  network2= new vis.Network(contenedor, datos, opciones);
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
     cargar(gf["node"]);
   }
   lector.readAsText(archivo);
  }
  
  function mostrar(contenido){
    var gf
    gf=JSON.parse(contenido);
    console.log(gf["node"]);
  }
  
  document.getElementById('import').addEventListener('change', leerArchivo, false);
  
  
  var network = new vis.Network(contenedor, datos, opciones);*/
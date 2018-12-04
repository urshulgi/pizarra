var xini, yini, margintop, marginleft, disparador;
var colorlapiz = "white";
var grosorlapiz = 3;

//Constantes
var PIZARRITA = document.getElementById("pizarra");
var LIENZO = PIZARRITA.getContext("2d");
var LIMPIADOR = document.getElementById("limpiar");
var DIVCONTENEDOR = document.getElementById("contenedor");
var CAMBIADORCOLOR = document.getElementById("colorpicker");
var CAMBIADORTAMANO = document.getElementById("botontamanolapiz");
var TAMANONUEVOLAPIZ = document.getElementById("valortamanolapiz");
var BORRADOR = document.getElementById("borrador");
var DEVOLVERLAPIZ = document.getElementById("lapiz");
var CAMBIADORTAMANOBORRADOR = document.getElementById("botontamanoborrador");
var TAMANONUEVOBORRADOR = document.getElementById("valortamanoborrador");

//Listener generales
CAMBIADORCOLOR.addEventListener("change", cambiarColor); //Cuando cambia el color del input.
LIMPIADOR.addEventListener("click", limpiarPizarra); //Cuando se da click al botón "Limpiar".

CAMBIADORTAMANO.addEventListener("click", cambiarGrosorLapiz); //Cuando se pulsa el boton "¡Cambiar Tamaño!".
BORRADOR.addEventListener("click", borrarTrazos); //Cuando se pulsa el boton "Borrador".
DEVOLVERLAPIZ.addEventListener("click", reiniciarLapiz); //Cuando se pulsa el boton "Lápiz".
CAMBIADORTAMANOBORRADOR.addEventListener("click", cambiarGrosorBorrador); //Cuando se pulsa el boton "¡Cambiar tamaño!" del borrador.
window.addEventListener("load", ejecutarEscritura);

function dibujarLinea (color, grosor, x_ini, y_ini, x_fin, y_fin) {
  //Dibuja una línea, pasando un color, un grosor, un punto XY inicial y un
    //punto XY final.
  LIENZO.beginPath();
  LIENZO.strokeStyle = color;
  LIENZO.lineWidth = grosor;
  LIENZO.moveTo(x_ini,y_ini);
  LIENZO.lineTo(x_fin,y_fin);
  LIENZO.stroke();
  LIENZO.closePath();
}

//Obtener el tamaño de la pantalla desde el DIVCONTENEDOR.
//El DIVCONTENEDOR utiliza el 80% de la pantalla en alto y ancho.
//Los datos se pasan a la funcion cambioDeTamano para redimensionar.
var heightinicial = parseInt(DIVCONTENEDOR.clientHeight);
var widthinicial = parseInt(DIVCONTENEDOR.clientWidth);
cambioDeTamano(widthinicial, heightinicial);
//Fin de la redimension


function cambiarGrosorBorrador () {
  //Cambia el grosor del borrador por el tamaño introducido en el input "valortamanoborrador".
  grosorlapiz = TAMANONUEVOBORRADOR.value;
  colorlapiz = "#3f7238";
}

function reiniciarLapiz () {
  //Coloca el color a blanco y el grosor a 3.
  colorlapiz = "white";
  grosorlapiz = 3;
}

function borrarTrazos () {
  //Coloca el color igual al de la pizarra y el grosor a 20.
  colorlapiz = "#3f7238";
  grosorlapiz = 20;
}

function cambiarGrosorLapiz () {
  //Cambia el grosor del lapiz por el tamaño introducido en el input "valortamanolapiz".
  grosorlapiz = TAMANONUEVOLAPIZ.value;
}

function cambiarColor (evento) {
  //Cambia el color al elegido en el input "colorpicker"
  colorlapiz = CAMBIADORCOLOR.value;
}

function cambioDeTamano (width, height) {
  //Redimensionar dinámicamente "pizarrita" al tamaño de pantalla.
  PIZARRITA.width = width;
  PIZARRITA.height = height;
}

function limpiarPizarra () {
  //Limpiar la pizarra en base a su alto y anchos, ya dinámicos
  LIENZO.clearRect(0, 0, PIZARRITA.width, PIZARRITA.height);
}

function mouseAbajo (evento) {
  //Crea los márgenes con base al offset Top y offsetLeft.
  //Inicia el trazo.
  //Da el primer punto para el trazo, en "xini" y "yini", restando los márgenes.
  //Cambia el disparador a "1", obteniendo el dato desde "buttons" que cambia su
    //valor al pulsar el botón del mouse.
  margintop = evento.target.offsetTop;
  marginleft = evento.target.offsetLeft;
  xini = evento.layerX-marginleft;
  yini = evento.layerY-margintop;
  disparador = evento.buttons;
}
function mouseArriba (evento) {
  //Detiene el trazo.
  //Devuelve el disparador a "0", obteniendo el dato desde "buttons" que cambia
    //su valor al levantar el botón del mouse.
  disparador = evento.buttons;
}
function dibujarMouse (evento) {
  //Dibuja el trazo al mover el mouse. Se llama desde el Listener "mousemove".
  //Solo se ejecuta cuando el disparador está en "1", iniciado en "mouseAbajo".
  //Para obtener hacia donde va el trazo, se obtiene el punto en donde se encuentra
    //actualmente el mouse, y se lleva desde el punto inicial dado por "mouseAbajo".
    //Al terminar de dibujar la línea, se reinicia el punto inicial,
    //transformándolo en el punto final, que será el inicio de la siguiente línea.
  if ( disparador == 1) {
    var xfin = evento.layerX-marginleft;
    var yfin = evento.layerY-margintop;
    dibujarLinea(colorlapiz, grosorlapiz, xini, yini, xfin, yfin);
    xini = xfin;
    yini = yfin;
  }
}

function ejecutarEscritura () {
  PIZARRITA.addEventListener("mousedown", mouseAbajo); //Cuando el botón principal del mouse se presiona.
  PIZARRITA.addEventListener("mousemove", dibujarMouse); //Cuando se mueve el mouse.
  PIZARRITA.addEventListener("mouseup", mouseArriba); //Cuando se levanta el botón principal del mouse.

}

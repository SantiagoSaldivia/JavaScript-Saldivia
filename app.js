alert("VO QUIEN SO?")
const Nombre = "Santiago"
const Apellido = "Saldivia"

let usuario = prompt("Ingrese su nombre");
let apellido = prompt("Ingrese su apellido");

if (usuario === Nombre && apellido === Apellido) {
    alert("Bienvenido" + Nombre + apellido)

    let nota = prompt("Ingrese su nota");

    if (nota) {
        alert(Nombre + "Esta aprobado");
    } else {
        alert(Nombre + "Tenes que estudiar el doble");
    }

} else {
    alert("No sos vos")
}


//Funciones
function calificacion (nota){
    if (nota >= 6) {
        return true;
    } else {
        return false;
    }
}

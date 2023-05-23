let cuentas = [
    { nombre: "Mali", contraseña: "mali123", saldo: 200 },
    { nombre: "Gera", contraseña: "gera123", saldo: 290 },
    { nombre: "Maui", contraseña: "maui123", saldo: 67 }
]

// Obtener los datos de las cuentas almacenados en el localStorage
cuentas = JSON.parse(localStorage.getItem("cuentas")) || cuentas

let btnIniciar = document.getElementById("btnIniciar")
let btnConsultar = document.getElementById("btnConsultar")
let loginContainer = document.getElementById("loginDiv")
let cajeroContainer = document.getElementById("cajero-in-Div")
let saldoContainer = document.getElementById("saldo-container")

let usuarioActual = null

btnIniciar.addEventListener("click", function () {
    let nombre = document.getElementById("nombre").value
    let contraseña = document.getElementById("contraseña").value
    let usuarioValido = false

    for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].nombre === nombre && cuentas[i].contraseña === contraseña) {
            usuarioValido = true
            usuarioActual = cuentas[i]
            break
        }
    }

    if (usuarioValido) {
        loginContainer.style.display = "none"
        cajeroContainer.style.display = "block"
    } else {
        alert("Usuario inexistente")
    }
})

// Actualizar el saldo y guardar los cambios en el localStorage
function actualizarSaldo() {
    if (usuarioActual) {
        localStorage.setItem("cuentas", JSON.stringify(cuentas))
        saldoContainer.innerText = "Saldo: $" + usuarioActual.saldo
    }
}

btnConsultar.addEventListener("click", function () {
    saldoContainer.innerText = "Saldo: $" + usuarioActual.saldo
    saldoContainer.style.display = "block"
});

let btnCerrarSesion = document.getElementById("btnCerrarSesion")

btnCerrarSesion.addEventListener("click", function () {
    loginContainer.style.display = "block"
    cajeroContainer.style.display = "none"
    saldoContainer.style.display = "none"
    document.getElementById("nombre").value = ""
    document.getElementById("contraseña").value = ""
    usuarioActual = undefined
});

let btnMonto = document.getElementById("btnMonto")
let montoInput = document.getElementById("montoInput")
let btnRetiro = document.getElementById("btnRetiro")

btnMonto.addEventListener("click", function () { //Añadir monto
    if (montoInput.style.display === "none") {
        montoInput.style.display = "inline-block"
    } else {
        let monto = parseInt(montoInput.value)
        if (!isNaN(monto)) {
            if (monto >= 10 && monto <= 990) {
                if (usuarioActual) {
                    let saldoResultante = usuarioActual.saldo + monto
                    if (saldoResultante <= 990) {
                        usuarioActual.saldo = saldoResultante
                    } else {
                        alert("El monto ingresado supera el límite permitido")
                    }
                    actualizarSaldo();
                    montoInput.value = ""
                } else {
                    alert("Debes iniciar sesión primero")
                }
            } else {
                alert("El monto no puede ser agregado")
            }
        } else {
            alert("Ingrese un monto válido")
        }
        montoInput.style.display = "none"
    }
})
btnRetiro.addEventListener("click", function () { //retirar
    if (usuarioActual) {
        let monto = parseInt(prompt("Ingrese el monto a retirar:"))
        if (!isNaN(monto)) {
            if (monto <= usuarioActual.saldo) {
                usuarioActual.saldo -= monto
                if (usuarioActual.saldo < 10) {
                    alert("Su saldo no puede ser menor que $10")
                }
                else {
                    actualizarSaldo()
                }
            } else {
                alert("Saldo insuficiente")
            }
        } else {
            alert("Ingrese un monto válido")
        }
    } else {
        alert("Debes iniciar sesión primero")
    }
})

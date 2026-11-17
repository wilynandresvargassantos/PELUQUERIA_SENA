document.addEventListener("DOMContentLoaded", () => {
    const tokenGuardado = localStorage.getItem("tokenSena");
    const usuarioGuardado = localStorage.getItem("usuarioSena");

    if (!tokenGuardado || !usuarioGuardado) return;

    const datosUsuario = JSON.parse(usuarioGuardado);

    document.getElementById("perfilNombre").textContent = datosUsuario.nombre || "Cliente";
    document.getElementById("perfilCorreo").textContent = datosUsuario.correo || "Sin correo";

    if (datosUsuario.numeroDocumento) {
        document.getElementById("inputDocumento").value = datosUsuario.numeroDocumento;
    }

    const btnDesactivar = document.getElementById("btnDesactivarCuenta");
    const mensajePerfil = document.getElementById("mensajePerfil");

    btnDesactivar.addEventListener("click", async () => {
        const doc = document.getElementById("inputDocumento").value.trim();

        if (!doc) {
            mensajePerfil.className = "mensaje-alerta mensaje-error";
            mensajePerfil.textContent = "Por favor ingresa tu número de documento para confirmar.";
            return;
        }

        const confirmar = confirm("¿Estás seguro de que deseas desactivar tu cuenta? Se cerrará tu sesión inmediatamente.");
        if (!confirmar) return;

        try {
            const respuesta = await fetch(`http://localhost:5020/desactivar-cuenta/${encodeURIComponent(doc)}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenGuardado}`
                }
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                alert(datos.mensaje || "Cuenta desactivada correctamente.");
                localStorage.removeItem("tokenSena");
                localStorage.removeItem("usuarioSena");
                window.location.replace("login.html");
            } else {
                mensajePerfil.className = "mensaje-alerta mensaje-error";
                mensajePerfil.textContent = datos.error || "No se pudo desactivar la cuenta.";
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            mensajePerfil.className = "mensaje-alerta mensaje-error";
            mensajePerfil.textContent = "Error al conectar con el servidor (puerto 5020).";
        }
    });
});
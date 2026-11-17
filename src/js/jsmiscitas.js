document.addEventListener("DOMContentLoaded", () => {
    const tokenGuardado = localStorage.getItem("tokenSena");
    if (!tokenGuardado) return;

    const tablaBody = document.getElementById("tablaHorariosBody");
    const totalHorarios = document.getElementById("totalHorarios");
    const selectNuevoHorario = document.getElementById("selectNuevoHorario");

    // RF-06: Consultar horarios disponibles
    async function cargarHorarios(idTrabajador = "") {
        try {
            let url = "http://localhost:5020/horarios-disponibles";
            if (idTrabajador) {
                url += `?idTrabajador=${encodeURIComponent(idTrabajador)}`;
            }

            const respuesta = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenGuardado}`
                }
            });

            const resJson = await respuesta.json();

            if (!respuesta.ok) {
                tablaBody.innerHTML = `<tr><td colspan="7" class="mensaje-error">${resJson.error || "Error al consultar horarios."}</td></tr>`;
                return;
            }

            const lista = resJson.datos || [];
            totalHorarios.textContent = `Total disponibles: ${lista.length}`;
            selectNuevoHorario.innerHTML = `<option value="">-- Selecciona un horario --</option>`;

            if (lista.length === 0) {
                tablaBody.innerHTML = `<tr><td colspan="7">${resJson.mensaje || "No hay horarios disponibles."}</td></tr>`;
                return;
            }

            tablaBody.innerHTML = "";
            lista.forEach((h) => {
                const fechaFormateada = h.fecha ? String(h.fecha).split("T")[0] : "";

                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td><strong>#${h.idHorario}</strong></td>
                    <td>${h.nombreTrabajador} (ID: ${h.idtrabajador})</td>
                    <td>${h.rol}</td>
                    <td>${fechaFormateada}</td>
                    <td>${h.horaInicio}</td>
                    <td>${h.horaFinal}</td>
                    <td><span class="badge-activo">${h.estadoHorario}</span></td>
                `;
                tablaBody.appendChild(tr);

                const option = document.createElement("option");
                option.value = h.idHorario;
                option.textContent = `#${h.idHorario} - ${h.nombreTrabajador} (${fechaFormateada} | ${h.horaInicio} - ${h.horaFinal})`;
                selectNuevoHorario.appendChild(option);
            });
        } catch (error) {
            console.error("Error de red:", error);
            tablaBody.innerHTML = `<tr><td colspan="7" class="mensaje-error">No se pudo conectar con el servidor (puerto 5020).</td></tr>`;
        }
    }

    cargarHorarios();

    document.getElementById("btnFiltrarHorarios").addEventListener("click", () => {
        const idTrab = document.getElementById("filtroTrabajador").value.trim();
        cargarHorarios(idTrab);
    });

    document.getElementById("btnTodosHorarios").addEventListener("click", () => {
        document.getElementById("filtroTrabajador").value = "";
        cargarHorarios();
    });

    // RF-15: Reprogramar Cita
    const btnReprogramar = document.getElementById("btnReprogramarCita");
    const mensajeReprogramar = document.getElementById("mensajeReprogramar");

    btnReprogramar.addEventListener("click", async () => {
        const idCita = document.getElementById("idCitaReprogramar").value.trim();
        const nuevoIdHorario = selectNuevoHorario.value;

        if (!idCita || !nuevoIdHorario) {
            mensajeReprogramar.className = "mensaje-alerta mensaje-error";
            mensajeReprogramar.textContent = "Ingresa el ID de tu cita y selecciona un nuevo horario.";
            return;
        }

        try {
            const respuesta = await fetch(`http://localhost:5020/reprogramar-cita/${encodeURIComponent(idCita)}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenGuardado}`
                },
                body: JSON.stringify({ nuevoIdHorario: Number(nuevoIdHorario) })
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                mensajeReprogramar.className = "mensaje-alerta mensaje-exito";
                mensajeReprogramar.textContent = datos.mensaje || "Cita reprogramada exitosamente.";
                cargarHorarios();
            } else {
                mensajeReprogramar.className = "mensaje-alerta mensaje-error";
                mensajeReprogramar.textContent = datos.error || "No se pudo reprogramar la cita.";
            }
        } catch (error) {
            console.error("Error de red:", error);
            mensajeReprogramar.className = "mensaje-alerta mensaje-error";
            mensajeReprogramar.textContent = "Error al conectar con el servidor.";
        }
    });

    // RF-15: Cancelar Cita
    const btnCancelar = document.getElementById("btnCancelarCita");
    const mensajeCancelar = document.getElementById("mensajeCancelar");

    btnCancelar.addEventListener("click", async () => {
        const idCita = document.getElementById("idCitaCancelar").value.trim();

        if (!idCita) {
            mensajeCancelar.className = "mensaje-alerta mensaje-error";
            mensajeCancelar.textContent = "Ingresa el ID de la cita que deseas cancelar.";
            return;
        }

        const confirmar = confirm(`¿Confirmas que deseas cancelar la cita #${idCita}?`);
        if (!confirmar) return;

        try {
            const respuesta = await fetch(`http://localhost:5020/cancelar-cita/${encodeURIComponent(idCita)}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenGuardado}`
                }
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                mensajeCancelar.className = "mensaje-alerta mensaje-exito";
                mensajeCancelar.textContent = datos.mensaje || "Cita cancelada exitosamente.";
                cargarHorarios();
            } else {
                mensajeCancelar.className = "mensaje-alerta mensaje-error";
                mensajeCancelar.textContent = datos.error || "No se pudo cancelar la cita.";
            }
        } catch (error) {
            console.error("Error de red:", error);
            mensajeCancelar.className = "mensaje-alerta mensaje-error";
            mensajeCancelar.textContent = "Error al conectar con el servidor.";
        }
    });
});
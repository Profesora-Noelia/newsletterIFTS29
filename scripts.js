/**
 * scripts.js
 * Lógica de interactividad y carga dinámica de contenidos para Código Abierto
 */

// 1. FUNCIÓN PARA CARGAR FRAGMENTOS DE TEXTO (PARTIALS)
function cargarTexto(idContenedor, rutaArchivo) {
    fetch(rutaArchivo)
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error(`No se pudo cargar: ${respuesta.status}`);
            }
            return respuesta.text();
        })
        .then(datos => {
            const contenedor = document.getElementById(idContenedor);
            if (contenedor) {
                contenedor.innerHTML = datos;
            }
        })
        .catch(error => {
            console.error(`Error al cargar el archivo ${rutaArchivo}:`, error);
            const contenedor = document.getElementById(idContenedor);
            if (contenedor) {
                contenedor.innerHTML = `<p style="color: #1D6D86; padding: 10px; background-color: #E8EEF2; border-left: 4px solid #153A4C;">[Área de desarrollo] El texto se cargará aquí cuando el archivo <strong>${rutaArchivo}</strong> sea creado.</p>`;
            }
        });
}

// 2. INICIALIZAR LA CARGA DE TEXTOS AL ABRIR LA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    // Busca los archivos HTML en la carpeta "textos" y los inyecta en su ID correspondiente
    cargarTexto('texto-congreso', 'textos/congreso.html');
    cargarTexto('texto-pp4', 'textos/pp4.html');
    cargarTexto('texto-metodologias', 'textos/metodologias.html');
    cargarTexto('texto-familiarizacion', 'textos/familiarizacion.html');
    cargarTexto('texto-loqueviene', 'textos/loqueviene.html');
});

// 3. FUNCIÓN PARA NAVEGAR POR LAS PESTAÑAS (TABS) DE METODOLOGÍAS ACTIVAS
function openTab(evt, tabName) {
    // Ocultar todo el contenido de las pestañas
    let tabcontent = document.getElementsByClassName("tab-pane");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // Remover la clase "active" de todos los botones
    let tablinks = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Mostrar la pestaña actual y añadir la clase "active" al botón presionado
    let targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.style.display = "block";
        targetTab.classList.add("active");
        evt.currentTarget.className += " active";
    }
}
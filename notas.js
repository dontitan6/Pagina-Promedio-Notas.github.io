function agregarNota() {
    const container = document.getElementById("notas-container");
    const div = document.createElement("div");
    div.classList.add("input-group");
    div.innerHTML = `
        <div class="ejemplo-item">
            <label>Nota</label>
            <input type="number" placeholder="Nota" class="nota" min="1" max="7">
        </div>
        <div class="ejemplo-item porcentaje-container">
            <label>%</label>
            <input type="number" placeholder="%" class="peso" min="1" max="100">
            <button class="basurero" onclick="eliminarNota(this)">🗑️</button>
        </div>
    `;
    container.appendChild(div);

    // Agregar event listeners a los nuevos inputs
    const inputs = div.querySelectorAll("input");
    inputs.forEach(input => {
        input.addEventListener("input", calcularPromedio);
    });
}

function eliminarNota(boton) {
    // Eliminar la línea completa (el contenedor .input-group)
    const linea = boton.closest(".input-group");
    linea.remove();

    // Recalcular el promedio después de eliminar la línea
    calcularPromedio();
}

function calcularPromedio() {
    const notas = document.querySelectorAll(".nota");
    const pesos = document.querySelectorAll(".peso");
    let suma = 0, totalPeso = 0;
    
    for (let i = 0; i < notas.length; i++) {
        const nota = parseFloat(notas[i].value) || 0;
        const peso = parseFloat(pesos[i].value) || 0;
        suma += nota * (peso / 100);
        totalPeso += peso;
    }
    
    const promedio = totalPeso > 0 ? (suma / (totalPeso / 100)).toFixed(2) : "--";
    document.getElementById("resultado").textContent = `Promedio Final: ${promedio}`;
}

// Función para crear inputs iniciales
function crearInputsIniciales() {
    for (let i = 0; i < 4; i++) {
        agregarNota();
    }
}

// Agregar event listeners a los inputs existentes al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    crearInputsIniciales(); // Crear 4 inputs al cargar la página
    const notasInputs = document.querySelectorAll(".nota");
    const pesosInputs = document.querySelectorAll(".peso");
    
    notasInputs.forEach(input => {
        input.addEventListener("input", calcularPromedio);
    });
    
    pesosInputs.forEach(input => {
        input.addEventListener("input", calcularPromedio);
    });
});
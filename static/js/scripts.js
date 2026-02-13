
document.getElementById('calculatorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calcular();
});

function copiarPrompt() {
    const promptText = document.getElementById('promptText');
    promptText.select();
    promptText.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(promptText.value).then(() => {
        const btn = document.getElementById('copyPromptBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '✅ ¡Copiado!';
        btn.style.background = '#28a745';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 2000);
    }).catch(err => {
        alert('Por favor, selecciona el texto manualmente y copia con Ctrl+C o Cmd+C');
    });
}

function calcular() {
    const peso = parseFloat(document.getElementById('peso').value);
    const alturaCm = parseFloat(document.getElementById('altura').value);
    const edad = parseInt(document.getElementById('edad').value);
    const sexo = document.querySelector('input[name="sexo"]:checked').value;
    const somatotipo = document.getElementById('somatotipo').value;
    const actividad = parseFloat(document.getElementById('actividad').value);
    const objetivo = document.getElementById('objetivo').value;

    const alturaM = alturaCm / 100;
    const imc = peso / (alturaM * alturaM);

    let categoriaIMC = '';
    let statusClass = '';
    let infoIMC = '';

    if (imc < 18.5) {
        categoriaIMC = 'Bajo peso';
        statusClass = 'status-warning';
        infoIMC = 'Tu IMC indica que estás por debajo del peso saludable. Considera consultar con un nutricionista para aumentar tu peso de forma saludable.';
    } else if (imc >= 18.5 && imc < 25) {
        categoriaIMC = 'Peso normal';
        statusClass = 'status-normal';
        infoIMC = '¡Excelente! Tu peso está dentro del rango saludable. Mantén tus hábitos saludables.';
    } else if (imc >= 25 && imc < 30) {
        categoriaIMC = 'Sobrepeso';
        statusClass = 'status-warning';
        infoIMC = 'Tu IMC indica sobrepeso. Considera aumentar tu actividad física y mejorar tu alimentación.';
    } else {
        categoriaIMC = 'Obesidad';
        statusClass = 'status-danger';
        infoIMC = 'Tu IMC indica obesidad. Te recomendamos consultar con un profesional de la salud para un plan personalizado.';
    }

    let tmb;
    if (sexo === 'hombre') {
        tmb = (10 * peso) + (6.25 * alturaCm) - (5 * edad) + 5;
    } else {
        tmb = (10 * peso) + (6.25 * alturaCm) - (5 * edad) - 161;
    }

    let tdee = tmb * actividad;
    let caloriasAjustadas = tdee;
    let infoObjetivo = '';

    if (objetivo === 'perder') {
        caloriasAjustadas = tdee * 0.85;
        infoObjetivo = '🎯 Objetivo: Bajar de peso. Déficit calórico del 15% para pérdida de grasa saludable.';
    } else if (objetivo === 'ganar') {
        caloriasAjustadas = tdee * 1.15;
        infoObjetivo = '🎯 Objetivo: Ganar masa muscular. Superávit calórico del 15% para construir músculo.';
    } else {
        caloriasAjustadas = tdee;
        infoObjetivo = '🎯 Objetivo: Mantener peso. Calorías de mantenimiento para marcar y tonificar.';
    }

    let infoSomatotipo = '';
    if (somatotipo === 'ectomorfo' && objetivo === 'ganar') {
        caloriasAjustadas = caloriasAjustadas * 1.05;
        infoSomatotipo = ' Como ectomorfo necesitas calorías extra para ganar músculo.';
    } else if (somatotipo === 'endomorfo' && objetivo === 'perder') {
        caloriasAjustadas = caloriasAjustadas * 0.95;
        infoSomatotipo = ' Como endomorfo tu déficit es un poco mayor para perder grasa eficientemente.';
    }

    let proteinaPorKg;
    if (objetivo === 'ganar') {
        proteinaPorKg = 2.2;
    } else if (objetivo === 'perder') {
        proteinaPorKg = 2.0;
    } else {
        proteinaPorKg = 1.8;
    }

    const proteinasGramos = peso * proteinaPorKg;
    const caloriasProteina = proteinasGramos * 4;

    let porcentajeGrasas;
    if (somatotipo === 'ectomorfo') {
        porcentajeGrasas = 0.25;
    } else if (somatotipo === 'mesomorfo') {
        porcentajeGrasas = 0.30;
    } else {
        porcentajeGrasas = 0.35;
    }

    const grasasGramos = (caloriasAjustadas * porcentajeGrasas) / 9;
    const caloriasGrasas = grasasGramos * 9;

    const caloriasRestantes = caloriasAjustadas - caloriasProteina - caloriasGrasas;
    const carbohidratosGramos = caloriasRestantes / 4;

    let infoMacros = '';
    if (objetivo === 'ganar') {
        if (somatotipo === 'ectomorfo') {
            infoMacros = '💪 Volumen para ectomorfo: Alto en proteínas y carbohidratos para maximizar ganancia muscular.';
        } else if (somatotipo === 'mesomorfo') {
            infoMacros = '💪 Volumen para mesomorfo: Balance óptimo para ganar músculo limpio.';
        } else {
            infoMacros = '💪 Volumen para endomorfo: Superávit controlado, carbos moderados para ganar músculo con mínima grasa.';
        }
    } else if (objetivo === 'perder') {
        if (somatotipo === 'ectomorfo') {
            infoMacros = '🔥 Definición para ectomorfo: Déficit suave manteniendo carbohidratos moderados.';
        } else if (somatotipo === 'mesomorfo') {
            infoMacros = '🔥 Definición para mesomorfo: Déficit balanceado para revelar músculo.';
        } else {
            infoMacros = '🔥 Definición para endomorfo: Carbohidratos bajos, proteína y grasas altas para quemar grasa.';
        }
    } else {
        if (somatotipo === 'ectomorfo') {
            infoMacros = '⚖️ Mantenimiento para ectomorfo: Carbos suficientes para energía y marcar.';
        } else if (somatotipo === 'mesomorfo') {
            infoMacros = '⚖️ Mantenimiento para mesomorfo: Balance perfecto para mantener definición.';
        } else {
            infoMacros = '⚖️ Mantenimiento para endomorfo: Carbos controlados para marcar sin ganar grasa.';
        }
    }

    document.getElementById('imcValue').textContent = imc.toFixed(1);
    document.getElementById('imcStatus').innerHTML = `<span class="result-status ${statusClass}">${categoriaIMC}</span>`;
    document.getElementById('imcInfo').textContent = infoIMC;

    document.getElementById('caloriasValue').textContent = Math.round(caloriasAjustadas) + ' kcal';
    document.getElementById('caloriasInfo').textContent = infoObjetivo + infoSomatotipo;

    document.getElementById('proteinasValue').textContent = Math.round(proteinasGramos);
    document.getElementById('carbohidratosValue').textContent = Math.round(carbohidratosGramos);
    document.getElementById('grasasValue').textContent = Math.round(grasasGramos);
    document.getElementById('macrosInfo').textContent = infoMacros;

    const promptIA = generarPromptIA(
        peso, alturaCm, edad, sexo, somatotipo, objetivo,
        Math.round(caloriasAjustadas),
        Math.round(proteinasGramos),
        Math.round(carbohidratosGramos),
        Math.round(grasasGramos),
        imc.toFixed(1),
        categoriaIMC
    );
    document.getElementById('promptText').value = promptIA;

    document.getElementById('results').classList.add('show');
    document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function generarPromptIA(peso, altura, edad, sexo, somatotipo, objetivo, calorias, proteinas, carbohidratos, grasas, imc, categoriaIMC) {
    const sexoTexto = sexo === 'hombre' ? 'Masculino' : 'Femenino';

    let objetivoTexto = '';
    let enfoque = '';

    if (objetivo === 'perder') {
        objetivoTexto = 'BAJAR DE PESO Y QUEMAR GRASA';
        enfoque = 'Mi prioridad es perder grasa corporal manteniendo la masa muscular, con un déficit calórico controlado.';
    } else if (objetivo === 'ganar') {
        objetivoTexto = 'GANAR MASA MUSCULAR (VOLUMEN)';
        enfoque = 'Mi prioridad es aumentar mi masa muscular con un superávit calórico, minimizando la ganancia de grasa.';
    } else {
        objetivoTexto = 'MANTENER PESO Y MARCAR/TONIFICAR';
        enfoque = 'Mi prioridad es mantener mi peso actual mientras mejoro mi composición corporal, marcando y tonificando.';
    }

    const somatotipoTexto = somatotipo.charAt(0).toUpperCase() + somatotipo.slice(1);

    return `Necesito que me crees un PLAN COMPLETO Y DETALLADO que incluya:

═══════════════════════════════════════════════════
📊 MIS DATOS PERSONALES
═══════════════════════════════════════════════════
• Sexo: ${sexoTexto}
• Edad: ${edad} años
• Peso actual: ${peso} kg
• Altura: ${altura} cm
• IMC: ${imc} (${categoriaIMC})
• Somatotipo: ${somatotipoTexto}

═══════════════════════════════════════════════════
🎯 MI OBJETIVO PRINCIPAL
═══════════════════════════════════════════════════
${objetivoTexto}

${enfoque}

═══════════════════════════════════════════════════
🍽️ MIS REQUERIMIENTOS NUTRICIONALES DIARIOS
═══════════════════════════════════════════════════
• Calorías totales: ${calorias} kcal/día
• Proteínas: ${proteinas}g/día
• Carbohidratos: ${carbohidratos}g/día
• Grasas: ${grasas}g/día

═══════════════════════════════════════════════════
📋 LO QUE NECESITO QUE ME PROPORCIONES
═══════════════════════════════════════════════════

1. PLAN NUTRICIONAL SEMANAL (7 días):
• Desayuno, almuerzo, cena y 2 snacks para cada día
• Cantidades específicas en gramos
• Calorías y macros de cada comida
• Recetas simples y prácticas
• Opciones de preparación anticipada (meal prep)
• Alternativas para cada comida

2. RUTINA DE ENTRENAMIENTO SEMANAL:
• Plan específico para ${somatotipoTexto}s con objetivo de ${objetivoTexto.toLowerCase()}
• Distribución semanal (5-6 días recomendados)
• Ejercicios específicos con series y repeticiones
• Tiempos de descanso entre series
• Progresión semanal
• Ejercicios con peso libre, máquinas y/o peso corporal
• Calentamiento y enfriamiento
• Consideraciones para evitar lesiones

3. SUPLEMENTACIÓN RECOMENDADA:
• Suplementos básicos para mi objetivo
• Dosis y momento de consumo
• Prioridad (esenciales vs opcionales)

4. TIPS Y CONSIDERACIONES:
• Hidratación
• Horas de sueño recomendadas
• Manejo del hambre/ansiedad (si aplica)
• Señales de progreso a monitorear
• Cuándo ajustar el plan

═══════════════════════════════════════════════════
⚠️ IMPORTANTE
═══════════════════════════════════════════════════
• Hazlo MUY detallado y específico
• Usa alimentos comunes y accesibles
• Incluye los gramos exactos de cada alimento
• El plan debe ser REALISTA y SOSTENIBLE a largo plazo
• Adapta las porciones a mis macros exactos

Por favor, créame un plan profesional, detallado y fácil de seguir. ¡Gracias!`;
}


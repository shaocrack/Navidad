// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado correctamente');
    
    // Elementos del DOM
    const card = document.getElementById('card');
    const cardFront = document.getElementById('cardFront');
    const cardBack = document.getElementById('cardBack');
    const snowSound = document.getElementById('snowSound');
    
    // Verificar que todos los elementos necesarios existan
    if (!card || !cardFront || !cardBack || !snowSound) {
        console.error('Error: No se encontraron todos los elementos necesarios');
        if (!card) console.error('No se encontró el elemento con id "card"');
        if (!cardFront) console.error('No se encontró el elemento con id "cardFront"');
        if (!cardBack) console.error('No se encontró el elemento con id "cardBack"');
        if (!snowSound) console.error('No se encontró el elemento con id "snowSound"');
        return;
    }
    
    // Bandera para controlar si ya se ha hecho clic
    let hasClicked = false;
    
    // Función para crear copos de nieve
    function createSnowflakes() {
        const snowflakesContainer = document.querySelector('.snowflakes');
        if (!snowflakesContainer) {
            console.error('No se encontró el contenedor de copos de nieve');
            return;
        }
        
        // Limpiar copos existentes
        snowflakesContainer.innerHTML = '';
        
        const snowflakeCount = 50;
        
        for (let i = 0; i < snowflakeCount; i++) {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            
            // Tamaño aleatorio entre 5 y 15 píxeles
            const size = Math.random() * 10 + 5;
            snowflake.style.width = `${size}px`;
            snowflake.style.height = `${size}px`;
            
            // Posición aleatoria
            snowflake.style.left = `${Math.random() * 100}%`;
            snowflake.style.top = `-${size}px`;
            
            // Opacidad aleatoria
            snowflake.style.opacity = Math.random() * 0.7 + 0.3;
            
            // Duración de la animación aleatoria entre 5 y 15 segundos
            const duration = Math.random() * 10 + 5;
            snowflake.style.animation = `fall ${duration}s linear forwards`;
            
            // Retraso aleatorio
            snowflake.style.animationDelay = `${Math.random() * 5}s`;
            
            snowflakesContainer.appendChild(snowflake);
        }
        
        console.log('Copos de nieve creados');
    }
    
    // Función para reproducir el sonido
    function playSnowSound() {
        try {
            console.log('Intentando reproducir sonido...');
            snowSound.volume = 0.5; // Volumen al 50%
            
            // Intentar reproducir
            const playPromise = snowSound.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Sonido reproducido correctamente');
                }).catch(error => {
                    console.error('Error al reproducir el sonido:', error);
                    // Intentar silenciar y reproducir
                    snowSound.muted = true;
                    snowSound.play().then(() => {
                        console.log('Sonido reproducido en modo silencioso');
                    }).catch(e => {
                        console.error('No se pudo reproducir el sonido:', e);
                    });
                });
            }
        } catch (error) {
            console.error('Error en playSnowSound:', error);
        }
    }
    
    // Función para mostrar texto con efecto de máquina de escribir
    function typeWriter(element, text, speed = 30, delay = 0) {
        return new Promise((resolve) => {
            setTimeout(() => {
                try {
                    if (!element) {
                        console.error('Elemento no encontrado para typeWriter');
                        resolve();
                        return;
                    }
                    
                    element.textContent = '';
                    element.style.display = 'block';
                    element.style.opacity = '1';
                    
                    let i = 0;
                    
                    function type() {
                        if (i < text.length) {
                            element.textContent += text.charAt(i);
                            i++;
                            setTimeout(type, speed);
                        } else {
                            resolve();
                        }
                    }
                    
                    type();
                } catch (error) {
                    console.error('Error en typeWriter:', error);
                    resolve();
                }
            }, delay);
        });
    }
    
    // Función para mostrar un mensaje con efecto de escritura
    async function showMessage(element, text, delay = 0) {
        try {
            await new Promise(resolve => setTimeout(resolve, delay));
            
            if (!element) {
                console.error('Elemento no encontrado para showMessage');
                return;
            }
            
            element.style.display = 'block';
            element.style.opacity = '0';
            element.style.transition = 'opacity 0.5s ease-in';
            
            // Forzar un reflow para asegurar que la transición se aplique
            void element.offsetHeight;
            
            await typeWriter(element, text);
            element.style.opacity = '1';
            
            console.log('Mensaje mostrado:', text.substring(0, 20) + '...');
        } catch (error) {
            console.error('Error en showMessage:', error);
        }
    }

    // Secuencia principal de animación
    async function startAnimation() {
        console.log('Iniciando animación...');
        
        // Obtener elementos de los mensajes
        const message1 = document.querySelector('.message');
        const message2 = document.querySelector('.message-2');
        const message3 = document.querySelector('.message-3');
        const signatureEl = document.querySelector('.signature');
        const nameEl = document.querySelector('.name');
        const finalMessageEl = document.querySelector('.final-message');
        
        // Verificar que todos los elementos existan
        if (!message1 || !message2 || !message3 || !signatureEl || !nameEl || !finalMessageEl) {
            console.error('Error: No se encontraron todos los elementos de mensajes');
            return;
        }
        
        try {
            console.log('Mostrando mensaje 1...');
            await showMessage(message1, 'En esta Navidad, el universo conspiró para que nuestros caminos se crucen...');
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            console.log('Mostrando mensaje 2...');
            await showMessage(message2, 'Tu sonrisa ilumina más que todas las luces navideñas juntas.');
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            console.log('Mostrando mensaje 3...');
            await showMessage(message3, 'Que esta Navidad esté llena de magia, alegría y momentos inolvidables.');
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            console.log('Mostrando firma...');
            // Mostrar firma con transición
            signatureEl.style.display = 'block';
            signatureEl.style.opacity = '0';
            signatureEl.style.transition = 'opacity 1s ease-in';
            // Forzar reflow
            void signatureEl.offsetHeight;
            signatureEl.style.opacity = '1';
            
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Mostrar nombre con transición
            console.log('Mostrando nombre...');
            nameEl.style.display = 'block';
            nameEl.style.opacity = '0';
            nameEl.style.transition = 'opacity 1s ease-in';
            // Forzar reflow
            void nameEl.offsetHeight;
            nameEl.style.opacity = '1';
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Mostrar mensaje final
            console.log('Mostrando mensaje final...');
            finalMessageEl.style.display = 'block';
            finalMessageEl.innerHTML = '&quot;La asociación de hombres fieles, tímidos y callados del Ecuador, &lt;br&gt;del cual soy presidente, te desea feliz Navidad :D&quot;';
            finalMessageEl.style.opacity = '0';
            finalMessageEl.style.transition = 'opacity 1.5s ease-in';
            // Forzar reflow
            void finalMessageEl.offsetHeight;
            finalMessageEl.style.opacity = '1';
            
            // Agregar efecto de brillo al mensaje final
            addSparkles(finalMessageEl);
            
            console.log('Animación completada');
            
        } catch (error) {
            console.error('Error en la animación:', error);
            
            // Asegurarse de que los mensajes se muestren incluso si hay un error
            const showElement = (el) => {
                if (el) {
                    el.style.display = 'block';
                    el.style.opacity = '1';
                }
            };
            
            showElement(message1);
            showElement(message2);
            showElement(message3);
            showElement(signatureEl);
            showElement(nameEl);
            
            if (finalMessageEl) {
                finalMessageEl.style.display = 'block';
                finalMessageEl.innerHTML = '&quot;La asociación de hombres fieles, tímidos y callados del Ecuador, &lt;br&gt;del cual soy presidente, te desea feliz Navidad :D&quot;';
                finalMessageEl.style.opacity = '1';
            }
        }
    }
    
    // Función para agregar efecto de brillo a un elemento
    function addSparkles(element) {
        if (!element) {
            console.error('No se puede agregar brillo: elemento no encontrado');
            return;
        }
        
        // Crear contenedor de brillos
        const sparkles = document.createElement('div');
        sparkles.className = 'sparkles';
        
        // Asegurarse de que el elemento tenga posición relativa
        if (window.getComputedStyle(element).position === 'static') {
            element.style.position = 'relative';
        }
        
        // Agregar brillos al elemento
        element.appendChild(sparkles);
        
        // Crear partículas de brillo
        const sparkleCount = 15;
        
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('span');
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.animationDelay = `${Math.random() * 2}s`;
            sparkle.style.width = `${Math.random() * 10 + 5}px`;
            sparkle.style.height = sparkle.style.width;
            sparkle.style.opacity = Math.random() * 0.7 + 0.3;
            
            sparkles.appendChild(sparkle);
        }
        
        console.log('Efecto de brillo agregado');
    }
    
    // Función para manejar la interacción del usuario
    function handleInteraction(e) {
        try {
            e.stopPropagation();
            
            // Evitar múltiples clics
            if (hasClicked) {
                console.log('Ya se hizo clic, ignorando...');
                return;
            }
            
            console.log('Interacción detectada');
            hasClicked = true;
            
            // Voltear la tarjeta
            console.log('Volteando tarjeta...');
            card.classList.add('flipped');
            
            // Iniciar la animación de nieve
            console.log('Creando copos de nieve...');
            createSnowflakes();
            
            // Reproducir sonido
            console.log('Reproduciendo sonido...');
            playSnowSound();
            
            // Iniciar la animación del mensaje después de un retraso
            console.log('Programando inicio de animación...');
            setTimeout(() => {
                console.log('Iniciando animación de mensajes...');
                startAnimation().catch(error => {
                    console.error('Error en la animación:', error);
                });
            }, 1000);
            
            // Cambiar el cursor
            card.style.cursor = 'default';
            
        } catch (error) {
            console.error('Error en handleInteraction:', error);
        }
    }
    
    // Inicialización
    console.log('Inicializando eventos...');
    
    // Añadir eventos de interacción a la tarjeta frontal
    if (cardFront) {
        console.log('Añadiendo evento click a cardFront');
        cardFront.addEventListener('click', handleInteraction);
        cardFront.style.cursor = 'pointer'; // Asegurar que el cursor cambie al pasar sobre la tarjeta
    } else {
        console.error('No se encontró el elemento cardFront');
    }
    
    // También permitir interacción con el área de la tarjeta trasera
    if (cardBack) {
        console.log('Añadiendo evento click a cardBack');
        cardBack.addEventListener('click', handleInteraction);
        cardBack.style.cursor = 'pointer'; // Asegurar que el cursor cambie al pasar sobre la tarjeta
    } else {
        console.error('No se encontró el elemento cardBack');
    }
    
    // Asegurar que el sonido pueda reproducirse con la primera interacción
    const enableAudio = function() {
        console.log('Habilitando audio...');
        if (snowSound && snowSound.paused) {
            // Configurar el volumen bajo para una mejor experiencia de usuario
            snowSound.volume = 0.3;
            
            // Intentar reproducir el sonido
            const playPromise = snowSound.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Audio habilitado correctamente');
                    // Pausar inmediatamente después de iniciar para permitir la reproducción posterior
                    snowSound.pause();
                    snowSound.currentTime = 0;
                }).catch(error => {
                    console.error('Error al habilitar audio:', error);
                });
            }
        }
    };
    
    // Intentar habilitar el audio con el primer clic en cualquier parte de la página
    console.log('Configurando manejador de eventos para habilitar audio');
    document.body.addEventListener('click', enableAudio, { once: true });
    
    // También intentar con el evento de toque para dispositivos táctiles
    document.body.addEventListener('touchstart', enableAudio, { once: true });
    
    console.log('Inicialización completada');
    
    // Add some hover effect for the card
    card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('flipped')) {
            card.style.transform = 'scale(1.02) rotateY(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('flipped')) {
            card.style.transform = 'scale(1)';
        }
    });
    
    // Add some confetti when the page loads
    function addConfetti() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        const container = document.querySelector('.card-front');
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            container.appendChild(confetti);
        }
    }
    
    // Initialize confetti
    addConfetti();
});

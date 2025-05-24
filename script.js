const lrcText = `[00:03.99]Del nervio me puse a temblar
[00:13.37]No me esperaba esto, es difícil de olvidar
[00:23.39]Y no me quejo de que me hables a las tres
[00:28.44]Yo encantado de poderte atender
[00:33.10]Amarrado en tus besos y en tu piel
[00:38.22]Encantado por todo ese poder
[00:44.09]Y ay, mi amor, por favor dime
[00:49.11]Cuál es la receta para hacerte el amor, que nunca olvides
[00:54.32]Que volver a vernos sea algo tentador, amor de cine
[00:59.40]Eres como el agua en un día de calor
[01:06.23]Ay, mi amor, ya no estés triste
[01:09.45]Yo te doy el tiempo que tú necesites, sean horas, cientas, miles
[01:17.10]A tu honor preparo mil desfiles, pero para ti no existe
[01:19.82]Contigo no hay canciones tristes
[01:22.62]Gasolina pa' mi motor
[01:25.05]Somos uno y somos dos
[01:31.62]Somos dos
[01:36.56]Somos dos
[01:40.80]Somos dos
[01:45.99]Somos
[01:50.15]Somos, somos dos
[01:55.58]Somos
[02:06.49]Y si fueras mía, te llenaría todo el día de sonrisas
[02:14.75]Hasta en mis sueños tu boca presumiría
[02:19.45]Quién diría, a dónde llegaría
[02:26.44]Y porque fueras mía, mi alma al diablo yo seguro vendería
[02:34.54]Diez mil kilómetros descalzo correría
[02:39.04]Todo daría, porque fueras mía
[02:46.98]Y ay, mi amor, por favor dime
[02:50.34]Cuál es la receta para hacerte el amor, que nunca olvides
[02:55.41]Que volver a vernos sea algo tentador, amor de cine
[03:00.57]Eres como el agua en un día de calor
[03:07.42]Ay, mi amor, ya no estés triste
[03:10.82]Yo te doy el tiempo que tú necesites, sean horas, cientas, miles
[03:16.14]A tu honor preparo mil desfiles, pero para ti no existe
[03:21.06]Contigo no hay canciones tristes
[03:23.87]Gasolina pa' mi motor
[03:26.19]Somos uno y somos dos
[03:28.58]Y ay, mi amor, por favor dime
[03:30.82]Cuál es la receta para hacerte el amor, que nunca olvides
[03:36.02]Que volver a vernos sea algo tentador, amor de cine
[03:40.98]Eres como el agua en un día de calor
[03:47.98]Ay, mi amor, ya no estés triste
[03:51.10]Yo te doy el tiempo que tú necesites, sean horas, cientas, miles
[03:56.60]A tu honor preparo mil desfiles, pero para ti no existe
[04:01.56]Contigo no hay canciones tristes
[04:03.93]Gasolina pa' mi motor
[04:06.56]Somos uno y somos dos`;

const player = document.getElementById('player');
const lyricsContainer = document.getElementById('lyrics');
const fileInput = document.getElementById('fileInput');
const playBtn = document.getElementById('playBtn');

// Array de imágenes de flores disponibles
const flowerImages = [
    'img/imgre3.png',
    'img/tulipan2.png',
    'img/imgre3.png',
    'img/rosa1.png',
    'img/imgre3.png',
    'img/rosa2.png',
    'img/imgre3.png',
    'img/flower1.png',
    'img/imgre3.png',
    'img/flower2.png'
];

// Parser de archivos LRC
const parseLRC = (text) => {
    return text.split('\n').map(line => {
        const match = line.match(/\[(\d{2}):(\d{2}\.\d{2})\](.*)/);
        if (match) {
            const time = parseInt(match[1]) * 60 + parseFloat(match[2]);
            return { time, text: match[3] };
        }
        return null;
    }).filter(Boolean);
};

const lyrics = parseLRC(lrcText);

// Crear elementos de letras
lyrics.forEach(line => {
    const p = document.createElement('p');
    p.className = 'lyrics-line';
    p.textContent = line.text;
    lyricsContainer.appendChild(p);
    line.element = p;
});

// Sincronización de letras
player.addEventListener('timeupdate', () => {
    const currentTime = player.currentTime;
    for (let i = 0; i < lyrics.length; i++) {
        const current = lyrics[i];
        const next = lyrics[i + 1];
        if (currentTime >= current.time && (!next || currentTime < next.time)) {
            lyrics.forEach(l => l.element.classList.remove('active'));
            current.element.classList.add('active');
            
            // Scroll automático
            current.element.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            break;
        }
    }
});

// Control de reproducción
playBtn.addEventListener('click', () => {
    if (player.paused) {
        player.play().then(() => {
            playBtn.textContent = '⏸';
        }).catch(error => {
            console.error("Error al reproducir:", error);
            alert("Error al reproducir el audio. Asegúrate de que el archivo existe en la carpeta music.");
        });
    } else {
        player.pause();
        playBtn.textContent = '▶';
    }
});

player.addEventListener('play', () => {
    playBtn.textContent = '⏸';
});

player.addEventListener('pause', () => {
    playBtn.textContent = '▶';
});

// Carga de archivos
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        player.src = URL.createObjectURL(file);
        player.load();
    }
});

// Click en letras para saltar
lyrics.forEach(line => {
    line.element.addEventListener('click', () => {
        player.currentTime = line.time;
        if (player.paused) {
            player.play();
            playBtn.textContent = '⏸';
        }
    });
});

// Animación de flores flotantes
function createFloatingFlower() {
    const flower = document.createElement('div');
    flower.className = 'floating-flower';
    
    const img = document.createElement('img');
    // Seleccionar una imagen aleatoria de la lista
    const randomFlower = flowerImages[Math.floor(Math.random() * flowerImages.length)];
    img.src = randomFlower;
    img.alt = 'Flor';
    
    // Si la imagen no se puede cargar, usar un emoji como fallback
    img.onerror = function() {
        const emojis = ['🌷', '🌹', '🌺', '🌸', '🌻', '🌼'];
        flower.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        flower.style.fontSize = '25px';
        flower.style.display = 'flex';
        flower.style.alignItems = 'center';
        flower.style.justifyContent = 'center';
    };
    
    flower.appendChild(img);
    
    // Posición y animación aleatoria
    flower.style.left = Math.random() * 100 + '%';
    flower.style.animationDuration = (Math.random() * 4 + 6) + 's';
    flower.style.animationDelay = Math.random() * 2 + 's';
    
    document.getElementById('floatingFlowers').appendChild(flower);
    
    // Remover la flor después de la animación
    setTimeout(() => {
        if (flower.parentNode) {
            flower.remove();
        }
    }, 10000);
}

// Animación de corazones flotantes (mantener los corazones originales)
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = '💖';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.opacity = Math.random() * 0.5 + 0.3;
    
    document.getElementById('floatingFlowers').appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 6000);
}

// Crear flores cada 3 segundos
setInterval(createFloatingFlower, 3000);

// Crear corazones cada 4 segundos
setInterval(createFloatingHeart, 4000);

// Crear algunas flores y corazones iniciales
for (let i = 0; i < 2; i++) {
    setTimeout(createFloatingFlower, i * 1500);
    setTimeout(createFloatingHeart, i * 2000 + 1000);
}

// Intentar reproducir automáticamente al cargar (con manejo de errores)
document.addEventListener('DOMContentLoaded', () => {
    player.load();
    // No intentamos reproducir automáticamente debido a políticas de autoplay
});
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Configuración de Laravel Echo con Pusher
window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: 'pusher',
    key: '204a26467256ad8cdeed',
    cluster: 'eu',
    forceTLS: true,
    // Puedes añadir más opciones si es necesario
});

console.log('Echo configurado:', echo);

export default echo;

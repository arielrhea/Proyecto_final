import Echo from 'laravel-echo';
window.Pusher = require('pusher-js');

const echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.REACT_APP_PUSHER_APP_KEY,
  cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
  encrypted: true,
});

export default echo;

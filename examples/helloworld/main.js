import * as Vue from '../../dist/index.es.js';

const { createApp, h } = Vue;

const app = h('div', { class: 'app' }, 'Hello World');

createApp(app).mount('#app');

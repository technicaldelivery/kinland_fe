import Vue from 'vue';
import checkView from 'vue-check-view';

Vue.use(checkView);

window.document.body.addEventListener('scroll', function (event) {
  window.dispatchEvent(new event.constructor(event.type, event))
  event.preventDefault()
  event.stopPropagation()
})
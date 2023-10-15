import { uid } from 'uid';
import { formEl, listEl } from './refs';

import { setToLocalStorage, getFromLocalStorage } from './api';
import { createMarkup } from './markup';


import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

formEl.addEventListener('submit', addTask);

function addTask(e) {
  e.preventDefault();

  const newTask = e.currentTarget.elements.message.value.trim();
  if (!newTask) {
    return;
  }
  console.log(newTask);
  e.currentTarget.reset();
    const dataItem = createDataObj(newTask);
    createAddMarkup([dataItem]);
  setToLocalStorage(dataItem);
}

function createDataObj(value) {
  return {
    id: uid(),
    value,
    checked: false,
  };
  
}


function onLoad() {
    const state = getFromLocalStorage();
    if (state.length === 0) return;
    createAddMarkup(state);
}

function createAddMarkup(state) {
    const markup = createMarkup(state);
    addMarkup(markup);
}

function addMarkup(markup) {
    listEl.insertAdjacentHTML('beforeend', markup);
}

window.addEventListener('load', onLoad);
// Editing variable
window.editing = false;

// Editing button element
const btnEdit = document.getElementById('btn-edit');
btnEdit.onclick = edit;
const btnSave = document.getElementById('btn-save');
btnSave.onclick = save;

const userInfo = {
  name: 'Jose Mu&#241;oz',
  position: 'iNversor Ingenioso',
};

// Immediately invoked function expression
(() => {
  let hash = window.location.hash;
  window.editing = hash.toLowerCase() === '#edit';
  toggleElements();
})();

// Edit function
function edit() {
  window.editing = true;
  window.location.hash = 'edit';
  toggleElements();
}

// Save function
function save() {
  window.editing = false;
  window.location.hash = undefined;
  toggleElements();
}

function toggleElements() {
  //  hide some elements with js
  //   const editElements = document.querySelectorAll('.vif-editing');
  //   editElements.forEach((e) => e.classList?.[window.editing ? 'remove' : 'add']('hidden'));
  rootCSS_set('--cond-editing', window.editing ? 'inherit' : 'none');
  //  show some elements with js
  //   const viewElements = document.querySelectorAll('.vif-not-editing');
  //   viewElements.forEach((e) => e.classList?.[window.editing ? 'add' : 'remove']('hidden'));
  rootCSS_set('--cond-not-editing', window.editing ? 'none' : 'inherit');
}

function rootCSS_el() {
  return document.querySelector(':root');
}

// Create a function for getting a variable value
function rootCSS_get(key) {
  const rs = getComputedStyle(rootCSS_el());
  return rs.getPropertyValue(key);
}

// Create a function for setting a variable value
function rootCSS_set(key, value) {
  let el = rootCSS_el();
  el.style.setProperty(key, value);
}

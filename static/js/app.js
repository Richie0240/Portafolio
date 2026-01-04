const SECRET_PASSWORD = 'creativo-ricardo';
const CLICK_THRESHOLD_MS = 1200;
const STORAGE_KEY = 'portfolioEdits';

const state = {
  clicks: 0,
  clickTimer: null,
  editMode: false,
  edits: {},
};

const nameTrigger = document.querySelector('.secret-trigger');
const editableNodes = Array.from(document.querySelectorAll('[data-edit-key]'));
const toolbar = document.getElementById('editToolbar');
const saveButton = document.getElementById('saveEdits');
const cancelButton = document.getElementById('cancelEdit');
const contactToggle = document.getElementById('contactToggle');
const contactCard = document.getElementById('contactCard');

function loadEdits() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return;

  try {
    state.edits = JSON.parse(stored);
    applyEdits();
  } catch (error) {
    console.error('No se pudieron cargar los cambios guardados', error);
  }
}

function applyEdits() {
  editableNodes.forEach((node) => {
    const key = node.dataset.editKey;
    if (key && state.edits[key]) {
      node.innerText = state.edits[key];
    }
  });
}

function setEditMode(enabled) {
  state.editMode = enabled;
  editableNodes.forEach((node) => {
    node.contentEditable = enabled;
    node.classList.toggle('editable-active', enabled);
  });
  toolbar.hidden = !enabled;
}

function resetClickCounter() {
  state.clicks = 0;
  clearTimeout(state.clickTimer);
}

function handleSecretClick() {
  state.clicks += 1;
  if (state.clicks === 1) {
    state.clickTimer = setTimeout(resetClickCounter, CLICK_THRESHOLD_MS);
  }

  if (state.clicks === 3) {
    resetClickCounter();
    const password = prompt('Ingresa la contraseña para activar el modo edición');
    if (password === SECRET_PASSWORD) {
      setEditMode(true);
    } else if (password) {
      alert('Contraseña incorrecta');
    }
  }
}

function saveEdits() {
  editableNodes.forEach((node) => {
    const key = node.dataset.editKey;
    if (key) {
      state.edits[key] = node.innerText.trim();
    }
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.edits));
  alert('Cambios guardados solo en este navegador.');
}

function exitEditMode() {
  setEditMode(false);
  applyEdits();
}

function toggleContactCard() {
  const shouldShow = contactCard.hasAttribute('hidden');
  contactCard.hidden = !shouldShow;
  contactToggle.innerText = shouldShow ? 'Ocultar contacto' : 'Contáctame';
}

function init() {
  loadEdits();

  if (nameTrigger) {
    nameTrigger.addEventListener('click', handleSecretClick);
  }

  if (saveButton) {
    saveButton.addEventListener('click', saveEdits);
  }

  if (cancelButton) {
    cancelButton.addEventListener('click', exitEditMode);
  }

  if (contactToggle && contactCard) {
    contactToggle.addEventListener('click', toggleContactCard);
  }
}

init();

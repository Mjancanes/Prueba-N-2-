  /*Java de cambio de modo claro/oscuro */
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('theme-toggle');

  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    btn.textContent = '☀️Cambiar el modo';
  }

  btn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    btn.textContent = isDark ? '☀️Modo Claro' : '🌙Modo Oscuro';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
});
  /*gdato almacena datos  */
 const gdato = [];

 /*Recibe la info del formulario */
 function datoGuardar(nombre,apellido,correo, listaTelefonos){
    gdato.push({nombre,apellido,correo, listaTelefonos});
    console.log(gdato);
  };
  
  /* validacion de correo*/
function esEmailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

  /* validacion de solo letras*/
function soloLetras(valor) {
  return /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]+$/.test(valor);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const phonesContainer = document.getElementById('phones');
  const addPhoneBtn = document.getElementById('add-phone');

  /*Validación al enviar y envio de formulario*/
  form.addEventListener('submit', e => {
    const errores = [];
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const telefonos = phonesContainer.querySelectorAll('input[type="tel"]');
    const listaTelefonos = Array.from(telefonos).map(tel => tel.value.trim());

    if (!soloLetras(nombre)) errores.push('⚠️ El nombre debe contener solo letras.');
    if (!soloLetras(apellido)) errores.push('⚠️ El apellido debe contener solo letras.');
    if (!esEmailValido(correo)) errores.push('⚠️ El formato del correo es incorrecto.');
    telefonos.forEach((tel, i) => {
      if (!tel.value.trim()) errores.push(`⚠️ El teléfono #${i + 1} está vacío.`);
    });

    /* Muestra errores si hay*/
    if (errores.length > 0) {
      e.preventDefault();
      mostrarErrores(errores);
    } else {
      alert('✅ Formulario válido. Enviando datos…');
      e.preventDefault();
    }
    datoGuardar(nombre, apellido, correo, listaTelefonos)
  });

  /* Mostrar mensajes*/
  function mostrarErrores(listaErrores) {
    const contenedor = document.getElementById('errores');
    contenedor.innerHTML = listaErrores.join('<br>');
    contenedor.style.color = 'red';
    contenedor.style.marginBottom = '10px';
  }

  /*Teléfonos dinámicos*/
  function updateRemoveButtons() {
    const removeBtns = phonesContainer.querySelectorAll('.remove-phone');
    removeBtns.forEach(btn => {
      btn.disabled = removeBtns.length === 1;
    });
  }

  addPhoneBtn.addEventListener('click', () => {
    const firstGroup = phonesContainer.querySelector('.phone-group');
    const clone = firstGroup.cloneNode(true);
    clone.querySelector('input').value = '';
    phonesContainer.appendChild(clone);
    updateRemoveButtons();
  });

  phonesContainer.addEventListener('click', e => {
    if (e.target.classList.contains('remove-phone')) {
      e.target.closest('.phone-group').remove();
      updateRemoveButtons();
    }
  });

  updateRemoveButtons();
});

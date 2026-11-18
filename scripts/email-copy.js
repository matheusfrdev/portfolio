(() => {
  const emailLink = document.querySelector('[data-copy-email]');
  const toast = document.getElementById('copy-toast');
  if (!emailLink || !toast) return;

  let hideTimer;
  const showToast = (message, failed = false) => {
    toast.textContent = message;
    toast.classList.toggle('is-error', failed);
    toast.classList.add('is-visible');
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2300);
  };

  const fallbackCopy = (value) => {
    const field = document.createElement('textarea');
    field.value = value;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    let copied = false;
    try { copied = document.execCommand('copy'); } catch (_) {}
    field.remove();
    return copied;
  };

  emailLink.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = emailLink.dataset.copyEmail;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
        showToast('E-mail copiado!');
      } else if (fallbackCopy(email)) {
        showToast('E-mail copiado!');
      } else {
        showToast('Não foi possível copiar. E-mail: ' + email, true);
      }
    } catch (_) {
      if (fallbackCopy(email)) showToast('E-mail copiado!');
      else showToast('Não foi possível copiar. E-mail: ' + email, true);
    }
  });
})();

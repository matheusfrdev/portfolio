// Cinco cliques no status em até três segundos.
// Só funciona quando ferias estiver como true.
(() => {
  const trigger = document.querySelector('button.routine-status');

  if (!trigger) return;

  const secret = document.createElement('dialog');

  secret.id = 'secret-dialog';
  secret.dataset.mode = 'vacation';
  secret.setAttribute('aria-labelledby', 'secret-title');
  secret.setAttribute('aria-describedby', 'secret-message');

  secret.innerHTML = `
    <div class="secret-scene" aria-hidden="true">
      <div class="secret-sun"></div>
      <span class="secret-palm palm-left">🌴</span>
      <span class="secret-palm palm-right">🌴</span>
      <div class="secret-wave"></div>
    </div>

    <div class="secret-content">
      <p class="secret-label">EASTER EGG DESBLOQUEADO</p>

      <h2 id="secret-title">Dev em modo férias 😎</h2>

      <p id="secret-message">
      Se você me viu fazendo alguma coisa, 
      foi sem querer. Tô de férias. 
      </p>

      <button type="button" class="secret-close" autofocus>
        Voltar à página
        <span aria-hidden="true">↗</span>
      </button>

    </div>
  `;

  document.body.append(secret);

  let clicks = 0;
  let resetTimer;
  let previousOverflow;

  function isOnVacation() {
    return (
      typeof ROUTINE_CONFIG !== 'undefined' &&
      ROUTINE_CONFIG.ferias === true
    );
  }

  function resetClicks() {
    clicks = 0;
    clearTimeout(resetTimer);
  }

  function openSecret() {
    if (!isOnVacation() || secret.open) return;

    previousOverflow = document.body.style.overflow;

    secret.showModal();
    document.body.style.overflow = 'hidden';
  }

  trigger.addEventListener('click', () => {
    if (!isOnVacation()) {
      resetClicks();
      return;
    }

    if (clicks === 0) {
      resetTimer = setTimeout(resetClicks, 3000);
    }

    clicks++;

    if (clicks === 5) {
      resetClicks();
      openSecret();
    }
  });

  secret.querySelector('.secret-close').addEventListener('click', () => {
    secret.close();
  });

  // Fecha ao clicar fora da janela.
  secret.addEventListener('click', event => {
    if (event.target !== secret) return;

    const rect = secret.getBoundingClientRect();

    const clickedOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (clickedOutside) secret.close();
  });

  // Esc fecha automaticamente o dialog.
  secret.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    trigger.focus({ preventScroll: true });
  });
})();

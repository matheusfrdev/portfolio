// Horários locais de Brasília. Edite os textos e horários para mudar a rotina.
// Use um texto em manualStatus para substituir temporariamente a programação.
const ROUTINE_CONFIG = {
  timeZone: 'America/Sao_Paulo',
  manualStatus: '',
  weekday: [
    { start: '00:00', text: 'Dormindo' },
    { start: '05:45', text: 'Começando o dia' },
    { start: '07:10', text: 'Na escola' },
    { start: '12:10', text: 'Almoçando e descansando' },
    { start: '13:30', text: 'Estudando' },
    { start: '14:30', text: 'Trabalhando nos projetos' },
    { start: '15:30', text: 'Me preparando para treinar' },
    { start: '16:00', text: 'Na academia' },
    { start: '18:00', text: 'Recarregando as energias' },
    { start: '19:30', text: 'Projetos ou tempo livre' },
    { start: '21:30', text: 'Relaxando' },
    { start: '22:30', text: 'Dormindo' }
  ],
  // Sem uma rotina de fim de semana definida, mostramos uma mensagem geral.
  weekend: [
    { start: '00:00', text: 'Tempo livre' }
  ]
};

function getRoutineStatus(date = new Date(), config = ROUTINE_CONFIG) {
  if (config.manualStatus.trim()) return config.manualStatus.trim();
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: config.timeZone, weekday: 'short', hour: '2-digit',
    minute: '2-digit', hourCycle: 'h23'
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
  const minutes = Number(values.hour) * 60 + Number(values.minute);
  const schedule = ['Sat', 'Sun'].includes(values.weekday) ? config.weekend : config.weekday;
  return schedule.reduce((status, item) => {
    const [hour, minute] = item.start.split(':').map(Number);
    return minutes >= hour * 60 + minute ? item.text : status;
  }, schedule[0].text);
}

function updateRoutineStatus() {
  const element = document.getElementById('routine-status');
  if (!element) return;
  const text = getRoutineStatus();
  if (element.textContent !== text) element.textContent = text;
}
updateRoutineStatus();
setInterval(updateRoutineStatus, 30000);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) updateRoutineStatus();
});

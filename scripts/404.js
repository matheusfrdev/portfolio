"use strict";

// Compartilha a preferencia de tema com a pagina inicial.
const botaoTema = document.getElementById("theme");
const corTema = document.querySelector('meta[name="theme-color"]');
function definirTema(claro) {
  document.body.classList.toggle("light", claro);
  botaoTema.setAttribute("aria-label", claro ? "Ativar tema escuro" : "Ativar tema claro");
  corTema.content = claro ? "#faf9fc" : "#121214";
}
let preferencia;
try { preferencia = localStorage.getItem("mf-theme"); } catch {}
definirTema(preferencia === "light");
botaoTema.addEventListener("click", () => {
  const claro = !document.body.classList.contains("light");
  definirTema(claro);
  try { localStorage.setItem("mf-theme", claro ? "light" : "dark"); } catch {}
});
document.getElementById("ano").textContent = new Date().getFullYear();

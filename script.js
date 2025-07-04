// Mensagem animada
const mensagem = "Prepare o chapéu e venha curtir o Arraiá!";
let i = 0;
function digitar() {
  const msgEl = document.getElementById("mensagem");
  if (i < mensagem.length) {
    msgEl.textContent += mensagem.charAt(i);
    i++;
    setTimeout(digitar, 50);
  }
}
digitar();

// Balões animados
const canvas = document.getElementById("baloesCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let baloes = [];
function criarBalao() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * 100,
    r: 15 + Math.random() * 10,
    cor: `hsl(${Math.random() * 360}, 80%, 60%)`,
    vel: 1 + Math.random() * 2
  };
}
for (let i = 0; i < 30; i++) baloes.push(criarBalao());

function animarBaloes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  baloes.forEach((b, i) => {
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = b.cor;
    ctx.fill();
    b.y -= b.vel;
    if (b.y + b.r < 0) baloes[i] = criarBalao();
  });
  requestAnimationFrame(animarBaloes);
}
animarBaloes();

// Fogueira animada
const fogueira = document.getElementById("fogueiraCanvas");
const ctxF = fogueira.getContext("2d");
fogueira.width = window.innerWidth;
fogueira.height = 200;

let particulas = [];
function criarParticula() {
  return {
    x: fogueira.width / 2 + (Math.random() * 100 - 50),
    y: fogueira.height,
    r: Math.random() * 4 + 2,
    cor: `rgba(255, ${Math.floor(Math.random() * 150 + 50)}, 0, 0.8)`,
    velY: Math.random() * 2 + 1,
    velX: Math.random() * 1 - 0.5,
    vida: 60
  };
}
function animarFogueira() {
  ctxF.clearRect(0, 0, fogueira.width, fogueira.height);
  if (particulas.length < 100) particulas.push(criarParticula());
  particulas.forEach((p, i) => {
    p.y -= p.velY;
    p.x += p.velX;
    p.vida--;
    ctxF.beginPath();
    ctxF.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctxF.fillStyle = p.cor;
    ctxF.fill();
    if (p.vida <= 0) particulas.splice(i, 1);
  });
  requestAnimationFrame(animarFogueira);
}
animarFogueira();

// Tema claro/escuro
const body = document.body;
const botaoTema = document.getElementById("botao-tema");
const temaSalvo = localStorage.getItem("tema");
if (temaSalvo === "escuro") {
  body.classList.replace("tema-claro", "tema-escuro");
  botaoTema.textContent = "☀️ Tema Claro";
}
botaoTema.addEventListener("click", () => {
  if (body.classList.contains("tema-claro")) {
    body.classList.replace("tema-claro", "tema-escuro");
    botaoTema.textContent = "☀️ Tema Claro";
    localStorage.setItem("tema", "escuro");
  } else {
    body.classList.replace("tema-escuro", "tema-claro");
    botaoTema.textContent = "🌙 Tema Escuro";
    localStorage.setItem("tema", "claro");
  }
});

// Música
const audio = document.getElementById("audioFundo");
const btnAudio = document.getElementById("controleAudio");
btnAudio.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    btnAudio.textContent = "🔊 Música: Pausar";
  } else {
    audio.pause();
    btnAudio.textContent = "🔇 Música: Tocar";
  }
});

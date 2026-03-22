function go(){

let q=document.getElementById("q").value;

if(q.trim()!=""){
window.location.href=
"https://www.google.com/search?q="+encodeURIComponent(q);
}
}



/* Real Stars Engine */
const canvas = document.getElementById("starsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let shootingStars = [];
let waves = [];
let mouse = { x: null, y: null };

// 🖱 Mouse move
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// ⚡ Click = energy wave
window.addEventListener("click", (e) => {
  waves.push({
    x: e.x,
    y: e.y,
    radius: 0,
    opacity: 1
  });
});

// ⭐ Star
class Star {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 0.6 + 0.1;
    this.opacity = Math.random();
    this.twinkle = Math.random() * 0.05;

    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = (Math.random() - 0.5) * 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // wrap
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;

    // twinkle
    this.opacity += this.twinkle;
    if (this.opacity > 1 || this.opacity < 0) {
      this.twinkle *= -1;
    }

    // cursor attraction
    if (mouse.x) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        this.x += dx * 0.002;
        this.y += dy * 0.002;
      }
    }
  }

  draw() {
    // glow
    let gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.size * 6
    );

    gradient.addColorStop(0, "rgba(0,255,255,0.8)");
    gradient.addColorStop(0.3, "rgba(0,150,255,0.4)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 6, 0, Math.PI * 2);
    ctx.fill();

    // core
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  }
}

// 🌠 Shooting star
class ShootingStar {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.len = Math.random() * 100;
    this.speed = Math.random() * 10 + 8;
    this.angle = Math.PI / 4;
    this.opacity = 1;
  }

  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);
    this.opacity -= 0.02;
  }

  draw() {
    ctx.strokeStyle = "rgba(0,255,255," + this.opacity + ")";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      this.x - this.len * Math.cos(this.angle),
      this.y - this.len * Math.sin(this.angle)
    );
    ctx.stroke();
  }
}

// create stars
for (let i = 0; i < 180; i++) {
  stars.push(new Star());
}

// 🕸 Spider web
function drawConnections() {
  if (!mouse.x) return;

  stars.forEach((s) => {
    let dx = s.x - mouse.x;
    let dy = s.y - mouse.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 140) {
      ctx.beginPath();
      ctx.moveTo(mouse.x, mouse.y);
      ctx.lineTo(s.x, s.y);

      let opacity = 1 - dist / 140;
      ctx.strokeStyle = `rgba(0,255,255,${opacity})`;
      ctx.lineWidth = 1;

      ctx.stroke();
    }
  });
}

// 🎬 Animate
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((s) => {
    s.update();
    s.draw();
  });

  drawConnections();

  // shooting stars
  if (Math.random() < 0.01) {
    shootingStars.push(new ShootingStar());
  }

  shootingStars.forEach((s, i) => {
    s.update();
    s.draw();
    if (s.opacity <= 0) shootingStars.splice(i, 1);
  });

  // ⚡ energy waves
  waves.forEach((w, i) => {
    w.radius += 4;
    w.opacity -= 0.02;

    ctx.beginPath();
    ctx.arc(w.x, w.y, w.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0,255,255,${w.opacity})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    if (w.opacity <= 0) waves.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

animate();

// resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

//  AI Voice System (Speech Recognition )








//JavaScript (FULL SOUND ENGINE)

const clickSound = document.getElementById("clickSound");
const scrollSound = document.getElementById("scrollSound");
const hoverSound = document.getElementById("hoverSound");
const typeSound = document.getElementById("typeSound");
const cursorSound = document.getElementById("cursorSound");

// volume control
clickSound.volume = 0.3;
scrollSound.volume = 0.2;
hoverSound.volume = 0.2;
typeSound.volume = 0.1;
cursorSound.volume = 0.05;

// 🔘 CLICK SOUND (tick)
document.addEventListener("click", () => {
  clickSound.currentTime = 0;
  clickSound.play();
});

// 📜 SCROLL SOUND (whoosh with throttle)
let scrollTimeout;
document.addEventListener("scroll", () => {
  if (!scrollTimeout) {
    scrollSound.currentTime = 0;
    scrollSound.play();

    scrollTimeout = setTimeout(() => {
      scrollTimeout = null;
    }, 200);
  }
});

// 🖱️ HOVER SOUND
document.querySelectorAll("button, a, input").forEach(el => {
  el.addEventListener("mouseenter", () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
  });
});

// ⌨️ SMOOTH TYPING SOUND
document.addEventListener("keydown", (e) => {
  if(e.key.length === 1){
    typeSound.currentTime = 0;
    typeSound.play();
  }
});

// 🖱️ CURSOR MOVE SOUND (very subtle)
let moveTimeout;
document.addEventListener("mousemove", () => {
  if (!moveTimeout) {
    cursorSound.currentTime = 0;
    cursorSound.play();

    moveTimeout = setTimeout(() => {
      moveTimeout = null;
    }, 100);
  }
});

//Only specific elements pe sound
document.querySelectorAll(".btn").forEach(el => {
  el.addEventListener("mouseenter", () => {
    hoverSound.play();
  });
});
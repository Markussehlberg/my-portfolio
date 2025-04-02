// main.js

// Set up the canvas
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to full viewport size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Particle constructor
function Particle(x, y, dx, dy, size) {
  this.x = x;
  this.y = y;
  this.dx = dx; // velocity in x
  this.dy = dy; // velocity in y
  this.size = size;
}

// Draw particle
Particle.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
  ctx.fillStyle = '#24d199'; // you can change the color to match your design
  ctx.fill();
};

// Update particle position and bounce off edges
Particle.prototype.update = function() {
  if (this.x + this.size > canvas.width || this.x - this.size < 0) {
    this.dx = -this.dx;
  }
  if (this.y + this.size > canvas.height || this.y - this.size < 0) {
    this.dy = -this.dy;
  }
  this.x += this.dx;
  this.y += this.dy;
  this.draw();
};

// Create an array of particles
let particlesArray = [];
const particleCount = Math.floor(window.innerWidth / 10);

function init() {
  particlesArray = [];
  for (let i = 0; i < particleCount; i++) {
    const size = Math.random() * 3 + 1;
    const x = Math.random() * (canvas.width - size * 2) + size;
    const y = Math.random() * (canvas.height - size * 2) + size;
    const dx = (Math.random() - 0.5) * 2;
    const dy = (Math.random() - 0.5) * 2;
    particlesArray.push(new Particle(x, y, dx, dy, size));
  }
}
init();

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw each particle
  particlesArray.forEach(particle => {
    particle.update();
  });
}
animate();

// Optional: Add mouse interactivity
const mouse = { x: null, y: null, radius: 100 };

window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

function interact() {
  particlesArray.forEach(particle => {
    // Calculate distance between mouse and particle
    let dx = mouse.x - particle.x;
    let dy = mouse.y - particle.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    
    // If the particle is close enough, increase its size
    if (distance < mouse.radius && particle.size < 8) {
      particle.size += 0.3;
    } else if (particle.size > 1) {
      particle.size -= 0.1;
    }
  });
  requestAnimationFrame(interact);
}
interact();

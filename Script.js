// Preloader Function
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.transition = 'opacity 0.5s ease';
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500); // Wait for fade-out transition
    }, 1000); // Show preloader for 1 second
  }
});

// Canvas Function
window.onload = () => {
  const canvas = document.getElementById("lineCanvas");
  const ctx = canvas.getContext("2d");
  const parentContainer = document.querySelector("body");

  function drawLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const spacing = 35;
    const angleInDegrees = -45;
    const angle = angleInDegrees * (Math.PI / 180);
    const dx = Math.tan(angle) * canvas.height;

    ctx.strokeStyle = "#cccccc";
    ctx.lineWidth = 0.5;

    for (let i = -canvas.height; i < canvas.width + canvas.height; i += spacing) {
      const startX = i;
      const startY = 0;
      const endX = i + dx;
      const endY = canvas.height;

      const steps = Math.floor(canvas.height / 5);
      for (let j = 0; j < steps; j++) {
        const t = j / steps;
        const x = startX + t * (endX - startX);
        const y = startY + t * (endY - startY);

        ctx.beginPath();
        ctx.arc(x, y, 0.5, 5, Math.PI * 2);
        ctx.fillStyle = "#000000";
        ctx.fill();
      }
    }
  }

  function resizeCanvas() {
    const rect = parentContainer.getBoundingClientRect();

    // Set canvas size to match the parent container
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Position the canvas exactly over the parent container
    canvas.style.position = "absolute";
    canvas.style.left = rect.left + "px";
    canvas.style.top = rect.top + "px";

    drawLines();
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
};




// Clock Function
function clock() {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const dayNames = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
  ];

  const today = new Date();

  // Format date
  const formattedDate = `${dayNames[today.getDay()]} ${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear()}`;
  document.getElementById('Date').innerHTML = formattedDate;

  // Get hours, minutes, seconds
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();

  // Determine AM or PM
  const ampm = h >= 12 ? 'PM' : 'AM';

  // Convert 24-hour to 12-hour format
  h = h % 12;
  h = h === 0 ? 12 : h;

  // Add leading zeros
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;

  // Update clock elements
  document.getElementById('hours').innerHTML = h;
  document.getElementById('min').innerHTML = m;
  document.getElementById('sec').innerHTML = s;
  document.getElementById('time').innerHTML = ampm;
}

// Run the clock function every 400ms
const inter = setInterval(clock, 400);

function updateDateTime() {
  const now = new Date();

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = now.toLocaleDateString(undefined, dateOptions);
  document.getElementById('date').textContent = formattedDate;

  const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const formattedTime = now.toLocaleTimeString(undefined, timeOptions);
  document.getElementById('time').textContent = formattedTime;
}

updateDateTime();
setInterval(updateDateTime, 1000);


//Night Mode Function

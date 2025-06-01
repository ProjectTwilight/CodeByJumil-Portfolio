
// Navigation and Gallery Toggling
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll('.nav-menu a');

    const allContainers = {
        home: [document.querySelector('.left-home-container'), document.querySelector('.right-home-container')],
        work: [document.querySelector('.gallery-container'), document.querySelector('.display-container')],
        about: [document.querySelector('.about-container')],
        services: [document.querySelector('.services-container')]
    };

    const allElements = Object.values(allContainers).flat();

    function activateSection(sectionKey) {
        // Hide all elements
        allElements.forEach(el => el?.classList.remove('active'));

        // Activate only the selected section elements
        if (allContainers[sectionKey]) {
            allContainers[sectionKey].forEach(el => el?.classList.add('active'));
        }

        // Update the URL
        history.pushState(null, '', `#${sectionKey}`);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href').replace('#', '');
            activateSection(target);
        });
    });

    window.addEventListener('popstate', () => {
        const path = location.hash.replace('#', '');
        activateSection(path);
    });
});




// Preloader Function
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.transition = 'opacity 0.5s ease';
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
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
        canvas.width = rect.width;
        canvas.height = rect.height;
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

    const formattedDate = `${dayNames[today.getDay()]} ${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear()}`;
    document.getElementById('Date').innerHTML = formattedDate;

    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();

    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h === 0 ? 12 : h;

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    document.getElementById('hours').innerHTML = h;
    document.getElementById('min').innerHTML = m;
    document.getElementById('sec').innerHTML = s;
    document.getElementById('time').innerHTML = ampm;
}

setInterval(clock, 400);


// Image Preview
function setupImagePreview(gallerySelector, imageId, titleId) {
  const galleryImages = document.querySelectorAll(gallerySelector);
  const previewImage = document.getElementById(imageId);
  const imageTitle = document.getElementById(titleId);

  galleryImages.forEach(img => {
    const title = img.getAttribute('alt') || img.getAttribute('data-title') || 'Untitled';

    img.addEventListener('mouseenter', () => {
      if (previewImage) {
        previewImage.src = img.src;
        previewImage.style.display = 'block';
      }

      if (imageTitle) {
        runHackerTextEffect(imageTitle, title);
      }
    });
  });
}

function runHackerTextEffect(element, finalText) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*';
  let displayText = '';
  let frame = 0;
  const scramble = setInterval(() => {
    displayText = finalText
      .split('')
      .map((char, i) => {
        if (i < frame) return char;
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');
    element.textContent = displayText;
    frame += 1;

    if (frame > finalText.length) {
      clearInterval(scramble);
    }
  }, 50);
}

document.addEventListener('DOMContentLoaded', () => {
  setupImagePreview('.image-wrapper img', 'preview-image', 'image-title');
});

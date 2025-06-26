// Preloader Function
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.transition = 'opacity 0.5s ease';
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1000);
        }, 1500);
    }
});

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


function activateSection(id){
  /* 1 – nav highlight */
  document.querySelectorAll('.nav-menu li').forEach(li => li.classList.remove('active'));
  const li = document.querySelector('.nav-menu a[href="#'+id+'"]').parentElement;
  li.classList.add('active');

  /* 2 – show / hide content panes */
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active-section'));
  const section = document.getElementById(id);
  if(section) section.classList.add('active-section');
}

/* default: Home is active the moment DOM is ready */
document.addEventListener('DOMContentLoaded', () => {
  activateSection('home');

  /* hook up every nav link */
  document.querySelectorAll('.nav-menu a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();                 // stay on same page
      activateSection(a.getAttribute('href').substring(1)); // remove the “#”
    });
  });
});
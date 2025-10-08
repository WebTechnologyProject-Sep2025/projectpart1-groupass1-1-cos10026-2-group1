/*
    javascript to mount upper and lower components
*/ 
function loadComponent(id, file) {
	fetch(file)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Could not load ${file}`);
			}
			return response.text();
		})
		.then(data => {
			document.getElementById(id).innerHTML = data;
		})
		.catch(error => {
			console.error("Error:", error);
		});
}

document.addEventListener("DOMContentLoaded", () => {
	loadComponent("upper", "components/upper.html");
	loadComponent("lower", "components/lower.html");
});

const options = {
    threshold: 0.3
  };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const topText = entry.target.querySelector('.top');
      const bottomText = entry.target.querySelector('.bottom');
      topText.classList.add('visible');
      bottomText.classList.add('visible');
    }
  });
}, options);

observer.observe(document.querySelector('.section1'));

const section2 = document.querySelector('.section2');
const counters = section2.querySelectorAll('.member-num, .visited-num, .tech-num');

function animateCount(el, endValue) {
  let start = 0;
  const duration = 1500;
  const stepTime = 10;
  const increment = endValue / (duration / stepTime);

  const timer = setInterval(() => {
    start += increment;
    if (start >= endValue) {
      start = endValue;
      clearInterval(timer);
    }
    if (/\+$/.test(el.dataset.target)) {
      el.textContent = Math.floor(start) + '+';
    } else {
      el.textContent = Math.floor(start);
    }
  }, stepTime);
}

const observer2 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      counters.forEach(counter => {
        counter.dataset.target = counter.textContent;
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        animateCount(counter, target);
      });
      observer2.unobserve(section2);
    }
  });
}, { threshold: 0.3 });

observer2.observe(section2);

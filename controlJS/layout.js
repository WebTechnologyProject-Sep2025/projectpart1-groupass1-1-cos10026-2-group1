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


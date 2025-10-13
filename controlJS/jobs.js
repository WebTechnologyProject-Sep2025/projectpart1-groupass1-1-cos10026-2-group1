document.addEventListener("DOMContentLoaded", () => {
	const jobs = [
		{
			title: "Software Developer",
			img: "../assets/image/software-engr.png",
			desc: "We seek an experienced Software Developer to design and build scalable, high-performance features for our job platform. You will work with cross-functional teams to deliver robust solutions and ensure smooth deployment of new systems.",
			req: "<ul><li>Bachelor’s degree in Computer Science or related field</li><li>Proficient in Python, Java, C++, or JavaScript</li><li>Strong understanding of SDLC, version control (Git), and debugging techniques</li><li>Experience with REST APIs and database integration is a plus</li></ul>",
			resp: "<ol><li>Design, code, and test software applications</li><li>Maintain, refactor, and optimize existing systems</li><li>Collaborate in agile teams to plan, review, and deliver features</li><li>Ensure code quality and participate in peer reviews</li></ol>"
		},
		{
			title: "Network Administrator",
			img: "../assets/image/softdev.png",
			desc: "A Network Administrator manages, configures, and secures company networks, ensuring optimal performance, reliability, and data protection across all systems and devices.",
			req: "<ul><li>Degree in Information Technology, Computer Networking, or related discipline</li><li>Strong understanding of LAN/WAN, VPNs, routers, and firewalls</li><li>Knowledge of network security protocols and diagnostic tools</li><li>Relevant certifications (CCNA, CompTIA Network+) preferred</li></ul>",
			resp: "<ol><li>Install, configure, and manage network equipment</li><li>Monitor network performance and troubleshoot connectivity issues</li><li>Implement security measures and access controls</li><li>Document network configurations and maintenance procedures</li></ol>"
		},
		{
			title: "Data Analyst",
			img: "../assets/image/shutterstock_1660725319.jpg",
			desc: "A Data Analyst interprets, cleans, and visualizes data to support strategic business decisions, uncover patterns, and deliver actionable insights through storytelling with data.",
			req: "<ul><li>Degree in Data Science, Statistics, Computer Science, or related field</li><li>Proficiency in Excel, SQL, and Python or R</li><li>Experience with data visualization tools (Tableau, Power BI, or Matplotlib)</li><li>Strong analytical, problem-solving, and communication skills</li></ul>",
			resp: "<ol><li>Collect, clean, and validate datasets from multiple sources</li><li>Perform statistical and exploratory data analysis</li><li>Build dashboards and reports to visualize key trends</li><li>Collaborate with stakeholders to define metrics and insights</li></ol>"
		}
	];

	let idx = 0;
	let isAnimating = false;

	const img = document.getElementById("job-img");
	const title = document.getElementById("job-title");
	const summary = document.getElementById("job-summary");
	const titleMain = document.getElementById("job-title-main");
	const details = document.getElementById("job-details");
	const tabs = document.querySelectorAll(".tab");
	const left = document.querySelector(".arrow.left");
	const right = document.querySelector(".arrow.right");
	const slideContent = document.querySelector(".slide-content");

	/* helper: wait for CSS transition to end on a specific property */
	function onTransitionEnd(el, prop) {
		return new Promise(res => {
			const handler = (e) => {
				if (!prop || e.propertyName === prop) {
					el.removeEventListener("transitionend", handler);
					res();
				}
			};
			el.addEventListener("transitionend", handler);
		});
	}

	/* preload next image to avoid flicker */
	function preload(src) {
		return new Promise((resolve, reject) => {
			const im = new Image();
			im.onload = () => resolve();
			im.onerror = reject;
			im.src = src;
		});
	}

	function setActiveTab(tabIdx = 1) {
		tabs.forEach(t => {
			t.classList.remove("active");
			t.setAttribute("aria-selected", "false");
		});
		const el = document.querySelector(`.tab${tabIdx}`);
		if (el) {
			el.classList.add("active");
			el.setAttribute("aria-selected", "true");
		}
	}

	function renderDetailsTab(tabEl) {
		const j = jobs[idx];
		if (tabEl.classList.contains("tab1")) {
			details.innerHTML = j.desc;
		} else if (tabEl.classList.contains("tab2")) {
			details.innerHTML = j.req;
		} else {
			details.innerHTML = j.resp;
		}
	}

	function bindTabs() {
		tabs.forEach(t => {
			t.onclick = () => {
				const match = t.className.match(/tab(\d)/);
				const n = Number(match?.[1] || 1);
				setActiveTab(n);
				renderDetailsTab(t);
			};
		});
	}

	function updateSlideDOM(i) {
		const j = jobs[i];
		img.src = j.img;
		title.textContent = j.title;
		summary.textContent = j.desc;
		titleMain.textContent = j.title;
		details.innerHTML = j.desc;
		setActiveTab(1);
	}

	async function go(nextIndex, dir = "right") {
		if (isAnimating) return;
		isAnimating = true;

		const nextJob = jobs[nextIndex];

		/* 1) preload image before visual change */
		try { await preload(nextJob.img); } catch (_) {}

		/* 2) exit animation */
		slideContent.classList.remove("enter", "enter-active", "exit", "exit-active");
		void slideContent.offsetWidth; /* reflow */

		slideContent.classList.add("exit");
		void slideContent.offsetWidth;
		slideContent.classList.add("exit-active");

		/* wait for opacity transition to finish */
		await onTransitionEnd(slideContent, "opacity");

		/* 3) swap content only AFTER exit completes */
		idx = nextIndex;
		updateSlideDOM(idx);

		/* 4) enter animation */
		slideContent.classList.remove("exit", "exit-active");
		slideContent.classList.add("enter");
		void slideContent.offsetWidth;
		slideContent.classList.add("enter-active");

		await onTransitionEnd(slideContent, "opacity");

		/* 5) cleanup */
		slideContent.classList.remove("enter", "enter-active");
		isAnimating = false;
	}

	function prev() {
		const next = (idx - 1 + jobs.length) % jobs.length;
		go(next, "left");
	}
	function next() {
		const n = (idx + 1) % jobs.length;
		go(n, "right");
	}

	/* arrows */
	if (left) left.onclick = prev;
	if (right) right.onclick = next;

	/* keyboard nav */
	document.addEventListener("keydown", (e) => {
		if (e.key === "ArrowLeft") prev();
		else if (e.key === "ArrowRight") next();
	});

	/* initial bind + render */
	bindTabs();
	updateSlideDOM(idx);
});

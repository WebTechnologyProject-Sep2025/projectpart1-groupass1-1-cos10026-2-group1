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

	const img = document.getElementById("job-img");
	const title = document.getElementById("job-title");
	const summary = document.getElementById("job-summary");
	const titleMain = document.getElementById("job-title-main");
	const details = document.getElementById("job-details");
	const tabs = document.querySelectorAll(".tab");
	const left = document.querySelector(".arrow.left");
	const right = document.querySelector(".arrow.right");

	function updateJob(i) {
		const j = jobs[i];
		img.src = j.img;
		title.textContent = j.title;
		summary.textContent = j.desc;
		titleMain.textContent = j.title;
		details.innerHTML = j.desc;
		tabs.forEach(t => t.classList.remove("active"));
		document.querySelector(".tab1").classList.add("active");
	}

	function bindTabs() {
		tabs.forEach(t => {
			t.onclick = () => {
				tabs.forEach(tb => tb.classList.remove("active"));
				t.classList.add("active");
				const j = jobs[idx];
				if (t.classList.contains("tab1")) details.innerHTML = j.desc;
				else if (t.classList.contains("tab2")) details.innerHTML = j.req;
				else details.innerHTML = j.resp;
			};
		});
	}

	left.onclick = () => { idx = (idx - 1 + jobs.length) % jobs.length; updateJob(idx); };
	right.onclick = () => { idx = (idx + 1) % jobs.length; updateJob(idx); };

	bindTabs();
	updateJob(idx);
});

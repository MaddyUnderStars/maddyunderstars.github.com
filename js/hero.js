const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
if (!mediaQuery || mediaQuery.matches) throw "prefers reduced motion, gonna just throw"

const svg = document.querySelector(".header .name svg");
for (let i = 0; i < svg.children.length; i++) {
	var curr = svg.children[i];
	curr.setAttribute("opacity", i === svg.children.length - 1 ? 1 : ((i + 1) / (svg.children.length - 1)) / 20)
}

var posx = window.innerWidth / 2, posy = window.innerHeight / 2;

update = () => {
	var bbox = svg.getBoundingClientRect();

	if (bbox.width < 1000)
		svg.style.fontSize = `${bbox.width / 1000 * 150}px`;
	else
		svg.style.fontSize = "150px";

	for (var i = 0; i < svg.children.length; i++) {
		const curr = svg.children[i];
		curr.setAttribute("y", (i * 10) + (((posy - window.innerHeight / 2) / (i + 1)) / 10) + bbox.height / 3);	// / 3 probably because of the previous height adjusts
		curr.setAttribute("x", ((posx - window.innerWidth / 2) / (i + 1)) / 5 +
			(Math.sin(Date.now() / 500 + (i * 2)) * 7) + bbox.width / 2);
	}

	requestAnimationFrame(update);
}

update();

window.addEventListener("mousemove", (e) => {
	posx = e.clientX;
	posy = e.clientY;
})
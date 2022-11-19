function drukuj() {
}

function createSelect(options) {
	let form = document.createElement('form');
	let select = document.createElement('select');
	for (const [key, value] of Object.entries(options)) {
		let option = document.createElement('option');
		option.setAttribute('value', key);
		option.innerText = value;

		select.appendChild(option);
	}
	select.addEventListener('change', (e) => {
		this.location = select.value + '?theme=' + getTheme();
	});

	let body = document.querySelector('body');
	form.appendChild(select);
	body.appendChild(form);
	body.prepend(form);
}

function setCookies() {
	let theme = getTheme();
	let path = window.location.pathname;

	localStorage.setItem('theme', theme);
	localStorage.setItem('path', path);
}

document.addEventListener('DOMContentLoaded', (event) => {
	setCookies();
	document.querySelectorAll('style, link[rel="stylesheet"], td.op').forEach(element => element.parentNode.removeChild(element));
	document.querySelectorAll('style, td.op').forEach(element => element.parentNode.removeChild(element));
	document.querySelectorAll('div[align="center"]').forEach(element => element.removeAttribute('align'));
	document.querySelectorAll('table').forEach(table => table.removeAttribute('cellpadding') || table.removeAttribute('cellspacing'));
	document.querySelectorAll('[style]').forEach(element => element.removeAttribute('style'));

	document.querySelectorAll('a.n').forEach(element => element.classList.add('n-'+element.innerText.trim().toLowerCase()));
	document.querySelectorAll('a.s').forEach(element => element.classList.add('s-'+element.innerText.trim().toLowerCase().replaceAll(" ", "")));
	document.querySelectorAll('span.p').forEach(element => {
		let className = element.innerText.trim().toLowerCase().replaceAll(' ', '');
		if (className.indexOf('-') > 0) {
			className = className.substring(0, className.indexOf('-'));
		}
		element.classList.add('p-'+className.replaceAll('.', '-'))
	});
	let lastLink = Array.from(document.querySelectorAll('a')).pop().parentNode;
	lastLink.parentNode.removeChild(lastLink);

	let title = document.querySelector('td.tytul');
	let newCaption = document.createElement('caption');
	newCaption.innerText = title.innerText;

	document.querySelector('table').remove();
	document.querySelector('table').appendChild(newCaption);

	document.querySelectorAll('td.l').forEach(td => {
		let text = td.innerText;
		let groups = ['', '-1/2', '-2/2'];

		for (let num in groups) {
			let g = groups[num];
			let pos = text.indexOf(g);

			if (pos > 0) {
				td.innerHTML = td.innerHTML.replace(g, "");
				td.classList.add("group" + num);

				let ps = td.querySelectorAll(".p");
				let p = ps[0];

				if (p.innerText.indexOf("/") >= 0) {
					p = ps[1];
				}
				p.innerText += g;
			}
		}
	});

	let tds = document.querySelectorAll('table.tabela td, table.tabela th');
	let g = document.createElement('div');
	g.classList.add('grider');
	tds.forEach(td => {
		let tadek = document.createElement('div');
		let element = td;

		let tr = td.parentNode;
		let time = tr.querySelector('td:nth-child(2)');

		if (element.firstChild.nodeName === 'SPAN' && element.firstChild.firstChild && element.firstChild.firstChild.nodeName === 'A') {
			element = element.firstChild;
		}

		tadek.innerHTML = '<time>'+ (time ? time.innerHTML: '') + '</time><article>'+
			element.innerHTML.replaceAll("&nbsp;", "").replaceAll('<br>', "</article><article>") + '</article>';//.replaceAll("<br>", "");
		tadek.dataset.time = time ? time.innerText : '';
		tadek.classList.add(td.nodeName === 'TD' ? 'old-td' : 'old-th');
		td.classList.contains("group1") && tadek.classList.add("group1");
		td.classList.contains("group2") && tadek.classList.add("group2");

		g.appendChild(tadek);
	});
	document.body.appendChild(g);

	fetch('../scripts/plans.json').then(j => j.json()).then(createSelect);
	fetch('../scripts/themes.json').then(j => j.json()).then(createThemes);

	const theme = getTheme();

	let head = document.querySelector('head');
	let mv = document.createElement('meta');
	mv.name = "viewport";
	mv.content = "width=device-width, initial-scale=1";
	head.appendChild(mv);

	if (theme) {
		let link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = '../themes/'+ theme;

		head.appendChild(link);
		document.querySelectorAll('a').forEach(a => {
			a.href += '?theme=' + theme;
		})
	}


	document.addEventListener('keydown', (e) => {
		if (e.key === 'ArrowRight') {
			let s = document.querySelector("#theme-selector select");
			this.location = '?theme='+s.options[s.selectedIndex + 1].value;
		}
		if (e.key === 'ArrowLeft') {
			let s = document.querySelector("#theme-selector select");
			this.location = '?theme='+s.options[s.selectedIndex - 1].value;
		}
	});
});

function getTheme() {
	const urlParams = new URLSearchParams(window.location.search);
	let retval = urlParams.get('theme');
	// if (retval.contains('&')) {
	// 	retval = 'mk.css';
	// }
	return retval;
}

function createThemes(themes) {
	let theme = getTheme();
	let form = document.createElement('form');
	form.setAttribute('id', 'theme-selector');
	let select = document.createElement('select');
	for (const value of themes) {
		let option = document.createElement('option');
		option.setAttribute('value', value);
		option.innerText = value;
		if (theme === value) {
			option.selected = true;
		}

		select.appendChild(option);
	}
	select.addEventListener('change', (e) => {
		this.location = '?theme='+select.value;
	});

	let body = document.querySelector('body');
	form.appendChild(select);
	body.appendChild(form);
	body.prepend(form);
}


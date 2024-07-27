// Navbar top/mobile
let menuTog = document.querySelector('.menu-toggle');
let navTop = document.getElementById('mobile-menu');
let mobMenItems = document.querySelectorAll('.mob-men-item');
let mobileMenu = document.getElementById('mobile-menu');
let navLinks = Array.from(mobMenItems);
let header = document.getElementById('header');
let drop = document.querySelectorAll('.drop')[0];
header.style.height = '4rem'

menuTog.addEventListener('click', () => {
	drop.classList.add('dropout');
	menuTog.classList.toggle('active');
	navTop.classList.toggle('active');
	if (menuTog.classList.contains('active')) {
			navLinks.reverse().forEach(addActive);
			navTop.classList.add('active');

			let closeNav = document.createElement("div");
			let body = document.getElementsByTagName("body")[0];
			body.append(closeNav);
			closeNav.classList.add("full-block")

			function addActive(item, index) {
				let timeout = (index + 1) * 100;
				setTimeout(activate, timeout);
				function activate() {
					item.classList.add('active');
				}
			}
	}
		let clum = document.querySelectorAll('.full-block')[0]
		clum.addEventListener('click', () => {
			navLinks.reverse().forEach(remActive);
			navTop.classList.remove('active');
			function remActive(item, index) {
				let timeout = (index + 1) * 100;
				setTimeout(deactivate, timeout);
				function deactivate() {
					item.classList.remove('active');
				}
			}
		clum.remove();
		menuTog.classList.remove('active');
		setTimeout(dropIn, 300);
		function dropIn() {
			drop.classList.add('dropin');			
		}			
		setTimeout(remDropInOut, 800);
		function remDropInOut() {
			drop.classList.remove('dropout');
			drop.classList.remove('dropin');
		}			
	});					
});

// User menu
let userBtn = document.getElementById("user-menu-button");
userBtn.addEventListener('click', () => {
	drop.classList.add('dropout');
	let rotators = document.querySelectorAll(".rot-x");
	rotators.forEach(getDizzy);

	let closeUserMenu = document.createElement("div");
	let body = document.getElementsByTagName("body")[0];
	body.append(closeUserMenu);
	closeUserMenu.classList.add("full-block")


	function getDizzy(item, index) {
		let num = Number(index + 1) * 100;
		setTimeout(addClass, num);
		function addClass() {
			item.classList.add('rot-3d')
		}						
	}
	
	let clum = document.querySelectorAll('.full-block')[0]
		clum.addEventListener('click', () => {
		rotators.forEach(getStraight);
		function getStraight(item, index) {
			let num = Number(index + 1) * 100;
			setTimeout(remClass, num);
			function remClass() {
				item.classList.remove('rot-3d');		
			}							
		}
		clum.remove();
		setTimeout(dropIn, 300);
		function dropIn() {
			drop.classList.add('dropin');
		}			
		setTimeout(remDropInOut, 800);
		function remDropInOut() {
			drop.classList.remove('dropout');
			drop.classList.remove('dropin');
		}			
	});					
});

// Wobble div
let wobblers = document.querySelectorAll('.weeble');

wobblers.forEach(wobblEm);
function wobblEm(item) {
	item.addEventListener('mouseover', () => {
		item.classList.add('wobble');
		setTimeout(resetWobble, 500);
		function resetWobble() {
			item.classList.remove("wobble");
		}
	});								
}

// Power button
let bulbOn = document.getElementById('bulb-on');
let bulbOff = document.getElementById('bulb-off');
let powerBtn = document.getElementById('power');

if (document.URL == 'http://192.168.0.4:5000/devices/lamp/off') {
	powerOff();
}	
if (document.URL == 'http://192.168.0.4:5000/devices/lamp/on') {
	powerOn();
}	
if (document.URL == 'http://192.168.0.4:5000/devices') {
	if (document.getElementById('status').innerText == "On") {
		powerOn();
	}	else {
		powerOff();
	}		
}	

powerBtn.addEventListener('change', () => {
	powerBtn.checked == true ? turnOn() : turnOff();
	function turnOn() {
		window.location.href = "http://192.168.0.4:5000/devices/lamp/on"	
	}
	function turnOff() {
		window.location.href = "http://192.168.0.4:5000/devices/lamp/off"	
	}
});

function powerOn() {
	powerBtn.checked = true;
	bulbOn.style.display = 'block';
	bulbOn.style.marginLeft = ".625rem";
	bulbOff.style.display = 'none';
}	

function powerOff() {
	powerBtn.checked = false;
	bulbOn.style.display = 'none';
	bulbOff.style.display = 'block';
}


















const timer = document.getElementById('stopwatch');

let hr = 0;
let min = 0;
let sec = 0;
let stoptime = true;
let h = 0;
let today;
let diff;

// function close(e){
// console.log("hi");
// }


window.addEventListener('beforeunload', function (e) {
	today = new Date();
	localStorage.setItem("shr", today.getHours());
	localStorage.setItem("smin", today.getMinutes());
	localStorage.setItem("ss", today.getSeconds());
	localStorage.setItem("date", today);
	e.preventDefault();
	e.returnValue = '';
})
// window.onbeforeunload = function () {
// console.log(today);
// };

function startTimer() {
	if (stoptime == true) {
		stoptime = false;
		timerCycle();
	}
}
function stopTimer() {
	if (stoptime == false) {
		stoptime = true;
	}
}
function get() {
	hr = localStorage.getItem("hr");
	min = localStorage.getItem("min");
	sec = localStorage.getItem("sec");
}
function set(hrs, mins, secs) {
	localStorage.setItem(hrs, hr);
	localStorage.setItem(mins, min);
	localStorage.setItem(secs, sec);
}
function reload() {
	get();
	if (hr == 0 && min == 0 && sec == 0)
		timer.innerHTML = "00:00:00";

	else {
		if (localStorage.getItem("shr")) {
			let ltoday = new Date();

			// let smin = localStorage.getItem("smin");
			// let ss = localStorage.getItem("ss");
			let shr = localStorage.getItem("shr");
			diff = ltoday.getHours() - shr;
			diff = parseInt(diff);
			hr = parseInt(hr);
			console.log(diff);
			hr = hr + diff;
			localStorage.setItem("hr", hr);

			shr = localStorage.getItem("smin");
			diff = ltoday.getMinutes() - shr;
			diff = parseInt(diff);
			diff = Math.abs(diff);
			min = parseInt(min);
			min = min + diff;
			// min = Math.abs(min);
			console.log(diff);
			localStorage.setItem("min", min);

			shr = localStorage.getItem("ss");
			diff = ltoday.getSeconds() - shr;
			diff = parseInt(diff);
			diff = Math.abs(diff);
			sec = parseInt(sec);
			sec = sec + diff - 2;
			if (sec >= 60) {
				console.log("hi");
				let temps = sec % 60;
				let tempm = sec / 60;
				min = min + tempm;
				sec = temps;
			}
			console.log(diff);
			localStorage.setItem("sec", sec);
			localStorage.removeItem("shr");
		}
		startTimer();

	}
}
function clearlogs() {
	for (let i = 0; i <= h; i++) {
		localStorage.removeItem('h' + h)
		localStorage.removeItem('m' + h)
		localStorage.removeItem('s' + h)

	}
	let removeLi = document.getElementById('ull');
	while (removeLi.firstChild) {
		removeLi.removeChild(removeLi.firstChild);
	}
}
function Lap() {
	set("h" + h, "m" + h, "s" + h);
	let x = document.createElement("LI");
	x.innerHTML = `${localStorage.getItem('h' + h)}:${localStorage.getItem('m' + h)}:${localStorage.getItem('s' + h)}`;
	document.getElementById("ull").appendChild(x);
	h++;
	if (hr == 0 && min == 0 && sec == 0)
		x.innerHTML = "00:00:00";
}

function timerCycle() {

	if (stoptime == false) {

		if (localStorage.getItem("shr")) {
			let ltoday = new Date();

			// let smin = localStorage.getItem("smin");
			// let ss = localStorage.getItem("ss");
			let shr = localStorage.getItem("shr");
			diff = ltoday.getHours() - shr;
			diff = parseInt(diff);
			hr = parseInt(hr);
			console.log(diff);
			hr = hr + diff;
			localStorage.setItem("hr", hr);

			shr = localStorage.getItem("smin");
			diff = ltoday.getMinutes() - shr;
			diff = parseInt(diff);
			diff = Math.abs(diff);
			min = parseInt(min);
			min = min + diff;
			// min = Math.abs(min);
			console.log(diff);
			localStorage.setItem("min", min);

			shr = localStorage.getItem("ss");
			diff = ltoday.getSeconds() - shr;
			diff = parseInt(diff);
			diff = Math.abs(diff);
			sec = parseInt(sec);
			sec = sec + diff - 2;
			if (sec >= 60) {
				console.log("hi");
				let temps = sec % 60;
				let tempm = sec / 60;
				min = min + tempm;
				sec = temps;
			}
			console.log(diff);
			localStorage.setItem("sec", sec);
			localStorage.removeItem("shr");
		}



		get();
		sec = parseInt(sec);
		min = parseInt(min);
		hr = parseInt(hr);

		sec = sec + 1;

		if (sec == 60) {
			min = min + 1;
			sec = 0;
		}
		if (min == 60) {
			hr = hr + 1;
			min = 0;
			sec = 0;
		}
		if (sec < 10 || sec == 0) {
			sec = '0' + sec;
		}
		if (min < 10 || min == 0) {
			min = '0' + min;
		}
		if (hr < 10 || hr == 0) {
			hr = '0' + hr;
		}

		timer.innerHTML = hr + ':' + min + ':' + sec;
		set("hr", "min", "sec");
		setTimeout("timerCycle()", 1000);


	}
}

function resetTimer() {
	timer.innerHTML = '00:00:00';
	min = 0;
	sec = 0;
	hr = 0;
	set("hr", "min", "sec");
	stopTimer();
}
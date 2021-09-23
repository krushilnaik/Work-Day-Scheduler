var currentDay = document.getElementById('currentDay');
var container = document.querySelector('.container');

var today = moment().format('dddd, MMMM Do');
var thisHour = Number(moment().format('HH'));

currentDay.innerText = today;

const timeKeys = [
	'hour-9',
	'hour-10',
	'hour-11',
	'hour-12',
	'hour-13',
	'hour-14',
	'hour-15',
	'hour-16',
	'hour-17'
];

// clear out the container and re-render it
container.innerHTML = '';

for (const time of timeKeys) {
	let hour = Number(time.slice(time.indexOf('-') + 1));
	let timeType = 'past';

	if (thisHour == hour) {
		timeType = 'present';
	} else if (thisHour < hour) {
		timeType = 'future';
	}

	let timeblock = $(`<div id="${time}" class="row time-block">`).get(0);

	timeblock.innerHTML = /* html */ `
		<div class="col-1 hour">${hour % 12 || 12}${hour < 12 ? 'AM' : 'PM'}</div>
		<textarea class="col-10 task ${timeType}">${localStorage.getItem(time) || ''}</textarea>
		<button class="col-1 saveBtn btn"><i class="fas fa-save"></i></button>
	`;

	timeblock.lastElementChild.addEventListener('click', function () {
		localStorage.setItem(time, timeblock.querySelector('textarea').value);
	});

	container.appendChild(timeblock);
}

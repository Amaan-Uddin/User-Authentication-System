const minutes = document.querySelector('span.minutes');
const seconds = document.querySelector('span.seconds');

// Set the duration of the countdown in minutes
const duration = 5;

// Calculate the end time
const endTime = new Date();
endTime.setMinutes(endTime.getMinutes() + duration);

// Update the countdown every second
const countdown = setInterval(function () {
	// Get the current time
	let now = new Date().getTime();

	// Calculate the distance between the end time and the current time
	let distance = endTime - now;

	// Calculate minutes and seconds
	minutes.innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	seconds.innerText = Math.floor((distance % (1000 * 60)) / 1000);

	// Check if the countdown is finished
	if (distance <= 0) {
		minutes.innerText = 0;
		seconds.innerText = 0;
		clearInterval(countdown);
	}
}, 1000);

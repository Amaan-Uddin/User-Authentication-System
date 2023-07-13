const checkbox = document.getElementById('remember');

checkbox.addEventListener('click', () => {
	if (checkbox.checked) {
		document.cookie = 'remember=true;max-age=3600;path=/';
	} else {
		document.cookie = 'remember=;max-age=0;path=/';
	}
});

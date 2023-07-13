const showBtn = document.getElementById('show');
const passwordField = document.getElementById('password');
let flag = 0;

showBtn.addEventListener('click', () => {
	if (!flag) {
		passwordField.type = 'text';
		showBtn.innerText = 'hide';
		flag = 1;
	} else {
		passwordField.type = 'password';
		showBtn.innerText = 'show';
		flag = 0;
	}
});

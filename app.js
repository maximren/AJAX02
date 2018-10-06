const searchButton = document.getElementById('search-form');
const api = 'http://localhost:3000/';
const userTable = document.querySelector('table tbody');

searchButton.addEventListener('submit', (e) => {
	e.preventDefault();
	const username = document.getElementById('username-input');
	const age = document.getElementById('age-input');
	console.log(username, age);
	let formErr = {
		'usernameError': false,
		'ageError': false
    };
    
	if(username.value.trim() == '') {
		username.classList.add('invalid');
		formErr.usernameError = true;
	} else {
		username.classList.remove('invalid');
		formErr.ageError = false;
	}
	if(age.value.trim() == '') {
		age.classList.add('invalid');
		formErr.usernameError = true;
	} else {
		age.classList.remove('invalid');
		formErr.ageError = false;
	}

	if (formErr.usernameError || formErr.ageError) {
		return;
	}

	fetch(api+'users?name='+username.value+'&age='+age.value)
		.then(resp => {
			console.log(resp);
			return resp.json()
		})
		.then(result => {
			console.log(result);
			if (result.length == 0) {
				alert(`No user with name: ${username.value} and age: ${age.value}`);
			} else {
				let userHTML = '';
				result.forEach(user => {
					userHTML += `<tr data-id="${user.id}"><td>${user.id}</td><td>${user.name}</td><td>${user.age}</td></tr>`;

				});
				userTable.innerHTML = userHTML;


			}
		})
		.catch(function (err) {
			console.log(err);
		});
});
import fetch from 'cross-fetch'
import Config from 'Config' // eslint-disable-line

export default {
	login: login,
	persistUser: persistUser,
	logout: logout,
	register: register
}
function login(credentials) {

	let body = `username=${encodeURIComponent(credentials.username)}&password=${encodeURIComponent(credentials.password)}`

	return fetch(
		`${Config.api}/authenticate_user`,
		{
			method:"POST",
			body:body,
			headers:{
				'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'
			}
		}
	)
}
function persistUser(json) {
	localStorage.setItem('username', json.userData.username || '')
	localStorage.setItem('JWT', json.token || '')
	localStorage.setItem('isLoggedIn', true)
}
function logout(){
	localStorage.setItem('username', '')
	localStorage.setItem('JWT', '')
	localStorage.setItem('isLoggedIn', '')
}

function register(username, password) {

	//{"errorType":"validation","message":"username: username in use","errors":{"username":{"location":"body","param":"username","value":"asdfsadf","msg":"username in use"}}}

	let body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
	return fetch(
		`${Config.api}/api/v1/Users`,
		{
			method:"POST",
			body:body,
			headers:{
				'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'
			}
		}
	)
}

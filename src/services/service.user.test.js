import crossFetch from 'cross-fetch' // mocked __mocks__/cross-fetch.js
import userService from './service.user'
import { LocalStorageMock } from '../../testing/testUtils'
global.localStorage = new LocalStorageMock()

test('login(username,password) calls api via fetch', async () => {
	const testUsername = 'testu'
	const testPassword = 'testp'

	const data = await userService.login(testUsername, testPassword)

	const calls = crossFetch.default.mock.calls;
	expect(calls.length).toBe(1)
	expect(calls[0][0]).toBe('http://172.16.117.140/authenticate_user')
	expect(calls[0][1].method).toBe('POST')
	expect(calls[0][1].body).toBe(`username=${testUsername}&password=${testPassword}`)
	expect(calls[0][1].headers['Content-Type']).toBe('application/x-www-form-urlencoded; charset=utf-8')
	expect(Object.entries(calls[0][1].headers).length).toBe(1)
});


describe('local storage', () => {

	const testUsername = 'testu'
	const testJWT = 'testJWT'

	beforeEach(() => {
		userService.persistUser(testUsername, testJWT)
	});

	test('persist(username,token) stores username,JWT,isLoggedIn to localStorage', () => {
		expect(localStorage.getItem('username')).toBe(testUsername);
		expect(localStorage.getItem('JWT')).toBe(testJWT);
	})

	test('logout() clears localStorage values', () => {
		expect(localStorage.getItem('username')).toBe(testUsername);
		expect(localStorage.getItem('JWT')).toBe(testJWT);

		userService.logout()

		expect(localStorage.getItem('username')).toBe(null);
		expect(localStorage.getItem('JWT')).toBe(null);
	})
})



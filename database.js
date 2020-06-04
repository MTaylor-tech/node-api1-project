const shortid = require('shortid')

let users = [
	{ id: "69hGox3f1", name: "Jane Doe", bio: "Not Tarzan's Wife, another Jane", },
	{ id: "HT_boNXJvq", name: "John Doe", bio: "Doesn't even know Jane", },
	{ id: "WDnnjrZWpI", name: "Jack Doe", bio: "Jane's older brother" },
]

function getUsers() {
	return users
}

function getUserById(id) {
	return users.find(u => u.id === id)
}

function createUser(data) {
	const payload = {
		id: shortid.generate(),
		...data,
	}

	users.push(payload)
	return payload
}

function updateUser(id, data) {
	const index = users.findIndex(u => u.id === id)
	users[index] = {
		...users[index],
		...data,
	}

	return users[index]
}

function deleteUser(id) {
	users = users.filter(u => u.id != id)
  return true
}

module.exports = {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
}

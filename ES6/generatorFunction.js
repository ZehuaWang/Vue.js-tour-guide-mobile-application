function* ask() {
	const name = yield "What is your name ?";
	const sport= yield "What is your favorite sport ?";
	return `${name} like ${sport}`
}

const it = ask();
console.log(it.next());
console.log(it.next('Ethan'));
console.log(it.next('Basketball'));
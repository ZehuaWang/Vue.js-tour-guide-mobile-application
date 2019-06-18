// The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
const myPromise = new Promise( (resolve, reject) => {
	if(Math.random() * 100 <= 90) {
		resolve('Hello, Promise');
	}

	reject(new Error('In 10% of the case, I fail. Miserably'));

})
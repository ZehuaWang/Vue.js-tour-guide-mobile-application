//https://stackoverflow.com/questions/29480569/does-ecmascript-6-have-a-convention-for-abstract-classes
class Abstract {
    constructor() {
        if (new.target === Abstract) {
            throw new TypeError("Can not construct Abstract instances directly");
        }
    }
}

class Derived extends Abstract {
    constructor() {
        super();
    }    
}

//const a = new Abstract();
const b = new Derived();
console.log(b.constructor);
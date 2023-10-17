function validateProperty(obj, propValidator) {
    const propName = propValidator.name;
    const validators = propValidator.validators;

    if (obj.hasOwnProperty(propName)) {
        for (const validator of validators) {
            if (!validator(obj[propName])) {
                return false;
            }
        }
        return true;
    }

    return false;
}

function copyProperties(obj, propValidators) {
    return propValidators.reduce((result, validator) => {
        const propName = validator.name;
        if (validateProperty(obj, validator)) {
            result[propName] = obj[propName];
        }
        return result;
    }, {});
}

Object.prototype.copyProperties = function (propValidators) {
    return copyProperties(this, propValidators);
};

Array.prototype.associateWith = function (transformation) {
    return this.reduce((result, element) => {
        result[element] = transformation(element);
        return result;
    }, {});
};

function checkUsersValid(goodUsers) {
    return function (testUsers) {
        return testUsers.every(testUser =>
            goodUsers.some(goodUser => goodUser.id === testUser.id)
        );
    };
}

function Spy(target, method) {
    const originalMethod = target[method];
    const spy = { count: 0 };
    target[method] = function () {
        spy.count++;
        return originalMethod.apply(this, arguments);
    };
    return spy;
}

function copyProperties(obj, propValidators) {
    return propValidators.reduce((result, validator) => {
        const propName = validator.name;
        if (validateProperty(obj, validator)) {
            result[propName] = obj[propName];
        }
        return result;
    }, {});
}

// Test Cases
const validators = [
    {
        name: "p1",
        validators: [s => typeof s == 'string' && s.length > 2, s => s[0] == "a"]
    },
    {
        name: "p2",
        validators: [s => Number.isInteger(s)]
    }
];

const obj1 = { p1: "a" };
const obj2 = { p1: 123 };
const obj3 = { p1: "abc", p2: 123 };

console.log(copyProperties(obj1, validators)); // {}
console.log(copyProperties(obj2, validators)); // {}
console.log(copyProperties(obj3, validators)); // { p1: 'abc', p2: 123 }
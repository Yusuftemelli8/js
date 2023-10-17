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
  
  const validators = [
    {
      name: "p1",
      validators: [s => typeof s === 'string' && s.length > 2, s => s[0] === "a"]
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
  
  console.log(obj1.copyProperties(validators)); // {}
  console.log(obj2.copyProperties(validators)); // {}
  console.log(obj3.copyProperties(validators)); // { p1: 'abc', p2: 123 }
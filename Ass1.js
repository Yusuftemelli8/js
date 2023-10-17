function validateProperty(obj, propValidator) {
    const { name, validators } = propValidator;
    if (obj.hasOwnProperty(name)) {
      for (const validator of validators) {
        if (!validator(obj[name])) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  
  // Tests for validateProperty
  const validator = {
    name: "p1",
    validators: [s => typeof s == 'string' && s.length > 2, s => s[0] == "a"]
  };
  
  const obj1 = { p1: "abc" };
  const obj2 = { p2: 123 };
  const obj3 = { p1: "a", p2: 123 };
  
  console.log(validateProperty(obj1, validator)); // true
  console.log(validateProperty(obj2, validator)); // false
  console.log(validateProperty(obj3, validator)); // false
  
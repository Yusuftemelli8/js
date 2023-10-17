Array.prototype.associateWith = function (transformation) {
    return this.reduce((result, element) => {
      result[element] = transformation(element);
      return result;
    }, {});
  };
  
  const numbers = ["six", "one", "seven", "four"];
  const result = numbers.associateWith(str => str.length);
  
  console.log(result);
  // Output: { six: 3, one: 3, seven: 5, four: 4 
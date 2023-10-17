function checkUsersValid(goodUsers) {
    return function (testUsers) {
      return testUsers.every((testUser) => {
        return goodUsers.some((goodUser) => goodUser.id === testUser.id);
      });
    };
  }
  
  var goodUsers = [
    { id: 1 },
    { id: 2 },
    { id: 3 }
  ];
  
  var testAllValid = checkUsersValid(goodUsers);
  
  console.log(testAllValid([
    { id: 2 },
    { id: 1 }
  ]));
  // Output: true
  
  console.log(testAllValid([
    { id: 2 },
    { id: 4 },
    { id: 1 }
  ]));
  // Output: false
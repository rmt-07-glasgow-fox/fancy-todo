function nameSplit(fullName) {
  let firstName, lastName;
  if (fullName) {
    firstName = fullName.split(" ").slice(0, -1).join(" ");
    lastName = fullName.split(" ").slice(-1).join(" ");
  } else {
    firstName = username;
    lastName = "";
  }

  return { firstName, lastName };
}

module.exports = nameSplit;

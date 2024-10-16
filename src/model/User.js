class User {
  constructor(
    id = null,
    firstname = null,
    lastname = null,
    day = null,
    month = null,
    year = null,
    email = null,
    token = null,
  ) {
    this.id = id;
    this.lastname = lastname;
    this.firstname = firstname;
    this.email = email;
    this.dob = { day: day, month: month, year: year };
    this.token = token;
  }
}

export default User;

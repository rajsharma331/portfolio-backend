import bcrypt from "bcrypt";

const password = "Admin@12345";

bcrypt.hash(password, 10).then((hash) => {
  console.log(hash);
});
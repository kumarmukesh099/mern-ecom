import bcrypt from 'bcryptjs';

const users = [
    {
        name: "test",
        email: "test@gmail.com",
        password: bcrypt.hashSync('123456',10),
        isAdmin: true
    },
    {
        name: "Ram",
        email: "ram@gmail.com",
        password: bcrypt.hashSync('123456',10)
    },
    {
        name: "Shyam",
        email: "shyam@gmail.com",
        password: bcrypt.hashSync('123456',10)
    },
    {
        name: "Dhaam",
        email: "dhaam@gmail.com",
        password: bcrypt.hashSync('123456',10)
    },
    {
        name: "Home",
        email: "home@gmail.com",
        password: bcrypt.hashSync('123456',10)
    },
]

export default users;
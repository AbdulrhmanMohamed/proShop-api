import bcryptjs from 'bcryptjs'
const users=[
    {
        name:'admin',
        email:"admin@gmail.com",
        password:bcryptjs.hashSync('123',10),
        isAdmin:true,
    },
    {
        name:'user1',
        email:"user1@gmail.com",
        password:bcryptjs.hashSync('123',10),
        
    },
    {
        name:'user2',
        email:"user2@gmail.com",
        password:bcryptjs.hashSync('123',10),
    },
]

export default users
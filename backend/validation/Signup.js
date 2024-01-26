const zod = require('zod')

const validSignup = zod.object({
    Username:zod.string().min(1),
    Firstname:zod.string().min(1),
    Lastname:zod.string().min(1),
    password:zod.string().min(1)
})

const updateInfo = zod.object({
    Username:zod.string().optional(),
    Firstname:zod.string().optional(),
    Lastname:zod.string().optional()
})

module.exports={
    validSignup,
    updateInfo
}
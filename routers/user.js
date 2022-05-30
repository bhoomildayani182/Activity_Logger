const express = require('express')
const User = require('../src/models/user')
const auth = require('../src/middleware/auth')
const router = new express.Router()
const multer = require('multer')
const sharp = require('sharp')
const { sendWelcomeEmail, sendGoodbyeEmail } = require('../src/emails/account')

//Create User
router.post('/users', async (req, res)=>{
    const user = new User(req.body)

    try{
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})


router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)

        const token = await user.generateAuthToken()
        // res.send({ user: user.getPublicProfile(), token }) Instead of this we can write below line and make function models/user named toJSON to work exactly like above
        res.send({ user, token })
    } catch (e){
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) =>{
    try{  
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })

        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


router.post('/users/logoutAll', auth, async (req, res) =>{
    try{  
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


//Read All Users
router.get('/users/me', auth, async (req, res)=>{
    //for read perticular user which tiken would be provided in postman
    res.send(req.user)

    //for read all users
    // try{
    //     const users = await User.find({})
    //     res.send(users)
    // } catch(e){
    //     res.status(500).send(e)
    // }
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image!'))
        }

        cb(undefined, true)
    }
})

router.post('/users/me/avatar',auth, upload.single('avatar'), async (req, res)=>{
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next)=>{
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res)=>{
    try{
        req.user.avatar = undefined
        await req.user.save()
        res.send()
    } catch(error){
        res.status(400).send({error: error.message})
    }
    
})

router.get('/users/:id/avatar', async (req, res)=>{
    try{
        const user = await User.findById(req.params.id)
        
        if(!user|| !user.avatar){
            throw new Error()
        }
        
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (error){
        res.status(404).send({erroe: error.message})
    }
})


// //Read an User whom's id provided
// router.get('/users/:id', async (req, res)=>{
    //     const _id = req.params.id
    
    //     try{
        //         const user = await User.findById(_id)
        
        //         if(!user){
            //             return res.status(404).send()
            //         }

//         res.send(user)
//     } catch(e) {
//         res.send(500).send(e)
//     }
// })

//Updating Users

router.patch('/users/me', auth, async (req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name' , 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!'})
    }
    
    try{
        // const user = await User.findById(req.params.id)
        
        updates.forEach((update)=> req.user[update] = req.body[update])
        
        await req.user.save()
        // res.send(user)
        
        // const user = await User.findByIdAndUpdate(req.params.id, req.body,  { new: true, runValidators: true})
        
        // if(!req.user) {
            //     return res.status(404).send()
            // }
            
            res.send(req.user)
        } catch (e){
        res.status(400).send(e)
    }
})

//Deleting an User
router.delete('/users/me', auth, async (req, res)=>{
    try{
        // const user = await User.findByIdAndDelete(req.user._id)
        
        // if(!user) return res.status(404).send()\

        await req.user.remove()
        sendGoodbyeEmail(req.user.email, req.user.name)

        res.send(req.user)

    } catch(e) {
        res.status(500).send(e)
    }
})


module.exports = router

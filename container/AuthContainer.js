import Auth from '../models/AuthModels.js'
import bcrypt from 'bcrypt'
import { getToken } from '../Jwt/JwtSignl.js'
import mongoose from 'mongoose'
const Object = mongoose.Types.ObjectId





// login in ..... first requires....
// POST /// 
export const login = async (req, res) => {

    const { email, password } = req.body



    try {
        const user = await Auth.findOne({ email })
        if (!user) return res.status(404).json({
            message: `we have someEmail ${email}`
        })
        else {


            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(404).json({ message: `not match password...` })


            return res.json({
                token: getToken(user._id),
                data: {
                    _id: user._id,
                    name: user.name,
                    telephone: user.telephone,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    country: user.country,
                },

            })




        }
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }

}




// create User
// POST
export const singup = async (req, res) => {

    const {
        name,
        email,
        telephone,
        country,
        password,
    } = req.body

    try {
        let user = await Auth.findOne({ email })
        if (user) return res.status(404).json({ message: `We have the same ${email} you can log in ` })
        const hasPassword = await bcrypt.hash(password, 10)
        user = new Auth({

            name,
            email,
            telephone,
            country,
            password: hasPassword
        })

        const newUser = await user.save()
        return res.json({
            token: getToken(newUser._id),
            data: {
                _id: newUser._id,
                name: newUser.name,
                telephone: newUser.telephone,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                country: newUser.country,
            }

        })



    } catch (error) {

        return res.status(404).json({ message: error.message })
    }
}





// user id... 
export const userId = async (req, res) => {

    try {

        let user = await Auth.findById({ _id: req.user._id }).select('-password')

        if (user) return res.status(200).json(user)
        else res.status(200).json({ message: 'we have not user id' })

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}



// list users
export const listUsers = async (req,res)=>{
    try{
        let auth = await Auth.find({})

        if(auth) return res.status(200).json({
            listUser : auth.length,
            data : auth
        })
    }catch(error){
        return res.status(404).json({
            message : error.message
        })
    }
}










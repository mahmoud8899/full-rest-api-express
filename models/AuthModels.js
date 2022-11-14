import  mongoose from 'mongoose'

const AuthSchema = mongoose.Schema({

    name: { type: String, requires: true },
    email: { type: String, },
    telephone: { type: String, },
    country : { type: String, },
    password: { type: String },

    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },

},
    {
        timestamps: true
    }
)




const Auth = mongoose.model('User', AuthSchema)
export default Auth
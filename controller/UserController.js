const User = require('../model/User');
const CommonHelper = require('../helpers/common');
const AuthHelper = require('../helpers/auth')

module.exports = {
    register: async function (req, res) {
        try {
            const {name, email, password} = req.body
            const emailExist = await User.findOne({email: email});
            console.log('emailExist',emailExist)
            if(emailExist) return res.status(400).send({ success: false, message: 'EmailAlreadyExist', data: null});
            const hashedPassword = await CommonHelper.bcryptPassword(password)
            const user = new User({
                name: name ? name : '',
                email: email,
                password: hashedPassword
            })
            await user.save();
            res.status(200).send({ success: true, message: 'Registration Successfull', data: user._id})
        } catch (error) {
            res.status(500).send({ success: false, message: 'SomethingWentWrong', data: error})
        }
    },
    login: async function (req, res) {
        try {
            const { email, password} = req.body;
            const user = User.findOne({email: email});
            if(!user) return res.status(404).send({ success: false, message: 'NoEmailRegisterd', data: null})
            if(!CommonHelper.comparePassword(req.body.password, user.password)) return res.status(401).send({ success: false, message: 'InvalidEmailOrPassword', data: null });
            token = AuthHelper.generateToken(user);
            res.status(200).send({ success: true, message: 'Registration Successfull', data: { user: user._id, token: token }})
        } catch (error) {
            res.status(500).send({ success: false, message: 'SomethingWentWrong', data: error})
        }
    }
}
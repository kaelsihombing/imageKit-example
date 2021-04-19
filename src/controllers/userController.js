const User = require('../models/user')

exports.registerUser = async(req, res) => {
    try {
        let result = await User.register(req)
        if (result.success === true) {
            return res.status(201).json({
                success: true,
                data: result.data
            })
        }
    } catch(err){
        return res.status(400).json({
            success: false,
            data: err.message
        })
    }
}
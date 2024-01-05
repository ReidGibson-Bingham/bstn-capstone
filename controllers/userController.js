const userModel = require('./../models/userModel');

const authenticateUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.authenticateUser(email)
        if (user) {
            if (user.password === password) {
                res.status(200).json({ user });
            } else {
                res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    authenticateUser
}
import User from '../models/user.model.js'

export const register = async (req, res) => {

    const {email, password, username} = req.body;

    try {
        
        const newUser = new User({
            email,
            username,
            password,
        });

        const userSaved = await newUser.save();
        res.json(userSaved);

    } catch (err) {

        console.error(err);

    }
};

export const login = (req, res) => res.send('login');
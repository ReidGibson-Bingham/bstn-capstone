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

const getFavouriteIds = async (_req, res) => {

    try {
        const favourites = await userModel.getFavourites();
        if (favourites) {
            res.status(200).json(favourites)
        } else {
            res.status(404).send('favourites not found');
        }
    } catch (err) {
        res.status(500).send(`Error retrieveing favourites: ${err}`);
    }
}

const postFavouriteId = async (req, res) => {
    const { favouriteId } = req.body;

    try {
        // Check if favouriteId already exists in userFavouriteIds
        const existingFavourites = await userModel.getFavourites();
        if (existingFavourites && existingFavourites.includes(favouriteId)) {
            // If the favouriteId already exists, return a conflict status (409)
            res.status(409).send('Favourite id already exists');
        } else {
            // If the favouriteId doesn't exist, save it
            const newFavourite = await userModel.saveFavourite(favouriteId);
            res.status(201).json(newFavourite);
        }
    } catch (err) {
        res.status(500).send(`Error posting Favourite id: ${err}`);
    }
}

module.exports = {
    authenticateUser, 
    getFavouriteIds,
    postFavouriteId
}
const User = require("../models/UserModel");

module.exports.addToLikedMovies = async (req, res) => {
    try {
        console.log("req",req.body);
        const { email, obj } = req.body;
        console.log(email);
        const user = await User.findOne({ email });
        console.log("user",user);
        if (user) {
            const { likedMovies } = user;
            console.log("liked",likedMovies);
            const movieAlreadyLiked = likedMovies.find(({data:{ id }}) => (id === obj.data.id))
            if (!movieAlreadyLiked) {
                console.log("ebin");
                await User.findByIdAndUpdate(user._id, {
                    likedMovies: [...user.likedMovies, obj],
                },
                    { new: true });
            } else return res.json({ msg: "Movie Already Added To The Liked List" })
        } else await User.create({ email, likedMovies: [obj] });
        return res.json({ msg: "Movie Added Successfully" })
    } catch (error) {
        res.json({ msg: "Error adding movie" })
    }
}

module.exports.getLikedMovies = async (req, res) => {
    try {
        const { email } = req.params;
        console.log(email)
        const user = await User.findOne({ email });

        if (user) {
            console.log(user)
            return res.json({ msg: "success", movie: user.likedMovies })
        } else {
            console.log("not found")
            res.json({ msg: "user with given email not found" })
        }
    } catch (error) {
        return res.json({ msg: "Error Fetching Movie" })
    }
}

module.exports.removeFromLikedMovies = async (req, res) => {
    try {
        const { email, movieId } = req.body;
        console.log("movieid",movieId);
        const user = await User.findOne({ email });
        if (user) {
            const { likedMovies } = user;
            const movieIndex = likedMovies.findIndex(({data:{ id}} ) => (id === movieId))
            console.log(movieIndex);
            likedMovies.splice(movieIndex, 1)
            await User.findByIdAndUpdate(user._id, {
                likedMovies,
            },
                { new: true }
                );
                return res.json({ msg: "Movie deleted", movies: likedMovies })
        }else{
            return res.json({msg:"error"})
        }

    } catch (error) {
        console.log("err",error)
        return res.json({ msg: "Error deleting Movie" })
    }
}
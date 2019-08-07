const express = require("express");
const router = express.Router();
const config = require("config");
const axios = require("axios");
const auth = require("../../middleware/auth");
const tmdb = require("../../utils/TMDb");

//  @route  Get api/movies/genres
//  @desc   Save genres to profile
//  @access Public (no token needed)

router.post("/", auth, async (req, res) => {
    // Get a random number to insert into page number query. To change which page we receive between 1 and 20:
    const randomNumber = tmdb.getRandomNumber(1, 20);
    let configGenres = config.get("genres");

    // Get genres from profile:
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
        return res.status(400).json({ msg: "This profile does not exist" });
    }

    profile.genres = req.body;
    profile.save;

    return res.json({ genres: req.body });
});

//  @route  Get api/movies/getMovies
//  @desc   Get movies from TMDb
//  @access Public (no token needed)

router.post("/getMovies", auth, async (req, res) => {
    // Get a random number to insert into page number query. To change which page we receive between 1 and 20:
    const randomNumber = tmdb.getRandomNumber(1, 20);
    let configGenres = config.get("genres");

    // Get genres from profile:
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
        return res.status(400).json({ msg: "This profile does not exist" });
    }

    // Make request to get movies from TMDb for each genre in profile:

    // Iterate through profile genres and get movies from the API:

    const allMovies = profile.genres.map(genre => {
        return new Promise((resolve, reject) => {
            /*
                     TODO list:

                     Check to see if a genre is random, if so, randomly select a genre to search using an id

                     Also, randomly select a movie from the results so I don't send too much unesscessary information. Saving bandwidth/money/time.

            */

            let options = {};

            if (genre.get("name") === "Random") {
                let anotherNumber = tmdb.getRandomNumber(0, 18);
                // Prepare options for request to API:
                options = {
                    url: `https://api.themoviedb.org/3/discover/movie?api_key=${config.get(
                        "tmdbSecret"
                    )}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${randomNumber}&with_genres=${
                        configGenres[anotherNumber].id
                    }`,
                    method: "get"
                };
            } else {
                options = {
                    url: `https://api.themoviedb.org/3/discover/movie?api_key=${config.get(
                        "tmdbSecret"
                    )}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${randomNumber}&with_genres=${genre.get(
                        "id"
                    )}`,
                    method: "get"
                };
            }

            // Make request with options:
            let movies = axios(options)
                .then(response => {
                    let num = tmdb.getRandomNumber(0, 19);
                    let result = {
                        genre: genre.get("name"),
                        results: response.data.results[num]
                    };
                    return result;
                })
                .catch(error => {
                    console.error(error);
                });

            return movies.then(result => resolve(result));
        });
    });

    Promise.all(allMovies)
        .then(results => {
            return res.json({ data: results });
        })
        .catch(error => {
            console.error(error);
            return res.status(500).send("Server Error");
        });
});

//  @route  Get api/movies/watched
//  @desc   Send selected movie to profile if watched
//  @access Private (token needed)

router.post("/watched", auth, async (req, res) => {
    const profileMovies = await Profile.findOne({ user: req.user.id });

    if (!profileMovies) {
        return res.status(404).json({ msg: "This profile does not exist!" });
    }

    try {
        //  Query Selected movie:
        let selectedMovie = req.body.movie.id;
        let profile = await Profile.findOne({ user: req.user.id });

        // Iterate through each object to find right movie:
        let movie = await Profile.findOne({
            user: req.user.id,
            "movies._id": req.body.movie.id
        });

        if (req.body.watched) {
            // If true do this, then user has watched the movie. Add to profile if it doesn't exist there already:

            if (!movie) {
                // This movie does not exist in this user's profile
                let subDoc = {};
                subDoc.completed = req.body.watched;
                subDoc.poster = req.body.movie.poster_path;
                subDoc.title = req.body.movie.title;
                subDoc._id = req.body.movie.id;
                subDoc.overview = req.body.movie.overview;
                subDoc.date_watched = Date.now();

                console.log(subDoc);

                myProfile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $push: { movies: subDoc } },
                    { upsert: true }
                );

                return res.json({ msg: "Movie added to watched list" });
            }

            return res.json({ msg: "Movie already in the database!" });
        } else {
            // If false, user has not watched movie, remove from profile if it exists:
            if (!movie) {
                return res.json({ msg: "Movie isn't in your watch list!" });
            }

            // Remove movie from profile:
            let parent = await Profile.findOne({ user: req.user.id });
            parent.movies.id(req.body.movie.id).remove();
            parent.save();

            return res.json({ msg: "Movie has been removed!" });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
});

module.exports = router;

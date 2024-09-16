const express = require("express");
const axios = require("axios");
const router = express.Router();

const app = express();

app.use(express());

router.get("/comics", async (req, res) => {
  try {
    // console.log(req.query);
    let { title, page } = req.query;
    if (!page) page = 0;
    console.log(title);

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${
        process.env.API_KEY
      }&title=${title}&limit=100&skip=${Number(page) * 100}`
    );
    res.json(response.data);
    // console.log(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/characters", async (req, res) => {
  try {
    console.log(req.query);
    const { name, page } = req.query;
    if (!page) page = 0;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${
        process.env.API_KEY
      }&name=${name}&page=${page}&limit=100&skip=${Number(page) * 100}`
    );
    res.json(response.data);
    // console.log(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.get("/characters/:comicsId", async (req, res) => {
//   try {
//     const comicsId = req.params.comicsId;
//     console.log(comicsId);
//     const response = await axios.get(
//       `https://lereacteur-marvel-api.herokuapp.com/comic/${comicsId}?apiKey=${process.env.API_KEY}`
//     );
//     res.json(response.data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

module.exports = router;

import express from 'express';
import  {fileURLToPath} from 'url'; 
import { dirname } from 'path';
import bodyParser from 'body-parser';
import fs from 'fs';
import axios from 'axios';

const app = express();
const port = 3000;
const movie_url = "http://www.omdbapi.com/?apikey=81b1a69a&";
const post_api = "http://localhost:4000"
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('login');
})

app.use(express.static('public'));
app.use(express.static('src'));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/Home', (req, res) => {
    res.sendFile(__dirname+'/public/index.html');
})

app.post('/Home', (req, res) => {
    res.sendFile(__dirname+'/public/index.html');
})

app.post('/search', async (req, res) => {
    const film = req.body['moviename'];
    try {
        const result = await axios.get(movie_url+'t='+film);
        res.render('search.ejs', {
            moviedata: result.data
        })
    } catch (error) {
        console.log('Error: ', error);
    }
});

app.get('/review', (req, res) => {
    res.render('review.ejs');
})

app.post('/submit', (req, res) => {
    res.render('review.ejs',{
        film: req.body['filmname'],
        review: req.body['review']
    });
    if(req.body['filmname']){
        fs.appendFileSync('reviewdata.txt', `Film name: ${req.body['filmname']} \n Review: ${req.body['review']}\n\n`);
    }
});

app.get('/post', async(req, res) => {
    try{
        const result = await axios.get(`${post_api}/post`);
        let htmlContent = fs.readFileSync(__dirname + '/src/post.html', 'utf8');
        const  movieBlogPosts = result.data; 
        htmlContent = htmlContent.replace('movieBlogPosts', JSON.stringify(movieBlogPosts));
        res.send(htmlContent);
    }catch{
        res.status(500).json({message: "Error fetching posts"});
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
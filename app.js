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

//get all blogs
app.get('/blogs', async(req, res) => {
    try{
        const result = await axios.get(`${post_api}/posts`);
        let htmlContent = fs.readFileSync(__dirname + '/src/post.html', 'utf8');
        const  movieBlogPosts = result.data; 
        htmlContent = htmlContent.replace('movieBlogPosts', JSON.stringify(movieBlogPosts));
        res.send(htmlContent);
    }catch{
        res.status(500).json({message: "Error fetching posts"});
    }
});

//get blog by indx
app.get('/blogs/edit/:id', async(req, res) => {
    const indx = req.params.id;
    try {
        const result = await axios.get(`${post_api}/posts/${indx}`);
        let htmlContent = fs.readFileSync(__dirname + '/src/edit.html', 'utf8');
        htmlContent = htmlContent.replace('editData', JSON.stringify(result.data));
        res.send(htmlContent);
    } catch (error) {
        res.status(500).json({message: "Error fetching post"});
    }
})

//get new blog page
app.get('/new', (req, res) => {
    res.sendFile(__dirname+'/src/new.html');
});

//post a new blog
app.post('/blogs', async(req, res) => {
    console.log(req.body);
    try {
        const result = await axios.post(`${post_api}/new`, req.body);
        let htmlContent = fs.readFileSync(__dirname + '/src/post.html', 'utf8');
        const  movieBlogPosts = result.data; 
        htmlContent = htmlContent.replace('movieBlogPosts', JSON.stringify(movieBlogPosts));
        res.send(htmlContent);
    } catch (error) {
        res.status(500).json({ message: "Error adding post" });
    }
});

//delete a blog
app.get('/blogs/delete/:id', async(req, res) => {
    const id=req.params.id;
    try {
        await axios.delete(`${post_api}/delete/${id}`);
        res.redirect('/blogs');
    } catch (error) {
        res.status(500).json({ message: "Error deleting post" });
    }
});

//edit a blog
app.post('/blogs/edit', async(req, res) => {
    try {
        const result = await axios.patch(`${post_api}/post`, req.body);
        res.redirect('/blogs');
    } catch (error) {
        res.status(500).json({ message: "Error editing post" });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
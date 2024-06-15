import bodyParser from "body-parser";
import express from "express";
import pkg from 'body-parser';

const port = 4000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const date = new Date();
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];  

//get all blogs
app.get('/posts', (req, res) => {
    res.json(movieBlogPosts);
})

//get blog by id
app.get('/posts/:id', (req, res) => {
  const indx = req.params.id;
  if( indx >= 0 && indx < movieBlogPosts.length){
    res.json(movieBlogPosts[indx]);
  }
  else{
    res.status(404).send('Post not found');
  }
});

//add new blog
app.post('/new', (req, res) => {
  const data = {
    postTitle: req.body.title,
    postDate: `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
    author: req.body.author,
    postContent: req.body.content
  }
  movieBlogPosts.push(data);
  res.json(movieBlogPosts);
});

//delete a blog
app.delete('/delete/:id', (req, res) => {
  const indx = req.params.id;
  movieBlogPosts.splice(indx, 1);
  res.json(movieBlogPosts);
});

// edit blog
app.patch('/post', (req, res) => {
  console.log(req.body)
  const data = {
    postTitle: req.body.title,
    postDate: `Updated on ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
    author: req.body.author,
    postContent: req.body.content
  }
  movieBlogPosts.push(data);
  res.json(movieBlogPosts);
});

app.listen(port, (req, res) =>{
    console.log(`Server running on port ${port}`)
});

var movieBlogPosts = [
    {
      postTitle: "The Art of Storytelling: Unraveling the Narrative Threads",
      postDate: "May 5, 2024",
      author: "Storyteller99",
      postContent: `
        Join us on a journey through the captivating world of storytelling as we unravel the narrative threads that bind us to the silver screen. From classic epics to modern masterpieces, we explore the art of crafting compelling tales that resonate with audiences across generations.
        
        *The Godfather* (1972) - Francis Ford Coppola's magnum opus is a cinematic triumph, weaving a tale of power, family, and redemption against the backdrop of organized crime. With its rich character development and gripping storyline, *The Godfather* remains a timeless classic that continues to influence filmmakers to this day.
        
        *Citizen Kane* (1941) - Orson Welles' groundbreaking masterpiece redefined the possibilities of cinema with its innovative narrative structure and groundbreaking cinematography. As we delve into the enigmatic life of Charles Foster Kane, we uncover the layers of mystery and intrigue that have made *Citizen Kane* a touchstone of cinematic excellence.
        
        *Pulp Fiction* (1994) - Quentin Tarantino's genre-defying tour de force is a frenetic journey through the seedy underbelly of Los Angeles, where crime, violence, and dark humor collide with electrifying results. With its nonlinear storytelling and unforgettable characters, *Pulp Fiction* continues to captivate audiences with its bold and audacious vision.
        
        As we explore these timeless tales, we're reminded of the power of storytelling to transport us to worlds beyond our imagination and touch the depths of our souls. Join us next time as we continue our exploration of the stories that define us and the medium that brings them to life.
      `
    },
    {
      postTitle: "The Language of Cinema: Exploring Visual and Narrative Techniques",
      postDate: "July 20, 2024",
      author: "FilmBuff88",
      postContent: `
        Lights, camera, action! In today's installment, we dive deep into the language of cinema, exploring the visual and narrative techniques that shape our cinematic experience. From camera angles to editing techniques, we examine the tools filmmakers use to convey meaning, evoke emotion, and immerse audiences in their stories.
        
        *The Shawshank Redemption* (1994) - Frank Darabont's poignant prison drama is a masterclass in visual storytelling, using composition, lighting, and mise-en-scène to convey the emotional journey of its characters. Through subtle gestures and nuanced performances, *The Shawshank Redemption* invites viewers to reflect on the power of hope, redemption, and the resilience of the human spirit.
        
        *Memento* (2000) - Christopher Nolan's mind-bending thriller challenges conventional storytelling conventions with its unique narrative structure and innovative use of non-linear editing. By immersing viewers in the fragmented memories of its protagonist, *Memento* blurs the lines between past and present, truth and perception, leaving audiences questioning their own understanding of reality.
        
        *The Grand Budapest Hotel* (2014) - Wes Anderson's whimsical comedy is a visual feast for the eyes, with its vibrant color palette, meticulous set design, and symmetrical framing. Through its distinctive visual style and offbeat humor, *The Grand Budapest Hotel* transports viewers to a whimsical world of eccentric characters and delightful absurdity.
        
        As we dissect these cinematic gems, we gain a deeper appreciation for the artistry and craftsmanship that goes into creating unforgettable movie moments. Join us next time as we continue our exploration of the language of cinema and the stories it has yet to tell.
      `
    }
];
  
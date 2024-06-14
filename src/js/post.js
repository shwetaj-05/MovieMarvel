var postData = document.getElementById('demo');

postData.style.display="none";

postData = JSON.parse(postData.innerHTML)

$(function(){
    $("#nav-bar").load('nav.html');
});

const ul = document.getElementById('postsList');
var id=0;
postData.forEach(post => {

    const li = document.createElement('li'); 
    const title = document.createElement('h2');
    const date = document.createElement('small');
    const content = document.createElement('p');
    const author = document.createElement('small');
    const edit = document.createElement('a');
    const remove = document.createElement('a');

    edit.id='edit';
    remove.id='remove';
    edit.href=`blogs/edit/${id}`;
    remove.href=`blogs/delete/${id}`;

    title.textContent=post.postTitle;
    date.textContent=post.postDate;
    content.textContent=post.postContent;
    author.textContent=post.author;
    edit.textContent="edit";
    remove.textContent="delete";

    li.append(title, date, content, author, edit, remove);
    ul.append(li);

    id=id+1
});
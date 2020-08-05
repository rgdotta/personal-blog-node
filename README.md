# PERSONAL BLOG NODE

Personal blog with comment section developed on Node.js.

## Download

On the designated folder, clone the repository in the terminal with the following code:

```
$ git clone https://github.com/rgdotta/personal-blog-node.git
```

### Install

To install the dependencies, on the repository folder, type the following code on the terminal:

```
$ npm install
```

After that, start the local server with:

```
$ npm start
```

The aplication will start on: https://localhost:3000/

## Technologies:

- ES6+
- Node.js
- MongoDB with mongoose
- EJS
- Bcrypt
- Nodemailer
- Bootstrap

## Next steps:

This is still a work in progress, here is what is in my plans fot this project:

- Add page limiter to home.
- Overall css style.

## Screenshots

### Home

![](assets/css/images/blog1.png)

### Post

![](assets/css/images/blog-post1.png)

You can search by title or the post content.

![](assets/css/images/blog-searchx.png)

### Comment Section

![](assets/css/images/comment-section.png)


### All CRUD methods are aplied.

Create:

![](assets/css/images/blog-create.png)

Read:

![](assets/css/images/blog-read.png)

Update:

![](assets/css/images/blog-update.png)

Delete:

![](assets/css/images/blog-delete%20(1).png)

### Authentication

The authentication is done with bcrypt and environment variables. Because of the simplicity of the blogger options, there's no need to mantain a session.

![](assets/css/images/blog-authent.png)

----

![](assets/css/images/blog-blogger.png)

----

Edit:

![](assets/css/images/blog-edit.png)

----

Delete:

![](assets/css/images/blog-delete.png)

### Contact

Mail message delivery using nodemail.

![](assets/css/images/blog-nodemail.png)

![](assets/css/images/blog-contact.png)



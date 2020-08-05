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

![](public/css/images/blog1.png)

### Post

![](public/css/images/blog-post1.png)

You can search by title or the post content.

![](public/css/images/blog-searchx.png)

### All CRUD methods are aplied.

Create:

![](public/css/images/blog-create.png)

Read:

![](public/css/images/blog-read.png)

Update:

![](public/css/images/blog-update.png)

Delete:

![](public/css/images/blog-delete%20(1).png)

### Authentication

The authentication is done with bcrypt and environment variables. Because of the simplicity of the blogger options, there's no need to mantain a session.

![](public/css/images/blog-authent.png)

----

![](public/css/images/blog-blogger.png)

----

Edit:

![](public/css/images/blog-edit.png)

----

Delete:

![](public/css/images/blog-delete.png)

### Contact

Mail message delivery using nodemail.

![](public/css/images/blog-nodemail.png)

![](public/css/images/blog-contact.png)



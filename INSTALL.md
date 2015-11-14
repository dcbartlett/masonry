# Building from Source

To build your own copy of masonry from source, and link it as a globally installed module that you can use on your system to create masonry projects, follow the below.

```
npm install
gulp dist
cd dist
npm link --production
```

# Gulp Tasks

`gulp`
This will result in a help screen

`gulp docs`
This will build the Documentation in the _docs_ folder

`gulp dist`
This will build the masonry distribution files. These are minified and concatinated files meant to be used as a global module to run masonry-cli.

`gulp version`
This will allow you to version up the rev of Masonry when being published.

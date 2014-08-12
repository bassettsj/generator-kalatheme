<%= humanName %>
===================


> Created using [yeoman](http://yeoman.com) and [generator-kalatheme](https://github.com/kalamuna/generator-kalatheme).

### Description

<%= description %>

<% if(buildSystem){ %>
### Using

```bash
$ npm install -g gulp bower
$ npm install
$ bower install
```

```bash
gulp scripts #compile and bundle js
gulp styles #compile css and style guide
gulp compile #both
gulp clean #delete
gulp deploy #push out to github
```


<% } %>

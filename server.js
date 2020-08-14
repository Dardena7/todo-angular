const express = require('express');
const app = express();

app.use(express.static("./dist/todo-spring"));

app.get("/*", function(req, res) {
    res.sendFile('index.html', {root: 'dist/todo-spring'}
  );
});

app.listen(process.env.PORT || 8080);
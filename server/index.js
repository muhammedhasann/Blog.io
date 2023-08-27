const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const connectDB = require('./data/db');
const userRoles = require('./config/roles');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;

connectDB();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(userRoles.middleware());

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

const categoryRoutes = require('./routes/category');
const imageRoutes = require('./routes/image');
const postRoutes = require('./routes/post');
const tagRoutes = require('./routes/tag');

app.use('/category', categoryRoutes);
app.use('/image', imageRoutes);
app.use('/post', postRoutes);
app.use('/tag', tagRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

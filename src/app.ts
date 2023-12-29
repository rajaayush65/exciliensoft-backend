import express from 'express';
import session from 'express-session';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';

import exampleRouter from './routes/example.route';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(session({ secret: 'some-very-secret-key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/examples', exampleRouter);


import User from './models/example.model';

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);
  
  // Routes
  app.get('/authorize',
    passport.authenticate('oauth2-client-password', { session: false }),
    (req, res) => {
      // Handle authorization logic
      // You should implement your own logic to validate the user and redirect
      res.send('Authorization endpoint');
    }
  );
  
  app.post('/token',
    passport.authenticate('oauth2-client-password', { session: false }),
    (req, res) => {
      // Handle token issuance logic
      // You should implement your own logic to generate access and refresh tokens
      res.json({ access_token: 'your-access-token', refresh_token: 'your-refresh-token', token_type: 'Bearer' });
    }
  );
  
  app.post('/register', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the username is already taken
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists.' });
      }
  
      // Create a new user
      const newUser = new User({ username, password });
      await newUser.save();
  
      res.json({ message: 'User registered successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
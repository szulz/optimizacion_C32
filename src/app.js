const fs = require('fs');
const express = require('express');
const { json } = require('express');
const handlebars = require('express-handlebars')
const productRouter = require('./routes/product.router.js')
const profileRouter = require('./routes/profile.router.js');
const mailRouter = require('./routes/mail.router.js');
const sessionRouter = require('./routes/sessions.router.js');
const cartsRouter = require('./routes/carts.router.js')
const authRouter = require('./routes/auth.router.js');
const smsRouter = require('./routes/sms.router.js');
const mockingRouter = require('./routes/mocking.router.js');
const errorHandler = require('./middlewares/error.js')
const { chatRouter, connectSocket } = require('./routes/chat.router.js');
const passport = require('passport')
const startPassport = require('./config/passport.config.js');
const { MONGO_URL, PORT, ADMIN_EMAIL, ADMIN_PASSWORD, MODE, ADMIN_STATUS } = require('./config/env.config.js');
console.log(MODE);


//--------login----------
const session = require('express-session')
const MongoStore = require('connect-mongo');
//*************************

const myModules = require('./utils/utils.js')
const path = require('path');
const app = express();

// --------CONNECT TO MONGO--------

myModules.mongo()

// --------HANDLEBARS--------
app.engine('handlebars', handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// --------RUTAS--------

//*MONGOCOOKIES*
app.use(session({
  store: MongoStore.create({ mongoUrl: MONGO_URL, ttl: 7200 }),
  secret: 'SECRETO',
  resave: true,
  saveUninitialized: true
}));
//*fin cookies*

//*PASSPORT*
startPassport();
app.use(passport.initialize())
app.use(passport.session())

//*fin passport*

app.get('/session', (req, res) => {
  res.send(req.session)
})

app.use('/api/sessions', sessionRouter);
app.use('/products', productRouter);
app.use('/carts', cartsRouter);
app.use('/auth', authRouter)
app.use('/profile', profileRouter)
app.use('/mail', mailRouter)
app.use('/sms', smsRouter)
app.use('/chat', chatRouter)
app.use('/mockingproducts', mockingRouter)
app.use(errorHandler)

const httpServer = app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
});

connectSocket(httpServer)




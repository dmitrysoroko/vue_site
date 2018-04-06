import compression from 'compression'
import express from 'express'
import mysql from 'mysql'
import bodyParser from 'body-parser'
import logger from 'morgan'
import cors from 'cors'
import errorhandler from 'errorhandler'
import dotenv from 'dotenv'
import multer from 'multer'
import gm from 'gm'
import config from './config.json'

const app = express()

dotenv.load();
const upload = multer()

app.use(compression({ threshold: 0 }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

if (NODE_ENV === 'development') {
  app.use(logger('dev'));
  app.use(errorhandler())
}

app.use(require('./routes/anonymous-routes'));
app.use(require('./routes/protected-routes'));
app.use(require('./routes/user-routes'));

const con = mysql.createConnection(config)

con.connect((err) => {
	if (err) throw err
	con.query('SET NAMES utf8');
	con.query('SET CHARACTER SET utf8');
	setInterval(function () {
	    con.query('SELECT 2');
	}, 6000);
})

app.post('/api/query', (req, res) => {
	con.query(req.body.query, (error, result) => {
		if (error) throw error
		res.send(result)
	})
})

app.get('/api/getArticleList', (req, res) => {
	con.query('select * from articles', (error, result) => {
		if (error) throw error
		res.send(result)
	})
})

app.get('/api/getImage/:name', (req, res) => {
  const name = req.params.name;
  const width = req.query.w
  const height = req.query.h
  let format
  console.log(width)
  console.log(height)
	con.query(`select img from images where name = '${name}'`, (error, result) => {
		if (error) throw error
    gm(result[0].img)
      .resize(width,height)
      // .format(function(err, value){
      //   res.type(`image/${value}`)
      // })
      .toBuffer(function (err, buffer) {
        if (err) return handle(err);
        console.log('done!');

        res.end(buffer, 'binary')
      })

	})
})

app.get('/api/getImages', (req, res) => {
	con.query('select name from images', (error, result) => {
		if (error) throw error
		res.send(result)
	})
})

app.post('/api/addImage', upload.single('image'), (req, res) => {
  con.query('INSERT INTO images SET ?', { name: req.body.name, img: req.file.buffer }, function(err, result) {
    if (err) {
			throw err
			res.status(500).send('Some error pls!');
		}
		res.send('Query OKk')
  })
})

app.post('/api/addArticle', (req, res) => {
  const article = req.body
  if (article.id) {
    con.query(`UPDATE articles SET ? WHERE id = '${article.id}'`, article, function(err, result) {
      if (err) {
        throw err
        res.status(500).send('Some error pls!');
      }
      res.send('Query OKk')
    })
  }
  else {
    con.query('INSERT INTO articles SET ?', article, function(err, result) {
      if (err) {
        throw err
        res.status(500).send('Some error pls!');
      }
      res.send('Query OKk')
    })
  }
})

app.get('/api/2', (req, res) => {
	res.send('ggfffg')
})

app.get('/api/1', (req, res) => {
	con.query('select * from pet', (error, result) => {
		if (error) throw error
		res.send(result)
	})
})

export default app

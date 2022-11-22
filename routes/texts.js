const { Router } = require('express');
const wj = require('w-json')
const rj = require('r-json')

const router = Router();

router.get('/',(req,res)=>{
	var texts = rj(__dirname+"/../app/texts.json")
	res.render('texts.ejs',{texts})
})

router.get('/list',(req,res)=>{
	var texts = rj(__dirname+"/../app/texts.json")
	res.send(texts)
})

router.post('/add',(req,res)=>{
	var {text} = req.body
	console.log(req.body)
	var texts = rj(__dirname+"/../app/texts.json")
	texts.push(text)
	wj(__dirname+"/../app/texts.json",texts)
	res.redirect('/texts')
})

router.get('/delete',(req,res)=>{
	var {index} = req.query
	var texts = rj(__dirname+"/../app/texts.json")
	texts.splice(index, 1)
	wj(__dirname+"/../app/texts.json",texts)
	res.redirect('/texts')
})

module.exports = router;
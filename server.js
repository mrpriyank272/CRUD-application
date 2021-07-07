const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const db=require('./models/task');
var app = express();

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')


app.get('/',async(req,res) =>{
    const allData = await db.find()
    res.render('index',{taskdata:allData})
})

app.get('/createpage',(req,res)=>{
    res.render('create')
})

app.post('/createtask',async (req,res)=>{
    console.log(req.body)
    const title = req.body.title
	const description = req.body.description
	const is_active = req.body.is_active
	const status = req.body.status
    const record=new db({
        title:title,
        description:description,
        is_active:is_active,
        status:status
    })
    await record.save()
    res.redirect('/')
})

app.post('/updatetask/:id',async (req,res)=>{
    const id = req.params.id

    const title = req.body.title
	const description = req.body.description
	const is_active = req.body.is_active
	const status = req.body.status
    const newdata={
        title:title,
        description:description,
        is_active:is_active,
        status:status
    }
    const record=await db.updateOne({_id:id}, newdata, {upsert:true}, function(err) {
        if (err) return res.send(500, {error: err});
        return console.log('Succesfully saved.');
    });

    res.redirect('/')
})

app.get('/updatepage/:id',async (req,res)=>{
    const _id=req.params.id;
    const record = await db.findOne({ _id: _id })
    res.render('update',{taskdata:record})
})

app.get('/delete/:id',(req,res)=>{
    db.remove({ _id: req.params.id }, function(err) {
        if (!err) {
            console.log('deleted')
            res.redirect('/')
        }
        else {
            console.log(err)
        }
    });
})


mongoose.connect('mongodb://localhost/taskapp', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
mongoose.connection.on('open', () => {
	app.listen(3000, () => {
		console.log('Server started')
	})
})
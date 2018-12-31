var mongoose = require('mongoose')
var bodyParser = require('body-parser');
//polaczenie z baza
mongoose.connect('mongodb://test:test123@ds153763.mlab.com:53763/todo');

var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);



//var data = [{item:'get milk'},{item:'walk dog'}, {item:'do some stuff'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/todo', function(req,res){
    //pobierz dane z bazy i wyswietl
    Todo.find({}, function (err, data){
        if(err) throw err;
        res.render('todo',{todos:data});
    })

});

app.post('/todo', urlencodedParser, function(req,res){
    //pobierz dane z widoku i dodaj do bazy
    var newTodo = Todo(req.body).save(function(err, data){
        if(err) throw err;
        res.json(data);
    });
});

app.delete('/todo/:item', function(req,res){
    //usowanie danych z bazy
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
        if(err) throw  err;
        res.json(data);
    });
});
};
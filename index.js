require('dotenv').config();
const express = require('express');
const app = express();
const {AccountTypes, Clients} = require('./models');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('home');
});

//////////////////////////////////////////Read
app.get('/home', async (req, res) => {
    res.render('home');
});

app.get('/account_types', async (req, res) => {
    try{
        let resultsA = await AccountTypes.findAll({raw: true});
        console.log(resultsA);
        res.render('account_types', {accountTypes: resultsA});
    }catch(error){
        console.log(error);
        res.status(400).send('error');
    }
});

app.get('/clients', async (req, res) => {
     try{
        let resultsC = await Clients.findAll({raw: true});
        // console.log(resultsC);
        res.render('clients', {clients: resultsC});
     }catch(error){
         console.log(error);
         res.status(400).send('Not Found 400');
     }
   
});
app.get('/clients/update/:id', async (req, res) => {
    let Id = req.params.id;
    try{
        let results = await Clients.findByPk(Id, {raw:true});
        console.log(results);
        res.render('update_clients', {data: results});
    } catch(err){
        console.log(err);
        res.send('Not Found 404');
    }
});

app.get('/account_types/update/:id', async (req, res) => {
    let Id = req.params.id;
    try{
        let results = await AccountTypes.findByPk(Id, {raw:true});
        console.log(results);
        res.render('update_account', {data: results});
    } catch(err){
        console.log(err);
        res.send('Not Found 404');
    }
});

////////////////////////////////////////////Create
app.post('/account_types', async (req, res) => {
    const {name, description} = req.body;
    try{
        await AccountTypes.create({name, description});
        res.redirect("/account_types");  
    
    } catch(err){

        console.log(err);
        res.status(400).send("Error")
    }
});

app.post('/clients', async (req, res) => {
    const {first_name, lats_name, email, telephone} = req.body;
    try{
        await Clients.create({first_name, lats_name, email, telephone});
        res.redirect('/clients');
    }catch(error){
        console.log(error);
        res.status(400).send("Not Found 400");
    }
});

////////////////////////////////////////////Up date
app.post(`/account_types/update/:id`, async (req, res) => {
    let id = req.params.id;
    try{
        let {name, description, create_at, update_at} = req.body;
        await AccountTypes.update(
            {
                name:name,
                description:description,
            },
            {
                where:{
                    id:id
                }
            }
        )
        res.redirect('/account_types');
    }catch(err){
        console.log(err, id);
        res.send(err).status(400);
    }
})

app.post(`/clients/update/:id`, async (req, res) => {
    let id = req.params.id;
    try{
        let {first_name,last_name,email,telephone} = req.body;
        await Clients.update(
            {
                first_name: first_name,
                last_name: last_name,
                email:email,
                telephone:telephone
            },
            {
                where:{
                    id:id
                }
            }
        )
        res.redirect('/clients');
    }catch(err){
        console.log(err, id);
        res.send(err).status(400);
    }
})

////////////////////////////////////////////Delete
app.get('/account_types/delete/:id', async (req, res) => {

    try {
      let Id  = req.params.id;
      const deleted = await AccountTypes.destroy({
        where: { id:Id }
      });
      res.render('redirect_account',{data: Id});
      if (deleted) {
        return res.status(200);
      }
      throw new Error("Post not found");
    } catch (error) {
      return res.status(400).send(error.message);
    }
});

app.get('/clients/delete/:id', async (req, res) => {

    try {
      let Id  = req.params.id;
      const deleted = await Clients.destroy({
        where: { id:Id }
      });
      if (deleted) {
        return res.status(200).render("redirect_delete",{data: Id});
      }
      throw new Error("Post not found");
    } catch (error) {
      return res.status(400).send(error.message);
    }
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("escuchando el servidor",port);
})
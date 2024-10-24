import express from 'express';
import path from 'path';
import {router} from './routers/routes'   
let app = express();


app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(express.static(path.join(__dirname,'public')))
// app.use(express.static('public'));   
app.use('/',router)

const PORT = 3000;

app.listen(PORT, () => { 
    console.log(`Server is running on http://localhost:${PORT}`); 
});                    
    
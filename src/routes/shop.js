const express = require("express");
const router = express.Router();

const mysqlConection = require('../database');

router.get('/products',(req,res)=>{
    mysqlConection.query('SELECT * FROM products',(err,rows,fields)=>{
        if(!err){
            if(rows.length<=0){
                res.status(404).json('Not found');
            }else{
                res.json(rows);
            }
        }else{
            console.log("Codigo de Error: "+err.code);
            console.log("Fallo al conectar a la Base de Datos");
        }
    });
});

router.get('/products/:id',(req,res)=>{
    const {id} = req.params;
    mysqlConection.query('SELECT * FROM products where id = ?',[id],(err,rows,fields)=>{
        if(!err){
            if(rows.length<=0){
                res.status(404).json('Not found');
            }else{
                res.json(rows);
            }
        }else{
            console.log("Codigo de Error: "+err.code);
            console.log("Fallo al conectar a la Base de Datos");
        }
    });
});

router.patch('/products/:id',(req,res)=>{
    const {id} = req.params;
    const {stock} = req.body;
    mysqlConection.query('UPDATE products SET stock=? WHERE id=?',[stock,id],(err,rows,fields)=>{
        if(!err){
            if(rows.length<=0){
                res.status(404).json('Not found');
            }else{
                res.json(rows);
            }
        }else{
            console.log("Codigo de Error: "+err.code);
            console.log("Fallo al conectar a la Base de Datos");
        }
    });
    
});

router.get('/stores',(req,res)=>{
    mysqlConection.query('SELECT * FROM stores',(err,rows,fields)=>{
        if(!err){
            if(rows.length<=0){
                res.status(404).json('Not found');
            }else{
                res.json(rows);
            }
        }else{
            console.log("Codigo de Error: "+err.code);
            console.log("Fallo al conectar a la Base de Datos");
        }
    });
});

router.get('/categories',(req,res)=>{
    mysqlConection.query('SELECT * FROM category',(err,rows,fields)=>{
        if(!err){
            if(rows.length<=0){
                res.status(404).json('Not found');
            }else{
                res.json(rows);
            }
        }else{
            console.log("Codigo de Error: "+err.code);
            console.log("Fallo al conectar a la Base de Datos");
        }
    });
});

router.get('/orders',(req,res)=>{
    mysqlConection.query('SELECT * FROM orders',(err,rows,fields)=>{
        if(!err){
            if(rows.length<=0){
                res.status(404).json('Not found');
            }else{
                res.json(rows);
            }
        }else{
            console.log("Codigo de Error: "+err.code);
            console.log("Fallo al conectar a la Base de Datos");
        }
    });
});

router.get('/detailsOrders',(req,res)=>{
    mysqlConection.query('SELECT * FROM datails_order',(err,rows,fields)=>{
        if(!err){
            if(rows.length<=0){
                res.status(404).json('Not found');
            }else{
                res.json(rows);
            }
        }else{
            console.log("Codigo de Error: "+err.code);
            console.log("Fallo al conectar a la Base de Datos");
        }
    });
});

router.post('/orders',(req,res)=>{
    const {name, store, date, pickup, shippingAddress,city} = req.body;
    let pick = 0;
    if(pickup){
        pick = 1;
    }
    console.log(date);
    mysqlConection.query('INSERT INTO orders(name,storeId,date,pickup,shippingAddress,city) VALUES (?,?,?,?,?,?)',[name, store!=undefined?store.id:null, date, pick, shippingAddress!=undefined?shippingAddress:null,city!=undefined?city:null],(err,rows,fields)=>{
        if(!err){
            if(rows.length<=0){
                res.status(404).json('Not found');
            }else{
                res.json({Status:'Guardado'});
            }
        }else{
            console.log("Codigo de Error: "+err.code);
            console.log("Fallo al conectar a la Base de Datos");
        }
    });

});


router.get('/lastOrder',(req,res)=>{
    mysqlConection.query('SELECT id FROM orders WHERE id=(select max(id) from orders)',(err,rows,fields)=>{
        if(!err){
            if(rows.length<=0){
                res.status(404).json('Not found');
            }else{
                res.json(rows);
            }
        }else{
            console.log("Codigo de Error: "+err.code);
            console.log("Fallo al conectar a la Base de Datos");
        }
    });
});


router.post('/detailsOrders',(req,res)=>{
    const {details,orderId} = req.body;
    mysqlConection.query('INSERT INTO datails_order(orderId,details) VALUES (?,?)',[orderId, JSON.stringify(details)],(err,rows,fields)=>{
        if(!err){
            if(rows.length<=0){
                res.status(404).json('Not found');
            }else{
                res.json({Status:'Guardado'});
            }
        }else{
            console.log("Codigo de Error: "+err.code);
            console.log("Fallo al conectar a la Base de Datos");
        }
    });
});

module.exports = router;
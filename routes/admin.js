var express = require('express');
var router = express.Router();
const {render} =require('../app');
const productHelpers = require('../helpers/product-helpers');
var productHelper=require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {

  productHelpers.getAllProducts().then((products)=>{

  
  
  res.render('admin/view-Products',{admin:true,products});
  })
});
router.get('/add-Product',function(req,res){
  res.render('admin/add-Product')

})
router.post('/add-Product',(req,res)=>{
 // console.log(req.body)
 // console.log(req.files.Image)

  productHelper.addProduct(req.body,(id)=>{
    let image=req.files.Image
   // console.log(id);
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render('admin/add-Product')
      }else{
        console.log(err)
      }
    })
    
  })
})

module.exports = router;

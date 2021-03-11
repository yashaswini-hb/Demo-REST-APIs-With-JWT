const { IventoryItem } = require('./item_model');
const express = require('express');
const router = express.Router();
const CheckAuth = require('./check-auth');

router.post('/add', CheckAuth, async (req, res) => {

    // Check if this Item Name already exisits
    let Inv_name = await IventoryItem.findOne({ name: req.body.name });

    if (Inv_name) {
        return res.status(400).json({ msg: 'Item Name already Exist!' });
    }
    else {
        // Insert the new Item if they do not exist yet
        userData = new IventoryItem({
            name: req.body.name,
            description: req.body.description,
            stock: req.body.stock,
            amount: req.body.amount
        });
        await userData.save();
        res.status(200).send(userData);
    }
});

router.get('/all',CheckAuth, async (req, res) => {
    // Get All Inserted Items In Collection
    await IventoryItem.find({}, function (err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        else {
            return res.status(200).send(result);
        }
    })
})

router.get('/ItemCount', CheckAuth, async (req, res) => {
    //Get Item Count 
    await IventoryItem.countDocuments({}, function (err, count) {
        if (err) {
            return res.status(400).send(err);
        }
        return res.status(200).send({ count });
    })
});


router.get('/name',CheckAuth, async (req, res) => {
    // fetch particular Item on basis of Name
    if (req.body.name == '' || req.body.name == undefined) {
        return res.status(400).json({ msg: 'Name Not Found' });
    }
    else {
        var result = await IventoryItem.findOne({ name: req.body.name }, {});
        return res.status(200).send(result);
    }
})



router.get('/update',CheckAuth, async (req, res) => {
    //update all values on basis of item Name
    var Data = await IventoryItem.findOne({ name: req.body.name });
    if (req.body.description == undefined || req.body.description == '') {
        var Extdescription = Data.description;
    }
    else {
        var Extdescription = req.body.description;
    }
    if (req.body.stock == undefined || req.body.stock == '') {
        var Extstock = Data.stock;
    }
    else {
        var Extstock = req.body.stock;
    }
    if (req.body.amount == undefined || req.body.amount == '') {
        var Extamount = Data.amount;
    }
    else {
        var Extamount = req.body.amount;
    }
    await IventoryItem.updateOne({ name: req.body.name }, {
        $set: {
            description: Extdescription,
            stock: Extstock,
            amount: Extamount

        }
    }, function (err, result) {
        if (err) {
            console.log("error");
            return res.status(400).json({ msg: 'Failed To update IventoryItem!!' });
        }
        console.log("updated IventoryItem ");
        return res.status(200).json({ msg: 'Successfully Updated!!' });
    })
})

router.get('/remove', CheckAuth, async (req, res) => {
    // delete Particular Item Using Item Name
    await IventoryItem.deleteOne({name: req.body.name }, async function (err, result) {
            if (err) {
              console.log(err);
              res.status(400).json({msg:'Got Error while removing Item!!'}); 
            }
            console.log('Item removed');
            res.status(200).json({msg:'Successfully removed!!'}); 
      });    
  }); 

module.exports = router;

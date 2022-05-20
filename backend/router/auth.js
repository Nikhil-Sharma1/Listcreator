// const jwt = require('jsonwebtoken');//for token
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')//for hashing
// const authenticate = require("../middleware/authenticate");
require('../db/conn');
const User = require("../model/userschema")
const List = require("../model/listschema")
const UserList = require("../model/userlistschema");
const { useState } = require('react');

router.get('/', async (req, res) => {
  res.send("App is working");
})
router.get('/getlists', async (req, res) => {
  const users = await User.find({ createList: "Not Allow" });
  console.log(users);
  try {
    const listExist = await List.find({});
    //console.log(listExist);
    //console.log("hi");
    if (listExist) {
      res.status(201).json(listExist);
    }
    else {
      res.status(202).json({ error: "List is not fetch" });
    }
  } catch (err) {
    console.log(err);
  }

})

router.post('/adduser', async (req, res) => {
  const { fname, lname, designation, address, phone, email, password, uniqueId } = req.body;
  if (!fname || !lname || !designation || !address || !phone || !email || !password) {
    return res.status(401).json({ error: "Plz fill all the fields" });
  }
  try {
    const userExist = await User.findOne({ email: email }); //database email=user email
    if (userExist) {
      return res.status(402).json({ error: "Email already Exist" });
    }
    const user = new User({ fname, lname, designation, address, phone, email, password, uniqueId });

    const saveUser = await user.save();
    if (saveUser) {
      res.status(201).json({ message: "success" });
    }
    else {
      res.status(501).json({ error: "Failed to add users" });
    }

  } catch (err) {
    console.log(err);
  }
});



router.post('/userinfo', async (req, res) => {
  const { uniqueId } = req.body;
  console.log(uniqueId);
  try {
    const user = await User.find({ uniqueId: uniqueId });
    // console.log(user)
    if (user) {
      res.status(201).json(user);
    }
    else {
      res.status(501).json({ error: "Failed to send details" });
    }

  } catch (err) {
    console.log(err);
  }
});


router.post('/updateuser', async (req, res) => {
  const { fname, lname, designation, address, phone, email, password, uniqueId } = req.body;
  if (!fname || !lname || !designation || !address || !phone || !email || !password) {
    return res.status(401).json({ error: "Plz fill all the fields" });
  }
  try {
    const user = await User.updateOne({ uniqueId: uniqueId },
      {
        $set: {
          fname, lname, designation, address, phone, email, password
        }
      });
    console.log(user)
    if (user) {
      const list = await List.updateOne({ createdById: uniqueId },
        {
          $set: {
            createdBy: fname + " " + lname
          }
        });
      if (list) {
        const listuser = await UserList.updateOne({ uuniqueId: uniqueId },
          {
            $set: {
              ufname: fname,
              ulname: lname
            }
          });
        if (listuser) {
          res.status(201).json({ message: "success" });
        }
      }
    }
    else {
      res.status(501).json({ error: "Failed to add users" });
    }

  } catch (err) {
    console.log(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password, listId, deleted } = req.body;
    if (!email || !password) {
      return res.status(401).json({ error: "pls Fill all the fields" })
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        res.status(400).json({ error: "Email or password is incorrect" });
      }
      else {
        // res.status(201).json({ message: "User Login Successfully" });
        const rootUser = await User.findOne({ email: email });
        if (rootUser.createList === "Allow" && !listId) {
          // console.log(rootUser);
          res.status(201).json(rootUser);
        }
        else if (rootUser.createList === "Allow" && listId) {
          const list = await List.findOne({ uniqueId: listId });
          console.log(rootUser.uniqueId);
          console.log(list);
          if (list.createdById === rootUser.uniqueId) {
            if (deleted) {
              const result = await List.deleteOne({ uniqueId: listId });
              const ulist = await UserList.deleteMany({ luniqueId: listId });
              if (result && ulist) {
                res.status(203).json("deleted");
              }
            }
            else {
              res.status(202).json("success");
            }

          }
          else {
            if (deleted) {
              res.status(403).json("Only list creator can delete the list");
            }
            {
              res.status(402).json("Only list creator can edit the list");
            }
          }

        }
        else {
          res.status(401).json({ error: "You are not authorized to create a list" });
        }
      }
    }
    else {
      res.status(400).json({ error: "Email or password is incorrect" });
    }

  } catch (err) {
    console.log((err));
  }
})


router.post('/logintoupdate', async (req, res) => {
  try {
    const { email, password, uniqueId } = req.body;
    // console.log(email);
    // console.log(password);
    // console.log(uniqueId);
    if (!email || !password) {
      return res.status(401).json({ error: "pls Fill all the fields" })
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        res.status(400).json({ error: "Email or password is incorrect" });
      }
      else {
        const rootUser = await User.findOne({ email: email });
        if (rootUser.uniqueId === uniqueId && rootUser.createList === "Allow") {
          res.status(201).json("Success");
        }
        else if (rootUser.uniqueId === uniqueId) {
          res.status(202).json("Success");
        }
        else if (rootUser.createList === "Allow") {
          res.status(203).json("Success");
        }
        else {
          res.status(200).json("Not success");
        }
      }
    }
    else {
      res.status(400).json({ error: "Email or password is incorrect" });
    }

  } catch (err) {
    console.log((err));
  }
})


router.post('/addlist', async (req, res) => {
  const { name, uniqueId, createdBy, createdById } = req.body;
  if (!name) {
    return res.json({ error: "Plz fill all the fields" });
  }
  try {
    const listExist = await List.findOne({ name: name }); //database name=user name
    if (listExist) {
      return res.json({ error: "List already Exist" });
    }
    const list = new List({ name, uniqueId, createdBy, createdById });

    const savelist = await list.save();
    if (savelist) {
      // res.status(201).json({ message: "success" });
      const list = await List.findOne({ name: name });
      res.status(201).json(list);
    }
    else {
      res.json({ error: "Failed to save list" });
    }

  } catch (err) {
    console.log(err);
  }
});

router.post('/addluser', async (req, res) => {
  const { listId } = req.body;
  console.log(listId);
  try {
    const listExist = await List.findOne({ uniqueId: listId }); //database name=user name
    if (listExist) {
      res.status(201).json(listExist);
      console.log(listExist);
    }
  } catch (err) {
    console.log(err);
  }
});


router.post('/getuser', async (req, res) => {
  const { pattern } = req.body;
  if (!pattern) {
    const list = await User.find().limit(10);
    if (list) {
      res.status(201).json(list);
    }
  }
  else {
    try {
      const ncount = await User.countDocuments({
        $or: [{
          "$expr": {
            "$regexMatch": {
              "input": { "$concat": ["$fname", " ", "$lname"] },
              "regex": pattern,  //Your text search here
              "options": "i"
            }
          }
        }, { email: { $regex: pattern, $options: "$i" } }]
      });
      // console.log(ncount);
      const nameExist = await User.find({
        $or: [{
          "$expr": {
            "$regexMatch": {
              "input": { "$concat": ["$fname", " ", "$lname"] },
              "regex": pattern,  //Your text search here
              "options": "i"
            }
          }
        }, { email: { $regex: pattern, $options: "$i" } }]
      }); //database name=user name
      // console.log(ncount);
      if (ncount != 0) {
        res.status(201).json(nameExist);
      }
      else {
        res.status(202).json("no user found");
      }
    } catch (err) {
      console.log(err);
    }
  }
});

router.post('/getlist', async (req, res) => {
  const { pattern } = req.body;
  if (!pattern) {
    res.status(203).json("Empty field");
  }
  else {
    try {
      const ncount = await List.countDocuments({
        name: { $regex: pattern, $options: "$i" }
      });
      // console.log(ncount);
      const nameExist = await List.find({
        name: { $regex: pattern, $options: "$i" }
      });
      if (ncount != 0) {
        res.status(201).json(nameExist);
      }
      else {
        res.status(202).json("no user found");
      }
    } catch (err) {
      console.log(err);
    }
  }
})

router.post('/addlistuser', async (req, res) => {
  const { name, luniqueId, uuniqueId, ufname, ulname } = req.body;
  try {
    const listExist = await UserList.find({ luniqueId: luniqueId, uuniqueId: uuniqueId });
    if (listExist.length === 0) {
      const listuser = new UserList({ lname: name, luniqueId, uuniqueId, ufname, ulname });
      const savelistuser = await listuser.save();
      if (savelistuser) {
        const ncount = await UserList.countDocuments({ luniqueId: luniqueId });
        const nameExist = await UserList.aggregate
          ([
            {
              "$match": { "luniqueId": luniqueId }
            },
            {
              $lookup: {
                from: "users",
                localField: "uuniqueId",
                foreignField: "uniqueId",
                as: "user"
              }
            }
          ]);
        if (ncount != 0) {
          res.status(201).json(nameExist);
        }
        else {
          res.status(202).json("no user found");
        }
      }
      else {
        res.status(500).json({ error: "Failed to save list" });
      }
    }
    else {
      console.log(listExist.ufname);
      return res.status(401).json(`${ufname} aready in the list`);
    }
  } catch (err) {
    console.log(err);
  }
});

router.post('/getluser', async (req, res) => {
  const { listId } = req.body;
  try {
    const ncount = await UserList.countDocuments({ luniqueId: listId });
    const nameExist = await UserList.aggregate([
      {
        "$match": { "luniqueId": listId }
      },
      {
        $lookup: {
          from: "users",
          localField: "uuniqueId",
          foreignField: "uniqueId",
          as: "user"
        }
      }
    ]); //database name=user name
    // console.log(nameExist);
    if (ncount != 0) {
      res.status(201).json(nameExist);
    }
    else {
      const listExist = await List.find({ uniqueId: listId });
      if (listExist) {
        // console.log(listExist)
        res.status(202).json(listExist);
      }
    }
  } catch (err) {
    console.log(err);
  }
});


router.post('/dellistuser', async (req, res) => {
  const { listId, uuniqueId } = req.body;
  try {
    // console.log(listId);
    // console.log(uuniqueId);
    const result = await UserList.deleteOne({ luniqueId: listId, uuniqueId: uuniqueId });
    if (result) {
      const ncount = await UserList.countDocuments({ luniqueId: listId });
      const nameExist = await UserList.aggregate([
        {
          "$match": { "luniqueId": listId }
        },
        {
          $lookup: {
            from: "users",
            localField: "uuniqueId",
            foreignField: "uniqueId",
            as: "user"
          }
        }
      ]);
      if (ncount != 0) {
        res.status(201).json(nameExist);
      }
      else {
        res.status(202).json("no user found");
      }
    }
    else {
      console.log("not deleted");
    }
  } catch (err) {
    console.log(err);
  }
});


router.post('/getuserdata', async (req, res) => {
  const { luserId } = req.body;
  try {
    const ncount = await User.countDocuments({ uniqueId: luserId });
    const nameExist = await User.find({ uniqueId: luserId });
    // console.log(nameExist);
    if (ncount !== 0) {
      res.status(201).json(nameExist);
    }
    else {
      res.status(202).json("user not found")
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

router.post("/register", async (req, res) => {
  //console.log(req.body);
  const { name, email, mobile, year, result, desc } = req.body;
  if (!name || !email || !mobile || !year || !result || !desc) {
    res.status(404).json("plz fill the data");
  }
  try {
    const preuser = await users.findOne({ email: email });
    console.log(preuser);

    if (preuser) {
      res.status(404).json(preuser);
      // res.status(404).json("this is user is already present");
    } else {
      const adduser = new users({
        name,
        email,
        mobile,
        year,
        result,
        desc,
      });
      await adduser.save();
      res.status(201).json(adduser);
      console.log(adduser);
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

//get userdata
router.get("/getdata", async (req, res) => {
  try {
    const userdata = await users.find();
    res.status(201).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(404).json(error);
  }
});

//get individual
router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const userindividual = await users.findById({ _id: id });
    console.log(userindividual);
    res.status(201).json(userindividual);
  } catch (error) {
    res.status(404).json(error);
  }
});

//update user data
router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateduser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log(updateduser);
    res.status(201).json(updateduser);
  } catch (error) {
    res.status(404).json(error);
  }
});

//delete user
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteuser = await users.findByIdAndDelete({ _id: id });

    console.log(deleteuser);
    res.status(201).json(deleteuser);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;

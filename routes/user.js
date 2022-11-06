const CryptoJS = require("crypto-js");
const { verifyTokenAndAuthorization } = require("./verifyToken");
const router = require("express").Router();
const User = require("../models/User");

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (e) {
    res.status(500).json(e.toString());
  }
});

module.exports = router;

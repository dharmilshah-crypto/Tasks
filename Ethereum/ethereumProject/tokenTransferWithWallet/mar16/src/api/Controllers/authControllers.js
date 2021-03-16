// const User = require("./../Models/userModel");
// import User from "../Models/userModel";
import User from "../Models/userModel";
// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
import { promisify } from "util";
// import "../../ethereum/deploy";
// const dtoken = require("../../ethereum/build/dtoken.json");
import dtoken from "../../ethereum/build/dtoken.json";
// const { web3 } = require("../../ethereum/deploy");
// import result from "../../ethereum/deploy";

// console.log("RESULT: ", result);

// const { result } = require("../../ethereum/deploy");
// const dtoken = require("../../ethereum/build/dtoken.json");
// const { promisify } = require("util");
// const { interface, bytecode } = require("../Dtoken/compile");
// const HDWalletProvider = require("truffle-hdwallet-provider");
// const Web3 = require("web3");
// const provider = new HDWalletProvider(
//   "stand drill mobile mean tent whip horror ritual truth lawn version alarm",
//   "https://rinkeby.infura.io/v3/44274788c5da4c38ac096f248d577767"
// );
// const web3 = new Web3(provider);

// const dtoken = require('../Dtoken/deploy')
// console.log(dtoken)

exports.generateOTP = async (req, res, next) => {
  try {
    console.log("1");
    let a = Math.random();
    a = String(a);
    a = a.substring(2, 6);
    console.log(a);

    await User.updateOne({ email: req.tempEmail }, { otp: a });
    let message = {
      from: "rp218428@gmail.com",
      to: req.tempEmail,
      subject: "OTP",
      text: "Plaintext version of the message",
      html: `<p>OTP</p>
                      <p>${a}</p>`,
    };
    console.log("message generated");
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      service: "Gmail",

      auth: {
        user: "rp218428@gmail.com",
        pass: "98934196",
      },
    });

    transporter.sendMail(message, (err, info) => {
      console.log(info.envelope);
      console.log(info.messageId);
    });

    console.log("message sent");

    res.status(404).send("OTP sent,Please verify your email");
  } catch (err) {
    res.status(404).send(err.message, err.name);
  }
};

exports.signUp = async (req, res, next) => {
  try {
    // const Result = await result;
    const {
      result,
      contractAddress,
      contractOwnerAccount,
    } = require("../../ethereum/deploy");
    // console.log("2", result);
    // const accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    // const result = await new web3.eth.Contract(
    //   JSON.parse(dtoken.interface),
    //   contractAddress
    // );
    // console.log(result);
    await result.methods.transfer(req.body.publicKey, 1).send({
      from: contractOwnerAccount,
      gas: "1000000",
    });
    const balance = await result.methods.balanceOf(req.body.publicKey).call();
    console.log(balance);

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      publicKey: req.body.publicKey,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      balance: balance,
      isAdmin: false,
    });
    req.tempEmail = req.body.email;

    next();
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.logIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);

    if (user.isVerified) {
      const email = req.body.email;
      const password = req.body.password;
      if (!email || !password) {
        throw new Error("Password or Email missing");
      }
      const user = await User.findOne({ email }).select("+password");

      if (!user || !(await user.correctPassword(password, user.password))) {
        throw new Error("Password or Email Incorrect", 401);
      }

      const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "5m" });

      res.status(200).json({
        status: "success",
        token,
        user,
        message: "LogIn successfull ",
      });
    } else
      throw new Error("You are not verified ,please verify yourself fisrt");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (token == undefined) throw new Error("You are not logged in", 401);

    const decoded = await promisify(jwt.verify)(token, "secret");
    req.tempId = decoded.id;
    console.log(req.tempId);
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      res.status(401).send("Expired token ,Please Login again");
    } else if (err.name === "SyntaxError") {
      res.status(401).send("Invalid token ,Please Login again");
    } else res.status(401).send(err.message);
  }
};

exports.checkOTP = async (req, res, next) => {
  try {
    let user;
    let token;
    if (req.body.otp) {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (req.body.otp == user.otp) {
        token = jwt.sign({ id: user._id }, "secret", { expiresIn: "10m" });
        await User.updateOne({ email: req.body.email }, { isVerified: true });
        await User.updateOne({ email: req.body.email }, { otp: undefined });
        user = await User.findOne({ email: req.body.email });
        console.log(user);
        res.status(200).json({
          status: "success",
          token,
        });
      } else throw new Error("OTP did not match ,please generate an OTP again");
    } else throw new Error("OTP not found ,please generate an OTP again");
  } catch (err) {
    res.status(404).json({
      name: err.name,
      message: err.message,
    });
  }
};

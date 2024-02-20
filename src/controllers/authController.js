const UserModel = require("../models/userModel");
const bcryp = require('bcryptjs');
const asyncHandle = require('express-async-handler');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, // port của gmail là 587
    auth: {
        user: "duccu1403@gmail.com",
        pass: "evun ootr oltj khhw",
    },
})

const getJsonWebToken = (email, id) => {

    const payload = {
        email,
        id,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '7d', // thời hạn sau khi đăng kỳ tài khoản người dùng bắt buộc đăng nhập lại
    })
    return token;
}

const handleSendMail = async (val, email) => {

    try {
        await transporter.sendMail({
            from: `Coffee_App DMon's Duy Duc <duccu1403@gmail.com>`, // sender address
            to: email, // list of receivers
            subject: "Verification email code", // Subject line
            text: "Your code to verificayion email", // plain text body
            html: `<h1>${val}</h1>`, // html body
        });

        return 'Done';
    } catch (error) {
        return error
    }
};

//  khi sử dụng asyncHandle thì không cần sử dụng try catch
const verification = asyncHandle(async (req, res) => {
    const { email } = req.body;
    const verificationCode = Math.round(1000 + Math.random() * 9000);
    try {
        await handleSendMail(verificationCode, email);

        res.status(200).json({
            message: 'Send verification code successfully!',
            data: {
                code: verificationCode,
            },
        })
    } catch (error) {
        res.status(401);
        throw new Error('Can not send email!')
    }
});

const register = asyncHandle(async (req, res) => {
    const { email, username, password } = (req.body);
    // kiểm tra xem email có bị trùng lặp hay không(email đã đăng ký tài khoản)
    const existingUser = await UserModel.findOne({ email });
    // nếu có user thì trả ra lỗi
    if (existingUser) {
        res.status(401)
        throw new Error(`User has already exist!!!`)
    }

    // Mã hóa mật khẩu 
    const salt = await bcryp.genSalt(10);

    const hashedPassword = await bcryp.hash(password, salt)

    const newUser = new UserModel({
        username: username ?? '',
        email,
        password: hashedPassword
    })

    // lưu vào database
    await newUser.save()


    res.status(200).json({
        message: "Register new user successfully",
        data: {
            email: newUser.email,
            id: newUser.id,
            accesstoken: await getJsonWebToken(email, newUser.id),
        }
    });
});

const login = asyncHandle(async (req, res) => {
    const { email, password } = req.body

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
        res.status(403);
        throw new Error('User not found!!!')
    }

    const isMatchPassword = await bcryp.compare(password, existingUser.password);
    if (!isMatchPassword) {
        res.status(401);
        throw new Error('Email or Password is not correct!');
    }

    res.status(200).json({
        message: 'Login successfully',
        data: {
            id: existingUser.id,
            email: existingUser.email,
            accesstoken: await getJsonWebToken(email, existingUser.id),
        },
    })
})


module.exports = {
    register,
    login,
    verification,
}
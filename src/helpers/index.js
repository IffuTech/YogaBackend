const {hashSync, compareSync} = require("bcrypt");
const UserToken = require("../models/userToken")
const path = require("path");
const jwt = require('jsonwebtoken');
const { log } = require("console");

function encryptPassword(string) {
    return hashSync(string, 4)
}
 
function matchPassword(encrpted, password) {
    return compareSync(password, encrpted);
}

const pagination = (data, page, limit) => {
    if (limit && !page) {
        return data.slice(0, limit)
    } else if (!limit && page) {
        const offset = 10 * (page - 1)
        return data.slice(offset, offset + 10);
    } else if (limit && page) {
        const offset = limit * (page - 1)
        return data.slice(offset, offset + Number(limit))
    } else {
        return data;
    }
}

const generateOtp = (length = 6) => {
    const number = Math.pow(10, length - 1);
    return Math.floor(number + Math.random() * 9 * number)
}

// Create token
const generateToken = (user) => {
    return jwt.sign(
        {user_id: user.id, name: user.name, email: user.email, mobile: user.mobile},
        process.env.TOKEN_KEY,
    );
}
const uploadImage = async (image, filepath) => {
    console.log("images===============",image)
    console.log("pathhhhhhhhhhhhhhhhhh", filepath)
    // const {userId} = await getCandidateLoginTokenFromRequest(req);
    const fileName = image.md5 + +new Date + 1;
    const extension = path.extname(image.name);
    await image.mv(`assets/${filepath}/` + fileName + extension);
    return fileName + extension;
}

const ULoginTokenFromRequest = async (req, res) => {
    let {login_token} = req;
    if (!login_token) {
        let token_id = req.headers.authorization || req.query.token_id || "";
        token_id = token_id.replace("Bearer ", "");
        login_token = await UserToken.findOne({
            where: {
                token: token_id,
                type: "type_login"
            }
        });
    }
    return login_token
}

const hasPermissionOrFail = async (req, value) => {
    // const {userId} = await ULoginTokenFromRequest(req);
    // console.log(userId)
    // const user = await User.findOne({
    //     where: {id: userId},
    //     include: [{
    //         model: Permission,
    //         as: "permission"
    //     }]
    // });
    // const check = await user.permission.find(({code}) => code === value);
    // if (!check)
    //     throw new Error("You don't have necessary permissions");
    // else
    //     return true;
};

module.exports = {
    encryptPassword,
    matchPassword,
    generateOtp,
    generateToken,
    hasPermissionOrFail,
    ULoginTokenFromRequest,
    pagination,
    uploadImage,
}

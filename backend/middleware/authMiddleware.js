const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }


// //Tämä on tehty täysin JWT:n salauksen ja tokenien tarpeisiin, pitää selvittää tarkemmin mitä on syöny

// const jwt = require('jsonwebtoken')
// //const asyncHandler = require('express-async-handler')
// const User = require('../models/userModel')

// const protect = async(req, res, next) => {
//     let token

//     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
//         try {
//             // get token from header
//             token = req.headers.authorization.split(' ')[1]

//             //verify the token
//             const decoded = jwt.verify(token, process.env.JWT_SECRET)
//             // get user from the token
//             req.user = await User.findById(decoded.id).select('-password') // id userRoute 106

//             next()
//         } catch (error) {
//             console.log(error)
//             res.status(401).json({message: 'Ei oikeuksia'})
//         }
//         return // return lisätty MongoDB:n ohjeiden mukaan..serverin kaatumisen välttämiseksi
//     }

//     if(!token) {
//         res.status(401).json({message: 'Ei oikeuksia. Ei tokenia'})
//         return // return lisätty MongoDB:n ohjeiden mukaan..serverin kaatumisen välttämiseksi
//     }

// }

// module.exports = {protect}
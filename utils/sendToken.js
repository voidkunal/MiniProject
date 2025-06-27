// export const sendToken = (user, statusCode, message, res) => {
//     const token = user.generateToken()
//     res.status(statusCode).cookie("token", token, {
//         expires: new Date(
//             Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//         ),
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production" ? true : false,
//     }).json({
//         success: true,
//         user,
//         message,
//         token,
//     }); 
// };


export const sendToken = (user, statusCode, message, res) => {
  const token = user.generateToken();

  res.status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // ✅ required for cross-site cookie
    })
    .json({
      success: true,
      user,
      message,
      token,
    });
};

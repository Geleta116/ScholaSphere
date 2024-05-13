import jwt from "jsonwebtoken";

function generateAccessToken(user) {
    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '5m',
    });
  }
  
  function generateRefreshToken(user, jti) {
    return jwt.sign({
      userId: user.id,
      jti
    }, process.env.JWT_SECRET, {
      expiresIn: '4h',
    });
  }
  
  function generateTokens(user, jti) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, jti);
  
    return {
      accessToken,
      refreshToken,
    };
  }
  
  module.exports = {
    generateAccessToken,
    generateRefreshToken,
    generateTokens
  };
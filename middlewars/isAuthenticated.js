import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token; // Extract token from cookies

    console.log("Received Token:", token); 

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
        success: false
      });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    console.log("Decoded Token:", decodedToken); // Log decoded token for debugging

    if (!decodedToken) {
      return res.status(401).json({
        message: "Unauthorized: Invalid token",
        success: false
      });
    }

    // Assign user ID to request object
    req.id = decodedToken.userId;

    next(); // Proceed to the next middleware
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({
      message: "Unauthorized: Invalid or expired token",
      success: false
    });
  }
};

export default isAuthenticated;

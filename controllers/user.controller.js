// import { User } from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import getDataUri from "../utils/datauri.js";
// import cloudinary from "../utils/cloudinary.js";
// // //for mobile
// // import asyncHandler from "../middlewars/async.js"; //for mobile login


// // // Register User
// export const register = async (req, res) => {
//     try {
//         console.log("Received Headers:", req.headers); // Log request headers
//         console.log("Received Body:", req.body);      // Log request body
//         console.log("Received File:", req.file);      // Log file upload

//         const { fullname, email, phoneNumber, password, role } = req.body;

//         if (!fullname || !email || !phoneNumber || !password || !role) {
//             console.error("Missing fields:", { fullname, email, phoneNumber, password, role });
//             return res.status(400).json({
//                 message: "Something is missing",
//                 success: false
//             });
//         }

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists with this email.", success: false });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         await User.create({
//             fullname,
//             email,
//             phoneNumber,
//             password: hashedPassword,
//             role
//         });

//         return res.status(201).json({ message: "Account created successfully.", success: true });

//     } catch (error) {
//         console.error("Registration Error:", error);
//         return res.status(500).json({ message: "Internal Server Error", success: false });
//     }
// };


// // //register user for mobile
// // export const register = async (req, res) => {
// //     try {
// //         const { fullname, email, phoneNumber, password, image } = req.body;
         
// //         if (!fullname || !email || !phoneNumber || !password) {
// //             return res.status(400).json({
// //                 message: "All fields are required.",
// //                 success: false
// //             });
// //         }

// //         const existingUser = await User.findOne({ email });
// //         if (existingUser) {
// //             return res.status(400).json({
// //                 message: 'User already exists with this email.',
// //                 success: false,
// //             });
// //         }

// //         const hashedPassword = await bcrypt.hash(password, 10);

// //         await User.create({
// //             fullname,
// //             email,
// //             phoneNumber,
// //             password: hashedPassword,
// //             image,
// //         });

// //         return res.status(201).json({
// //             message: "Account created successfully.",
// //             success: true
// //         });
// //     } catch (error) {
// //         console.error(error);
// //         return res.status(500).json({
// //             message: "Internal Server Error",
// //             success: false
// //         });
// //     }
// // };

// // //thie is for upload image of mobile
// // export const uploadImage = asyncHandler(async (req, res, next) => {
// //     if (!req.file) {
// //       return res.status(400).send({ message: "Please upload a file" });
// //     }
// //     res.status(200).json({
// //       success: true,
// //       data: req.file.filename,
// //     });
// // });

// // // Login User for mobile
// // export const login = async (req, res) => {
// //     try {
// //         const { email, password,  } = req.body;
  
// //         if (!email || !password ) {
// //             return res.status(400).json({
// //                 message: "Something is missing",
// //                 success: false
// //             });
// //         }
  
// //         let user = await User.findOne({ email });
// //         if (!user) {
// //             return res.status(400).json({
// //                 message: "Incorrect email or password.",
// //                 success: false,
// //             });
// //         }
  
// //         const isPasswordMatch = await bcrypt.compare(password, user.password);
// //         if (!isPasswordMatch) {
// //             return res.status(400).json({
// //                 message: "Incorrect email or password.",
// //                 success: false,
// //             });
// //         }
  
// //         // if (role !== user.role) {
// //         //     return res.status(400).json({
// //         //         message: "Account doesn't exist with current role.",
// //         //         success: false
// //         //     });
// //         // }
  
// //         const tokenData = { userId: user._id };
// //         const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
  
// //         return res.status(200)
// //           .cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
// //           .json({
// //               message: `Welcome back ${user.fullname}`,
// //               token, // <-- Add the token here
// //               user,
// //               success: true
// //           });
// //     } catch (error) {
// //         console.error("Login Error:", error);
// //         return res.status(500).json({
// //             message: "Server error",
// //             success: false
// //         });
// //     }
// //   }

//   //login for web
// export const login = async (req, res) => {
//     try {
//         console.log("🔹 Received Login Request:", req.body);

//         const { email, password, role } = req.body;

//         if (!email || !password || !role) {
//             console.warn("❌ Missing Fields:", { email, password, role });
//             return res.status(400).json({
//                 message: "Something is missing",
//                 success: false
//             });
//         }

//         // Find user by email
//         const user = await User.findOne({ email });
//         if (!user) {
//             console.warn("❌ User Not Found:", email);
//             return res.status(400).json({
//                 message: "Incorrect email or password.",
//                 success: false
//             });
//         }

//         // Compare hashed passwords
//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         if (!isPasswordMatch) {
//             console.warn("❌ Incorrect Password for:", email);
//             return res.status(400).json({
//                 message: "Incorrect email or password.",
//                 success: false
//             });
//         }

//         // Check if role matches
//         if (role !== user.role) {
//             console.warn("❌ Role Mismatch:", { expected: user.role, provided: role });
//             return res.status(400).json({
//                 message: "Account doesn't exist with current role.",
//                 success: false
//             });
//         }

//         // Ensure SECRET_KEY is set
//         if (!process.env.SECRET_KEY) {
//             console.error("❌ SECRET_KEY is not defined in environment variables!");
//             return res.status(500).json({
//                 message: "Server configuration error",
//                 success: false
//             });
//         }

//         // Generate JWT token
//         const tokenData = { userId: user._id };
//         const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

//         console.log("✅ User Logged In:", user.email);

//         // Return user data and token in response
//         return res.status(200).cookie("token", token, { 
//                 maxAge: 24 * 60 * 60 * 1000, 
//                 httpOnly: true, 
//                 sameSite: "strict" 
//             })
//             .json({
//                 message: `Welcome back ${user.fullname}`,
//                 token,  // ✅ Now returning token in JSON response
//                 user: {
//                     _id: user._id,
//                     fullname: user.fullname,
//                     email: user.email,
//                     phoneNumber: user.phoneNumber,
//                     role: user.role,
//                     profile: user.profile
//                 },
//                 success: true
//             });

//     } catch (error) {
//         console.error("❌ Login Error:", error);
//         return res.status(500).json({
//             message: "Internal Server Error",
//             success: false
//         });
//     }
//  };




// // Logout User
// export const logout = async (req, res) => {
//     try {
//         return res.status(200).cookie("token", "", { maxAge: 0 }).json({
//             message: "Logged out successfully.",
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }


// export const updateProfile = async (req, res) => {
//     try {
//         const { fullname, email, phoneNumber, bio, skills } = req.body;
        
//         const file = req.file;
//         // cloudinary ayega idhar
//         const fileUri = getDataUri(file);
//         const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

//         let skillsArray;
//         if(skills){
//             skillsArray = skills.split(",");
//         }
//         const userId = req.id; // middleware authentication
//         let user = await User.findById(userId);

//         if (!user) {
//             return res.status(400).json({
//                 message: "User not found.",
//                 success: false
//             })
//         }
//         // updating data
//         if(fullname) user.fullname = fullname
//         if(email) user.email = email
//         if(phoneNumber)  user.phoneNumber = phoneNumber
//         if(bio) user.profile.bio = bio
//         if(skills) user.profile.skills = skillsArray
      
//         // resume comes later here...
//         if(cloudResponse){
//             user.profile.resume = cloudResponse.secure_url // save the cloudinary url
//             user.profile.resumeOriginalName = file.originalname // Save the original file name
//         }


//         await user.save();

//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile
//         }

//         return res.status(200).json({
//             message:"Profile updated successfully.",
//             user,
//             success:true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }


import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
 import asyncHandler from "../middlewars/async.js"; //for mobile login


// // // Register User
// export const register = async (req, res) => {
//    try {
//       const { fullname, email, phoneNumber, password, role } = req.body;
         
//    if (!fullname || !email || !phoneNumber || !password || !role) {
//       return res.status(400).json({
//            message: "Something is missing",
//            success: false
//             });
//        };
//       const file = req.file;
//       const fileUri = getDataUri(file);
//       const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

//          const user = await User.findOne({ email });
//         if (user) {
//            return res.status(400).json({
//               message: 'User already exist with this email.',
//               success: false,
//             })
//        }
//        const hashedPassword = await bcrypt.hash(password, 10);

//         await User.create({
//           fullname,
//             email,
//            phoneNumber,
//            password: hashedPassword,
//            role,
//             profile:{
//                 profilePhoto:cloudResponse.secure_url,
//           }
//       });

//       return res.status(201).json({
//           message: "Account created successfully.",
//             success: true
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }



//register user for mobile
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, image } = req.body;
         
        if (!fullname || !email || !phoneNumber || !password) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists with this email.',
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            image,
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const uploadImage = asyncHandler(async (req, res, next) => {
    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file" });
    }
    res.status(200).json({
      success: true,
      data: req.file.filename,
    });
});

// Login User for mobile
export const login = async (req, res) => {
    try {
        const { email, password,  } = req.body;
  
        if (!email || !password ) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
  
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }
  
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }
  
        // if (role !== user.role) {
        //     return res.status(400).json({
        //         message: "Account doesn't exist with current role.",
        //         success: false
        //     });
        // }
  
        const tokenData = { userId: user._id };
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
  
        return res.status(200)
          .cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
          .json({
              message: `Welcome back ${user.fullname}`,
              token, // <-- Add the token here
              user,
              success: true
          });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
  }
// //login for web
// export const login = async (req, res) => {
//     try {
//         const { email, password, role } = req.body;
        
//         if (!email || !password || !role) {
//             return res.status(400).json({
//                 message: "Something is missing",
//                 success: false
//             });
//         };
//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({
//                 message: "Incorrect email or password.",
//                 success: false,
//             })
//         }
//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         if (!isPasswordMatch) {
//             return res.status(400).json({
//                 message: "Incorrect email or password.",
//                 success: false,
//             })
//         };
//         // check role is correct or not
//         if (role !== user.role) {
//             return res.status(400).json({
//                 message: "Account doesn't exist with current role.",
//                 success: false
//             })
//         };

//         const tokenData = {
//             userId: user._id
//         }
//         const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile
//         }

//         return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
//             message: `Welcome back ${user.fullname}`,
//             user,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
  




// Logout User
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// // Update User Profile
// export const updateProfile = async (req, res) => {
//     try {
//         const { fullname, email, phoneNumber, bio, skills } = req.body;

//         const userId = req.id; // Ensure authentication middleware provides this

//         if (!userId) {
//             return res.status(400).json({
//                 message: "Unauthorized: User ID missing",
//                 success: false
//             });
//         }

//         let user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found.",
//                 success: false
//             });
//         }

//         // Update profile fields only if they are provided
//         if (fullname) user.fullname = fullname;
//         if (email) user.email = email;
//         if (phoneNumber) user.phoneNumber = phoneNumber;
//         if (bio) {
//             if (!user.profile) user.profile = {}; // Ensure profile exists
//             user.profile.bio = bio;
//         }
//         if (skills) {
//             if (!user.profile) user.profile = {}; // Ensure profile exists
//             user.profile.skills = Array.isArray(skills) ? skills : skills.split(",");
//         }

//         await user.save();

//         return res.status(200).json({
//             message: "Profile updated successfully.",
//             user,
//             success: true
//         });

//     } catch (error) {
//         console.error("Update Profile Error:", error);
//         return res.status(500).json({
//             message: "Internal server error.",
//             success: false
//         });
//     }
// };
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        
        const file = req.file;
        // cloudinary ayega idhar
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
      
        // resume comes later here...
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }


        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

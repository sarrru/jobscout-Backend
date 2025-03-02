// import { Company } from "../models/company.model.js";
// import getDataUri from "../utils/datauri.js";
// import cloudinary from "../utils/cloudinary.js";

// export const registerCompany = async (req, res) => {
//     try {
//         const { name } = req.body;
//         if (!name) {
//             return res.status(400).json({
//                 message: "Company name is required.",
//                 success: false
//             });
//         }
//         let company = await Company.findOne({ name });
//         if (company) {
//             return res.status(400).json({
//                 message: "You can't register same company.",
//                 success: false
//             })
//         };
//         company = await Company.create({
//             name,
//             userId: req.id
//         });

//         return res.status(201).json({
//             message: "Company registered successfully.",
//             company,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }



// export const getCompany = async (req, res) => {
//     try {
//         const userId = req.id; // logged in user id
//         const companies = await Company.find({ userId });
//         if (!companies) {
//             return res.status(404).json({
//                 message: "Companies not found.",
//                 success: false
//             })
//         }
//         return res.status(200).json({
//             companies,
//             success:true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }





// export const registerCompany1 = async (req, res) => {
//     try {
//         const { 
//             name, 
//             description, 
//             website, 
//             location, 
//             logo, 
//             jobDescription, 
//             jobSalary, 
//             jobPosition 
//         } = req.body;

//         // Validate required field: companyName
//         if (!name) {
//             return res.status(400).json({
//                 message: "Company name is required.",
//                 success: false
//             });
//         }

//         // Check if company already exists
//         let company = await Company.findOne({ name: name });
//         if (company) {
//             return res.status(400).json({
//                 message: "Company already exists.",
//                 success: false
//             });
//         }

//         // Create the company with optional fields.
//         // If any optional field is not provided, it will default to null.
//         company = await Company.create({
//             name: name,
//             userId: req.id,
//             description: description || null,
//             website: website || null,
//             location: location || null,
//             logo: logo || null,
//             jobDescription: jobDescription || null,
//             jobSalary: jobSalary ? Number(jobSalary) : null,
//             jobPosition: jobPosition || null
//         });

//         return res.status(201).json({
//             message: "Company registered successfully.",
//             company,
//             success: true
//         });
//     } catch (error) {
//         console.error("Error registering company:", error);
//         return res.status(500).json({
//             message: "Server error",
//             success: false
//         });
//     }
// };

// // get company by id
// export const getCompanyById = async (req, res) => {

//     try {
//         const companyId = req.params.id;
//         const company = await Company.findById(companyId);
//         if (!company) {
//             return res.status(404).json({
//                 message: "Company not found.",
//                 success: false
//             })
//         }
//         return res.status(200).json({
//             company,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const updateCompany = async (req, res) => {
//     try {
//         const { name, description, website, location } = req.body;
 
//         const file = req.file;
//         //  cloudinary 
//         const fileUri = getDataUri(file);
//         const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
//         const logo = cloudResponse.secure_url;
    
//         const updateData = { name, description, website, location, logo };

//         const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

//         if (!company) {
//             return res.status(404).json({
//                 message: "Company not found.",
//                 success: false
//             })
//         }
//         return res.status(200).json({
//             message:"Company information updated.",
//             success:true
//         })

//     } catch (error) {
//         console.log(error);
//     }
// }


import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            })
        };
        company = await Company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


export const getCompany = async (req, res) => {
    try {
        const companies = await Company.find(); // Fetch all companies

        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "No companies found.",
                success: false
            });
        }

        return res.status(200).json({
            success: true,
            companies
        });
    } catch (error) {
        console.error("Error fetching companies:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};





export const registerCompany1 = async (req, res) => {
    try {
        const { 
            name, 
            description, 
            website, 
            location, 
            logo, 
            jobDescription, 
            jobSalary, 
            jobPosition 
        } = req.body;

        // Validate required field: companyName
        if (!name) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }

        // Check if company already exists
        let company = await Company.findOne({ name: name });
        if (company) {
            return res.status(400).json({
                message: "Company already exists.",
                success: false
            });
        }

        // Create the company with optional fields.
        // If any optional field is not provided, it will default to null.
        company = await Company.create({
            name: name,
            userId: req.id,
            description: description || null,
            website: website || null,
            location: location || null,
            logo: logo || null,
            jobDescription: jobDescription || null,
            jobSalary: jobSalary ? Number(jobSalary) : null,
            jobPosition: jobPosition || null
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        });
    } catch (error) {
        console.error("Error registering company:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// get company by id
export const getCompanyById = async (req, res) => {

    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
 
        const file = req.file;
        //  cloudinary 
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;
    
        const updateData = { name, description, website, location, logo };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            message:"Company information updated.",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}

export const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.id;

        // Check if the company exists
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        // Delete the company
        await Company.findByIdAndDelete(companyId);

        return res.status(200).json({
            message: "Company deleted successfully.",
            success: true
        });
    } catch (error) {
        console.error("Error deleting company:", error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

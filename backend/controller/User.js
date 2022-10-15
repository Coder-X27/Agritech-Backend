import { User } from "../model/User.js";
import jwt from "jsonwebtoken";
import { Crop } from "../model/Crop.js";
import cloudinary from 'cloudinary'

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 600000),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged In Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged Out Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, email, password, phonenumber, location } = req.body;

    if (name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    if (phonenumber) {
      user.phonenumber = phonenumber;
    }
    if (location) {
      user.location = location;
    }
    await user.save();

    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const addCrop = async (req, res) => {
  try {
    const file = req.files.image;
    await cloudinary.v2.uploader.upload(file.tempFilePath, (err, res) => {
      const { Name, templow, temphigh, location, Soil, Variety, ph, NitrogenLevel, Nutrients, pest, PestControl, Fertilizers, HarvestName } = req.body;
      const crop=new Crop({ Name, templow, temphigh, location, Soil, Variety, ph, NitrogenLevel, Nutrients, pest, PestControl, Fertilizers, HarvestName,image:res.url })
      crop.save()
    })
    res.status(200).json({
      success: true,
      message:"Crop Data Uploaded Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const fetchAllCrops = async (req, res) => {
  try {
    const crop = await Crop.find()
    res.status(201).json(crop);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

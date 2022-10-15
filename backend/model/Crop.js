import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
    Name: String,
    templow: String,
    temphigh: String,
    location: String,
    Soil:  String,
    Variety: String,
    ph: String,
    NitrogenLevel: String,
    Nutrients: String,
    pest: String,
    PestControl: String,
    Fertilizers: String,
    HarvestName: String,
    image:String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export const Crop = mongoose.model("Crop", cropSchema);

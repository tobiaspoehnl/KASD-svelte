import { Placemark } from "./placemark.js";
import {userStore} from "./user-store.js";

export const placemarkStore = {

    async getAllPlacemarks() {
        const placemark = await Placemark.find().lean();
        return placemark;
    },

    async getPlacemarkById(id) {
        if (id) {
            const placemark = await Placemark.findOne({ _id: id }).lean();
            return placemark;
        }
        return null;
    },

    async addPlacemark(userid, placemark) {
        placemark.createdby=userid;
        const newPlacemark = new Placemark(placemark);
        const placemarkobj = await newPlacemark.save();
        return this.getPlacemarkById(placemarkobj._id);
    },

    async getUserPlacemarks(user) {
        const id = await userStore.getUserById()
        const placemark = await Placemark.find({ createdby: id }).lean();
        return placemark;
    },

    async deletePlacemarkById(id) {
        try {
            await Placemark.deleteOne({ _id: id });
        } catch (error) {
            console.log("bad id");
        }
    },

    async deleteAllPlacemarks() {
        await Placemark.deleteMany({});
    },

    async updatePlacemark(updatedPlacemark) {
        console.log(updatedPlacemark)
        const placemark = await Placemark.findOne({ _id: updatedPlacemark._id });
        placemark.name = updatedPlacemark.name;
        placemark.image = updatedPlacemark.image;
        await placemark.save();
    },
};
const Blog = require("../../../models/blog");
const Banner = require("../../../models/banner");
const Course = require("../../../models/course");
const Category = require("../../../models/category");
const Tutor = require("../../../models/tutor");
const Testimonial = require("../../../models/testimonial");
const Faq = require("../../../models/faq");
const DealsAndOffers = require("../../../models/dealsAndOffers");
const { success, error } = require("../../../helpers/response");
const { retrieveRouter } = require("../../../routes/retrieveRouter");
const { UserAuthMiddleware } = require('../../../middleware/AuthMiddleware')

const RetrieveAllTable = async (req, res) => {
    try {
        const banners = await Banner.find();
        const categories = await Category.find();
        const courses = await Course.find().populate({ path: "user" }).populate({ path: "category" }).populate({ path: "tutor" });
        const tutors = await Tutor.find();
        const testimonials = await Testimonial.find();
        const faqs = await Faq.find();
        const dealsAndOffers = await DealsAndOffers.find();

        return res.send(success("Retrieve Successfully", { banners, categories, courses, tutors, testimonials, faqs, dealsAndOffers }));
    } catch (err) {
        return res.send(error("server error"))
    }

};
retrieveRouter.get("/app/master", UserAuthMiddleware(), RetrieveAllTable);

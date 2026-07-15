const prisma = require("../config/prisma");

// Get all published blogs
const getBlogs = async (req, res) => {
    try {
        const blogs = await prisma.blog.findMany({
            where: {
                isPublished: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single blog by slug
const getBlog = async (req, res) => {
    try {
        const blog = await prisma.blog.findUnique({
            where: {
                slug: req.params.slug,
            },
        });

        if (!blog || !blog.isPublished) {
            return res.status(404).json({
                message: "Blog not found",
            });
        }

        // Increase view count
        await prisma.blog.update({
            where: {
                id: blog.id,
            },
            data: {
                views: {
                    increment: 1,
                },
            },
        });

        const updatedBlog = await prisma.blog.findUnique({
            where: {
                id: blog.id,
            },
        });

        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Create blog
const createBlog = async (req, res) => {
    try {
        const blog = await prisma.blog.create({
            data: req.body,
        });

        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update blog
const updateBlog = async (req, res) => {
    try {
        const blog = await prisma.blog.update({
            where: {
                id: Number(req.params.id),
            },
            data: req.body,
        });

        res.json(blog);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete blog
const deleteBlog = async (req, res) => {
    try {
        await prisma.blog.delete({
            where: {
                id: Number(req.params.id),
            },
        });

        res.json({
            message: "Blog deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
};
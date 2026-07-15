const prisma = require("../config/prisma");
const sendMail = require("../utils/sendMail");

const createContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const contact = await prisma.contact.create({
            data: {
                name,
                email,
                subject,
                message,
            },
        });

        await sendMail({
            subject: `New Contact: ${subject}`,
            text: `
Name: ${name}

Email: ${email}

Message:

${message}
`,
        });

        res.status(201).json({
            message: "Message sent successfully",
            contact,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createContact,
};
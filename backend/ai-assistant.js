const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Endpoint to fetch username
router.get('/username', async (req, res) => {
    const { email } = req.query;
    try {
        const user = await getUserByEmail(email); 
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ name: user.name });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Endpoint to interact with the Gemini API
router.post('/ask', async (req, res) => {
    const { question } = req.body;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([question]);
        res.json({ response: result.response.text() });
    } catch (error) {
        console.error('Error interacting with Gemini API:', error);
        res.status(500).json({ error: 'Failed to fetch response' });
    }
});

module.exports = router;

import Feedback from '../models/feedbackModel.js';

export const createFeedback = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || text.trim() === "") {
            return res.status(400).json({ success: false, message: 'Feedback cannot be empty' });
        }

        const newFeedback = new Feedback({ text });
        await newFeedback.save();
        res.status(201).json({ success: true, message: 'Feedback saved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to save feedback' });
    }
};

  

export const getFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: feedback });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve feedback', error: error.message });
    }
};

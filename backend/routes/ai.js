const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Product = require('../models/Product');

router.post('/analyze', async (req, res) => {
  const { imageBase64 } = req.body;
  if (!imageBase64) return res.status(400).json({ message: 'No image provided' });

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Use gemini-2.5-flash for fast multimodal processing
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Extract mimeType and base64 data
    const matches = imageBase64.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ message: 'Invalid image format' });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType
      }
    };

    const prompt = `Analyze this image. Identify the fashion style (e.g., Casual, Streetwear, Formal, Minimalist) and the dominant colors. Return your analysis strictly as a JSON object with two keys: "style" (string) and "colors" (array of strings). Do not include any markdown formatting or extra text.`;

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    let analysis;
    try {
      const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      analysis = JSON.parse(cleanedText);
    } catch (e) {
      console.log('Failed to parse gemini response:', text);
      analysis = { style: 'Casual', colors: ['Neutral'] };
    }

    // Determine category based on style
    let searchCategory = 'MEN'; // Default fallback
    const upperStyle = analysis.style.toUpperCase();
    if (upperStyle.includes('STREET')) searchCategory = 'STREETWEAR';
    if (upperStyle.includes('FORMAL') || upperStyle.includes('SUIT')) searchCategory = 'FORMAL';

    const recommendations = await Product.find({
      $or: [
        { category: searchCategory },
        { description: { $regex: analysis.style, $options: 'i' } }
      ]
    }).limit(6);

    res.json({
      analysis,
      recommendations
    });

  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

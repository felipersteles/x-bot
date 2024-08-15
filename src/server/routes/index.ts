import { Router } from "express";
import { TwitterService } from "../../app/twitter";

const router = Router();

router.post('/api/send-tweet', async (req, res) => {
    try {
        const service = new TwitterService();
        
        const response = await service.tweet(req.body.message)

        console.log("Messagem do dia enviada: ");
        console.log(response);
        res.status(201).json({ message: "Tweet sent successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Failed to send tweet" });
    }
})

export { router };
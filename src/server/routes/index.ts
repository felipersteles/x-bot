import { Router } from "express";
import { TwitterService } from "../../app/twitter";

const router = Router();

router.post('/api/send-tweet', async (req, res) => {
    try {
        const service = new TwitterService();

        const response = await service.verifyReplies();

        console.log("[INFO] Mensagem do dia enviada: ");
        res.status(201).json({ message: "Tweet sent successfully", data: response });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Failed to send tweet" });
    }
})

export { router };
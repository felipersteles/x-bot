import cron from 'node-cron';
import pensador from 'pensador-promise';
import { TwitterApi, TwitterApiv2 } from 'twitter-api-v2';
import { Oracle } from './oracle';

export class TwitterService {

    private readonly client: TwitterApiv2
    private readonly botId: string = "890685337273589763";
    private readonly oracle: Oracle;

    constructor() {

        const twitterAuth = new TwitterApi({
            appKey: `${process.env.API_KEY}`,
            appSecret: `${process.env.API_SECRET}`,
            accessToken: `${process.env.ACCESS_TOKEN}`,
            accessSecret: `${process.env.ACCESS_SECRET}`,
        });

        this.client = twitterAuth.v2;
        this.oracle = new Oracle()
    }

    async tweet(message: string) {

        if (!message) throw new Error(`Missing param: message.`);

        const res = await this.client.tweet({
            text: message,
        });


        return res;
    }


    async verifyReplies() {

        this.getTaggedTweetsForUser(this.botId);
    }

    private async getTaggedTweetsForUser(userId: string) {
        try {

        } catch (error) {
            console.error(error);
        }
    }

    private async getMyUser() {
        try {
            const response = await this.client.user("me");

            return response.data.id;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    private async getRandomPhrase() {

        const authors = [
            "Albert Einstein",
            "julio_cesar",
            "alexandre_dumas",
            "karl marx",
            "clarice lispector",
            "hilda hist",
            "proverbio"
        ]
        const randomIndex = Math.floor(Math.random() * authors.length);

        const phrase = await pensador(
            {
                term: authors[randomIndex],
                max: 100
            });

        return (phrase);
    }

    async dailyTweet() {
        cron.schedule('52 7 * * *', async () => {
            try {
                const reveal = this.oracle.getReveal();
                const res = await this.client.tweet({
                    text: reveal,
                });

                console.log("Mensagem do dia enviada: ");
                console.log(reveal);
                return { res, reveal };
            } catch (error) {
                console.error(error);
                return null;
            }
        });


    }
}
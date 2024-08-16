import cron from 'node-cron';
import pensador from 'pensador-promise';
import { TwitterApi, TwitterApiv2 } from 'twitter-api-v2';
import { Oracle } from './oracle';
import { cutString } from '../utils';

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

    private async tweet(message: string) {

        if (!message) throw new Error(`Missing param: message.`);
        try {

            const res = await this.client.tweet({
                text: message,
            });

            return res;
        } catch (error) {
            console.log(error);
            return null;
        }
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

    private async tweetRandomPhrase() {

        const authors = [
            "desconhecido",
            "alexandre_dumas",
            "karl marx",
            "clarice lispector",
            "Albert Einstein",
            "hilda hist",
            "proverbio",
            "julio_cesar",
            "marcel_proust",
            "william_shakespeare",
            "frank_herbert",
            "joan_D_arc",
            "antonio_manuel_de_la_pensa",
            "henry_ford",
            "leonardo_da_vinci",
            "michellangelo",
            "papa"
        ]
        const randomIndex = Math.floor(Math.random() * authors.length);

        const url = `https://pensador-api.vercel.app/?term=${authors[randomIndex]}&max=100`;
        try {

            const req = await fetch(url);
            const data = await req.json();
            console.log("[INFO]: fetching in url", url)

            const randomPhrase = Math.floor(Math.random() * data.frases.length);

            const phrase = data.frases[randomPhrase];
            const { autor, texto } = phrase;

            const message = cutString(`${(texto)}${autor}`);
            const tweet = this.tweet(message);

            return { message, tweet }
        } catch (error) {
            console.log(error);
            return null;
        }

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


        cron.schedule('00 11 * * *', async () => {
            try {
                const res = await this.tweetRandomPhrase();

                console.log("[INFO]: Mensagem do dia enviada: ");
                console.log(res?.message);
                return res;
            } catch (error) {
                console.error(error);
                return null;
            }
        });
    }
}
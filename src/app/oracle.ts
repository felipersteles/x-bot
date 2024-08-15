import { TwitterApi, TwitterApiv2 } from 'twitter-api-v2';

export class TwitterService {

    private readonly client: TwitterApiv2

    constructor() {

        const twitterAuth = new TwitterApi({
            appKey: `${process.env.API_KEY}`,
            appSecret: `${process.env.API_SECRET}`,
            accessToken: `${process.env.ACCESS_TOKEN}`,
            accessSecret: `${process.env.ACCESS_SECRET}`,
        });

        this.client = twitterAuth.v2;
    }

    async tweet(message: string) {
        
        if(!message) throw new Error(`Missing param: message.`);

        const res = await this.client.tweet({
            text: message,
        });

        return res;
    }
}
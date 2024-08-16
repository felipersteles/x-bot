
import iChing from '../../data/iching.json';
import { formatDate } from '../utils';

export class Oracle {

    private trigramSequences: { [key: string]: number[] };

    constructor() {
        this.trigramSequences = {
            earlierHeaven: [1, 6, 4, 5, 2, 3, 7, 8],
            laterHeaven: [7, 2, 8, 1, 4, 5, 3, 6]
        };
    }

    ask(message: string) {


        // const trigrams = this.extractTrigrams(message);
        // const sequence = this.findMatchingSequence(trigrams);

        // if (sequence) {
        //     // const card = iChing[sequence - 1];
        //     return card.meaning;
        // } else {
        //     return "No matching trigram sequence found.";
        // }
    }

    getTrigram(code: number) {
        const trigram = iChing.trigrams[code];
        return trigram;
    }

    getReveal() {

        const hexagrams = iChing.hexagrams
        const randomIndex = Math.floor(Math.random() * hexagrams.length);

        const dayReveal = hexagrams[randomIndex];
        const topTrigram = this.getTrigram(dayReveal.topTrigram);
        const bottomTrigram = this.getTrigram(dayReveal.bottomTrigram);

        let message = `${dayReveal.character} ${topTrigram ? topTrigram.images[0] : ""}, ${bottomTrigram ? bottomTrigram.images[0] : ""}.\n${dayReveal.chineseName} `;

        if (dayReveal.names.length > 1) {
            const header = dayReveal.names.shift();
            message += `${header} - ` + dayReveal.names.join(" ");
        } else {
            message += dayReveal.names.join(" ");
        }

        if (topTrigram) {
            message += `\n\nTrigrama superior${topTrigram.chineseName}: ${topTrigram.character} ${topTrigram.names.join(" - ")}.\n`;
        }
        if (bottomTrigram)
            message += `Trigrama inferior${bottomTrigram.chineseName}: ${bottomTrigram.character} ${bottomTrigram.names.join(" - ")}.`;

        return message;
    }
}
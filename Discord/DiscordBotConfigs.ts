import {Message} from "discord.js";

const DiscordBotConfig = {
    guessNum: 3,
    altDefNum: 3
};


const DiscordBotCommands = {
    getCommands: "!commands",
    initialGuess: "!ud",
    guessDef: "!g ",
    altDef: "!ad",
    stupidWord: "!rw",
    getUserGuessFromMsg: function(userGuessMsg: string){
        if (userGuessMsg.length < this.guessDef.length  || ! userGuessMsg.startsWith(this.guessDef)){
            console.log("Invalid user guess message!");
            return -1;
        }
        return userGuessMsg.substring(this.guessDef.length, userGuessMsg.length);
    },
    correctDefReasonStr: "User had the correct definition",
    stupidWordReasonStr: "This was a stupid word to try and guess",
    allCommands: `!ud -> Get a definition with examples to guess\n
    !g [your guess here] -> Submit a guess (up to 3 accepted)\n
    !ad -> Get an alternate definition and example (Up to 3 others)\n
    !rw -> Reveal the word!`
    // guessFilter: (msg): boolean => {
    //     return msg.content.startsWith(this.guessDef);
    // },

}

// console.log(DiscordBotCommands.getDefFromResponse("/g "));

export {DiscordBotConfig,DiscordBotCommands};
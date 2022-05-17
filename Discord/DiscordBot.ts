import {Client, Intents, Message, MessageCollector, TextChannel} from "discord.js";
import {getDefsForWord,getRandomMessages} from "../UrbanDictionary/UrbanDictionary"
import {DiscordBotConfig,DiscordBotCommands} from "./DiscordBotConfigs";
import {MessageQueue} from "../MessageQueue";
import {
    revealChars,
    removeSquareBrackets,
    filterOutWord,
    getNumOfWords,
    getCharCountOfWords,
    removeCharsAfterCutoff
} from "../ModifyStrings"
import {DefinitionObject} from "../UrbanDictionary/DefinitionObject";
import {getUDWordObjWithoutNames} from "../Name/BehindTheName";

const client = new Client({intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS]});

const randomMessagesQueue = new MessageQueue();


client.on('messageCreate', async message => {

    if (message.toString() === DiscordBotCommands.getCommands){
        await message.reply(DiscordBotCommands.allCommands)
    }

    else if (message.toString() === DiscordBotCommands.initialGuess) {
        const validDefObj : DefinitionObject = await getUDWordObjWithoutNames(randomMessagesQueue);
        const word: string = validDefObj.word;

        console.log("called ud");
        const guessMsgFilter = userGuessMsg => userGuessMsg.content.startsWith(DiscordBotCommands.guessDef);

        const guessMessageCollector: MessageCollector = message.channel.createMessageCollector({filter: guessMsgFilter, time: DiscordBotConfig.timeToGuessWord, max: DiscordBotConfig.guessNum})

        const currMsgDefsQueue = await getDefsForWord(word);

        const firstDefObj: DefinitionObject = currMsgDefsQueue.popFirst();

        // const firstDefObj = currMsgDefsQueue.popFirst();
        // const word = firstDefObj.word;


        const firstDef = removeCharsAfterCutoff(filterOutWord(word,removeSquareBrackets(firstDefObj.definition)));
        const firstExample = removeCharsAfterCutoff(filterOutWord(word, removeSquareBrackets(firstDefObj.example)));
        console.log(word);
        await message.reply(`Word Length: ** ${getCharCountOfWords(word)} **, Number of words: **${getNumOfWords(word)}**\n\n**Definition**: ${firstDef} \n\n**Example**: ${firstExample}`)


        const altDefMsgFilter = userMsg => userMsg.content === DiscordBotCommands.altDef;

        const altDefMsgCollector: MessageCollector = message.channel.createMessageCollector({filter: altDefMsgFilter, time: DiscordBotConfig.timeToGuessWord, max: DiscordBotConfig.altDefNum})

        altDefMsgCollector.on('collect', altDefReq => {
            if (currMsgDefsQueue.queueIsEmpty()){
                altDefReq.reply("Unfortunately there aren't any more alternate definitions. Just git gud skrub.")
            }else{
                const newDefObj = currMsgDefsQueue.popFirst();
                const newDefinition = removeCharsAfterCutoff(filterOutWord(word,removeSquareBrackets(newDefObj.definition)));
                const newExample = removeCharsAfterCutoff(filterOutWord(word, removeSquareBrackets(newDefObj.example)));
                altDefReq.reply(`Word Length: ** ${getCharCountOfWords(word)} **, Number of words: **${getNumOfWords(word)}**\n\n**Definition**: ${newDefinition} \n\n**Example**: ${newExample}`)
            }
        });

        guessMessageCollector.on('collect', guessMsg => {
            const userGuess = DiscordBotCommands.getUserGuessFromMsg(guessMsg.content);
            if (userGuess === -1){
                guessMsg.reply("Invalid guess message! Try again");

            }else if (userGuess.toLowerCase() === word.toLowerCase()){
                guessMsg.reply("You got the correct definition!");
                guessMessageCollector.stop(DiscordBotCommands.correctDefReasonStr);
                altDefMsgCollector.stop(DiscordBotCommands.correctDefReasonStr);
                stopGuessingCollector.stop(DiscordBotCommands.correctDefReasonStr);
            }else{
                // console.log('guess is: ' + guessMsg.content);
                guessMsg.reply("Wrong guess stoopid! Try again");
            }
        });

        guessMessageCollector.on('end', (collected, reason)=> {
            // @ts-ignore
            if (reason === DiscordBotCommands.correctDefReasonStr){
                console.log("User ended with correct message");
            }else //@ts-ignore
                if (reason === DiscordBotCommands.stupidWordReasonStr){
                console.log("User didn't want to keep guessing")
            } else{
                // console.log("no correct guesses :(");
                // console.log(`Collected ${collected.size} items`);
                message.reply(`You ran out of time or guesses! The correct word(s) is: __${word}__`);
            }
        });

        const stopGuessingFilter = msg => msg.content === DiscordBotCommands.stupidWord;

        const stopGuessingCollector: MessageCollector = message.channel.createMessageCollector({filter: stopGuessingFilter, time: DiscordBotConfig.timeToGuessWord, max: 1})

        stopGuessingCollector.on("collect", msg =>{
            msg.reply(`I guess your brain is too smooth for this. The word is __${word}__`)
            guessMessageCollector.stop(DiscordBotCommands.stupidWordReasonStr);
            altDefMsgCollector.stop(DiscordBotCommands.stupidWordReasonStr);
            stopGuessingCollector.stop(DiscordBotCommands.stupidWordReasonStr);
        });


    }
});


function main() {
    if (process.env.BOT_TOKEN){
        client.login(process.env.BOT_TOKEN).then( ()=>{
            client.user.setPresence({
                status: 'online',
                afk: false,
                activities: [{name: "!commands", type:"PLAYING"}]
            });
        });
    }else{
        const config = require('../Config/configsMap.json');
        client.login(config.token).then( ()=>{
            client.user.setPresence({
                status: 'online',
                afk: false,
                activities: [{name: "!commands", type:"PLAYING"}]
            });
        });
    }
}

main();

console.log("working!");
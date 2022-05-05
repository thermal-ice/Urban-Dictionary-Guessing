import {Client, Intents, Message, MessageCollector, TextChannel} from "discord.js";
import {getDefsForWord,getRandomMessages} from "../UrbanDictionary/UrbanDictionary"
import {DiscordBotConfig,DiscordBotCommands} from "./DiscordBotConfigs";
import {MessageQueue} from "../MessageQueue";
import {revealChars, removeSquareBrackets, filterOutWord,getNumOfWords} from "../ModifyStrings"

const config = require('../Config/botToken.json');

const client = new Client({intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS]});

const randomMessagesQueue = new MessageQueue();


client.on('messageCreate', async message => {
    // console.log(message.toString());

    if (message.toString() === DiscordBotCommands.initialGuess) {
        await getRandomMessages(randomMessagesQueue);

        console.log("called ud");
        const guessMsgFilter = userGuessMsg => userGuessMsg.content.startsWith(DiscordBotCommands.guessDef);

        const guessMessageCollector: MessageCollector = message.channel.createMessageCollector({filter: guessMsgFilter, time: 45000, max: DiscordBotConfig.guessNum})

        const currMsgDefsQueue = await getDefsForWord(randomMessagesQueue);

        const firstDefObj = currMsgDefsQueue.popFirst();
        const word = firstDefObj.word;

        const firstDef = filterOutWord(word,removeSquareBrackets(firstDefObj.definition));
        const firstExample = filterOutWord(word, removeSquareBrackets(firstDefObj.example));
        console.log(word);
        await message.reply(`Word Length: ** ${word.length} **, Number of words: **${getNumOfWords(word)}**\n\n**Definition**: ${firstDef} \n**Example**: ${firstExample}`)


        const altDefMsgFilter = userMsg => userMsg.content === DiscordBotCommands.altDef;

        const altDefMsgCollector: MessageCollector = message.channel.createMessageCollector({filter: altDefMsgFilter, time: 45000, max: DiscordBotConfig.altDefNum})

        altDefMsgCollector.on('collect', altDefReq => {
            const newDefObj = currMsgDefsQueue.popFirst();
            const newDefinition = filterOutWord(word,removeSquareBrackets(newDefObj.definition));
            const newExample = filterOutWord(word, removeSquareBrackets(newDefObj.example));
            altDefReq.reply(`Word Length: ** ${word.length} **, Number of words: **${getNumOfWords(word)}**\n\n**Definition**: ${newDefinition} \n**Example**: ${newExample}`)
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
                message.reply(`You ran out of time or guesses! The correct word(s) is: ${word}`);
            }
        });

        const stopGuessingFilter = msg => msg.content === DiscordBotCommands.stupidWord;

        const stopGuessingCollector: MessageCollector = message.channel.createMessageCollector({filter: stopGuessingFilter, time: 45000, max: 1})

        stopGuessingCollector.on("collect", msg =>{
            msg.reply(`I guess your brain is too smooth for this. The word is __${word}__`)
            guessMessageCollector.stop(DiscordBotCommands.stupidWordReasonStr);
            altDefMsgCollector.stop(DiscordBotCommands.stupidWordReasonStr);
            stopGuessingCollector.stop(DiscordBotCommands.stupidWordReasonStr);
        });





        // const filter = m => m.content.includes('discord');
        // const collector = message.channel.createMessageCollector({ filter, time: 15000 , max: 4});
        //
        // let num = 0;
        // collector.on('collect', m => {
        //     num++;
        //     console.log(`Collected ${m.content}` + "num is:" + num);
        // });
        // //
        // collector.on('end', collected => {
        //     console.log(`Collected ${collected.size} items`);
        // });

    }
});



client.login(config.token).then( ()=>{
    client.user.setPresence({
        status: 'online',
        afk: false,
    });
});

console.log("working!");
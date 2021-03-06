import ud = require('urban-dictionary')
import {MessageQueue} from "../MessageQueue";
import {DefinitionObject} from "./DefinitionObject";
import {sortDefinitionObjectOnTotalVotes, sortDefinitionObjectOnVotesDiff} from "./Sort";
import {DiscordBotConfig} from "../Discord/DiscordBotConfigs";


// async function addToMsgQueue(msgQueue :MessageQueue){
//         if (! msgQueue.queueIsEmpty()) {
//             console.log("non empty queue!")
//         }
//         else{
//             let messages = await ud.random()
//             console.log(messages[0])
//             console.log(messages[1])
//             console.log(messages[2])
//             console.log("got here!")
//             msgQueue.addAllToQueue(messages)
//             // ud.random().then((results) => {
//             //     console.log('random (promise)')
//             //
//             //     // Object.entries(results[0]).forEach(([key, prop]) => {
//             //     //     console.log(`${key}: ${prop}`)
//             //     // })
//             //     arr.getQueue().push(results)
//             //     console.log("pushing results into queue")
//             // }).catch((error) => {
//             //     console.error(`random (promise) - error ${error.message}`)
//             // });
//         }
//     return "finished"
//
//
// }
// async function runTwice(){
//     await addToMsgQueue(myMsgQueue);
//     await addToMsgQueue(myMsgQueue);
//     await addToMsgQueue(myMsgQueue);
// }
//
// runTwice()


async function getDefsForWord(randomWord :string): Promise<MessageQueue>{

    //Get 10 different examples of it.

    try{
        let currWordDefsList: Array<DefinitionObject> = await ud.define(randomWord);
        currWordDefsList.sort(sortDefinitionObjectOnVotesDiff);

        let currMsgsQueue = new MessageQueue();
        currMsgsQueue.addAllToQueue(currWordDefsList);
        return currMsgsQueue;
    }catch(e){
        console.error(`Couldn't get the word "${randomWord}" from UD`)
        console.error(e);
    }
    return null;
}


async function getRandomMessages(randomWordsQueue :MessageQueue): Promise<void>{
    if (randomWordsQueue.queueIsEmpty()){
        //Need to fetch the words
        try{
            let allMsgs: Array<DefinitionObject> = []
            for (let i = 0; i < DiscordBotConfig.callsToRandomApi; i ++){
                let currMsgs: Array<DefinitionObject> = await ud.random();
                allMsgs.push(... currMsgs);
            }
            // let messages: Array<DefinitionObject> = await ud.random();
            allMsgs.sort(sortDefinitionObjectOnTotalVotes)
            // console.log(messages[0])
            // messages.forEach((defObj: DefinitionObject) => {
            //     console.log(defObj.thumbs_up - defObj.thumbs_down);
            // })
            randomWordsQueue.addAllToQueue(allMsgs);
            // await getDefsForWord(randomWordsQueue)
        }catch(e){
            console.error("Couldn't fetch random words from UD");
            console.error(e);
        }

    }else{
        // await getDefsForWord(randomWordsQueue);
    }

}

// async function testStuff(){
//     let result = await ud.define('test');
//     console.log(result);
// }
//testStuff()

// getRandomMessages(myMsgQueue);

export {getRandomMessages, getDefsForWord}

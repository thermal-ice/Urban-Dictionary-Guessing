import axios from 'axios'
import {errorCodes} from './ErrorCodes'
import {MessageQueue} from "../MessageQueue";
import {DefinitionObject} from "../UrbanDictionary/DefinitionObject";
import {getNumOfWords} from "../ModifyStrings";
import {getDefsForWord, getRandomMessages} from "../UrbanDictionary/UrbanDictionary";
import {DiscordBotConfig} from "../Discord/DiscordBotConfigs";

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function isValidName(data: any){
    return Array.isArray(data);
}

function isAPICallLimitError(data: object): boolean{
    if (! errorCodes.hasErrorCode(data)){
        return false;
    }
    return data["error_code"] === errorCodes.serviceUnavailableErrorCode;
}

function getBehindTheNameKey(): string{
    if(process.env.behindTheNameKey){
        return process.env.behindTheNameKey;
    }
    const config = require('../Config/configsMap.json');

    return config.behindTheNameKey;
}

// The name parameter is case insensitive.
// e.g) ?name=ALEXA and ?name=alexa both have the same result.
async function stringIsName(word: string){
    let res = await axios.get(`https://www.behindthename.com/api/lookup.json?name=${word}&key=${getBehindTheNameKey()}`);
    if (isAPICallLimitError(res.data)){
        await sleep(errorCodes.timePauseForAPICallMS);
        res = await axios.get(`https://www.behindthename.com/api/lookup.json?name=${word}&key=${getBehindTheNameKey()}`);
    }
    return isValidName(res.data);
}

async function getUDWordObjWithoutNames(randomMsgs: MessageQueue): Promise<DefinitionObject>{
    while(true){
        if (randomMsgs.getLength() <= DiscordBotConfig.discardedRandomWords){
            randomMsgs.emptyQueue();
            await getRandomMessages(randomMsgs);
        }
        //Otherwise word is a single word (no spaces), check if it's a name
        const currDefObj = randomMsgs.popFirst();
        if (getNumOfWords(currDefObj.word) !== 1){
            return currDefObj;
        }
        if (! await stringIsName(currDefObj.word)){
            return currDefObj;
        }
    }


}

// async function test(){
//    const res =  await stringIsName("alexa")
//     console.log(res);
// // await stringIsName("ajiojaiojfioa");
// //     console.log(isAPICallLimitError({ error_code: 50, error: 'name could not be found' }));
// }
//
// test();

export {getUDWordObjWithoutNames}


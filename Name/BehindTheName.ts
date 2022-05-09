import axios from 'axios'


function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function isValidName(data: any){
    return Array.isArray(data);
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
    const res = await axios.get(`https://www.behindthename.com/api/lookup.json?name=${word}&key=${getBehindTheNameKey()}`);
    return isValidName(res.data);
}

// async function test(){
//     // await stringIsName("alexa")
// // await stringIsName("ajiojaiojfioa");
// }

// test();

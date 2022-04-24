import {Client} from "discord.js";
const config = require('../Config/botConfig.json')

const client = new Client({intents: []})

client.login(config.token).then( ()=>{
    client.user.setPresence({
        status: 'online',
        afk: false,
    });
});

console.log("working!");
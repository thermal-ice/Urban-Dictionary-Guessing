import {DefinitionObject} from "./DefinitionObject";


const sortDefinitionObjectOnVotesDiff = (defObj1: DefinitionObject, defObj2 : DefinitionObject) =>{
    //Highest upvotes difference come first

    const defObj1UpvoteDiff = defObj1.thumbs_up - defObj1.thumbs_down;
    const defObj2UpvoteDiff  = defObj2.thumbs_up - defObj2.thumbs_down;
    return defObj2UpvoteDiff - defObj1UpvoteDiff;
}

const sortDefinitionObjectOnTotalVotes = (defObj1: DefinitionObject, defObj2 : DefinitionObject) =>{
    //Highest total number of votes

    const defObj1Votes = defObj1.thumbs_up + defObj1.thumbs_down;
    const defObj2Votes  = defObj2.thumbs_up + defObj2.thumbs_down;
    return defObj2Votes - defObj1Votes;
}

export {sortDefinitionObjectOnVotesDiff,sortDefinitionObjectOnTotalVotes}


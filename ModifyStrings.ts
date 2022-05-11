/** These functions are used to modify strings */
const revealChars = (word: string): string => {

    const index = Math.floor(Math.random() * word.length);
    const revealedChar = word[index];

    const regex = new RegExp(revealedChar,"gi");

    return word.replace(regex,"_")

}
// console.log(revealChars("hihiihgg"))

// Replaces all instances of "[" and "]" with a whitespace.
const removeSquareBrackets = (phrase: string): string => {
    const regex = new RegExp(/[\[\]]/, "g");
    return phrase.replace(regex,"");
}
// console.log(removeSquareBrackets('Bodily waste of varying color, [viscosity], shape, odor and [texture]. Usually exits the body through your [pooper], speed, noise and degree of pain may vary depending on what you ate. ',))

const filterOutWord = (word: string, phrase: string): string => {
    const regex = new RegExp(word,"gi");
    const hiddenStrRegex = new RegExp(/[^ ]/, "g")
    const censoredWord = word.replace(hiddenStrRegex,"\\*")
    return phrase.replace(regex,censoredWord);
}
// console.log(filterOutWord("from the giddy up","You should have told me you don't like men from the giddy up and I wouldn't have [wasted] [my time] taking [you out]."))

const getNumOfWords = (word:string): number => {
    return word.trim().split(" ").length;
}
// console.log(getNumOfWords("   hi hi hi  "));

const getCharCountOfWords = (words: string) => {
    const wordArr: Array<string> = words.split(" ");
    let charCount = 0;
    wordArr.forEach(currWord => {charCount += currWord.length});
    return charCount;
}
// console.log(getCharCountOfWords("hi hi bye"));
const maxNumOfChars = 995;

const removeCharsAfterCutoff = (words: string):string => {
    if (words.length > maxNumOfChars){
        return words.substring(0,maxNumOfChars).concat("...");
    }
    return words;
}

// console.log(removeCharsAfterCutoff("blah"));
// console.log(removeCharsAfterCutoff("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dui lectus, aliquet in tristique at, pretium in libero. Nullam faucibus turpis ante, vitae consequat turpis facilisis vel. Sed dignissim elit vel volutpat ultrices. Sed sit amet faucibus mauris. Phasellus vestibulum porttitor dui quis fringilla. Phasellus mattis sapien quis ultricies ullamcorper. Maecenas in cursus massa. Donec augue justo, convallis vitae ultricies in, elementum sit amet justo. Nunc imperdiet dolor ultricies mollis bibendum. Vivamus varius, lorem vitae volutpat finibus, nulla nisl tincidunt nisl, sit amet commodo metus elit sit amet augue. Donec et lectus sed nulla pretium ornare condimentum eu orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed luctus lobortis justo vitae facilisis.\n" +
//     "\n" +
//     "Nam suscipit sem a auctor scelerisque. Cras purus massa, fermentum vitae feugiat in, lobortis eget odio. Sed at dui nec lectus condimentum porta. Nulla justo ipsum, hendrerit scelerisque lorem at, congue ultrices lacus. Vivamus quis dui leo. In rutrum nulla metus, in elementum risus vulputate non. Vestibulum turpis tortor, pharetra nec scelerisque vitae, auctor at enim.\n" +
//     "\n" +
//     "Ut felis lacus, aliquet dapibus aliquet vel, dignissim non turpis. Nunc non erat nulla. Nullam non tristique velit. Morbi non sodales turpis. Vestibulum euismod lorem sit amet purus ornare, ac congue sem tempor. Praesent dui nunc, porttitor eu cursus at, fringilla in purus. Morbi nec ultricies libero, at rhoncus diam. Sed nec ornare diam. Vivamus dignissim, tortor ac mattis rhoncus, turpis mi finibus purus, nec cursus arcu sapien at sapien. Proin odio tellus, tincidunt eget sem vel, lacinia commodo velit. Phasellus eget lobortis leo. Mauris euismod auctor urna a accumsan. Maecenas dui est, lacinia eget bibendum ac, pulvinar in magna. Sed nec dolor risus. Nulla gravida mattis pharetra. Etiam vitae quam a orci vehicula aliquam et non felis.\n" +
//     "\n" +
//     "Sed in neque lorem. Nullam laoreet id arcu ut gravida. Donec sapien enim, tincidunt a nisl quis, semper tempor felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean molestie consectetur mi eget malesuada. Duis congue mauris vel purus varius bibendum. Integer non dolor dignissim, finibus sem at, fringilla leo. Proin eu mi vel ante rutrum vulputate. Mauris vel risus sit amet quam luctus pharetra.\n" +
//     "\n" +
//     "Vivamus accumsan odio nec ante lobortis, ac tempus sem convallis. Donec in pulvinar nisl, et molestie metus. Vivamus ut elit convallis, posuere magna ut, auctor tellus. Nullam a nunc eu turpis scelerisque lobortis id ut augue. Morbi tempus malesuada turpis id posuere. Donec sed vulputate ante. Donec scelerisque semper ornare. Phasellus vel egestas lacus, sed volutpat lorem.\n" +
//     "\n" +
//     "Curabitur vel enim euismod, lacinia mi ut, consequat lacus. Morbi ut leo condimentum, condimentum lacus consequat, ultricies magna. Aenean at luctus sapien. Vestibulum euismod lorem a nulla dapibus, et accumsan velit volutpat. Sed volutpat turpis vel imperdiet iaculis. Fusce lacus metus, faucibus a ex sit amet, suscipit auctor turpis. Nullam non laoreet nunc. Duis fermentum semper nunc non faucibus. Phasellus eget faucibus nisl. Donec non cursus ante. Duis mi nibh, commodo sit amet erat non, tempor ullamcorper lacus. Etiam dictum congue.\n" +
//     "\n"));

export {revealChars, removeSquareBrackets, filterOutWord, getNumOfWords, getCharCountOfWords, removeCharsAfterCutoff}
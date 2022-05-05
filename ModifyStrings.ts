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
    return word.split(" ").length;
}
// console.log(getWordLength("hi hi hi"));

export {revealChars, removeSquareBrackets, filterOutWord, getNumOfWords}
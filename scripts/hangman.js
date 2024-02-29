"use strict";

/**
 * Hangman game class
 */
class Hangman {
  static MIN_WORD_LENGTH = 4;
  static MAX_WORD_LENGTH = 6;

  static WORD_URL = "https://random-word-api.herokuapp.com/word?length=";

  newWord() {
    return fetchNewWord();
  }

  async fetchNewWord() {
    const length = MIN_WORD_LENGTH + Math.floor (Math.random() * (Hangman.MAX_WORD_LENGTH - Hangman.MIN_WORD_LENGTH));
    const response = await fetch( Hangman.WORD_URL + length );
    const word = await response.json();
    this.#log(word);
    return word;
  }

  #log(str) {
    console.log(str);
  }
 
}
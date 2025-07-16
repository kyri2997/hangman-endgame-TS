import {useState} from "react"
import {heroes} from "./heroes"
import {getRandomWord} from "./utils"

import ConfettiContainer from "./components/ConfettiContainer"
import Header from './components/Header'
import GameStatus from "./components/GameStatus";
import HeroChips from "./components/HeroChips";
import WordLetters from "./components/WordLetters";
import AriaLiveStatus from "./components/AriaLiveStatus";
import Keyboard from "./components/Keyboard";
import NewGameButton from "./components/NewGameButton";

export default function AssemblyEndgame() {
    // State values
    const [currentWord, setCurrentWord] = useState<string>(():string => getRandomWord())
    const [guessedLetters, setGuessedLetters] = useState<string[]>([])


    // Derived values
    const wrongGuessCount:number =
        guessedLetters.filter((letter:string):boolean => !currentWord.includes(letter)).length
    const maxGuesses:number = 8
    const numGuessesLeft:number = maxGuesses - wrongGuessCount
    const isGameWon:boolean =
        currentWord.split("").every((letter:string):boolean => guessedLetters.includes(letter))
    const isGameLost:boolean = wrongGuessCount >= maxGuesses
    const isGameOver:boolean = isGameWon || isGameLost
    const lastGuessedLetter:string = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect:boolean|any = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

    // Static values
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    function addGuessedLetter(letter:string):void {
        setGuessedLetters((prevLetters:string[]):string[] =>
            prevLetters.includes(letter) ?
                prevLetters :
                [...prevLetters, letter]
        )
    }

    function startNewGame():void {
        setCurrentWord(getRandomWord())
        setGuessedLetters([])
    }

    return (
        <main>
            <ConfettiContainer isGameWon={isGameWon}/>
            <Header/>

            <GameStatus
                isGameWon={isGameWon}
                isGameLost={isGameLost}
                isGameOver={isGameOver}
                isLastGuessIncorrect={isLastGuessIncorrect}
                wrongGuessCount={wrongGuessCount}
            />

            <HeroChips
                hero={heroes}
                wrongGuessCount={wrongGuessCount}
            />

            <WordLetters
                currentWord={currentWord}
                guessedLetters={guessedLetters}
                isGameLost={isGameLost}
            />

            <AriaLiveStatus
                currentWord={currentWord}
                lastGuessedLetter={lastGuessedLetter}
                guessedLetters={guessedLetters}
                numGuessesLeft={numGuessesLeft}
            />

            <Keyboard
                alphabet={alphabet}
                guessedLetters={guessedLetters}
                currentWord={currentWord}
                isGameOver={isGameOver}
                addGuessedLetter={addGuessedLetter}
            />

            <NewGameButton
                isGameOver={isGameOver}
                startNewGame={startNewGame}
            />
        </main>
    )
}

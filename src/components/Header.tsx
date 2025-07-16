import type {JSX} from 'react'

export default function Header():JSX.Element {
    return (
        <header>
            <h1>Hangman: Endgame</h1>
            <p>Guess the word within 8 attempts to keep the
                heroes safe from Thanos!</p>
        </header>
    )
}

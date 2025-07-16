import { clsx } from "clsx"
import type {JSX} from 'react'
import type {Hero} from '../heroes'

type HeroChipsProps = {
    hero: Hero[],
    wrongGuessCount: number
}

export default function Hero({ hero, wrongGuessCount }:HeroChipsProps):JSX.Element {
    const heroElements:JSX.Element[] = hero.map((lang:Hero, index:number):JSX.Element => {

        const isHeroLost:boolean = index < wrongGuessCount
        const styles:Omit<Hero, "name"> = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        const className:string = clsx("chip", isHeroLost && "lost")
        
        return (
            <span
                className={className}
                style={styles}
                key={lang.name}
            >
        {lang.name}
      </span>
        )
    })

    return <section className="heroes-chips">{heroElements}</section>
}
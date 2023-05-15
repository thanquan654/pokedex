import React from 'react'
import { Detail, PokemonDetail } from '../inteface'
import PokemonList from './PokemonList'
import styles from './pokemon.module.scss'


interface Props {
    pokemonList: PokemonDetail[]
    viewDetail: Detail
    setViewDetail: React.Dispatch<React.SetStateAction<Detail>>
}


const PokemonColection: React.FC<Props> = (props) => {
    const { pokemonList, viewDetail, setViewDetail } = props

    const selectPokemon = (id: number) => {
        if (!viewDetail.isOpen) {
            setViewDetail({
                id,
                isOpen: true
            })
        }
    }

    return (
        <>
            <section className={viewDetail.isOpen ? styles.collectionContainerActive : styles.collectionContainer}>
            {
                viewDetail.isOpen && <div className={styles.overlay}></div>
            }
            {pokemonList.map((pokemon) => {
                return (
                    <div onClick={() => selectPokemon(pokemon.id)}>
                        <PokemonList
                            viewDetail={viewDetail}
                            setViewDetail={setViewDetail}
                            key={pokemon.id}
                            name={pokemon.name}
                            id={pokemon.id}
                            abilities={pokemon.abilities}
                            image={pokemon.sprites.front_default}
                        />
                    </div>
                )
            })}
            </section>
        </>
    )
}

export default PokemonColection
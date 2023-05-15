import React, { useEffect, useState } from 'react'
import styles from './pokemon.module.scss'
import { Detail } from '../inteface'

interface Props {
    name: string,
    id: number,
    image: string
    abilities: {
      name: string,
      ability: string
    }[] | undefined
    viewDetail: Detail
    setViewDetail: React.Dispatch<React.SetStateAction<Detail>>
} 

const PokemonList: React.FC<Props> = (props) => {
    const {name, id, image, abilities, viewDetail, setViewDetail } = props

    const [ isSelected, setSelected ] = useState(false)

    useEffect(() => {
      setSelected(id === viewDetail?.id)
    }, [viewDetail])

    const closeDetail = () => {
      setViewDetail({
        id: 0,
        isOpen: false
      })
    }

  return (
    <div className="">
      {isSelected ? (
        <section className={styles.pokemonListDetailed}>
          <div className={styles.detailContainer}>
            <p className={styles.detailClose} onClick={closeDetail}>
              X
            </p>
            <div className={styles.detailInfo}>
              <img src={image} alt="" className={styles.detailImg} />
              <p className={styles.detailName}>{name}</p>
            </div>
            <div className={styles.detailSkill}>
              <p className={styles.detailAbitlity}>Abilities: </p>
              {abilities?.map((ab: any) => <div>{ab.ability.name}</div>)}
            </div>
          </div>
        </section>
      ) : (
        <div className={styles.pokemonListContainer}>
            <p className={styles.pokemonName}>{name}</p>
            <img src={image} />
        </div>
      )}
      
      
    </div>
  )
}

export default PokemonList
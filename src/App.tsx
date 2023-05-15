import axios from 'axios'
import { useState, useEffect } from "react"
import styles from './App.module.scss'
import PokemonColection from './components/PokemonColection'
import { Pokemon, Pokemons, Detail } from './inteface'



const App:React.FC = () => {
  const  [pokemons, setPokemons ] = useState<Pokemon[]>([])
  const [nextURL, setNextURL] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [viewDetail, setViewDetail] = useState<Detail>({
    id:0,
    isOpen: false
  })

  useEffect(() => {
    const getPokemon = async () => {
      // Lấy 20 con pokemon {name, url}
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0")
      // Set URL của next data khi ấn nút "Load more"
      setNextURL(res.data.next)
      
      // Lặp qua từng con pokemon để lấy dữ liệu  của từng con
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        //Lưu từng dữ liệu của pokemon vào trong state
        setPokemons(prev => [...prev, poke.data])

        setLoading(false)
      })
    }
    getPokemon()
  }, [])

  const loadMoreHandler = async () => {
    setLoading(true)
    // Lấy tiếp 20 con và set lại n
    const res = await axios.get(nextURL)
    setNextURL(res.data.next)

    // Lặp qua từng con pokemon để lấy dữ liệu  của từng con
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      //Lưu từng dữ liệu của pokemon vào trong state
      setPokemons(prev => [...prev, poke.data])
      setLoading(false)
    })
  }
  

  return (
    <div className='main'>
      <div className={viewDetail.isOpen ? styles.containerOverlay : styles.container}>
        <header className={styles.pokemonHeader}>Pokedex</header>
        <PokemonColection 
          pokemonList={pokemons} 
          viewDetail={viewDetail}
          setViewDetail={setViewDetail}
        />
        {!viewDetail.isOpen && (
          <div className={styles.btn}>
            <button onClick={loadMoreHandler}>
              {loading ? 'Loading...' : 'Load more' }
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

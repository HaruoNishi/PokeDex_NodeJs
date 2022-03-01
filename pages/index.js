import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import HomeCss from '../styles/Home.module.css'

export default function Home({pokemonListo}) {
  console.log("pokemonListo", pokemonListo)
  return (
    <>
      <div className={HomeCss.titulo}>
          <h1>Pokemons</h1>
      </div>
      <ul className={HomeCss.columnas}>
        {pokemonListo.map((pokemon, index) => {
          return (
            <li>
              <Link href={
                {
                  pathname: '/pokemon/[name]',
                  query: {name: pokemon.name}
                }
              }>
                <a>
                  <div className={`${HomeCss.card} ${pokemon.types[0].type.name}`}>
                    <div className={HomeCss.nombresTipos}>
                      <h3>{pokemon.name}</h3>
                      <div className={HomeCss.tipos}>
                        {pokemon.types.map((tipo, index) => {
                          return (
                            <p className={HomeCss.tipo}>{tipo.type.name}</p>
                          )
                        })}
                      </div>
                    </div>
                    <img 
                    src={pokemon.image} 
                    height="100" 
                    width={100}
                    className={HomeCss.imagen}
                    />
                  </div>
                </a>
              </Link>
            </li>
          )
          })}
        </ul>
    </>
  )
}

export async function getServerSideProps() {
  const traerPoke = (numero) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`)
      .then(response => response.json())
      .then(data => data)
  }

  let arrayPoke = []
  for (let index = 1; index <= 150; index++) {
    let data = await traerPoke(index)
    arrayPoke.push(data)
  }

  let pokemonListo = arrayPoke.map(pokemon => {
    return({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.other.dream_world.front_default,
      types: pokemon.types
    })
  })
  return {
    props: {
      pokemonListo
    },
  }
}

import Layout from '../components/MyLayout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const MovieLink = ({ show }) => (
    <li key={show.id}>
        <Link href="/p/[id]" as={`/p/${show.id}`}>
            <a>{show.name}</a>
        </Link>
        <style jsx>{`
            li {
                list-style: none;
                margin: 5px 0;
            }

            a {
                text-decoration: none;
                color: blue;
                font-family: 'Arial';
            }

            a:hover {
                opacity: 0.6;
            }
        `}</style>
    </li>
)

const Index = ({ shows }) => (
    <Layout>
        <h1>Batman TV Shows</h1>
        <ul>
            {shows.map(show => (
                <MovieLink key={show.id} show={show} />
            ))}
        </ul>
        <style jsx>{`
            h1,
            a {
                font-family: 'Arial';
            }

            ul {
                padding: 0;
            }

            li {
                list-style: none;
                margin: 5px 0;
            }

            a {
                text-decoration: none;
                color: blue;
            }

            a:hover {
                opacity: 0.6;
            }
        `}</style>
    </Layout>
)

Index.getInitialProps = async function() {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    const data = await res.json()

    console.log(`Show data fetched. Count: ${data.length}`)

    return {
        shows: data.map(entry => entry.show),
    }
}

export default Index

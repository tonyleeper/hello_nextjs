import Layout from '../../components/MyLayout'
import fetch from 'isomorphic-unfetch'

const Post = ({ show }) => {
    return (
        <Layout>
            <h1>{show.name}</h1>
            <p>{show.summary.replace(/<[/]?[pb]>/g, '')}</p>
            <img src={show.image.medium} />
        </Layout>
    )
}

Post.getInitialProps = async function(context) {
    const { id } = context.query
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
    const show = await res.json()

    console.log(`Fetched show: ${show.name}`)

    return { show }
}

export default Post

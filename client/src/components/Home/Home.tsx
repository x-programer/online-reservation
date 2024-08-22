import {Link} from 'react-router-dom'

function Home() {
  return (
    <>
        Home
        <div className='text-red-500 m-10'>
            <Link to="/register">isRegister ?</Link>
        </div>
    </>
  )
}

export default Home
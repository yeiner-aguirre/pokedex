import { useRef } from "react"
import { setTrainerG } from "../store/states/trainer.state"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import '../components/HomePage/styles.css/HomePage.css'

const HomePage = () => {

  const inputTrainer = useRef()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(setTrainerG(inputTrainer.current.value.trim()))
    navigate("/pokedex")
  }

  return (
    <body className="body-home">
      <div className="page-container">
        <div className="card-container">
          <div className="card">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/640px-International_Pok%C3%A9mon_logo.svg.png" alt="" />
            <div className="content">
              <h1 className="saludo"> Hi, trainer!</h1>
              <h2 className="preparado">To start this App, give me you trainer name</h2>
              <form className="formulario" onSubmit={handleSubmit}>
                <input className="input" ref={inputTrainer} type="text" />
                <button className="boton">Catch them all</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

export default HomePage
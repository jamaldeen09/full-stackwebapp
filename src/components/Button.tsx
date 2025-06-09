import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUp } from "@fortawesome/free-solid-svg-icons"

interface ButtonSchema {
    background: string
}
const Button = (props: ButtonSchema) => {
    const { background } = props
  return (
    <button style={{backgroundColor: background}}
    className={`flex w-full py-3 items-center gap-3 justify-center  rounded-full shadow-xl
    hover:brightness-90 active:brightness-75 transition-all`}>
        <p>Order Now</p>
        <FontAwesomeIcon icon={faArrowUp} className="text-white font-extrabold"/>
    </button>
  )
}

export default Button
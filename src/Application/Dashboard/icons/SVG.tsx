import { faArrowRight, faBars, faBasketShopping, faCartShopping, faHouse, faMicrochip, faSignOutAlt, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faReact } from '@fortawesome/free-brands-svg-icons';

export const house = <FontAwesomeIcon icon={faHouse} />
export const cart = <FontAwesomeIcon icon={faCartShopping} />
export const aiIcon = <FontAwesomeIcon icon={faMicrochip} />
export const product = <FontAwesomeIcon icon={faBasketShopping} />
export const reactIcon = <FontAwesomeIcon icon={faReact} className="w-10 h-6 text-cyan-400"/>
export const logout = <FontAwesomeIcon icon={faSignOutAlt}/>
export const harmBurgerMenu = <FontAwesomeIcon icon={faBars} />
export const x = <FontAwesomeIcon icon={faX} />
export const arrow = <FontAwesomeIcon icon={faArrowRight} />
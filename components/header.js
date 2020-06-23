import { Pane } from "evergreen-ui"
import Link from 'next/link'

const Header = () => {
  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Link href="/">
        <a>
          <img width="260" src="./poopasaurus.png"></img>
        </a>
      </Link>
    </Pane>        
  )
}

export default Header

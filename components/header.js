import { Pane, majorScale } from "evergreen-ui"
import Link from 'next/link'

const Header = () => {
  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      marginBottom={majorScale(2)}
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

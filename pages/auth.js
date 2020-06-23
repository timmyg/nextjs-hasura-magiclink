import useMagicLink from 'use-magic-link'
import Header from '../components/header'
import { Button } from 'evergreen-ui';

export default function Login() { 
  // create the hook
  const auth = useMagicLink(process.env.NEXT_PUBLIC__MAGIC_LINK_PUBLISHABLE_KEY);

  function loginNow() {
    const email = prompt('Enter your email');
    auth.login(email);
  } 


  return (
    <>
      <Header/>
      {auth.loggedIn ? 
        (
          <Button onClick={() => auth.logout()}>Logout</Button>
        ):(
          <Button onClick={loginNow}>Login</Button>
        )
      }
    </>
  )
}
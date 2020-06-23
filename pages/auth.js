import useMagicLink from 'use-magic-link'
import Header from '../components/header'
import { Button, TextInput, majorScale } from 'evergreen-ui';
import { useState } from 'react';
import Link from 'next/link';

export default function Login() { 
  // create the hook
  const auth = useMagicLink(process.env.NEXT_PUBLIC__MAGIC_LINK_PUBLISHABLE_KEY);
  console.log(auth);

  const [form, setForm] = useState({
    val: ""
  })

  const handleChange = (e) => {
    setForm({
      [e.target.name]: e.target.value,
    })
  }
  
  function onLogin(e) {
    e.preventDefault()
    auth.login(form.email);
  }

  function onLogout(e) {
    auth.logout()
  }

  return (
    <>
      <Header/>
      {auth.loggedIn ? 
        (
          <div style={{display: 'flex', textAlign: 'center'}}>
            <div>
            <Link href="/">
              <Button is="a" intent="success" appearance="minimal">Return to app</Button>
            </Link>
            </div>
            <div>
            <Button onClick={onLogout} appearance="minimal">Logout</Button>
            </div>
          </div>
        ):(
          <form onSubmit={ onLogin }
            style={{display: 'flex', justifyContent: 'center'}}
          >
            <TextInput
              name="email"
              placeholder='email address'
              disabled={auth.loading} 
              onChange={ handleChange }
            />
            <Button type="submit" value="Add" marginLeft={majorScale(1)}>Login</Button>
          </form>
        )
      }
    </>
  )
}
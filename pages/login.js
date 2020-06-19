import useMagicLink from 'use-magic-link'

export default function Home() { 
  // create the hook
  const auth = useMagicLink(process.env.NEXT_PUBLIC__MAGIC_LINK_PUBLISHABLE_KEY);

  function loginNow() {
    const email = prompt('Enter your email');
    auth.login(email);
  }

  function getContent() {
    // Show a loading screen until we detect the login-state
    if (auth.loading || auth.loggingIn || auth.loggingOut) {
      return '...'
    }

    // Show this, if logged in
    if (auth.loggedIn) {
      return (
        <div>
          You are logged-in.
          <br/>
          <button onClick={() => auth.logout()}>Logout</button>
        </div>
      )
    }

    // Show this, if not logged-in
    return (
      <div>
        <button onClick={loginNow}>Login Now</button>
      </div>
    )
  }

  return (
    <div className="container">
      <main>
        <h1>Login</h1>
        <div className="content">{getContent()}</div>
      </main>
    </div>
  )
}
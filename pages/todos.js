import { useEffect, useState } from "react";
import useMagicLink from "use-magic-link";

export default function BankStatement() {
  const auth = useMagicLink(
    process.env.NEXT_PUBLIC__MAGIC_LINK_PUBLISHABLE_KEY
  );
  const [statement, setStatement] = useState(null);

  async function clickHandler () {
    const res = await fetch("https://todo-timmyg.herokuapp.com/v1/graphql", {
      "headers": {
        "x-hasura-admin-secret": "Z6b;jJtuU82ZJWkv8ribLZLNj,"
      },
      "body": "{\"query\":\"query MyQuery {\\n  todos {\\n    id, title\\n  }\\n}\\n\",\"variables\":null,\"operationName\":\"MyQuery\"}",
      "method": "POST",
      // "mode": "cors"
    });
    res.json().then(res => console.log(res.data.todos))
    // const res = await fetch('https://.../posts')
    // Router.push({
    //   pathname: '/about',
    //   query: { name: 'Zeit' }
    // });
  };

  useEffect(() => {
    if (auth.loggedIn) {
      auth
        .fetch("/api/todos")
        .then((res) => res.json())
        .then((payload) => {
          setStatement(payload);
        });
    }
  }, [auth.loggedIn]);

  if (!auth.loggedIn) {
    return <div>Not Authorized!</div>;
  }

  if (statement === null) {
    return <div>Checking your todos ...</div>;
  }

  return (
    <>
      <div>
        Hello "{statement.email}", your balance is: {statement.balance} USD.
      </div>
        <button onClick={clickHandler}>
          Get todos
        </button>
    </>
  );
}

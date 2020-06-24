import { useSubscription } from 'urql';
import gql from 'graphql-tag'
const newActivitiesSubscription = gql`
  subscription newActivities {
    activities {
      id
      type
    }
  }
`;
const handleSubscription = (messages = [], response) => {
  console.log(messages, response);
  return [response.activities, ...messages];
};
export default function Login() { 
  const [res] = useSubscription({ query: newActivitiesSubscription }, handleSubscription);
  console.log({res});
  if (!res.data) {
    return <p>No new messages</p>;
  }
  return (
    <ul>
      {res.data.map(message => (
        <p key={message.id}>
          {message.id}: "{message.type}"
        </p>
      ))}
    </ul>
  );
};
import gql from 'graphql-tag'
import { useSubscription } from '@apollo/react-hooks';

export default function Login() { 
  const newActivitiesSubscription = gql`
    subscription newActivities {
      activities {
        id
        type
      }
    }
  `;

// function DontReadTheComments({ repoFullName }) {

//   return <h4>New comment: {!loading && commentAdded.content}</h4>;
// }

  const { data, loading } = useSubscription(
    newActivitiesSubscription,
    // { variables: { repoFullName } }
  );

  console.log({data, loading});
  
  if (data) {
  return (
    data.activities.map((activity, index) => (
      <h5>{activity.type}</h5>
    )
    ))
  // return (
  //   <ul>
  //     {res.data.map(message => (
  //       <p key={message.id}>
  //         {message.id}: "{message.type}"
  //       </p>
  //     ))}
  //   </ul>
  // );
    } else {
      return ("nada")
    }
};
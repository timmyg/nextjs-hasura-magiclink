import { IconButton, Text, majorScale, Pane, Spinner, SearchInput } from 'evergreen-ui'
import Moment from 'react-moment';
import 'moment-timezone';


// const activitiesToggled = []

// const onHandleMore = (index) => {
//   // activitiesToggled.push(index);
//   console.log(index);
// }

const ViewActivities = ({onHandleSearch, onHandleDelete, activities, loading}) => {
  const hasActivities = !!activities?.length

  function renderActivityTypeIcon(type) {
    switch(type) {
      case 'poop':
        return '💩';
      case 'feed':
        return '🥛';
      case 'nap':
        return '😴';
      default:
        return '👶';
    }
  }

  if (loading) {
    return (
      <Pane display="flex" alignItems="center" justifyContent="center" height={400}>
        <Spinner />
      </Pane>
    )
  }

  return (
    <>
      <SearchInput
          onChange={ onHandleSearch }
          placeholder='Search activity...'
          marginBottom={majorScale(2)}
        />
      <div>
        { hasActivities ? (
          <div>
              {
                activities.map((activity, index) => (
                  <div key={index} style={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      width: '100%',
                      alignItems: 'center',
                      borderLeft: '3px solid #eeeeee',
                      paddingLeft: majorScale(1),
                      paddingTop: majorScale(1),
                      paddingBottom: majorScale(1)
                  }}>
                    <span style={{'position': 'absolute', 'left': '16px'}}>
                      {renderActivityTypeIcon(activity.type)}
                    </span>
                    <span style={{'width': '60%', 'textAlign': 'center'}}>
                      <Text size={600}>
                        <Moment format="M/D h:mma" utc local>
                          {activity.start_at}
                        </Moment>
                      </Text>
                    </span>
                    <span style={{'width': '40%', 'textAlign': 'right'}}>
                      <IconButton appearance="minimal" icon="trash" intent="danger" style={{display: 'inline'}} onClick={() => { onHandleDelete(activity) } }/>
                    </span>
                  </div>
                ))
              }
          </div>
        ) :
          <div style={{textAlign: 'center', marginTop: majorScale(1) }}>
            <Text>No activities</Text>
          </div>
        }
      </div>
    </>
  )
}

export default ViewActivities

import { IconButton, Text, majorScale, Pane, Spinner, TextInput } from 'evergreen-ui'
import Moment from 'react-moment';
import 'moment-timezone';


// const activitiesToggled = []

// const onHandleMore = (index) => {
//   // activitiesToggled.push(index);
//   console.log(index);
// }

const ViewActivities = ({onHandleSearch, onHandleDelete, activities, loading}) => {
  const hasActivities = !!activities.length

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
      <TextInput
          onChange={ onHandleSearch }
          placeholder='Search activity...'
          marginBottom={majorScale(2)}
        />
      <div>
        { hasActivities ? (
          <div>
              {
                activities.map((activity, index) => (
                  <>
                    <div style={{
                        'display': 'flex',
                        'flex-direction': 'row',
                        'flex-wrap': 'wrap',
                        'width': '100%',
                        'align-items': 'center',
                        'border-left': '3px solid #eeeeee',
                        'padding-left': majorScale(1),
                        'padding-top': majorScale(1),
                        'padding-bottom': majorScale(1)
                    }}>
                      <span style={{'position': 'absolute', 'left': '16px'}}>
                        {renderActivityTypeIcon(activity.type)}
                      </span>
                      <span style={{'width': '60%', 'text-align': 'center'}}>
                        <Text size={700}>
                          <Moment format="M/D h:mma" utc local>
                            {activity.start_at}
                          </Moment>
                        </Text>
                      </span>
                      {/* <span style={{'width': '30%'}}>
                        <Text size={700} marginLeft={majorScale(1)}>{activity.type}</Text>
                      </span> */}
                      <span style={{'width': '40%', 'text-align': 'right'}}>
                        {/* <IconButton appearance="minimal" icon="more" style={{display: 'inline'}} onClick={() => { onHandleMore(index) } }/>
                        {activitiesToggled.includes(index) ?
                          (
                            <IconButton appearance="minimal" icon="trash" intent="danger" style={{display: 'inline'}} onClick={() => { onHandleDelete(activity) } }/>
                          ) : (<></>)
                        } */}
                        <IconButton appearance="minimal" icon="trash" intent="danger" style={{display: 'inline'}} onClick={() => { onHandleDelete(activity) } }/>
                      </span>
                    </div>
                  </>
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

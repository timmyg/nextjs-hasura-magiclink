import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/header'
import { Pane, Tab, Tablist, setClassNamePrefix, majorScale, Button } from "evergreen-ui"
import { addActivity, getActivities, setTab, setActivitiesFilter, deleteActivity } from '../state/actions'
import Head from 'next/head'
import AddActivity from '../components/addActivity'
import ViewActivities from '../components/viewActivities'
import Link from 'next/link'
import useMagicLink from 'use-magic-link'
setClassNamePrefix("ub-");

const Index = () => {
  
  const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getActivities())
  }, [dispatch])

  const activities = useSelector(({activityForm}) => {
    return activityForm.activities
  })

  const selectedIndex = useSelector(({app}) => {
    return app.selectedIndex
  })

  const loading = useSelector(({activityForm}) => {
    return activityForm.loading
  })

  const onActivitySubmit = (event) =>  {
    event.preventDefault();
    const activity = document.getElementById('activity').value;
    const babyId = 1;
    dispatch(addActivity(activity, babyId))
    document.getElementById('activity').value = ''
  }

  const onHandleSearch = (e) => {
    console.log(e.target.value);
    dispatch(setActivitiesFilter(e.target.value))
  }

  const onHandleDelete = (activity) => {
    dispatch(deleteActivity(activity))
  }

  const auth = useMagicLink(process.env.NEXT_PUBLIC__MAGIC_LINK_PUBLISHABLE_KEY);

  return (
    <>
      <Head>
        <title>Poopasaurus</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      {!auth.loggedIn ? (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Link href="/auth">
            <Button is="a" intent="success" appearance="minimal">Login</Button>
          </Link>
        </div>
      ) : (
        <Pane height={120}>
          <Tablist marginBottom={majorScale(2)} flexBasis={240} textAlign="center">
            <Tab
              key={"Add"}
              id={"Add"}
              onSelect={() => dispatch(setTab(0)) }
              isSelected={0 === selectedIndex}
              aria-controls={`panel-${"Add"}`}
              disabled={false} 
            >
                  {"Add"}
            </Tab>
            <Tab
              key={"View"}
              id={"View"}
              onSelect={() => dispatch(setTab(1)) }
              isSelected={1 === selectedIndex}
              aria-controls={`panel-${"View"}`}
              disabled={false} 
            >
                  {"View"}
            </Tab>
            <Tab
              key={"Trends"}
              id={"Trends"}
              onSelect={() => dispatch(setTab(2)) }
              isSelected={2 === selectedIndex}
              aria-controls={`panel-${"Trends"}`}
              disabled={true} 
            >
                  {"Trends"}
            </Tab>
          </Tablist>
          <Pane padding={16} flex="1">
            <Pane
              key={"Add"}
              id={`panel-${"Add"}`}
              role="tabpanel"
              aria-labelledby={"Add"}
              aria-hidden={0 !== selectedIndex}
              display={0 === selectedIndex ? 'block' : 'none'}
              >
                <AddActivity loading={loading} onActivitySubmit={onActivitySubmit}/>
            </Pane>
            <Pane
              key={"View"}
              id={`panel-${"View"}`}
              role="tabpanel"
              aria-labelledby={"View"}
              aria-hidden={1 !== selectedIndex}
              display={1 === selectedIndex ? 'block' : 'none'}
              >
                <ViewActivities loading={loading} activities={activities} onHandleSearch={onHandleSearch} onHandleDelete={onHandleDelete}/>
            </Pane>
            <Pane
              key={"Trends"}
              id={`panel-${"Trends"}`}
              role="tabpanel"
              aria-labelledby={"Trends"}
              aria-hidden={2 !== selectedIndex}
              display={2 === selectedIndex ? 'block' : 'none'}
              >

            </Pane>
          </Pane>
        </Pane>
      )}
    </>
  )
}

export default Index

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/header'
import { Pane, Tab, Tablist, setClassNamePrefix } from "evergreen-ui"
import { setTab } from '../state/actions'
import Head from 'next/head'
import InputForm from '../components/inputForm'
import ActivitiesHistory from '../components/activitiesHistory'
import { addActivity } from '../state/actions'
setClassNamePrefix("ub-");

const Index = () => {
  
  const dispatch = useDispatch()
    useEffect(() => {
  }, [dispatch])

  const selectedIndex = useSelector(({app}) => {
    return app.selectedIndex
  })

  const loading = useSelector(({activityForm}) => {
    return activityForm.loading
  })

  let inputValue = "";

  const onActivitySubmit = (event) =>  {
    event.preventDefault();
    const activity = document.getElementById('activity').value;
    const babyId = 1;
    dispatch(addActivity(activity, babyId))
    document.getElementById('activity').value = ''
  }

  return (
    <>
      <Head>
        <title>Poopasaurus</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Pane height={120}>
        <Tablist marginTop={8} marginBottom={16} flexBasis={240} marginRight={24}  textAlign="center">
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
              <InputForm loading={loading} onActivitySubmit={onActivitySubmit} inputValue={inputValue}/>
          </Pane>
          <Pane
            key={"View"}
            id={`panel-${"View"}`}
            role="tabpanel"
            aria-labelledby={"View"}
            aria-hidden={1 !== selectedIndex}
            display={1 === selectedIndex ? 'block' : 'none'}
            >
              <ActivitiesHistory />
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
    </>
  )
}

export default Index

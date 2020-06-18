import { useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/header'
import { Pane, Tab, Tablist } from "evergreen-ui"
import InputForm from '../components/inputForm'
import { setTab } from '../state/actions'

// export function getStaticProps() {
//   return { 
//     props: { 
//         initialState: { 
//           selectedIndex: 0,
//           tabs: ['Activity', 'Event History', 'Identities']
//       } 
//     } 
//   }
// }

const Index = (props) => {
  
  console.log({props});
  const dispatch = useDispatch()
    useEffect(() => {
  }, [dispatch])

  const selectedIndex = useSelector(({app}) => {
    return app.selectedIndex
  })

  const tabs = useSelector(({app}) => {
    return app.tabs
  })

  return (
    <>
      <Header />
      <Pane height={120}>
        <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
            {tabs.map((tab, index) => (
              <Tab
                key={tab}
                id={tab}
                onSelect={() => dispatch(setTab(index)) }
                isSelected={index === selectedIndex}
                aria-controls={`panel-${tab}`}
              >
                    {tab}
              </Tab>
            ))}
        </Tablist>
        <Pane padding={16} background="tint1" flex="1">
        {tabs.map((tab, index) => (
            <Pane
            key={tab}
            id={`panel-${tab}`}
            role="tabpanel"
            aria-labelledby={tab}
            aria-hidden={index !== selectedIndex}
            display={index === selectedIndex ? 'block' : 'none'}
            >
            hi {tab}
            </Pane>
        ))}
        </Pane>
      </Pane>
    </>
  )
}

export default Index

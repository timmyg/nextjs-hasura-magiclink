import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../components/header'
import { Pane, Tab, Tablist } from "evergreen-ui"
import { setTab } from '../state/actions'

const Index = () => {
  
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
                key={tab.name}
                id={tab.name}
                onSelect={() => dispatch(setTab(index)) }
                isSelected={index === selectedIndex}
                aria-controls={`panel-${tab.name}`}
                disabled={tab.disabled} 
              >
                    {tab.name}
              </Tab>
            ))}
        </Tablist>
        <Pane padding={16} background="tint1" flex="1">
          {tabs.map((tab, index) => (
            <Pane
              key={tab.name}
              id={`panel-${tab.name}`}
              role="tabpanel"
              aria-labelledby={tab.name}
              aria-hidden={index !== selectedIndex}
              display={index === selectedIndex ? 'block' : 'none'}
              >
                { tab.renderComponent() }
            </Pane>
          ))}
        </Pane>
      </Pane>
    </>
  )
}

export default Index

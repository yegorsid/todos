import './App.css'
import { Button, Checkbox, Flex, Heading, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { State, useShallowStore } from './store';
import { useState } from 'react';

const selector = (state: State) => ({
  tasks: state.tasks,
  addTask: state.addTask,
  toggleTaskStatus: state.toggleTaskStatus
});

function App() {
  const [inputValue, setInputValue] = useState('');
  const {
    tasks,
    addTask,
    toggleTaskStatus
  } = useShallowStore(selector);
  
  return (
    <Flex flexDirection={'column'} alignItems={'center'}>
      <Heading paddingBottom={'24px'}>Todos</Heading>
      <form onSubmit={(e) => {
        e.preventDefault();
        addTask({value: inputValue, isCompleted: false });
        setInputValue('');
      }}>
        <Input 
          placeholder='What needs to be done' 
          style={{width: '100%', maxWidth: '600px'}} 
          value={inputValue} 
          onChange={(v) => setInputValue(v.target.value)}
          isRequired
        />
        <Button margin={'16px 0 24px'} width={'200px'} type='submit'>Save</Button>
      </form>
      
      <Tabs width={'600px'}>
        <TabList>
          <Tab>All</Tab>
          <Tab>Active</Tab>
          <Tab>Completed</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {tasks.map((task) => {
              return (
                <Flex key={task.value} gap={'8px'}>
                  <Checkbox isChecked={task.isCompleted} onChange={() => {toggleTaskStatus(task.value)}}/>
                  <Text style={task.isCompleted ? {textDecoration: 'line-through', color: 'grey'} : {}}>{task.value}</Text>
                </Flex>
              )
            })}
          </TabPanel>
          <TabPanel>
            {tasks.filter(task => task.isCompleted === false).map((task) => {
              return (
                <Flex key={task.value} gap={'8px'}>
                  <Checkbox isChecked={task.isCompleted} onChange={() => {toggleTaskStatus(task.value)}}/>
                  <Text style={task.isCompleted ? {textDecoration: 'line-through', color: 'grey'} : {}}>{task.value}</Text>
                </Flex>
              )
            })}
          </TabPanel>
          <TabPanel>
          {tasks.filter(task => task.isCompleted === true).map((task) => {
              return (
                <Flex key={task.value} gap={'8px'}>
                  <Checkbox isChecked={task.isCompleted} onChange={() => {toggleTaskStatus(task.value)}}/>
                  <Text style={task.isCompleted ? {textDecoration: 'line-through', color: 'grey'} : {}}>{task.value}</Text>
                </Flex>
              )
            })}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

export default App

import '../styles/App.css'
import { Button, Flex, Heading, Input, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { State, useShallowStore } from '../utils/store.ts';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Todo from './Todo.tsx';

const selector = (state: State) => ({
  tasks: state.tasks,
  addTask: state.addTask,
  toggleTaskStatus: state.toggleTaskStatus
});

function App() {
  const [inputValue, setInputValue] = useState('');
  const {
    tasks,
    addTask
  } = useShallowStore(selector);
  
  return (
    <Flex flexDirection={'column'} alignItems={'center'}>
      <Heading paddingBottom={'24px'}>Todos</Heading>
      <form onSubmit={(e) => {
        e.preventDefault();
        addTask({id: uuidv4(), name: inputValue, isCompleted: false });
        setInputValue('');
      }}>
        <Input 
          placeholder='What needs to be done' 
          style={{width: '100%', maxWidth: '600px'}} 
          value={inputValue} 
          onChange={(v) => setInputValue(v.target.value)}
          isRequired
        />
        <Button margin={'16px 0 24px'} width={'200px'} type='submit' isDisabled={!inputValue}>Save</Button>
      </form>
      
      <Tabs width={'600px'}>
        <TabList>
          <Tab>All</Tab>
          <Tab>Active</Tab>
          <Tab>Completed</Tab>
        </TabList>
        <TabPanels style={{textAlign: 'left'}}>
          <TabPanel>
            {tasks.map((task) => {
              return (
                <Todo task={task} key={task.id}/>
              )
            })}
          </TabPanel>
          <TabPanel>
            {tasks.filter(task => task.isCompleted === false).map((task) => {
              return (
                <Todo task={task} key={task.id}/>
              )
            })}
          </TabPanel>
          <TabPanel>
            {tasks.filter(task => task.isCompleted === true).map((task) => {
              return (
                <Todo task={task} key={task.id}/>
              )
            })}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

export default App

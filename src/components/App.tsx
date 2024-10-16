import '../styles/App.css'
import { Button, Flex, Heading, Input, Tab, TabList, TabPanel, TabPanels, Tabs, useToast } from '@chakra-ui/react';
import { State, useShallowStore } from '../utils/store.ts';
import { useState } from 'react';
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
  const toast = useToast();

  const inputIsInvalid = () => {
    return tasks.some((task) => task.name === inputValue)
  }
  
  return (
    <Flex flexDirection={'column'} alignItems={'center'}>
      <Heading paddingBottom={'24px'}>Todos</Heading>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (!inputIsInvalid()) {
          addTask({name: inputValue, isCompleted: false });
          setInputValue('');
        } else {
          toast({
            title: 'Error',
            description: "Task is already exist",
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
      }}>
        <Input 
          placeholder='What needs to be done' 
          style={{width: '100%', maxWidth: '600px'}} 
          value={inputValue} 
          onChange={(v) => setInputValue(v.target.value)}
          isRequired
          isInvalid={inputIsInvalid()}
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
                <Todo task={task} key={task.name}/>
              )
            })}
          </TabPanel>
          <TabPanel>
            {tasks.filter(task => task.isCompleted === false).map((task) => {
              return (
                <Todo task={task} key={task.name}/>
              )
            })}
          </TabPanel>
          <TabPanel>
            {tasks.filter(task => task.isCompleted === true).map((task) => {
              return (
                <Todo task={task} key={task.name}/>
              )
            })}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

export default App

import { Flex, Checkbox, Text, IconButton } from "@chakra-ui/react";
import { useShallowStore, State, Task } from "../utils/store";
import { TiDelete } from "react-icons/ti";

const selector = (state: State) => ({
  toggleTaskStatus: state.toggleTaskStatus,
  deleteTask: state.deleteTask
});

type TodoProps = {
  task: Task
}

function Todo({ task }: TodoProps) {
  const {
    toggleTaskStatus,
    deleteTask
  } = useShallowStore(selector);

  return (
    <Flex marginBottom={'8px'} justifyContent={'space-between'}>
      <Flex gap={'12px'} alignItems={'center'}>
        <Checkbox isChecked={task.isCompleted} onChange={() => {toggleTaskStatus(task.id)}} />
        <Text style={task.isCompleted ? {textDecoration: 'line-through', color: 'grey'} : {}}>{task.name}</Text>
      </Flex>
      <IconButton onClick={() => deleteTask(task.id)} aria-label={"Delete"} size={'sm'} icon={<TiDelete size={'20px'} color="red"/>} variant={"ghost"} />
    </Flex>
  )
}

export default Todo
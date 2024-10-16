import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';

export type Task = {
  id: string,
  name: string,
  isCompleted: boolean
}

export type State = {
  tasks: Task[],
  addTask: (task: Task) => void,
  toggleTaskStatus: (taskId: string) => void,
  deleteTask: (taskId: string) => void
}

const useStore = create<State>() (
  persist(
    (set, get) => {
      const state: State = {
        tasks: [],
        addTask: (task: Task) => {
          const tasks = get().tasks;
          set({tasks: tasks.concat(task)});
        },
        toggleTaskStatus: (taskId: string) => {
          const tasks = get().tasks;
          const newTasks = tasks.map(task => {
            if (task.id === taskId) {
              return {
                ...task,
                isCompleted: !task.isCompleted
              }
            }

            return task
          })

          set({tasks: newTasks})
        },
        deleteTask: (taskId: string) => {
          const tasks = get().tasks;
          const newTasks = tasks.filter(task => task.id !== taskId);

          set({tasks: newTasks})
        }
      }

      return state
    },
    {
      name: 'tasks-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export const useShallowStore = <U>(selector: (state: State) => U) => useStore(useShallow(selector));

export default useStore;
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';

export type Task = {
  value: string,
  isCompleted: boolean
}

export type State = {
  tasks: Task[],
  addTask: (task: Task) => void,
  toggleTaskStatus: (taskName: string) => void
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
        toggleTaskStatus: (taskName: string) => {
          const tasks = get().tasks;
          const newTasks = tasks.map(task => {
            if (task.value === taskName) {
              return {
                ...task,
                isCompleted: !task.isCompleted
              }
            }

            return task
          })

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
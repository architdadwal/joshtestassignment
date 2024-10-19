import TaskManagement from "./TaskManagement";
export default async function Home() {
  //array of initial tasks with title, description, and priority
  const initialTasks = [
    {
      id: 1,
      title: "Buy groceries",
      description: "Rice, Atta, Daal",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "Walk the dog",
      description: "Morning walk in the park",
      priority: "medium",
      completed: true,
    },
    {
      id: 3,
      title: "Write code",
      description: "Finish the task management app",
      priority: "medium",
      completed: false,
    },
    {
      id: 4,
      title: "Hiking",
      description: "Hike to trund snowline this sunday morning.",
      priority: "low",
      completed: false,
    },
  ];

  // Passing initial tasks to the client component
  return <TaskManagement initialTasks={initialTasks} />;
}

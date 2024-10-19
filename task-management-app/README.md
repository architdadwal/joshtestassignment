> > > > > Task Management App

A simple task management application built with NextJS(react). This app allows users to manage their tasks by adding, editing, deleting, and marking tasks as completed. The tasks are sorted based on their priority, ensuring high-priority tasks are displayed at the top.

> > > > > > > Features
> > > > > > > Add new tasks with a title, description, and priority.
> > > > > > > Edit existing tasks.
> > > > > > > Delete tasks.
> > > > > > > Mark tasks as completed, which moves them to a separate list.
> > > > > > > Search functionality to filter tasks.

Installation

> > > > > > Clone the repository:

git clone https://github.com/architdadwal/joshtestassignment

> > > > > > Navigate to the project directory:

cd task-management-app

> > > > > > Install the dependencies:

npm install

> > > > Start the application:

npm run dev

Open your browser and navigate to http://localhost:3000.

> > > Sorting Mechanism
> > > The tasks in this application are sorted based on their priority using a simple sorting function. Here’s how it works:

Priority Levels: Each task has a priority that can be high, medium, or low.
Sorting Function: The sortTasksByPriority function uses an object to define the order of the priorities:
const priorityOrder = { high: 1, medium: 2, low: 3 };
Sorting Logic: The tasks are sorted using the JavaScript .sort() method, which compares the numeric values of the priorities
It ensures that tasks with higher priority are displayed first in the task list.

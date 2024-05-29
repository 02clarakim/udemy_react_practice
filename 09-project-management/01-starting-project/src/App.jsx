import { useState } from 'react';

import AddNewProject from "./components/AddNewProject";
import NoProjectYet from "./components/NoProjectYet";
import Sidebar from "./components/Sidebar";
import ShowProject from './components/ShowProject';

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleSelectProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      }
    });
  }

  function handleDeleteProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
      }
    })
  }

  function handleAddCreate() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null // null means adding project
      }
    });
  }

  function handleCancel() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined // null means adding project
      }
    });
  }

  function handleSave(projectData) {
    setProjectsState(prevState => {
      const newProject = {
        ...projectData,
        id: Math.random()
      }

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleAddTask(text) {
    setProjectsState(prevState => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      }

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(
          (task) => task.id !== id)
      };
    })
  }

  // find! vanilla js
  const selectedProject = projectsState.projects.find(project=> project.id === projectsState.selectedProjectId);
  
  let content = <ShowProject 
    project={selectedProject} 
    onDelete={handleDeleteProject}
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
    tasks={projectsState.tasks}
  />

  if (projectsState.selectedProjectId === null) {
    content = <AddNewProject onSave={handleSave} onCancel={handleCancel} />
  } else if (projectsState.selectedProjectId == undefined) {
    content = <NoProjectYet onAddProject={handleAddCreate}/>
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar 
        onAddProject={handleAddCreate} 
        projectList={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;

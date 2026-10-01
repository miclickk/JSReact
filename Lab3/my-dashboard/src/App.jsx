import React, { useState } from 'react';
import ProjectCard from './ProjectCard.jsx';
import './styles.css';

export default function App() {
  console.log("App (Родитель) отрендерился");

  const [projects, setProjects] = useState([
    { id: 1, title: 'Кухня (Модерн)', status: 'В работе', resetKey: 0 },
    { id: 2, title: 'Спальня (Лофт)', status: 'Готово', resetKey: 0 }
  ]);
  const [filter, setFilter] = useState('Все');

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: `Новый рендер ${projects.length + 1}`,
      status: 'В работе',
      resetKey: 0
    };
    setProjects([...projects, newProject]);
  };

  const removeProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const changeStatus = (id) => {
    setProjects(projects.map(p => {
      if (p.id === id) {
        return { ...p, status: p.status === 'В работе' ? 'Готово' : 'В работе' };
      }
      return p;
    }));
  };

  const reverseList = () => {
    setProjects([...projects].reverse());
  };

  const resetProjectState = (id) => {
    setProjects(projects.map(p => {
      if (p.id === id) {
        return { ...p, resetKey: p.resetKey + 1 };
      }
      return p;
    }));
  };

  const filteredProjects = projects.filter(p => {
    if (filter === 'Все') return true;
    return p.status === filter;
  });

  return (
    <div className="dashboard">
      <h1>Трекер 3D-визуализаций</h1>

      <div className="controls">
        <button onClick={addProject}>Добавить проект</button>
        <button onClick={reverseList}>Перевернуть список</button>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="Все">Все проекты</option>
          <option value="В работе">В работе</option>
          <option value="Готово">Готово</option>
        </select>
      </div>

      <div className="project-list">
        {filteredProjects.map(project => (
          <ProjectCard
            key={`${project.id}-${project.resetKey}`}
            project={project}
            onRemove={() => removeProject(project.id)}
            onChangeStatus={() => changeStatus(project.id)}
            onReset={() => resetProjectState(project.id)}
          />
        ))}
      </div>
    </div>
  );
}
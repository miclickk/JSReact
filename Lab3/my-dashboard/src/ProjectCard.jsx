import React, { useState } from 'react';

export default function ProjectCard({ project, onRemove, onChangeStatus, onReset }) {
  console.log(`ProjectCard (Дочерний) отрендерился: ${project.title}`);

  const [editsCount, setEditsCount] = useState(0);

  return (
    <div className="card">
      <h3>{project.title}</h3>
      <p>Статус: <strong>{project.status}</strong></p>

      <p className="edits">Правок от клиента: {editsCount}</p>

      <div className="card-actions">
        <button onClick={() => setEditsCount(editsCount + 1)}>+ Добавить правку</button>
        <button onClick={onChangeStatus}>Сменить статус</button>
        <button onClick={onReset} className="reset-btn">Сбросить правки</button>
        <button onClick={onRemove} className="delete-btn">Удалить</button>
      </div>
    </div>
  );
}
import './App.css';

function Header() {
  const name = "Askar"
  return (
    <div className="header">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL2ZZnEDxKgTalrZk6Rjfzr7VN0pNvuzQB0aqM8wGDqpV5poolBr9rU4_g&s=10"
        className="avatar"
      />
      <h1>{name}</h1>
    </div>
  );
}

function About() {
  return (
    <div>
      <h3>Обо мне</h3>
      <p>
        Осваиваю React и современные веб-интерфейсы. Интересуюсь визуалом,
        дизайном.
      </p>
    </div>
  );
}

function Skills() {
  const skills = ["3D Max", "React", "Blender"];

  return (
    <div>
        <h3> Skills </h3>
        <ul>
      {skills.map((skill) => (
        <li key={skill}>{skill}</li>
      ))}
        </ul>
    </div>
  );
}

function Contacts() {
  return (
    <div>
      <h3>Контакты</h3>
      <p>🌍 Локация: Казахстан</p>
      <p>🐙 GitHub: <a href="https://github.com" target="_blank" rel="noreferrer">github.com/miclickk</a></p>
      <p>💬 Telegram: @myaaaaaaaaaaaaa</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="card">
      <Header />
      <hr />
      <About />
      <hr />
      <Skills />
      <hr />
      <Contacts />

    </div>
  );
}
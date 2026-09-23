import './App.css';

function Header() {
  return (
    <div className="header">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL2ZZnEDxKgTalrZk6Rjfzr7VN0pNvuzQB0aqM8wGDqpV5poolBr9rU4_g&s=10"
        alt="Avatar"
        className="avatar"
      />
      <h1>Аскар</h1>
      <p>3D Artist</p>
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
      <Contacts />
    </div>
  );
}
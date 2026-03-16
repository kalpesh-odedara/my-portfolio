import ChatBot from './components/ChatBot.jsx';

const projects = [
  { name: 'DermAI', tech: 'React, Node, Python, MongoDB', description: 'Smart hospital AI with skin detection, chatbot, voice assistant, and mood-based recommendations.', link: 'https://github.com/kalpesh-odedara/DermAi.git' },
  { name: 'Role Assign System', tech: 'React, Node, Python, MongoDB', description: 'University role assignment platform for students, faculty, HODs, and trustees.', link: 'https://github.com/kalpesh-odedara/Role_Assign_System.git' },
  { name: 'Feedback System', tech: 'React, Node', description: 'Subject-wise faculty feedback portal for improved evaluations.', link: 'https://github.com/kalpesh-odedara/Feedback_System.git' },
  { name: 'Furniture Shop', tech: 'ASP.NET', description: 'Furniture e-commerce site with catalog, cart, and checkout flows.', link: 'https://github.com/kalpesh-odedara/Furniture_Shop.git' },
  { name: 'Jewelry Shop', tech: 'ASP.NET', description: 'Category-based jewelry store (gold, silver, diamond) with shopping features.', link: 'https://github.com/kalpesh-odedara/Jewelry_Shop.git' },
  { name: 'Online Learning Platform', tech: 'ASP.NET', description: 'Platform to learn online and sell teaching skills.', link: 'https://github.com/kalpesh-odedara/Online_Learning_Platform.git' },
  { name: 'Alpha Wear', tech: 'HTML, CSS, JavaScript', description: 'Fashion e-commerce built during Alpha internship.', link: 'https://github.com/kalpesh-odedara/Alpha_Wear.git' },
];

export default function App() {
  return (
    <div className="page">
      <header className="hero">
        <p className="badge">AI Developer Portfolio</p>
        <h1>Odedara Kalpesh</h1>
        <p className="subtitle">Full-Stack & AI Dev • BCA Student • National Hackathon Rank #2</p>
      </header>

      <section className="section">
        <div className="section-head">
          <h2>Projects I Built</h2>
          <p>Production-ready full-stack and AI apps across healthcare, education, and e-commerce.</p>
        </div>
        <div className="grid">
          {projects.map((project) => (
            <article key={project.name} className="card">
              <div>
                <p className="tag">{project.tech}</p>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
              <a href={project.link} target="_blank" rel="noreferrer" className="link">View Repository</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Backend API</h2>
          <p>Local API for project data and contact submissions.</p>
        </div>
        <div className="api-card">
          <p><strong>GET</strong> /api/projects</p>
          <p><strong>POST</strong> /api/contact</p>
        </div>
      </section>

      <ChatBot />
    </div>
  );
}

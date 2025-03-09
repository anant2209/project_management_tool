import { useState, useEffect } from 'react';
import { getProjects, createProject, updateProjectStatus, deleteProject } from '../services/projectService';
import ProjectCard from '../components/ProjectCard';

function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        async function fetchProjects() {
            try {
                const data = await getProjects(token);
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        }
        fetchProjects();
    }, [token]);

    const handleCreateProject = async () => {
        if (!title.trim()) return alert("Project title is required!");
        try {
            const newProject = await createProject({ title, description }, token);
            setProjects([...projects, newProject]);
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };

    const handleUpdateStatus = async (id, status) => {
        try {
            const updatedProject = await updateProjectStatus(id, status, token);
            setProjects(projects.map(proj => (proj._id === id ? updatedProject : proj)));
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProject(id, token);
            setProjects(projects.filter(proj => proj._id !== id));
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    return (
        <div className="dashboard">
            <h2>Project Dashboard</h2>

            <div className="project-form">
                <input type="text" placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button onClick={handleCreateProject}>Create Project</button>
            </div>

            <div className="project-list">
                {projects.length === 0 ? <p>No projects available.</p> : projects.map((project) => (
                    <ProjectCard key={project._id} project={project} onUpdate={handleUpdateStatus} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;

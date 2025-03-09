function ProjectCard({ project, onUpdate, onDelete }) {
    return (
        <div className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>Status: {project.status}</p>
            
            {/* Update Status */}
            <select value={project.status} onChange={(e) => onUpdate(project._id, e.target.value)}>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>

            {/* Delete Button */}
            <button onClick={() => onDelete(project._id)} className="delete-btn">Delete</button>
        </div>
    );
}

export default ProjectCard;

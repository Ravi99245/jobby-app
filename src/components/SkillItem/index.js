import './index.css'

const SkillItem = props => {
  const {skill} = props
  return (
    <li className="skill-list-item">
      <img src={skill.imageUrl} className="skill-image" alt={skill.name} />
      <p className="skill-name">{skill.name}</p>
    </li>
  )
}

export default SkillItem

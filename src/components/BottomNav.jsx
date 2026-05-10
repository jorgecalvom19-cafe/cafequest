import { Map, Trophy, User } from 'lucide-react'

function BottomNav({ setCurrentTab }) {
  return (
    <nav className="bottom-nav">

<button onClick={() => setCurrentTab('map')}>  
        <Map size={22} />
        <span>Mapa</span>
      </button>

     <button onClick={() => setCurrentTab('conquests')}>
        <Trophy size={22} />
        <span>Conquistas</span>
      </button>

      <button onClick={() => setCurrentTab('profile')}>
  <User size={22} />
  <span>Perfil</span>
</button>
    </nav>
  )
}

export default BottomNav
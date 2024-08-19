import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(initialName)
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit() {
    setIsEditing((editing) => !editing);
    if (isEditing){
      onChangeName(symbol, playerName)
    }
  }

  function handleChange(event){
    setPlayerName(event.target.value)
  }

  let editablePlayerName = <span className="player-name">{playerName}</span> 
  let btnCaption = "Edit"
  if(isEditing) {
    editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>
    btnCaption="Save"
  }
//   {
//     !isEditing ? (
//       <span className="player-name">{name}</span>
//     ) : (
//       <div>Player</div>
//     );
//   }

  return (
    <li className={isActive ? 'active': ''}>
      <span className="player">
        <span className="player-name">{editablePlayerName}</span>
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{btnCaption}</button>
    </li>
  );
}

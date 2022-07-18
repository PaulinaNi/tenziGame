import "./button.style.css"

export default function Button({ onClickHandler, text }) {
 return (
  <div className="buttonContainer">
   <button
    className="defaultButton"
    onClick={onClickHandler}>{text}
   </button>
  </div>
 )
}
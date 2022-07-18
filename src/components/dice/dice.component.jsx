import "./dice.style.css"

export default function Dice({ dice, onclickHandler }) {
 const {roll, isHeld} = dice
 const classNameString = isHeld === true ? "diceContainer holded" : "diceContainer"
 return (
  <div className={classNameString} onClick={onclickHandler}>
   {roll}
  </div>
 )
}
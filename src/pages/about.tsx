import { useState } from "react"

export const About = () => {
  const [value, setValue] = useState('');

  return (
    <div>
      <h1>about</h1>
      <p>{value}</p>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  )
}
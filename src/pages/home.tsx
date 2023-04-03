import { useState } from "react"

export const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>home</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>add count</button>
    </div>
  )
}
import ReactDOM from 'react-dom/client'

// import App from './Fullstacktest'
import App1 from './Part16.jsx'

let counter = 1;

ReactDOM.createRoot(document.getElementById('root')).render(<App1/>)

// const refresh=()=>{

//     ReactDOM.createRoot(document.getElementById('root')).render(<App counter={counter}/>)
// }
//not good way to refresh

// setInterval(()=>{
//     refresh()
//     counter+=1

// },1000)
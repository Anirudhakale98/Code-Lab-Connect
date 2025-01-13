import React, { createElement } from 'react'
import { Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import ClassroomPage from './Components/ClassroomPage.jsx'
import Classroom from './Components/Classroom.jsx'

// const router = createBrowserRouter([
//   {
//     path : '/',
//     // element : <App />,
//     children : [
//       {
//         path : '',
//         element : <Classroom />,
//       },
      
//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" >
      <Route path="" element={<Classroom />} />
      <Route path="classes/:id" element={<ClassroomPage />} />
      
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)

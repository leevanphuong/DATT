import { useRoutes } from 'react-router-dom'
import DefaultLayout from './app/container/DefaultLayout.component'
import DefaultHome from './app/container/DefaultHome.component'
import { clientRouter } from './app/modules/client/router'
import Detail from './app/container/Detail.componet'
import DefaultAdmin from './app/container/DefaultAdmin.component'
import { adminRouter } from './app/modules/admin/router'
import { CheckAuth } from './app/container/Checkadmin'

function App() {
  let element: any = useRoutes([
    {
      path: '/',
      element:<DefaultLayout/>,
      children:[
        {
          path: '',
          element: <DefaultHome/>,
          children: clientRouter
        },
        {
          path: 'admin',
          element: (
            <CheckAuth>
              <DefaultAdmin />
            </CheckAuth>
          ),
          children: adminRouter
        },
      ]
    },
    {
      path:'detail/:id',
      element:<Detail/>
    }
  ])
  return element
}

export default App

import { RouteConfig } from 'vue-router';

import UserLayout from 'src/layouts/UserLayout.vue';
import Landingpage from 'src/pages/LandingPage.vue';
import MainLayout from 'src/layouts/MainLayout.vue';
import Login from 'src/pages/auth/Login.vue';
import Homeadmin from 'src/pages/Homeadmin/Homeadmin.vue';
import Dances from 'src/pages/Drawer/Dances.vue';
import SearchResult from 'src/pages/Drawer/SearchResult.vue';
import Instruments from 'src/pages/Drawer/Instruments.vue';
import Songs from 'src/pages/Drawer/Songs.vue';
import Pictures from 'src/pages/Drawer/Pictures.vue';
import Equipments from 'src/pages/Drawer/Equipments.vue';
import AdminLayout from 'src/layouts/AdminLayout.vue';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: UserLayout,
    children: [
      {
        path: '',
        name: 'landing-page',
        component: Landingpage
      },
     
    ]
  },
  {
    path: '/',
    component: AdminLayout,
    children: [
      {
        path: 'admin/:tab/:action?',
        name: 'Homeadmin-page',
        component: Homeadmin,
        meta: { requiresAdmin: true }
      },
       {
        path: 'login',
        name: 'login-page',
        component: Login,
        meta: { requiresGuest: true }
      }
    ]
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: 'Search',
        name: 'Search-page',
        component: SearchResult
      },{
        path: 'Dances',
        name: 'Dances-page',
        component: Dances
      },
      {
        path: 'Songs',
        name: 'Songs-page',
        component: Songs
      },
      {
        path: 'Instruments',
        name: 'Instruments-page',
        component: Instruments
      },
      {
        path: 'Pictures',
        name: 'Pictures-page',
        component: Pictures
      },
      {
        path: 'Equipments',
        name: 'Equipments-page',
        component: Equipments
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;

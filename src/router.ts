import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('./views/Start/Login'),
    },
    {
      path: '/registe',
      name: 'registe',
      component: () => import('./views/Start/Registe'),
    },
    {
      path: '/main',
      redirect: '/main/home',
      name: 'main',
      component: () => import('@/components/Layout/Layout'),
      children: [
        {
          path: 'home',
          component: () => import('./views/Home'),
          children: [
            {
              path: '',
              name: 'slider',
              component: () => import('./views/Home/Slider'),
            },
            {
              path: '',
              name: 'list',
              component: () => import('./views/Home/List'),
            },
            {
              path: '',
              name: 'tweet',
              component: () => import('./views/Home/Tweet'),
            },
          ],
        },
      ],
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('./views/Editor'),
    },
  ],
});

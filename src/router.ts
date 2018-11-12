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
              components: {
                slider: () => import('./views/Home/Slider'),
                tweet: () => import('./views/Home/Tweet'),
                list: () => import('./views/Home/List'),
              },
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

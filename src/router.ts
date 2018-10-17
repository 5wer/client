import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('./views/Start/Login.vue'),
    },
    {
      path: '/registe',
      name: 'registe',
      component: () => import('./views/Start/Registe.vue'),
    },
    {
      path: '/main',
      redirect: '/main/home',
      name: 'main',
      component: () => import('@/components/Layout/Layout.vue'),
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('./views/Home/Index.vue'),
          children: [
            {
              path: '',
              components: {
                slider: () => import('./views/Home/Slider.vue'),
                tweet: () => import('./views/Home/Tweet.vue'),
                list: () => import('./views/Home/List.vue'),
              },
            },
          ],
        },
        {
          path: 'home2',
          name: 'home2',
          component: () => import('./views/Home/Index.vue'),
        },
      ],
    },
  ],
});

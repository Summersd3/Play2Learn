import { createRouter, createWebHistory } from 'vue-router'

import StartScreen from '../components/StartScreen.vue'
import MathFacts from '../components/MathFacts.vue'
import AnagramHunt from '../views/AnagramHunt.vue'

const routes = [
  {
    path: '/',
    name: 'StartScreen',
    component: StartScreen
  },
  {
    path: '/math-facts',
    name: 'MathFacts',
    component: MathFacts
  },
  {
    path: '/anagram-hunt',
    name: 'AnagramHunt',
    component: AnagramHunt
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router


import { Boxes, Sparkles, BarChart3 } from 'lucide-react'

export const sandboxData = [
  {
    id: 'ui-builder',
    title: 'UI Component Builder',
    desc: 'Design buttons & cards visually, then copy the generated HTML + CSS code.',
    tags: ['HTML', 'CSS', 'Live Preview'],
    route: '/sandbox/ui-builder',
    icon: Boxes,
    accent: '#1929FE',
  },
  {
    id: 'css-lab',
    title: 'CSS Effects Lab',
    desc: 'Experiment with gradients, shadows, transforms, and animations with a real-time preview.',
    tags: ['Gradient', 'Shadow', 'Animation'],
    route: '/sandbox/css-lab',
    icon: Sparkles,
    accent: '#7C3AED',
  },
  {
    id: 'algorithm',
    title: 'Algorithm Visualizer',
    desc: 'Watch sorting algorithms (Bubble, Selection, Insertion, Quick, Merge) come alive step by step.',
    tags: ['Sorting', 'Animation', 'DSA'],
    route: '/sandbox/algorithm',
    icon: BarChart3,
    accent: '#059669',
  },
]

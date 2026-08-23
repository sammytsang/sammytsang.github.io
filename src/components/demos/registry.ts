import type { ComponentType } from 'react'
import type { Project } from '../../data/projects'

type DemoKey = NonNullable<Project['demo']>

export const demoLoaders: Record<DemoKey, () => Promise<{ default: ComponentType<Record<string, never>> }>> = {
  pneumatic: () => import('./PneumaticDiagram'),
}

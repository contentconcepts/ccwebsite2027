import type { ComponentType } from 'react'
import dynamic from 'next/dynamic'

const PricingCalculator = dynamic(() => import('./PricingCalculator'))
const EditingProcessDiagram = dynamic(() => import('./EditingProcessDiagram'))
const EditingTypesComparison = dynamic(() => import('./EditingTypesComparison'))
const BeforeAfterExamples = dynamic(() => import('./BeforeAfterExamples'))
const RejectionReasonsChart = dynamic(() => import('./RejectionReasonsChart'))
const EditingCertificate = dynamic(() => import('./EditingCertificate'))

export const VISUAL_COMPONENTS: Record<string, ComponentType> = {
  PricingCalculator,
  EditingProcessDiagram,
  EditingTypesComparison,
  BeforeAfterExamples,
  RejectionReasonsChart,
  EditingCertificate,
}

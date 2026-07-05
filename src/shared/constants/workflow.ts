/**
 * Workflow steps. Translatable text lives in the message files under
 * `landing.home.sections.workflow.items.<key>` (title + description).
 * Only the non-translatable step number and color are kept here.
 */
export type WorkflowItem = {
    key: string
    stepNumber: number
    color: string
}

export const WORKFLOW: WorkflowItem[] = [
    { key: 'step1', stepNumber: 1, color: '#f7ae0c' },
    { key: 'step2', stepNumber: 2, color: '#7de057' },
    { key: 'step3', stepNumber: 3, color: '#209bfa' },
    { key: 'step4', stepNumber: 4, color: '#b46fea' },
    { key: 'step5', stepNumber: 5, color: '#de254a' },
]

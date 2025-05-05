
import type { GetClientJobs$input } from '../../../../../../.houdini/artifacts/GetClientJobs'
                    
import JobsAddedTab from './JobsAddedTab.svelte'
		import type { ComponentProps } from 'svelte'
type JobsAddedTabProps = ComponentProps<JobsAddedTab>

export type GetClientJobsVariables = <_Props extends JobsAddedTabProps>(args: { props: _Props }) => GetClientJobs$input
        
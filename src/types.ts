export type DeployStatusData = {
	id: string;
	commit: {
		id: string;
		message: string;
		createdAt: string;
	};
	status:
		| "created"
		| "build_in_progress"
		| "update_in_progress"
		| "live"
		| "deactivated"
		| "build_failed"
		| "update_failed"
		| "canceled"
		| "pre_deploy_in_progress"
		| "pre_deploy_failed";
	trigger:
		| "api"
		| "blueprint_sync"
		| "deploy_hook"
		| "deployed_by_render"
		| "manual"
		| "other"
		| "new_commit"
		| "rollback"
		| "service_resumed"
		| "service_updated";
	createdAt: string | null;
	finishedAt: string | null;
	updatedAt: string | null;
};

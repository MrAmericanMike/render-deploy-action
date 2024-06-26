import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
	entries: ["src/main.ts"],
	failOnWarn: false,
	clean: true,
	rollup: {
		inlineDependencies: true
	}
});


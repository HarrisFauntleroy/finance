// tsup.config.ts
import { defineConfig } from "tsup";
var isProduction = process.env.NODE_ENV === "production";
var tsup_config_default = defineConfig({
  clean: true,
  dts: true,
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  minify: isProduction,
  sourcemap: true,
  external: [/generated/]
});
export {
  tsup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ0c3VwXCJcblxuY29uc3QgaXNQcm9kdWN0aW9uID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG5cdGNsZWFuOiB0cnVlLFxuXHRkdHM6IHRydWUsXG5cdGVudHJ5OiBbXCJzcmMvaW5kZXgudHNcIl0sXG5cdGZvcm1hdDogW1wiY2pzXCIsIFwiZXNtXCJdLFxuXHRtaW5pZnk6IGlzUHJvZHVjdGlvbixcblx0c291cmNlbWFwOiB0cnVlLFxuXHRleHRlcm5hbDogWy9nZW5lcmF0ZWQvXSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsU0FBUyxvQkFBb0I7QUFFN0IsSUFBTSxlQUFlLFFBQVEsSUFBSSxhQUFhO0FBRTlDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLE9BQU87QUFBQSxFQUNQLEtBQUs7QUFBQSxFQUNMLE9BQU8sQ0FBQyxjQUFjO0FBQUEsRUFDdEIsUUFBUSxDQUFDLE9BQU8sS0FBSztBQUFBLEVBQ3JCLFFBQVE7QUFBQSxFQUNSLFdBQVc7QUFBQSxFQUNYLFVBQVUsQ0FBQyxXQUFXO0FBQ3ZCLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
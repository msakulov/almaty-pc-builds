import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/builds")({
  component: () => <Outlet />,
});

export { Link };

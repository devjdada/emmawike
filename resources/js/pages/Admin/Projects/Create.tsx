import { BatteryLow } from "lucide-react";
import ProjectForm from "./ProjectForm";
import type { PageProps } from "@/types";

export default function Create({ auth }: PageProps) {
	return <ProjectForm auth={auth} />;
}

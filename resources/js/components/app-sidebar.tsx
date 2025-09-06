import { Link } from "@inertiajs/react";
import {
	BookOpen,
	Briefcase,
	Building2,
	ClipboardList,
	FileSignature,
	FileText,
	Folder,
	Home,
	LayoutGrid,
	Settings,
	UserCheck,
	UserSquare2,
	Users,
} from "lucide-react";
import { NavFooter } from "@/components/nav-footer";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { NavItem } from "@/types";
import AppLogo from "./app-logo";

const mainNavItems: NavItem[] = [
	{
		title: "Dashboard",
		href: "/admin/dashboard",
		icon: LayoutGrid,
	},
	{
		title: "Properties",
		href: "/admin/properties",
		icon: Home,
	},
	{
		title: "Projects",
		href: "/admin/projects",
		icon: Briefcase,
	},
	{
		title: "User",
		href: "/admin/users",
		icon: Users,
	},
	{
		title: "Agency",
		href: "/admin/agencies",
		icon: Building2,
	},
	{
		title: "Blogs",
		href: "/admin/blogs",
		icon: FileText,
	},
	{
		title: "Services",
		href: "/admin/services",
		icon: Settings,
	},
	{
		title: "Tenants",
		href: "/admin/tenants",
		icon: UserSquare2,
	},
	{
		title: "Owners",
		href: "/admin/owners",
		icon: UserCheck,
	},
	{
		title: "Compensation Evaluations",
		href: "/admin/compensation-evaluations",
		icon: ClipboardList,
	},
	{
		title: "Rent Agreements",
		href: "/admin/rent-agreements",
		icon: FileSignature,
	},
];

const footerNavItems: NavItem[] = [
	{
		title: "Repository",
		href: "https://github.com/laravel/react-starter-kit",
		icon: Folder,
	},
	{
		title: "Documentation",
		href: "https://laravel.com/docs/starter-kits#react",
		icon: BookOpen,
	},
];

export function AppSidebar() {
	return (
		<Sidebar collapsible="icon" variant="inset">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link href="/dashboard" prefetch>
								<AppLogo />
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<NavMain items={mainNavItems} />
			</SidebarContent>

			<SidebarFooter>
				<NavFooter items={footerNavItems} className="mt-auto" />
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}

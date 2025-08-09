import { Link } from "@inertiajs/react";
import { BookOpen, Folder, LayoutGrid } from "lucide-react";
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
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Properties',
        href: '/properties',
        icon: Folder, // You can choose a more appropriate icon
    },
    {
        title: 'User Management',
        href: '/users',
        icon: Folder, // You can choose a more appropriate icon
    },
    {
        title: 'Agency Management',
        href: '/agencies',
        icon: Folder, // You can choose a more appropriate icon
    },
    {
        title: 'Blog Management',
        href: '/blogs',
        icon: Folder, // You can choose a more appropriate icon
    },
    {
        title: 'Service Management',
        href: '/services',
        icon: Folder, // You can choose a more appropriate icon
    },
    {
        title: 'Project Management',
        href: '/projects',
        icon: Folder, // You can choose a more appropriate icon
    },
    {
        title: 'Tenant Management',
        href: '/tenants',
        icon: Folder, // You can choose a more appropriate icon
    },
    {
        title: 'Owner Management',
        href: '/owners',
        icon: Folder, // You can choose a more appropriate icon
    },
    {
        title: 'Compensation Evaluations',
        href: '/compensation-evaluations',
        icon: Folder, // You can choose a more appropriate icon
    },
    {
        title: 'Rent Agreements',
        href: '/rent-agreements',
        icon: Folder, // You can choose a more appropriate icon
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

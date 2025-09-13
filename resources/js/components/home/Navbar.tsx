import { motion } from "framer-motion";
import { ChevronDown, Menu, Phone, Search, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();

	const navItems = [
		{ name: "Home", path: "/" },
		{ name: "Properties", path: "/properties" },
		{ name: "Projects", path: "/projects" },
		{ name: "Services", path: "/services" },
		{ name: "Blog", path: "/blog" },
		{ name: "Contact", path: "/contact" },
	];

	const aboutMenuItems = [
		{ name: "About Us", path: "/about" },
		{ name: "Our Agencies", path: "/agencies" },
		{ name: "Our Agents", path: "/agents" },
	];

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-20">
					{/* Logo */}
					<Link to="/" className="flex items-center space-x-3">
						{/* <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center"> */}
						<img src="/images/logo.png" alt="Logo" className="w-12 h-8" />
						{/* <span className="text-white font-bold text-lg">EWP</span> */}
						{/* </div> */}
						<div>
							<h1 className="text-xl font-bold text-primary">
								Emma Wilke & Partners
							</h1>
							<p className="text-xs text-muted-foreground">
								Premium Real Estate
							</p>
						</div>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden lg:flex items-center space-x-8">
						{navItems.map((item) => (
							<Link
								key={item.path}
								to={item.path}
								className={`text-sm font-medium transition-colors hover:text-primary ${
									location.pathname === item.path
										? "text-primary"
										: "text-foreground"
								}`}
							>
								{item.name}
							</Link>
						))}

						{/* About Dropdown */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className={`text-sm font-medium transition-colors hover:text-primary flex items-center space-x-1 ${
										aboutMenuItems.some(
											(item) => location.pathname === item.path,
										)
											? "text-primary"
											: "text-foreground"
									}`}
								>
									<span>About</span>
									<ChevronDown className="h-3 w-3" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="center">
								{aboutMenuItems.map((item) => (
									<DropdownMenuItem key={item.path} asChild>
										<Link to={item.path} className="w-full cursor-pointer">
											{item.name}
										</Link>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					{/* Right Side Actions */}
					<div className="hidden lg:flex items-center space-x-4">
						<Button variant="ghost" size="sm">
							<Search className="h-4 w-4" />
						</Button>
						<Button variant="outline" size="sm">
							<Phone className="h-4 w-4 mr-2" />
							Call Us
						</Button>
						<Button className="bg-accent hover:bg-accent/90">
							Get Started
						</Button>
					</div>

					{/* Mobile Menu Button */}
					<div className="lg:hidden">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setIsOpen(!isOpen)}
						>
							{isOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</Button>
					</div>
				</div>

				{/* Mobile Menu */}
				<motion.div
					initial={false}
					animate={{ height: isOpen ? "auto" : 0 }}
					transition={{ duration: 0.3, ease: "easeInOut" }}
					className="lg:hidden overflow-hidden"
				>
					<div className="py-4 space-y-2">
						{navItems.map((item) => (
							<Link
								key={item.path}
								to={item.path}
								className={`block px-3 py-2 text-sm font-medium transition-colors hover:text-primary ${
									location.pathname === item.path
										? "text-primary"
										: "text-foreground"
								}`}
								onClick={() => setIsOpen(false)}
							>
								{item.name}
							</Link>
						))}

						{/* About section in mobile */}
						<div className="px-3 py-2">
							<div className="text-sm font-medium text-muted-foreground mb-2">
								About
							</div>
							{aboutMenuItems.map((item) => (
								<Link
									key={item.path}
									to={item.path}
									className={`block px-3 py-1 text-sm transition-colors hover:text-primary ${
										location.pathname === item.path
											? "text-primary"
											: "text-foreground"
									}`}
									onClick={() => setIsOpen(false)}
								>
									{item.name}
								</Link>
							))}
						</div>
						<div className="pt-4 space-y-2">
							<Button variant="outline" size="sm" className="w-full">
								<Phone className="h-4 w-4 mr-2" />
								Call Us
							</Button>
							<Button className="w-full bg-accent hover:bg-accent/90">
								Get Started
							</Button>
						</div>
					</div>
				</motion.div>
			</div>
		</nav>
	);
};

export default Navbar;

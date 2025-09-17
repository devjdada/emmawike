import { Head, Link } from "@inertiajs/react";
import PublicLayout from "@/layouts/PublicLayout";
import type { PageProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	ArrowLeft,
	Calendar,
	Clock,
	User,
	Share2,
	Bookmark,
	Twitter,
	Facebook,
	Linkedin,
	Heart,
	MessageCircle,
	Eye,
} from "lucide-react";
import { motion } from "framer-motion";

interface Blog {
	id: string;
	title: string;
	excerpt: string;
	content: string;
	featured_image: string;
	author: string;
	category: string;
	published_at: string;
	read_time: string;
	tags: string[];
}

interface BlogShowProps extends PageProps {
	blog: Blog;
	otherBlogs: Blog[];
}

export default function BlogShow({ blog, otherBlogs }: BlogShowProps) {
	return (
		<PublicLayout>
			<Head title={blog.title} />

			{/* Back Button */}
			<div className="pt-24 pb-4">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<Link href={route("blogs.index")}>
						<Button variant="outline" size="sm">
							<ArrowLeft className="h-4 w-4 mr-2" />
							Back to Blog
						</Button>
					</Link>
				</div>
			</div>

			{/* Hero Image */}
			<section className="pb-8">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="h-96 bg-cover bg-center rounded-xl"
						style={{ backgroundImage: `url(${blog.featured_image})` }}
					/>
				</div>
			</section>

			{/* Article Content */}
			<section className="pb-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-4 gap-12">
						{/* Main Content */}
						<div className="lg:col-span-3">
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
							>
								{/* Article Header */}
								<div className="mb-8">
									<Badge className="mb-4">{blog.category}</Badge>
									<h1 className="text-4xl font-bold text-foreground mb-4">
										{blog.title}
									</h1>
									<p className="text-xl text-muted-foreground mb-6">
										{blog.excerpt}
									</p>

									{/* Author and Meta */}
									<div className="flex items-center justify-between border-b border-border pb-6">
										<div className="flex items-center space-x-4">
											<div>
												<div className="font-semibold">{blog.author}</div>
												<div className="text-sm text-muted-foreground flex items-center space-x-4">
													<span className="flex items-center">
														<Calendar className="h-4 w-4 mr-1" />
														{new Date(blog.published_at).toLocaleDateString()}
													</span>
													<span className="flex items-center">
														<Clock className="h-4 w-4 mr-1" />
														{blog.read_time} min read
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* Article Body */}
								<div
									className="prose prose-lg max-w-none mb-12 tiptap"
									dangerouslySetInnerHTML={{ __html: blog.content }}
								/>

								{/* Tags */}
								<div className="flex flex-wrap gap-2 mb-8">
									{blog.tags.map((tag) => (
										<Badge key={tag} variant="secondary">
											{tag}
										</Badge>
									))}
								</div>
							</motion.div>
						</div>

						{/* Sidebar */}
						<div className="space-y-8">
							{/* Share & Save */}
							<motion.div
								initial={{ opacity: 0, x: 30 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.6, delay: 0.3 }}
							>
								<Card>
									<CardHeader>
										<CardTitle className="text-lg">Share & Save</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-3">
											<Button
												variant="outline"
												size="sm"
												className="w-full justify-start"
											>
												<Twitter className="h-4 w-4 mr-2" />
												Twitter
											</Button>
											<Button
												variant="outline"
												size="sm"
												className="w-full justify-start"
											>
												<Facebook className="h-4 w-4 mr-2" />
												Facebook
											</Button>
											<Button
												variant="outline"
												size="sm"
												className="w-full justify-start"
											>
												<Linkedin className="h-4 w-4 mr-2" />
												LinkedIn
											</Button>
											<Button
												variant="outline"
												size="sm"
												className="w-full justify-start"
											>
												<Bookmark className="h-4 w-4 mr-2" />
												Save Article
											</Button>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						</div>
					</div>
				</div>
			</section>

			{/* Related Articles */}
			<section className="py-16 bg-muted/30">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.5 }}
					>
						<h2 className="text-2xl font-bold text-foreground mb-8">
							Related Articles
						</h2>
						<div className="grid md:grid-cols-3 gap-8">
							{otherBlogs.map((post, index) => (
								<motion.div
									key={post.id}
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.6 + 0.1 * index }}
								>
									<Link href={route("blogs.show", post.id)}>
										<Card className="h-full hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
											<div
												className="h-48 bg-cover bg-center rounded-t-lg"
												style={{
													backgroundImage: `url(${post.featured_image})`,
												}}
											/>
											<CardHeader>
												<div className="flex items-center justify-between mb-2">
													<Badge variant="secondary">{post.category}</Badge>
													<span className="text-xs text-muted-foreground">
														{post.read_time} min read
													</span>
												</div>
												<CardTitle className="group-hover:text-primary transition-colors">
													{post.title}
												</CardTitle>
											</CardHeader>
											<CardContent>
												<p className="text-muted-foreground mb-4">
													{post.excerpt}
												</p>
												<div className="flex items-center text-sm text-muted-foreground">
													<User className="h-4 w-4 mr-2" />
													<span className="mr-4">{post.author}</span>
													<Calendar className="h-4 w-4 mr-2" />
													<span>
														{new Date(post.published_at).toLocaleDateString()}
													</span>
												</div>
											</CardContent>
										</Card>
									</Link>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</section>
		</PublicLayout>
	);
}

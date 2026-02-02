import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PublicLayout from '@/layouts/PublicLayout';
import type { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bookmark, Calendar, Clock, Facebook, Linkedin, Twitter, User } from 'lucide-react';

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
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <Link href={route('blogs.index')}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Blog
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Hero Image */}
            <section className="pb-8">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="h-96 rounded-xl bg-cover bg-center"
                        style={{ backgroundImage: `url(${blog.featured_image})` }}
                    />
                </div>
            </section>

            {/* Article Content */}
            <section className="pb-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-4">
                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                                {/* Article Header */}
                                <div className="mb-8">
                                    <Badge className="mb-4">{blog.category}</Badge>
                                    <h1 className="mb-4 text-4xl font-bold text-foreground">{blog.title}</h1>
                                    <p className="mb-6 text-xl text-muted-foreground">{blog.excerpt}</p>

                                    {/* Author and Meta */}
                                    <div className="flex items-center justify-between border-b border-border pb-6">
                                        <div className="flex items-center space-x-4">
                                            <div>
                                                <div className="font-semibold">{blog.author}</div>
                                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                    <span className="flex items-center">
                                                        <Calendar className="mr-1 h-4 w-4" />
                                                        {new Date(blog.published_at).toLocaleDateString()}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Clock className="mr-1 h-4 w-4" />
                                                        {blog.read_time} min read
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Article Body */}
                                <div className="prose prose-lg tiptap mb-12 max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />

                                {/* Tags */}
                                <div className="mb-8 flex flex-wrap gap-2">
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
                            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Share & Save</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <Button variant="outline" size="sm" className="w-full justify-start">
                                                <Twitter className="mr-2 h-4 w-4" />
                                                Twitter
                                            </Button>
                                            <Button variant="outline" size="sm" className="w-full justify-start">
                                                <Facebook className="mr-2 h-4 w-4" />
                                                Facebook
                                            </Button>
                                            <Button variant="outline" size="sm" className="w-full justify-start">
                                                <Linkedin className="mr-2 h-4 w-4" />
                                                LinkedIn
                                            </Button>
                                            <Button variant="outline" size="sm" className="w-full justify-start">
                                                <Bookmark className="mr-2 h-4 w-4" />
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
            <section className="bg-muted/30 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
                        <h2 className="mb-8 text-2xl font-bold text-foreground">Related Articles</h2>
                        <div className="grid gap-8 md:grid-cols-3">
                            {otherBlogs.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 + 0.1 * index }}
                                >
                                    <Link href={route('blogs.show', post.id)}>
                                        <Card className="group h-full cursor-pointer transition-shadow duration-300 hover:shadow-lg">
                                            <div
                                                className="h-48 rounded-t-lg bg-cover bg-center"
                                                style={{
                                                    backgroundImage: `url(${post.featured_image})`,
                                                }}
                                            />
                                            <CardHeader>
                                                <div className="mb-2 flex items-center justify-between">
                                                    <Badge variant="secondary">{post.category}</Badge>
                                                    <span className="text-xs text-muted-foreground">{post.read_time} min read</span>
                                                </div>
                                                <CardTitle className="transition-colors group-hover:text-primary">{post.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="mb-4 text-muted-foreground">{post.excerpt}</p>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <User className="mr-2 h-4 w-4" />
                                                    <span className="mr-4">{post.author}</span>
                                                    <Calendar className="mr-2 h-4 w-4" />
                                                    <span>{new Date(post.published_at).toLocaleDateString()}</span>
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

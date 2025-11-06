import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PublicLayout from '@/layouts/PublicLayout';
import type { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { useState } from 'react';

interface Blog {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    image_url: string;
    author: string;
    category: string;
    published_at: string;
    read_time: string;
}

interface BlogsIndexProps extends PageProps {
    blogs: Blog[];
    featuredBlog: Blog;
    otherBlogs: Blog[];
    categories: string[];
}

export default function BlogsIndex({ blogs, featuredBlog, otherBlogs, categories }: BlogsIndexProps) {
    const [filteredBlogs, setFilteredBlogs] = useState(otherBlogs);
    const [activeCategory, setActiveCategory] = useState('All');

    const handleCategoryFilter = (category: string) => {
        setActiveCategory(category);
        if (category === 'All') {
            setFilteredBlogs(otherBlogs);
        } else {
            setFilteredBlogs(otherBlogs.filter((blog) => blog.category === category));
        }
    };

    return (
        <PublicLayout>
            <Head title="Blogs" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 pt-32 pb-16">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1469474968028-56623f02e4292?w=1920&h=800&fit=crop)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30" />
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
                        <h1 className="mb-6 text-4xl font-bold text-foreground lg:text-6xl">Real Estate Insights</h1>
                        <p className="mx-auto mb-8 max-w-3xl text-xl text-muted-foreground">
                            Stay informed with our expert analysis, market trends, and practical advice for buyers, sellers, and investors in the real
                            estate market.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="border-b border-border py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-2">
                        <Button
                            key="All"
                            variant={activeCategory === 'All' ? 'default' : 'outline'}
                            size="sm"
                            className="mb-2"
                            onClick={() => handleCategoryFilter('All')}
                        >
                            All
                        </Button>
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={activeCategory === category ? 'default' : 'outline'}
                                size="sm"
                                className="mb-2"
                                onClick={() => handleCategoryFilter(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {featuredBlog && (
                <section className="py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                            <h2 className="mb-8 text-2xl font-bold text-foreground">Featured Article</h2>
                            <Card className="overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl">
                                <div className="grid gap-0 lg:grid-cols-2">
                                    <div
                                        className="h-64 bg-cover bg-center lg:h-full"
                                        style={{ backgroundImage: `url(${featuredBlog.featured_image})` }}
                                    />
                                    <CardContent className="flex flex-col justify-center p-8">
                                        <Badge className="mb-4 w-fit">{featuredBlog.category}</Badge>
                                        <CardTitle className="mb-4 text-2xl">{featuredBlog.title}</CardTitle>
                                        <p className="mb-6 text-muted-foreground">{featuredBlog.excerpt}</p>
                                        <div className="mb-6 flex items-center text-sm text-muted-foreground">
                                            <User className="mr-2 h-4 w-4" />
                                            <span className="mr-4">{featuredBlog.author}</span>
                                            <Calendar className="mr-2 h-4 w-4" />
                                            <span className="mr-4">{new Date(featuredBlog.published_at).toLocaleDateString()}</span>
                                            <Clock className="mr-2 h-4 w-4" />
                                            <span>{featuredBlog.read_time} min read</span>
                                        </div>
                                        <Link href={route('blogs.show', featuredBlog.id)}>
                                            <Button className="w-fit">
                                                Read More
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Blog Posts Grid */}
            <section className="bg-muted/30 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-8 text-2xl font-bold text-foreground">Latest Articles</h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredBlogs.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 * index }}
                            >
                                <Link href={route('blogs.show', post.id)}>
                                    <Card className="group h-full cursor-pointer transition-shadow duration-300 hover:shadow-lg">
                                        <div
                                            className="h-48 rounded-t-lg bg-cover bg-center"
                                            style={{ backgroundImage: `url(${post.featured_image})` }}
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
                </div>
            </section>

            {/* Newsletter Signup */}
            <section className="py-16">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <h2 className="mb-4 text-3xl font-bold text-foreground">Stay Updated</h2>
                        <p className="mb-8 text-muted-foreground">
                            Subscribe to our newsletter for the latest real estate insights and market updates.
                        </p>
                        <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 rounded-lg border border-border px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                            <Button>Subscribe</Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </PublicLayout>
    );
}

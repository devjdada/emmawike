import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';
import type { PageProps } from '@/types';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight 
} from "lucide-react";
import { motion } from "framer-motion";
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
            setFilteredBlogs(otherBlogs.filter(blog => blog.category === category));
        }
    }

  return (
    <PublicLayout>
      <Head title="Blogs" />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 to-accent/5 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1469474968028-56623f02e4292?w=1920&h=800&fit=crop)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Real Estate Insights
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Stay informed with our expert analysis, market trends, and practical advice 
              for buyers, sellers, and investors in the real estate market.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
                key="All"
                variant={activeCategory === "All" ? "default" : "outline"}
                size="sm"
                className="mb-2"
                onClick={() => handleCategoryFilter('All')}
              >
                All
              </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                >
                <h2 className="text-2xl font-bold text-foreground mb-8">Featured Article</h2>
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="grid lg:grid-cols-2 gap-0">
                    <div 
                        className="h-64 lg:h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${featuredBlog.featured_image})` }}
                    />
                    <CardContent className="p-8 flex flex-col justify-center">
                        <Badge className="w-fit mb-4">{featuredBlog.category}</Badge>
                        <CardTitle className="text-2xl mb-4">{featuredBlog.title}</CardTitle>
                        <p className="text-muted-foreground mb-6">{featuredBlog.excerpt}</p>
                        <div className="flex items-center text-sm text-muted-foreground mb-6">
                        <User className="h-4 w-4 mr-2" />
                        <span className="mr-4">{featuredBlog.author}</span>
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="mr-4">{new Date(featuredBlog.published_at).toLocaleDateString()}</span>
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{featuredBlog.read_time} min read</span>
                        </div>
                        <Link href={route("blogs.show", featuredBlog.id)}>
                        <Button className="w-fit">
                            Read More
                            <ArrowRight className="h-4 w-4 ml-2" />
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
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Link href={route("blogs.show", post.id)}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                  <div 
                    className="h-48 bg-cover bg-center rounded-t-lg"
                    style={{ backgroundImage: `url(${post.featured_image})` }}
                  />
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="text-xs text-muted-foreground">{post.read_time} min read</span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="h-4 w-4 mr-2" />
                      <span className="mr-4">{post.author}</span>
                      <Calendar className="h-4 w-4 mr-2" />
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to our newsletter for the latest real estate insights and market updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button>Subscribe</Button>
            </div>
          </motion.div>
        </div>
      </section>

    </PublicLayout>
  );
};
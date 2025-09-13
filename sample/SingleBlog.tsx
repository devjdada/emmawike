import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  Eye
} from "lucide-react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";

const SingleBlog = () => {
  const { id } = useParams();
  
  // Mock blog post data - in a real app, this would be fetched based on the ID
  const blogPost = {
    id: 1,
    title: "Top 10 Real Estate Investment Tips for 2024",
    excerpt: "Discover the most effective strategies for building wealth through real estate investments in today's market.",
    content: `
      <h2>Understanding the Current Market Landscape</h2>
      <p>The real estate market in 2024 presents unique opportunities and challenges for investors. With evolving economic conditions and changing buyer preferences, it's crucial to stay informed about the latest trends and strategies.</p>
      
      <h3>1. Research Market Trends Thoroughly</h3>
      <p>Before making any investment decisions, conduct comprehensive research on local market conditions, property values, and future development plans in your target area.</p>
      
      <h3>2. Diversify Your Portfolio</h3>
      <p>Don't put all your eggs in one basket. Consider different types of properties, locations, and investment strategies to minimize risk and maximize returns.</p>
      
      <h3>3. Focus on Cash Flow</h3>
      <p>Positive cash flow is essential for long-term success. Ensure that rental income exceeds all expenses, including mortgage payments, taxes, insurance, and maintenance costs.</p>
      
      <h3>4. Consider Emerging Neighborhoods</h3>
      <p>Look for up-and-coming areas with potential for growth. These locations often offer better value and higher appreciation potential than established markets.</p>
      
      <h3>5. Build Strong Professional Networks</h3>
      <p>Cultivate relationships with real estate agents, contractors, property managers, and other investors. A strong network can provide valuable insights and opportunities.</p>
    `,
    author: {
      name: "Sarah Johnson",
      bio: "Sarah Johnson is a seasoned real estate investor and financial advisor with over 15 years of experience in the industry. She has successfully managed a portfolio worth over $50 million.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Investment",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=600&fit=crop",
    tags: ["Investment", "Real Estate", "Tips", "2024", "Market Analysis"],
    stats: {
      views: 2547,
      likes: 189,
      comments: 23
    }
  };

  const relatedPosts = [
    {
      id: 2,
      title: "Understanding Market Trends in Luxury Properties",
      excerpt: "An in-depth analysis of current luxury real estate market trends.",
      author: "Michael Chen",
      date: "March 12, 2024",
      readTime: "6 min read",
      category: "Market Analysis",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "First-Time Homebuyer's Complete Guide",
      excerpt: "Everything you need to know about purchasing your first home.",
      author: "Emily Rodriguez",
      date: "March 10, 2024",
      readTime: "12 min read",
      category: "Buying Guide",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop"
    },
    {
      id: 4,
      title: "Staging Your Home for Maximum Impact",
      excerpt: "Professional tips on how to stage your property to attract buyers.",
      author: "David Thompson",
      date: "March 8, 2024",
      readTime: "5 min read",
      category: "Selling Tips",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop"
    }
  ];

  const tableOfContents = [
    "Understanding the Current Market Landscape",
    "Research Market Trends Thoroughly",
    "Diversify Your Portfolio",
    "Focus on Cash Flow",
    "Consider Emerging Neighborhoods",
    "Build Strong Professional Networks"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Back Button */}
      <div className="pt-24 pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog">
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
            style={{ backgroundImage: `url(${blogPost.image})` }}
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
                  <Badge className="mb-4">{blogPost.category}</Badge>
                  <h1 className="text-4xl font-bold text-foreground mb-4">{blogPost.title}</h1>
                  <p className="text-xl text-muted-foreground mb-6">{blogPost.excerpt}</p>
                  
                  {/* Author and Meta */}
                  <div className="flex items-center justify-between border-b border-border pb-6">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-12 h-12 bg-cover bg-center rounded-full"
                        style={{ backgroundImage: `url(${blogPost.author.image})` }}
                      />
                      <div>
                        <div className="font-semibold">{blogPost.author.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center space-x-4">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {blogPost.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {blogPost.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Engagement Stats */}
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {blogPost.stats.views}
                      </span>
                      <span className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {blogPost.stats.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {blogPost.stats.comments}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Article Body */}
                <div 
                  className="prose prose-lg max-w-none mb-12"
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {blogPost.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Author Bio */}
                <Card className="mb-12">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div 
                        className="w-16 h-16 bg-cover bg-center rounded-full flex-shrink-0"
                        style={{ backgroundImage: `url(${blogPost.author.image})` }}
                      />
                      <div>
                        <h3 className="font-semibold mb-2">About {blogPost.author.name}</h3>
                        <p className="text-muted-foreground">{blogPost.author.bio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Facebook className="h-4 w-4 mr-2" />
                        Facebook
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Bookmark className="h-4 w-4 mr-2" />
                        Save Article
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Table of Contents */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Table of Contents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {tableOfContents.map((item, index) => (
                        <button
                          key={index}
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                        >
                          {item}
                        </button>
                      ))}
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
            <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + 0.1 * index }}
                >
                  <Link to={`/blog/${post.id}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                      <div 
                        className="h-48 bg-cover bg-center rounded-t-lg"
                        style={{ backgroundImage: `url(${post.image})` }}
                      />
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary">{post.category}</Badge>
                          <span className="text-xs text-muted-foreground">{post.readTime}</span>
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
                          <span>{post.date}</span>
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

      <Footer />
    </div>
  );
};

export default SingleBlog;
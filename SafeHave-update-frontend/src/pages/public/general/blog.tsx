import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Heart,
  MessageCircle,
  Share2,
  Calendar,
  User,
  Search,
  TrendingUp,
  BookmarkPlus,
  Filter,
  Eye,
  Zap,
  Sparkles,
  ArrowRight,
  Shield,
} from 'lucide-react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function BlogPage() {
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  // Featured posts
  const featuredPosts = [
    {
      id: 1,
      title: 'Breaking the Silence: My Journey to Freedom',
      author: 'Anonymous Survivor',
      date: '2025-10-09',
      category: 'Survivor Story',
      excerpt:
        'After years of silence, I found my voice. This is my story of courage, healing, and hope...',
      image:
        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cml0aW5nJTIwam91cm5hbCUyMGJsb2d8ZW58MXx8fHwxNzYwMTc5MzI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      likes: 245,
      comments: 48,
      views: 1823,
      featured: true,
    },
    {
      id: 2,
      title: 'The Science of Healing: Understanding Trauma Recovery',
      author: 'Dr. Sarah Mitchell',
      date: '2025-10-07',
      category: 'Educational',
      excerpt:
        'Neuroscience reveals how our brains heal from trauma. Learn evidence-based strategies...',
      image:
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwd29ya3NwYWNlfGVufDF8fHx8MTc2MDE3OTMyNnww&ixlib=rb-4.1.0&q=80&w=1080',
      likes: 189,
      comments: 32,
      views: 2156,
      featured: true,
    },
  ];

  // Regular posts
  const posts = [
    {
      id: 3,
      title: 'Finding Strength in Community',
      author: 'Community Member',
      date: '2025-10-06',
      category: 'Survivor Story',
      excerpt:
        'The power of connecting with others who understand. How this platform changed my life...',
      content:
        "After months of isolation, I discovered this community. The anonymous nature allowed me to share without fear. Every comment, every heart, reminded me I'm not alone. Today, I'm stronger than I ever thought possible.",
      likes: 167,
      comments: 28,
      views: 892,
    },
    {
      id: 4,
      title: '10 Self-Care Strategies That Actually Work',
      author: 'Wellness Team',
      date: '2025-10-05',
      category: 'Safety Tips',
      excerpt: 'Evidence-based self-care techniques for trauma survivors...',
      content:
        '1. Morning mindfulness rituals 2. Grounding techniques for anxiety 3. Journaling prompts 4. Safe movement practices 5. Nutrition for mental health 6. Sleep hygiene basics 7. Boundary setting skills 8. Creative expression 9. Nature connection 10. Professional support',
      likes: 203,
      comments: 41,
      views: 1456,
    },
    {
      id: 5,
      title: 'New Legal Resources: Know Your Rights',
      author: 'Legal Team',
      date: '2025-10-04',
      category: 'Platform Update',
      excerpt:
        "We've partnered with 30 new legal organizations to provide free consultations...",
      content:
        "Your rights matter. We've expanded our legal resource directory with free consultation services, protection order assistance, and more. Every survivor deserves access to justice.",
      likes: 156,
      comments: 19,
      views: 1124,
    },
    {
      id: 6,
      title: 'Understanding Gaslighting: Recognizing the Signs',
      author: 'Dr. James Chen',
      date: '2025-10-03',
      category: 'Educational',
      excerpt:
        'Learn to identify psychological manipulation and protect yourself...',
      content:
        'Gaslighting is insidious. It makes you question your reality. Common signs include: constant denial of your experiences, trivializing your feelings, shifting blame, and isolating you from support. Trust your instincts.',
      likes: 278,
      comments: 56,
      views: 2341,
    },
    {
      id: 7,
      title: 'From Victim to Survivor to Thriver',
      author: 'Anonymous',
      date: '2025-10-02',
      category: 'Survivor Story',
      excerpt: 'My 5-year journey of transformation and growth...',
      content:
        "Five years ago, I was a victim. Three years ago, I became a survivor. Today, I'm thriving. This journey taught me that healing isn't linear, but it's always possible. To anyone reading this: you are worthy of a beautiful life.",
      likes: 412,
      comments: 89,
      views: 3567,
    },
    {
      id: 8,
      title: 'Creating a Safety Plan: Essential Steps',
      author: 'Safety Team',
      date: '2025-10-01',
      category: 'Safety Tips',
      excerpt: 'A comprehensive guide to preparing for emergencies...',
      content:
        'A safety plan can save your life. Essential elements: emergency contacts, safe places to go, important documents, financial resources, and code words with trusted people. Plan ahead, stay safe.',
      likes: 234,
      comments: 45,
      views: 1789,
    },
  ];

  const categories = [
    {
      name: 'all',
      label: 'All Stories',
      icon: Sparkles,
      color: 'from-[var(--color-primary)] to-[var(--color-secondary)]',
    },
    {
      name: 'Survivor Story',
      label: 'Survivor Stories',
      icon: Heart,
      color: 'from-[var(--color-primary)] to-[var(--color-accent)]',
    },
    {
      name: 'Educational',
      label: 'Educational',
      icon: BookmarkPlus,
      color: 'from-[var(--color-secondary)] to-[var(--color-primary)]',
    },
    {
      name: 'Safety Tips',
      label: 'Safety Tips',
      icon: Zap,
      color: 'from-[var(--color-accent)] to-[var(--color-primary)]',
    },
    {
      name: 'Platform Update',
      label: 'Updates',
      icon: TrendingUp,
      color: 'from-[var(--color-primary)] to-[var(--color-accent)]',
    },
  ];

  const trendingTopics = [
    { tag: '#RecoveryJourney', count: 1234 },
    { tag: '#MentalHealthMatters', count: 987 },
    { tag: '#SurvivorStrength', count: 856 },
    { tag: '#TraumaHealing', count: 743 },
    { tag: '#SafetyFirst', count: 621 },
  ];

  const filteredPosts =
    activeCategory === 'all'
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-primary)]/5 via-white to-[var(--color-accent)]/5">
      {/* Hero Section with Parallax Effect */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 via-[var(--color-secondary)]/10 to-[var(--color-accent)]/10" />
        <div className="animate-float absolute top-10 right-10 h-64 w-64 rounded-full bg-[var(--color-primary)]/20 blur-3xl" />
        <div
          className="animate-float absolute bottom-10 left-10 h-80 w-80 rounded-full bg-[var(--color-secondary)]/20 blur-3xl"
          style={{ animationDelay: '2s' }}
        />

        <div className="relative z-10 container mx-auto px-4">
          <div className="animate-fade-in-up mx-auto max-w-4xl text-center">
            <Badge className="mb-4 border-[var(--color-primary)]/20 bg-[var(--color-card)]/80 px-4 py-2 text-[var(--color-primary)] backdrop-blur-sm">
              <TrendingUp className="mr-2 h-3 w-3" />
              Community Stories & Insights
            </Badge>

            <h1 className="mb-6 text-5xl md:text-6xl">
              Stories of{' '}
              <span className="text-[var(--color-primary)]">
                Hope & Healing
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-xl text-[var(--color-foreground)]/80">
              Real experiences from survivors, expert insights, and resources to
              support your journey.
            </p>

            {/* Search Bar */}
            <div className="mx-auto max-w-xl">
              <div className="relative">
                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[var(--color-foreground)]/60" />
                <Input
                  placeholder="Search stories, topics, or authors..."
                  className="glass-effect h-14 border-[var(--color-primary)]/20 pr-4 pl-12 text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-8">
            {/* Featured Posts */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 py-8">
                <Sparkles className="h-5 w-5 text-[var(--color-primary)]" />
                <h2 className="gradient-text text-3xl font-bold">
                  Featured Stories
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {featuredPosts.map((post, index) => (
                  <Card
                    key={post.id}
                    className="group card-3d spotlight animate-fade-in-up overflow-hidden border-2 border-transparent transition-all duration-500 hover:border-[var(--color-primary)]/30"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className="absolute top-4 right-4 bg-[var(--color-card)]/90 text-[var(--color-primary)] backdrop-blur-sm">
                        Featured
                      </Badge>
                      <div className="absolute right-4 bottom-4 left-4">
                        <Badge
                          variant="secondary"
                          className="border-[var(--color-primary)]/20 bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                        >
                          {post.category}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="pt-6">
                      <h3 className="mb-3 line-clamp-2 transition-colors group-hover:text-[var(--color-primary)]">
                        {post.title}
                      </h3>
                      <p className="mb-4 line-clamp-2 text-[var(--color-foreground)]/80">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4 text-[var(--color-foreground)]/60">
                          <span className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {post.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {post.views}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="glass-card rounded-2xl p-6">
              <div className="mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5 text-[var(--color-primary)]" />
                <h3>Explore by Category</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`group relative rounded-xl px-6 py-3 transition-all duration-300 ${
                      activeCategory === cat.name
                        ? 'bg-gradient-to-r ' +
                          cat.color +
                          ' scale-105 text-[var(--color-foreground)] shadow-lg'
                        : 'border-2 border-gray-200 bg-[var(--color-card)] text-[var(--color-foreground)] hover:border-[var(--color-primary)]/30 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <cat.icon className="h-4 w-4" />
                      <span>{cat.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="space-y-6">
              <h2>Latest Stories</h2>

              <div className="grid grid-cols-1 gap-6">
                {filteredPosts.map((post, index) => (
                  <Card
                    key={post.id}
                    className="group spotlight animate-slide-in-left overflow-hidden border-2 border-transparent transition-all duration-500 hover:border-[var(--color-primary)]/20 hover:shadow-2xl"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="md:flex">
                      {/* Post Image/Icon */}
                      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 md:w-48">
                        <div className="bg-gradient-mesh animate-gradient absolute inset-0 opacity-20" />
                        <div className="relative z-10">
                          {post.category === 'Survivor Story' && (
                            <Heart className="h-16 w-16 text-[var(--color-primary)]" />
                          )}
                          {post.category === 'Educational' && (
                            <BookmarkPlus className="h-16 w-16 text-[var(--color-secondary)]" />
                          )}
                          {post.category === 'Safety Tips' && (
                            <Zap className="h-16 w-16 text-[var(--color-accent)]" />
                          )}
                          {post.category === 'Platform Update' && (
                            <TrendingUp className="h-16 w-16 text-[var(--color-primary)]" />
                          )}
                        </div>
                      </div>

                      {/* Post Content */}
                      <div className="flex-1 p-6">
                        <div className="mb-3 flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-[var(--color-foreground)]">
                                {post.author[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-[var(--color-foreground)]">
                                {post.author}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-[var(--color-foreground)]/60">
                                <Calendar className="h-3 w-3" />
                                {new Date(post.date).toLocaleDateString(
                                  'en-US',
                                  {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                  }
                                )}
                              </div>
                            </div>
                          </div>
                          <Badge
                            variant="secondary"
                            className="border-[var(--color-primary)]/20 bg-[var(--color-primary)]/10 text-[var(--color-primary)] transition-colors group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-foreground)]"
                          >
                            {post.category}
                          </Badge>
                        </div>

                        <h3 className="mb-3 transition-colors group-hover:text-[var(--color-primary)]">
                          {post.title}
                        </h3>

                        <p className="mb-4 text-[var(--color-foreground)]/80">
                          {expandedPost === post.id
                            ? post.content
                            : post.excerpt}
                        </p>

                        <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4">
                          <div className="flex items-center gap-6 text-sm">
                            <button className="group/like flex items-center gap-2 text-[var(--color-foreground)]/60 transition-colors hover:text-[var(--color-primary)]">
                              <Heart className="h-4 w-4 group-hover/like:fill-[var(--color-primary)]" />
                              <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center gap-2 text-[var(--color-foreground)]/60 transition-colors hover:text-[var(--color-primary)]">
                              <MessageCircle className="h-4 w-4" />
                              <span>{post.comments}</span>
                            </button>
                            <span className="flex items-center gap-2 text-[var(--color-foreground)]/60">
                              <Eye className="h-4 w-4" />
                              <span>{post.views}</span>
                            </span>
                          </div>

                          <Button
                            variant="link"
                            className="h-auto p-0 text-[var(--color-primary)] group-hover:underline"
                            onClick={() =>
                              setExpandedPost(
                                expandedPost === post.id ? null : post.id
                              )
                            }
                          >
                            {expandedPost === post.id
                              ? 'Show less'
                              : 'Read more'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>

                        {/* Expanded Comments */}
                        {expandedPost === post.id && (
                          <div className="animate-fade-in-up mt-6 space-y-4 border-t border-[var(--color-border)] pt-6">
                            <h4>Comments</h4>
                            <div className="space-y-3">
                              <div className="glass-card rounded-lg p-4">
                                <div className="mb-2 flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)] text-xs text-[var(--color-foreground)]">
                                      A
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <span>Anonymous User</span>
                                    <p className="text-sm text-[var(--color-foreground)]/60">
                                      2 days ago
                                    </p>
                                  </div>
                                </div>
                                <p className="text-sm text-[var(--color-foreground)]/80">
                                  Thank you for sharing your story. It gives me
                                  so much hope. ❤️
                                </p>
                              </div>

                              <div className="glass-card rounded-lg p-4">
                                <div className="mb-2 flex items-center gap-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-xs text-[var(--color-foreground)]">
                                      S
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <span>Survivor123</span>
                                    <p className="text-sm text-[var(--color-foreground)]/60">
                                      1 day ago
                                    </p>
                                  </div>
                                </div>
                                <p className="text-sm text-[var(--color-foreground)]/80">
                                  I relate to this so much. We're stronger
                                  together. 💪
                                </p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Textarea
                                placeholder="Add a supportive comment..."
                                className="min-h-[80px]"
                              />
                              <Button className="hover:bg-primary/90 bg-[var(--color-primary)] text-[var(--color-foreground)]">
                                Post Comment
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-4">
            {/* Trending Topics */}
            <Card className="glass-card sticky top-24 border-2 border-[var(--color-primary)]/10">
              <CardHeader>
                <h3 className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-2xl font-bold text-[var(--color-primary)]" />
                  Trending Topics
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <button
                    key={index}
                    className="group flex w-full items-center justify-between rounded-lg p-3 transition-colors hover:bg-[var(--color-primary)]/5"
                  >
                    <span className="text-[var(--color-primary)] group-hover:underline">
                      {topic.tag}
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                    >
                      {topic.count}
                    </Badge>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="neu-card overflow-hidden">
              <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] p-6 text-[var(--color-foreground)]">
                <h3 className="mb-2 text-[var(--color-foreground)]">Community Impact</h3>
                <p className="text-sm text-[var(--color-foreground)]/90">
                  Your voice creates change
                </p>
              </div>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-foreground)]/80">
                    Total Stories
                  </span>
                  <span className="font-semibold text-[var(--color-primary)]">
                    2,847
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-foreground)]/80">
                    Active Members
                  </span>
                  <span className="font-semibold text-[var(--color-primary)]">
                    15,432
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-foreground)]/80">
                    Hope Shared
                  </span>
                  <span className="font-semibold text-[var(--color-primary)]">
                    ∞
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Share Your Story CTA */}
            <Card className="gradient-border overflow-hidden">
              <div className="space-y-4 p-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]">
                  <Sparkles className="h-8 w-8 text-[var(--color-foreground)]" />
                </div>
                <h3>Share Your Story</h3>
                <p className="text-[var(--color-foreground)]/80">
                  Your experience could inspire and help someone else on their
                  journey.
                </p>
                <Button className="hover:bg-primary/90 w-full bg-[var(--color-primary)] text-[var(--color-foreground)]">
                  Write Your Story
                </Button>
              </div>
            </Card>

            {/* Moderation Notice */}
            <Card className="border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--color-primary)]" />
                  <div className="text-sm">
                    <p className="mb-2 text-[var(--color-foreground)]">
                      All content is moderated to ensure a safe, supportive
                      environment.
                    </p>
                    <p className="text-[var(--color-foreground)]/80">
                      Please be respectful and compassionate in all
                      interactions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

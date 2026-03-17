import { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Flag,
  MoreHorizontal,
  Search,
  Image as ImageIcon,
  Smile,
  ShieldCheck,
  Filter,
  Sparkles,
  Zap,
  Flame,
  Droplets,
  Plus,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  ForumCategory,
  FORUM_CATEGORY_LABELS,
  FORUM_CATEGORY_ICONS,
  FORUM_CATEGORY_COLORS,
  ForumPost,
  ForumPostStatus,
  getAllForumCategories,
  formatTimeAgo,
} from '@/types/forum';

// --- Mock Data ---

const TOPIC_CATEGORIES = getAllForumCategories().map((category) => ({
  id: category,
  label: FORUM_CATEGORY_LABELS[category],
  icon: FORUM_CATEGORY_ICONS[category],
  ...FORUM_CATEGORY_COLORS[category],
}));

const MOCK_THREADS: Partial<ForumPost>[] = [
  {
    id: '1',
    title: 'Small victory: I left the house today 🌿',
    authorId: 'user1',
    author: {
      id: 'user1',
      email: 'grace@example.com',
      firstName: 'GracefulSwan',
      lastName: '',
    } as any,
    category: ForumCategory.STORYTELLING,
    status: ForumPostStatus.PUBLISHED,
    views: 120,
    likes: 45,
    isAnonymous: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    content:
      "It's been three weeks since I felt safe enough to go for a walk. Today I put on my shoes and walked to the park. The sun felt amazing. Recovery is slow, but it's happening.",
    commentCount: 12,
  },
  {
    id: '2',
    title: 'Need advice on workplace boundaries',
    authorId: 'user2',
    author: {
      id: 'user2',
      email: 'resilient@example.com',
      firstName: 'ResilientHeart',
      lastName: '',
    } as any,
    category: ForumCategory.PEER_SUPPORT,
    status: ForumPostStatus.PUBLISHED,
    views: 85,
    likes: 20,
    isAnonymous: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    content:
      "My new manager keeps making subtle comments about my appearance. It's triggering my past trauma. How do I address this professionally without breaking down?",
    commentCount: 8,
  },
  {
    id: '3',
    title: 'Found a great grounding technique!',
    authorId: 'user3',
    author: {
      id: 'user3',
      email: 'calm@example.com',
      firstName: 'CalmSpirit',
      lastName: '',
    } as any,
    category: ForumCategory.RESOURCES,
    status: ForumPostStatus.PUBLISHED,
    views: 200,
    likes: 65,
    isAnonymous: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    content:
      "It's called the 5-4-3-2-1 method. 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste. Saved me from a panic attack this morning. 💕",
    commentCount: 24,
  },
];

const MOCK_REPLIES = {
  '1': [
    {
      id: 'r1',
      authorId: 'user4',
      author: { firstName: 'HopefulSoul', lastName: '' } as any,
      content: "That's amazing! So proud of you for taking that step. 🌟",
      createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      isAnonymous: true,
      likes: 3,
    },
    {
      id: 'r2',
      authorId: 'user5',
      author: { firstName: 'GentleSpirit', lastName: '' } as any,
      content: "Recovery really is slow, but every step counts. You've got this! 💪",
      createdAt: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
      isAnonymous: true,
      likes: 5,
    },
  ],
  '2': [
    {
      id: 'r3',
      authorId: 'user6',
      author: { firstName: 'WiseVoice', lastName: '' } as any,
      content: "Document everything - dates, times, what was said. Then schedule a private meeting with HR.",
      createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      isAnonymous: true,
      likes: 8,
    },
  ],
  '3': [
    {
      id: 'r4',
      authorId: 'user7',
      author: { firstName: 'PeacefulMind', lastName: '' } as any,
      content: "Thank you for sharing this! I've been struggling with anxiety and this technique really helps.",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      isAnonymous: true,
      likes: 12,
    },
    {
      id: 'r5',
      authorId: 'user8',
      author: { firstName: 'HealingHeart', lastName: '' } as any,
      content: "This is gold! Adding it to my coping toolkit. 🙏",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
      isAnonymous: true,
      likes: 6,
    },
  ],
};

export function CommunityForumPage() {
  const [activeCategory, setActiveCategory] = useState<ForumCategory | 'ALL'>(
    'ALL'
  );
  const [isPosting, setIsPosting] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [showGuidelines, setShowGuidelines] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Partial<ForumPost> | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [replyContent, setReplyContent] = useState('');
  const navigate = useNavigate();

  // Filter threads
  const filteredThreads =
    activeCategory === 'ALL'
      ? MOCK_THREADS
      : MOCK_THREADS.filter((t) => t.category === activeCategory);

  // Handle post selection
  const handlePostSelect = (post: Partial<ForumPost>) => {
    setSelectedPost(post);
  };

  // Handle like toggle
  const handleLikeToggle = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  // Handle reply submission
  const handleReplySubmit = () => {
    if (replyContent.trim() && selectedPost?.id) {
      // In a real app, this would make an API call
      console.log('Reply submitted:', replyContent);
      setReplyContent('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-linear-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Community Forum</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Share, support, and connect with others</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button
                onClick={() => setIsPosting(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sticky top-20">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Categories</h3>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveCategory('ALL')}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeCategory === 'ALL'
                      ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Filter className="w-4 h-4 inline mr-2" />
                  All Topics
                </button>
                {TOPIC_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as ForumCategory)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeCategory === cat.id
                        ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <span className="text-base mr-2">{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Community Stats */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Community Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Members</span>
                    <span className="font-medium text-gray-900 dark:text-white">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Posts Today</span>
                    <span className="font-medium text-gray-900 dark:text-white">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Active Now</span>
                    <span className="font-medium text-green-600">47</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2">
            {/* Modern Input Widget */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">💭</span>
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder="What's on your mind? (Anonymous)"
                    className="w-full resize-none border-none bg-transparent py-2 text-sm placeholder:text-gray-400 focus:ring-0"
                    rows={3}
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                </div>
              </div>

              {isPosting && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 rounded-full px-4 text-xs font-bold hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600"
                  >
                    <ImageIcon className="h-4 w-4" /> Photo
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 rounded-full px-4 text-xs font-bold hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600"
                  >
                    <Smile className="h-4 w-4" /> Mood
                  </Button>
                  <div className="flex-1"></div>
                  <Button
                    variant="ghost"
                    onClick={() => setIsPosting(false)}
                    className="rounded-xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button className="rounded-xl px-6 font-bold bg-orange-500 hover:bg-orange-600 text-white">
                    Post
                  </Button>
                </div>
              )}
            </div>

            {/* Feed Posts */}
            <div className="space-y-4">
              {filteredThreads.map((thread) => {
                const category = TOPIC_CATEGORIES.find(
                  (c) => c.id === thread.category
                );
                return (
                  <article
                    key={thread.id}
                    className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handlePostSelect(thread)}
                  >
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                          thread.isAnonymous
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                            : 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                        }`}>
                          {thread.isAnonymous ? (
                            <ShieldCheck className="w-4 h-4" />
                          ) : (
                            thread.author?.firstName?.substring(0, 1)
                          )}
                        </div>

                        {/* Author Info */}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-white text-sm">
                              {thread.isAnonymous ? 'Anonymous Survivor' : thread.author?.firstName}
                            </span>
                            {thread.isAnonymous && (
                              <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                                Hidden
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <span>{formatTimeAgo(thread.createdAt as string)}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              {category?.icon}
                              {category?.label}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Post Content */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 leading-tight">
                        {thread.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                        {thread.content}
                      </p>
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className={`text-gray-500 gap-1 ${likedPosts.has(thread.id as string) ? 'text-red-500' : 'hover:text-red-500 dark:hover:text-red-400'}`} onClick={(e) => { e.stopPropagation(); handleLikeToggle(thread.id as string); }}>
                          <Heart className={`w-4 h-4 ${likedPosts.has(thread.id as string) ? 'fill-current' : ''}`} />
                          <span className="text-sm">{(thread.likes || 0) + (likedPosts.has(thread.id as string) ? 1 : 0)}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 gap-1" onClick={(e) => { e.stopPropagation(); handlePostSelect(thread); }}>
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{thread.commentCount}</span>
                        </Button>
                      </div>

                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {thread.views} views
                      </div>
                    </div>
                  </article>
                );
              })}

              {/* Load More */}
              <div className="text-center py-8">
                <Button variant="outline" className="text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
                  Load More Posts
                </Button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Post Details */}
          <div className="lg:col-span-2">
            {selectedPost ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 sticky top-20">
                {/* Selected Post Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Post Details</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedPost(null)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      ✕
                    </Button>
                  </div>
                </div>

                {/* Selected Post Content */}
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                      selectedPost.isAnonymous
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                        : 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300'
                    }`}>
                      {selectedPost.isAnonymous ? (
                        <ShieldCheck className="w-5 h-5" />
                      ) : (
                        selectedPost.author?.firstName?.substring(0, 1)
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900 dark:text-white text-sm">
                          {selectedPost.isAnonymous ? 'Anonymous Survivor' : selectedPost.author?.firstName}
                        </span>
                        {selectedPost.isAnonymous && (
                          <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                            Hidden
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {formatTimeAgo(selectedPost.createdAt as string)}
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{selectedPost.title}</h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">{selectedPost.content}</p>
                    </div>
                  </div>

                  {/* Reply Input */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-xs">👤</span>
                      </div>
                      <div className="flex-1">
                        <textarea
                          placeholder="Write a reply... (Anonymous)"
                          className="w-full resize-none border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          rows={3}
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                        />
                        <div className="flex justify-end mt-2">
                          <Button
                            size="sm"
                            onClick={handleReplySubmit}
                            disabled={!replyContent.trim()}
                            className="bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Replies */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Replies ({MOCK_REPLIES[selectedPost.id as keyof typeof MOCK_REPLIES]?.length || 0})
                    </h4>
                    <div className="space-y-3">
                      {MOCK_REPLIES[selectedPost.id as keyof typeof MOCK_REPLIES]?.map((reply) => (
                        <div key={reply.id} className="flex gap-3">
                          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <ShieldCheck className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900 dark:text-white text-sm">
                                {reply.isAnonymous ? 'Anonymous Survivor' : reply.author?.firstName}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatTimeAgo(reply.createdAt)}
                              </span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">{reply.content}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-500 dark:hover:text-red-400 gap-1 h-auto p-1">
                                <Heart className="w-3 h-3" />
                                <span className="text-xs">{reply.likes}</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Select a Post</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Click on any post to view details and replies
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Guidelines Modal */}
      {showGuidelines && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <div className="text-center mb-6">
              <ShieldCheck className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Community Guidelines
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Please read and agree to our community guidelines before posting.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {[
                { icon: '💜', text: 'Practice Kindness', desc: 'Support without judgement' },
                { icon: '🛡️', text: 'Maintain Anonymity', desc: "Protect everyone's privacy" },
                { icon: '🛑', text: 'Zero Tolerance', desc: 'No hate speech or harassment' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">{item.text}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => navigate(-1)}
              >
                Leave
              </Button>
              <Button
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => setShowGuidelines(false)}
              >
                I Agree
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

-- SafeHave Database Schema Migration
-- Script 003: Forum and Community Tables
-- This script creates tables for the community forum feature

-- Forum posts table
CREATE TABLE IF NOT EXISTS public.forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category forum_category NOT NULL,
  status forum_post_status DEFAULT 'PENDING_MODERATION' NOT NULL,
  views INTEGER DEFAULT 0 NOT NULL,
  likes INTEGER DEFAULT 0 NOT NULL,
  is_anonymous BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_forum_posts_author_id ON public.forum_posts(author_id);
CREATE INDEX idx_forum_posts_category ON public.forum_posts(category);
CREATE INDEX idx_forum_posts_status ON public.forum_posts(status);
CREATE INDEX idx_forum_posts_created_at ON public.forum_posts(created_at);

-- Forum comments table
CREATE TABLE IF NOT EXISTS public.forum_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0 NOT NULL,
  is_anonymous BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_forum_comments_post_id ON public.forum_comments(post_id);
CREATE INDEX idx_forum_comments_author_id ON public.forum_comments(author_id);

-- Forum post likes table (to track who liked what)
CREATE TABLE IF NOT EXISTS public.forum_post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.forum_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(post_id, user_id)
);

CREATE INDEX idx_forum_post_likes_post_id ON public.forum_post_likes(post_id);
CREATE INDEX idx_forum_post_likes_user_id ON public.forum_post_likes(user_id);

-- Forum comment likes table
CREATE TABLE IF NOT EXISTS public.forum_comment_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID NOT NULL REFERENCES public.forum_comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(comment_id, user_id)
);

CREATE INDEX idx_forum_comment_likes_comment_id ON public.forum_comment_likes(comment_id);
CREATE INDEX idx_forum_comment_likes_user_id ON public.forum_comment_likes(user_id);

-- Enable Row Level Security
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_comment_likes ENABLE ROW LEVEL SECURITY;

-- Add updated_at triggers
CREATE TRIGGER update_forum_posts_updated_at
  BEFORE UPDATE ON public.forum_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_forum_comments_updated_at
  BEFORE UPDATE ON public.forum_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to increment post views
CREATE OR REPLACE FUNCTION increment_post_views(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.forum_posts
  SET views = views + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to toggle post like
CREATE OR REPLACE FUNCTION toggle_post_like(p_post_id UUID, p_user_id UUID)
RETURNS boolean AS $$
DECLARE
  liked boolean;
BEGIN
  -- Check if already liked
  IF EXISTS (SELECT 1 FROM public.forum_post_likes WHERE post_id = p_post_id AND user_id = p_user_id) THEN
    -- Unlike
    DELETE FROM public.forum_post_likes WHERE post_id = p_post_id AND user_id = p_user_id;
    UPDATE public.forum_posts SET likes = likes - 1 WHERE id = p_post_id;
    liked := false;
  ELSE
    -- Like
    INSERT INTO public.forum_post_likes (post_id, user_id) VALUES (p_post_id, p_user_id);
    UPDATE public.forum_posts SET likes = likes + 1 WHERE id = p_post_id;
    liked := true;
  END IF;
  RETURN liked;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

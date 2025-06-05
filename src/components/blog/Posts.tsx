'use client';

import { useState, useEffect } from 'react';
import { Grid } from '@/once-ui/components';
import Post from './Post';

interface PostData {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary?: string;
    image?: string;
    tag?: string;
  };
  content: string;
}

interface PostsProps {
  range?: [number] | [number, number];
  columns?: '1' | '2' | '3';
  thumbnail?: boolean;
  direction?: 'row' | 'column';
  baseURL?: string;
}

export function Posts({
  range = [1],
  columns = '1',
  thumbnail = false,
  direction,
  baseURL = ''
}: PostsProps) {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const rangeStart = range[0];
        const rangeEnd = range.length > 1 ? range[1] : undefined;
        
        const queryParams = new URLSearchParams();
        queryParams.append('rangeStart', rangeStart.toString());
        if (rangeEnd) {
          queryParams.append('rangeEnd', rangeEnd.toString());
        }
        
        const response = await fetch(`/api/blog-posts?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [range]);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <>
      {posts.length > 0 && (
        <Grid
          columns={columns} mobileColumns="1"
          fillWidth marginBottom="40" gap="12">
          {posts.map((post) => (
            <Post
              key={post.slug}
              post={post}
              thumbnail={thumbnail}
              direction={direction}
              baseURL={baseURL}
            />
          ))}
        </Grid>
      )}
    </>
  );
}
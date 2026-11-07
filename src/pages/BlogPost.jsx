// src/pages/BlogPost.jsx — one post: Back, centered title, then the text
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { POSTS, formatDate } from "./Blog.jsx";

function Block({ b }) {
  switch (b.type) {
    case "heading":
      return <h2 className="post__h">{b.text}</h2>;
    case "quote":
      return <blockquote className="post__quote">{b.text}</blockquote>;
    case "item":
      return <p className="post__item">• {b.text}</p>;
    case "image":
      return <img className="post__img" src={b.src} alt="" loading="lazy" />;
    case "video":
      return (
        <div className="post__video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${b.youtube}`}
            title="Video"
            loading="lazy"
            allow="accelerometer; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    default:
      return <p>{b.text}</p>;
  }
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <article className="post">
        <nav className="back-link-row">
          <Link to="/blog" className="back-link">← Back</Link>
        </nav>
        <p className="post__body">That post isn’t here anymore.</p>
      </article>
    );
  }

  return (
    <article className="post">
      <nav className="back-link-row">
        <Link to="/blog" className="back-link">← Back</Link>
      </nav>
      <h1 className="post__title">{post.title}</h1>
      <p className="post__meta">{post.category} · {formatDate(post.date)}</p>
      <div className="post__body" lang="id">
        {post.blocks.map((b, i) => (
          <Block key={i} b={b} />
        ))}
      </div>
    </article>
  );
}

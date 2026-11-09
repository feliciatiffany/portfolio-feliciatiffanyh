// src/pages/BlogPost.jsx — one post: Back, centered title, then the text
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { POSTS, formatDate } from "./Blog.jsx";
import ScrambledText, { historyTitle } from "../components/ScrambledText.jsx";

function Block({ b, original }) {
  const text = original || !b.en ? b.text : b.en;
  switch (b.type) {
    case "heading":
      return <h2 className="post__h">{text}</h2>;
    case "quote":
      return <blockquote className="post__quote">{text}</blockquote>;
    case "item":
      return <p className="post__item">• {text}</p>;
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
      return <p>{text}</p>;
  }
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);
  const [original, setOriginal] = useState(false); // English first; the Indonesian original is one click away

  useEffect(() => {
    window.scrollTo(0, 0);
    setOriginal(false);
  }, [slug]);

  if (!post) {
    return (
      <article className="post">
        <p className="post__body">That post isn’t here anymore.</p>
      </article>
    );
  }

  return (
    <article className="post">
      <ScrambledText key={original ? "id" : "en"} as="h1" className="post__title" {...historyTitle}>
        {original || !post.en ? post.title : post.en.title}
      </ScrambledText>
      <p className="post__meta">{post.category} · {formatDate(post.date)}</p>
      {post.en && (
        <p className="post__lang">
          <button type="button" className="post__lang-btn" aria-pressed={original} onClick={() => setOriginal((v) => !v)}>
            {original ? "Show English" : "Show original"}
          </button>
          <span className="post__lang-note">Originally written in Indonesian</span>
        </p>
      )}
      <div className="post__body" lang={original || !post.en ? "id" : "en"}>
        {post.blocks.map((b, i) => (
          <Block key={i} b={b} original={original} />
        ))}
      </div>
    </article>
  );
}

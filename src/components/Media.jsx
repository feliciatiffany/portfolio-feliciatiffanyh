import React from "react";

export default function Media({ item, className, autoPlay = false, controls = false }) {
  if (!item?.src) return null;

  const cls = className || "proj-media";
  const type = item.type || "image";

  if (type === "video") {
    return (
      <video
        className={cls}
        src={item.src}
        autoPlay={autoPlay}
        muted={autoPlay}
        playsInline
        loop={autoPlay}
        controls={controls}
        preload="metadata"
      />
    );
  }

  return <img className={cls} src={item.src} alt={item.alt || ""} loading="lazy" />;
}
import Link from "next/link";
import RevealText from "@/components/animation/RevealText";
import AnimatedButton from "@/components/animation/AnimatedButton";
import BackgroundParallax from "@/components/animation/BackgroundParallax";
import { Calendar } from "lucide-react";

const BLOG_POSTS = [
  {
    id: "1",
    title: "The Future of AI in Web Development",
    excerpt:
      "How artificial intelligence is revolutionizing the way we build and maintain websites.",
    category: "Technology",
    date: "Dec 20, 2024",
    image: "/blog/ai.png",
    slug: "/blog/future-of-ai-web-development",
  },
  {
    id: "2",
    title: "Building Scalable SaaS Applications",
    excerpt:
      "Best practices for creating cloud-native applications that grow with your business.",
    category: "Development",
    date: "Dec 18, 2024",
    image: "/blog/saas.png",
    slug: "/blog/building-scalable-saas",
  },
  {
    id: "3",
    title: "Blockchain Beyond Cryptocurrency",
    excerpt:
      "Exploring real-world applications of blockchain technology in business.",
    category: "Innovation",
    date: "Dec 15, 2024",
    image: "/blog/blockchain.png",
    slug: "/blog/blockchain-beyond-crypto",
  },
];

export default function Blog() {
  return (
    <div className="mxd-section padding-blog">
      <div className="mxd-container grid-container">
        {/* Section Title */}
        <div className="mxd-block">
          <div className="mxd-section-title pre-grid">
            <div className="container-fluid p-0">
              <div className="row g-0">
                <div className="col-12 col-xl-5 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrtitle">
                    <RevealText as="h2" className="reveal-type anim-uni-in-up">
                      Latest insights
                    </RevealText>
                  </div>
                </div>

                <div className="col-12 col-xl-4 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrdescr">
                    <p className="anim-uni-in-up">
                      Inspiring ideas, creative insights, and the latest in
                      design and tech. Fueling innovation for your digital
                      journey.
                    </p>
                  </div>
                </div>

                <div className="col-12 col-xl-3 mxd-grid-item no-margin">
                  <div className="mxd-section-title__hrcontrols anim-uni-in-up">
                    <AnimatedButton
                      text="All Articles"
                      className="btn btn-anim btn-default btn-outline slide-right-up"
                      href="/blog"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Cards */}
        <div className="mxd-block">
          <div className="mxd-blog-preview">
            <div className="container-fluid p-0">
              <div className="row g-0">
                {BLOG_POSTS.map((post) => (
                  <div
                    key={post.id}
                    className="col-12 col-xl-4 mxd-blog-preview__item mxd-grid-item animate-card-3"
                  >
                    <Link href={post.slug} className="mxd-blog-preview__media">
                      <BackgroundParallax
                        className="mxd-blog-preview__image parallax-img-small"
                        style={{
                          backgroundImage: `url(${post.image})`,
                        }}
                      />

                      <div className="mxd-preview-hover">
                        <i className="mxd-preview-hover__icon">
                          <svg
                            width="38"
                            height="21"
                            viewBox="0 0 38 21"
                            fill="none"
                          >
                            <path
                              d="M19 0C11 0 4 5 1 11c3 6 10 11 18 11s15-5 18-11c-3-6-10-11-18-11zm0 18c-4 0-7-3-7-7s3-7 7-7 7 3 7 7-3 7-7 7zm0-11c-2 0-4 2-4 4s2 4 4 4 4-2 4-4-2-4-4-4z"
                              fill="currentColor"
                            />
                          </svg>
                        </i>
                      </div>

                      <div className="mxd-blog-preview__tags">
                        <span className="tag tag-default tag-permanent">
                          {post.category}
                        </span>
                      </div>
                    </Link>
                    <div className="flex items-center gap-2 mb-3 text-xs text-muted anim-uni-in-up">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                    <div className="mxd-blog-preview__data">
                      <Link className="anim-uni-in-up" href={post.slug}>
                        {post.title}
                      </Link>

                      <p className="anim-uni-in-up mt-2 text-sm text-muted">
                        {post.excerpt}
                      </p>

                      
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
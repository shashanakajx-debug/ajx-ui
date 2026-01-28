import Link from "next/link";
import SectionHeader from "./SectionHeader";

const BLOG_POSTS = [
  {
    id: "1",
    title: "12 Top Financial Analysis Software in 2026",
    subtitle: "",
    category: "SOFTWARE",
    date: "January 5, 2026",
    image: "/blog/ai.png",
    slug: "/blog/future-of-ai-web-development",
    author: "Serge Guzenko",
    readTime: "",
  },
  {
    id: "2",
    title: "Embedded AI Explained: Use Cases and Practical Applications",
    subtitle: "Use Cases and Practical Applications",
    category: "AI & IOT",
    date: "January 19, 2026",
    image: "/blog/saas.png",
    slug: "/blog/building-scalable-saas",
    author: "Alex",
    readTime: "10 min",
  },
  {
    id: "3",
    title: "Risk Management in Software Development",
    subtitle: "",
    category: "SOFTWARE",
    date: "January 19, 2026",
    image: "/blog/blockchain.png",
    slug: "/blog/blockchain-beyond-crypto",
    author: "Denis",
    readTime: "",
  },
];

export default function Blog() {
  return (
    <section className=" our-experties container_ser lg:pt-10 lg:pb-[100px] pt-10 pb-[50px]">
      <div className="mx-auto row gx-0">
        <SectionHeader
          subtitle="THE BLOG"
          title="AJX Technologies"
          description="INSIGHTS"
          buttonText="All Articles"
          buttonLink="/blog"
          className=""
        />
        <div className="mxd-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {BLOG_POSTS.map((post) => (
              <article key={post.id} className="group">
                <Link
                  href={post.slug}
                  className="block relative overflow-hidden rounded-3xl mb-4"
                >
                  <div className="relative aspect-[16/10] bg-black">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    {post.subtitle && (
                      <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8 text-white">
                        <h2 className="text-2xl lg:text-3xl font-bold mb-2 leading-tight">
                          {post.title.split(":")[0]}
                        </h2>
                        <p className=" lg:text-base opacity-90">
                          {post.subtitle}
                        </p>
                      </div>
                    )}
                  </div>
                </Link>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 anim-uni-in-up">
                    <Link
                      href={`/blog/category/${post.category.toLowerCase().replace(/\s+&\s+/g, "-")}`}
                      className="inline-flex items-center px-4 py-1.5 bg-[#119000] hover:bg-[#119000] text-white text-xs font-bold rounded-lg uppercase tracking-wide transition-colors duration-200"
                    >
                      {post.category}
                    </Link>
                    <span className="">{post.date}</span>
                  </div>
                  <Link href={post.slug} className="block">
                    <h3 className="transition-colors duration-200 anim-uni-in-up leading-tight">
                      {post.title}
                    </h3>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

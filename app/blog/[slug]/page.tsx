import { blogPosts } from "../data";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | 데일리 사주 칼럼`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-[var(--background)] flex flex-col items-center justify-start overflow-x-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Cpath d='M50 50c-27.6 0-50 22.4-50 50h10c0-22.1 17.9-40 40-40s40 17.9 40 40h10c0-27.6-22.4-50-50-50zm0-50C22.4 0 0 22.4 0 50h10c0-22.1 17.9-40 40-40s40 17.9 40 40h10C100 22.4 77.6 0 50 0z'/%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: '120px 120px', opacity: 0.2 }}></div>
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[#3a0606] to-transparent opacity-50 pointer-events-none"></div>

      <main className="animate-fade-in flex flex-col items-center w-full max-w-4xl px-4 py-20 sm:px-6 z-10">
        <nav className="w-full mb-12 flex justify-between items-center bg-black/30 backdrop-blur-md p-4 rounded-full border border-[var(--gold-primary)]/20 shadow-lg">
          <Link href="/blog" className="text-[var(--gold-primary)] hover:text-white transition-colors flex items-center gap-2 group ml-4 text-sm font-bold tracking-widest uppercase">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> List
          </Link>
          <Link href="/" className="mr-4">
             <div className="relative w-10 h-10 hover:scale-110 transition-transform">
                <Image src="/dragon.png" alt="Logo" fill className="object-contain" />
             </div>
          </Link>
        </nav>

        <article className="w-full bg-[#1a0505]/90 backdrop-blur-xl border border-[var(--gold-primary)]/30 rounded-[2.5rem] p-8 sm:p-16 shadow-2xl relative">
          <header className="mb-12 border-b border-[var(--gold-primary)]/20 pb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-[var(--gold-primary)]/10 text-[var(--gold-primary)] text-xs px-4 py-2 rounded-full border border-[var(--gold-primary)]/40 font-black tracking-[0.2em] uppercase">
                {post.category}
              </span>
              <time className="text-[var(--gold-light)]/50 text-sm font-mono">{post.date}</time>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--gold-primary)] leading-[1.3] break-keep" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
              {post.title}
            </h1>
          </header>

          <div className="prose prose-invert prose-gold max-w-none text-[var(--gold-light)]/90 leading-relaxed font-normal space-y-6 text-sm sm:text-base break-keep text-justify">
            {post.content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('###')) {
                return (
                  <h3 key={i} className="text-lg sm:text-xl font-bold text-[var(--gold-primary)] mt-10 mb-4 border-l-4 border-[var(--gold-primary)] pl-5">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={i} className="space-y-3 my-4 ml-2">
                    {paragraph.split('\n').map((item, j) => (
                      <li key={j} className="flex gap-3 items-start">
                        <span className="text-[var(--gold-primary)] mt-1.5 text-xs">●</span>
                        <span dangerouslySetInnerHTML={{ __html: item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--gold-primary)] font-bold">$1</strong>') }}></span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p 
                  key={i} 
                  className="opacity-90 font-light"
                  dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--gold-primary)] font-bold">$1</strong>') }}
                />
              );
            })}
          </div>

          <footer className="mt-16 pt-12 border-t border-[var(--gold-primary)]/20 flex flex-col items-center">
             <p className="text-[var(--gold-light)]/40 text-sm mb-6 font-light uppercase tracking-widest">© 2026 Daily Chinese Horoscope. All rights reserved.</p>
             <Link 
                href="/blog" 
                className="bg-gradient-to-r from-[#e5ca72] to-[#d4af37] text-[#3a0606] font-black tracking-[0.2em] uppercase px-10 py-4 rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:scale-105 active:scale-95 transition-all text-sm"
             >
                Back to Blog List
             </Link>
          </footer>
        </article>

        <section className="mt-16 w-full flex flex-col items-center">
            <h4 className="text-[var(--gold-primary)] font-bold tracking-[0.3em] uppercase mb-8 opacity-50">Related Fortune Columns</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                {blogPosts.filter(p => p.slug !== post.slug).slice(0, 2).map(p => (
                    <Link key={p.slug} href={`/blog/${p.slug}`} className="bg-black/40 border border-[var(--gold-primary)]/20 p-6 rounded-2xl hover:border-[var(--gold-primary)]/60 transition-colors">
                        <span className="text-[var(--gold-primary)] text-xs font-bold uppercase tracking-widest block mb-2">{p.category}</span>
                        <h5 className="text-[var(--gold-light)] font-bold line-clamp-1">{p.title}</h5>
                    </Link>
                ))}
            </div>
        </section>
      </main>
    </div>
  );
}

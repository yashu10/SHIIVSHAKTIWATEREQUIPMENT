import React from "react";
import { Metadata } from "next";
import blogsData from "../../../data/blogs.json";
import { BlogDetailClient } from "../../../components/BlogDetailClient";
import { notFound } from "next/navigation";

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  return blogsData.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const resolvedParams = await props.params;
  const blog = blogsData.find((b) => b.slug === resolvedParams.slug);

  if (!blog) {
    return {
      title: "Article Not Found",
    };
  }

  const imageUrl = `https://shivshaktiwaterequipment.com${blog.image}`;

  return {
    title: `${blog.title} | Blog | SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.`,
    description: blog.summary,
    alternates: {
      canonical: `/blog/${resolvedParams.slug}`,
    },
    openGraph: {
      type: "article",
      title: blog.title,
      description: blog.summary,
      url: `/blog/${resolvedParams.slug}`,
      images: [
        {
          url: imageUrl,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.summary,
      images: [imageUrl],
    },
  };
}

export default async function BlogPage(props: {
  params: Promise<Params>;
}) {
  const resolvedParams = await props.params;
  const blogIndex = blogsData.findIndex((b) => b.slug === resolvedParams.slug);

  if (blogIndex === -1) {
    notFound();
  }

  const blog = blogsData[blogIndex];
  const prevBlog = blogIndex > 0 ? blogsData[blogIndex - 1] : null;
  const nextBlog = blogIndex < blogsData.length - 1 ? blogsData[blogIndex + 1] : null;

  const suggestions = blogsData
    .filter((b) => b.slug !== blog.slug)
    .slice(0, 3);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": `https://shivshaktiwaterequipment.com${blog.image}`,
    "datePublished": blog.date || "2024-01-01",
    "dateModified": blog.date || "2024-01-01",
    "author": {
      "@type": "Organization",
      "name": "SHIIV SHAKTI WATER EQUIPMENT PVT. LTD."
    },
    "publisher": {
      "@type": "Organization",
      "name": "SHIIV SHAKTI WATER EQUIPMENT PVT. LTD.",
      "logo": {
        "@type": "ImageObject",
        "url": "https://shivshaktiwaterequipment.com/assets/images/shiv_shakti_logo.png"
      }
    },
    "description": blog.summary
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://shivshaktiwaterequipment.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://shivshaktiwaterequipment.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.title,
        "item": `https://shivshaktiwaterequipment.com/blog/${resolvedParams.slug}`
      }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <BlogDetailClient
        blog={blog}
        suggestions={suggestions}
        prevBlog={prevBlog}
        nextBlog={nextBlog}
      />
    </main>
  );
}

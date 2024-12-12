import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link, useLocation } from "react-router";
import Banner from "../Banner";
export function Main() {
  const location = useLocation();
  const { title, author, content, originalUrl } = location.state.article;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Banner />

      <article className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-gray-600">
            Written by <span className="font-medium">{author}</span>
          </p>
        </header>

        <div className="prose prose-lg prose-slate max-w-none mb-12">
          {/* {content?.length > 0 && content?.map((paragraph, index) => ( */}
          <p className="mb-6 leading-relaxed text-gray-700">{content}</p>
          {/* ))} */}
        </div>

        <footer className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-8 border-t border-gray-200">
          <Link
            to="/"
            className="w-fit flex justify-start items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <Link
            href={originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit flex justify-start items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Read Original Article
            <ExternalLink className="w-4 h-4 ml-2" />
          </Link>
        </footer>
      </article>
    </div>
  );
}

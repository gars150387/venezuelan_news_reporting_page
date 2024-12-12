/* eslint-disable react/prop-types */
import "@justinribeiro/lite-youtube";
import { Link, Newspaper, Video } from "lucide-react";
import { useNavigate } from "react-router";
import "../App.css";
export default function NewsCard({ news }) {
  const navigate = useNavigate();
  const videoId = news?.type === "video" ? news?.url?.split("v=")[1] : "";
  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      {news?.type === "video" && (
        <lite-youtube videoid={videoId} title={news?.title}></lite-youtube>
      )}
      <div className="p-6 h-auto">
        <div className="flex items-center gap-2 mb-3">
          {news?.type === "video" ? (
            <Video className="w-5 h-5 text-red-500" />
          ) : (
            <Newspaper className="w-5 h-5 text-blue-500" />
          )}
          <span className="text-sm font-medium text-gray-600 capitalize">
            {news?.source}
          </span>
        </div>

        <h2 className="text-xl font-bold mb-3 text-gray-800">{news?.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{news?.content}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span
            style={{
              backgroundColor: news?.type === "video" ? "#ff6f6f" : "#f3f4f6",
            }}
            key={news?.type}
            className="px-3 capitalize py-1 rounded-full text-sm text-gray-600"
          >
            {news?.type}
          </span>
          <span
            key={news?.owner}
            className="px-3 py-1 capitalize rounded-full text-sm bg-gray-100 text-gray-600"
          >
            {String(news?.owner).replaceAll("_", " ")}
          </span>
        </div>
        {/* <div className="flex flex-wrap gap-2 mb-4">
          <span
            key={news?.owner}
            className="px-3 py-1 capitalize rounded-full text-sm bg-gray-100 text-gray-600"
          >
            {String(news?.owner).replaceAll("_", " ")}
          </span>
        </div> */}
        <div className="w-full flex justify-between items-center">
          <a
            href={news?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit flex justify-start items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Fuente original
            <Link className="w-4 h-4" />
          </a>
          <button
            onClick={() =>
              navigate(`/article/${news?.id}`, {
                state: {
                  article: {
                    title: news?.title,
                    author: news?.owner,
                    content: news?.content,
                    originalUrl: news?.url,
                  },
                },
              })
            }
            type="button"
            style={{
              display: news?.type === "video" ? "none" : "block",
            }}
            className="min-w-fit cursor-pointer w-fit flex justify-start items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Mas detalles
            {/* <ExternalLink className="w-4 h-4" /> */}
          </button>
        </div>
      </div>
    </article>
  );
}

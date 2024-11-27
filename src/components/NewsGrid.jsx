/* eslint-disable react/prop-types */
import NewsCard from "./newsCard";

export default function NewsGrid({ news }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news?.map((item) => {
          return <NewsCard key={item.id} news={item} />;
        })}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { supabase } from "./supabaseConnection";
import { Pagination } from "antd";
import Banner from "./components/banner";
import Navbar from "./components/Navbar";
import NewsGrid from "./components/NewsGrid";
import Footer from "./components/Footer";

// Fetch data from Supabase
function useSupabaseData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0); // Pagination offset
  const [limit, setLimit] = useState(12); // Items per page
  // Create an effect to fetch data when the component mounts

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: news, error } = await supabase
          .from("noticia")
          .select("*")
          .range(offset, offset + limit - 1)
          .order("inserted_at", { ascending: false });
        if (error) {
          setError(error.message);
        } else {
          setData(news);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [offset, refetch]);
  // Return the fetched data and loading state
  return {
    data,
    loading,
    error,
    setOffset,
    offset,
    limit,
    refetch,
    setRefetch,
    setLimit,
  };
}

function App() {
  const {
    data,
    loading,
    error,
    offset,
    setOffset,
    limit,
    refetch,
    setRefetch,
    setLimit,
  } = useSupabaseData();
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All Sources");
  const [totalItems, setTotalItems] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      return setFilteredNews(data);
    }
  }, [data, loading, error, offset, setOffset, limit, refetch, setRefetch, setLimit]);

  useEffect(() => {
    const fetchData = async () => {
      const { count } = await supabase
        .from("noticia")
        .select("*", { count: "exact" });
      return setTotalItems(count);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("noticia").select("owner");
      const uniqueOwners = [...new Set(data.map((item) => item.owner))];
      return setOptions(uniqueOwners);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchFilteredNews = async () => {
      try {
        // Check if searchTerm is empty
        if (!searchTerm.trim()) {
          setRefetch(!refetch);
          setFilteredNews([]); // Optionally clear previous results
          return;
        }

        // Perform the query
        const { data, error } = await supabase
          .from("noticia")
          .select("*")
          .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
          .order("inserted_at", { ascending: false });

        // Handle errors
        if (error) {
          console.error("Error fetching data:", error);
          setFilteredNews([]); // Optionally clear results on error
          return;
        }

        // Update state with fetched data
        return setFilteredNews(data);
      } catch (err) {
        console.error("Unexpected error:", err);
        setFilteredNews([]); // Optionally clear results on unexpected error
      }
    };

    fetchFilteredNews();
  }, [searchTerm]);

  useEffect(() => {
    if (sourceFilter === "All Sources") {
      return setRefetch(!refetch);
    }
    const fetchData = async () => {
      const { data } = await supabase
        .from("noticia")
        .select("*")
        .ilike("owner", [`${sourceFilter}`])
        .order("inserted_at", { ascending: false });
      return setFilteredNews(data);
    };
    fetchData();
  }, [sourceFilter]);

  const [current, setCurrent] = useState(1);
  const onChange = (page, pageSize) => {
    setOffset(page + limit);
    setCurrent(page);
    setLimit(pageSize);
    setRefetch(!refetch);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Banner />
      <Navbar
        onSearch={setSearchTerm}
        onFilterChange={setSourceFilter}
        source={options}
        refetch={refetch}
        setRefetch={setRefetch}
      />
      <main className="flex-grow">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && filteredNews?.length === 0 && (
          <p>No news articles found.</p>
        )}
        {!loading && <NewsGrid news={filteredNews} />}
        <div className="flex justify-center w-full gap-4 my-4">
          <Pagination
            current={current}
            onChange={onChange}
            total={totalItems}
            pageSize={limit}
            pageSizeOptions={[12, 24, 48, 96, 120]}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default App;

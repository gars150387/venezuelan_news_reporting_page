import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseConnection";
import Banner from "./Banner";
import Navbar from "./Navbar";
import NewsGrid from "./NewsGrid";
import Footer from "./Footer";

function Home() {
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All Sources");
  const [totalItems, setTotalItems] = useState(null);
  const [options, setOptions] = useState([]);
  const [limit, setLimit] = useState(20); // Items per page
  const [lastLoadedItem, setLastLoadedItem] = useState(null); // Store the last loaded item for pagination
  const [isLoading, setIsLoading] = useState(false);
  const rowData = useQuery({
    queryKey: ["noticia", limit],
    queryFn: async () =>
      await supabase
        .from("noticia")
        .select("*")
        .order("inserted_at", { ascending: false })
        .limit(limit),
    staleTime: 1 * 60 * 60 * 1000, //1hrs
  });
  const countingRows = useQuery({
    queryKey: ["noticia"],
    queryFn: async () =>
      await supabase.from("noticia").select("inserted_at", { count: "exact" }),
    staleTime: 1 * 60 * 60 * 1000, //1hrs
  });

  const searchingRows = useQuery({
    queryKey: ["noticia", searchTerm],
    queryFn: async () =>
      await supabase
        .from("noticia")
        .select("*")
        .or(
          `title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%,owner.ilike.%${searchTerm}%,url.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%,type.ilike.%${searchTerm}%`
        )
        .order("inserted_at", { ascending: false })
        .limit(limit),
    staleTime: 1 * 60 * 60 * 1000, //1hrs
    keepPreviousData: true,
  });

  const filterOptionsRows = useQuery({
    queryKey: ["noticia", sourceFilter],
    queryFn: async () =>
      await supabase
        .from("noticia")
        .select("*")
        .ilike("owner", [`${sourceFilter}`])
        .order("inserted_at", { ascending: false })
        .limit(limit),
    staleTime: 1 * 60 * 60 * 1000, //1hrs
  });
  useEffect(() => {
    const cache = localStorage.getItem("REACT_QUERY_OFFLINE_CACHE");
    if (cache) return localStorage.removeItem("REACT_QUERY_OFFLINE_CACHE");
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    if (rowData?.data?.data?.length > 0) {
      setFilteredNews([...filteredNews, ...rowData.data.data]);
      if (filteredNews.at(-1)?.inserted_at === lastLoadedItem) return;
      setLastLoadedItem(rowData.data.data?.at(-1)?.inserted_at);
    }
    return () => controller.abort();
  }, [rowData.data, rowData.isLoading, rowData.error, limit]);

  useEffect(() => {
    const controller = new AbortController();
    setTotalItems(countingRows?.data?.count);
    return () => controller.abort();
  }, [countingRows.data, countingRows.isLoading, countingRows.error]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("noticia")
        .select("owner")
        .neq("owner", null);
      const uniqueOwners = [...new Set(data.map((item) => item.owner))].sort(
        (a, b) => a.localeCompare(b)
      );
      return setOptions(uniqueOwners);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchFilteredNews = async () => {
      try {
        // Check if searchTerm is empty
        if (!searchTerm.trim()) {
          rowData.refetch({
            queryKey: ["noticia", lastLoadedItem, limit],
            queryFn: async () =>
              await supabase
                .from("noticia")
                .select("*")
                .order("inserted_at", { ascending: false })
                .limit(limit)
                .lt("inserted_at", lastLoadedItem),
          });
          setLastLoadedItem(rowData.data.data?.at(-1)?.inserted_at);
        }
        if (searchTerm.trim().length > 0) {
          // Update state with fetched data
          const refetchingSearchingFunction = async () => {
            const result = await searchingRows.refetch({
              queryKey: ["noticia", searchTerm],
              queryFn: async () =>
                await supabase
                  .from("noticia")
                  .select("*")
                  .or(
                    `title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%,owner.ilike.%${searchTerm.replaceAll(
                      " ",
                      "_"
                    )}%,url.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%,type.ilike.%${searchTerm}%`
                  )
                  .order("inserted_at", { ascending: false })
                  .limit(limit),
            });
            setLastLoadedItem(result?.data?.data?.at(-1)?.inserted_at);
            return setFilteredNews(result?.data?.data);
          };
          refetchingSearchingFunction();
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setFilteredNews([]); // Optionally clear results on unexpected error
      }
    };

    fetchFilteredNews();
  }, [!searchTerm.trim(), searchTerm]);

  useEffect(() => {
    const controller = new AbortController();
    if (sourceFilter === "All Sources") {
      const refetchingFunction = async () => {
        await rowData.refetch({
          queryKey: ["noticia", lastLoadedItem, limit],
          queryFn: async () =>
            await supabase
              .from("noticia")
              .select("*")
              .order("inserted_at", { ascending: false })
              .limit(limit),
        });
        setLastLoadedItem(rowData.data.data?.at(-1)?.inserted_at);
        return setFilteredNews([...rowData.data.data]);
      };
      refetchingFunction();
    }
    if (sourceFilter !== "All Sources") {
      const fetchingByOptions = async () => {
        const result = await filterOptionsRows.refetch({
          queryKey: ["noticia", sourceFilter],
          queryFn: async () =>
            await supabase
              .from("noticia")
              .select("*")
              .ilike("owner", [`${sourceFilter}`])
              .order("inserted_at", { ascending: false })
              .limit(limit),
        });
        setLastLoadedItem(result?.data?.data?.at(-1)?.inserted_at);
        return setFilteredNews(result?.data?.data);
      };
      fetchingByOptions();
    }
    return () => controller.abort();
  }, [sourceFilter]);

  const refetchMethods = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("noticia")
      .select("*")
      .order("inserted_at", { ascending: false })
      .limit(limit)
      .lt("inserted_at", lastLoadedItem);

    if (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
      return;
    }

    if (data.length > 0) {
      setFilteredNews([...filteredNews, ...data]);
      setLastLoadedItem(data[data.length - 1]?.inserted_at);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Banner />
      <Navbar
        limit={setLimit}
        onSearch={setSearchTerm}
        onFilterChange={setSourceFilter}
        source={options}
        refetch={refetchMethods}
        setRefetch={null}
      />
      <main className="flex-grow">
        {rowData.isLoading && <p>Loading...</p>}
        {rowData.error && <p>Error: {rowData.error.message}</p>}
        {!rowData.isLoading && !rowData.error && filteredNews?.length === 0 && (
          <p>No news articles found.</p>
        )}
        {!rowData.isLoading && <NewsGrid news={filteredNews} />}
        <div className="flex justify-center w-full gap-4 my-4">
          <Button
            loading={isLoading}
            onClick={() => refetchMethods()}
            className="w-fit flex justify-start items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <p>Cargar mas noticias (total de noticias: {totalItems})</p>
          </Button>{" "}
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default Home;

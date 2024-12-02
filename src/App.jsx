import { Pagination } from "antd";
import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import NewsGrid from "./components/NewsGrid";
import { supabase } from "./supabaseConnection";
import { useQuery } from "@tanstack/react-query";

// Fetch data from Supabase
// function useSupabaseData() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refetch, setRefetch] = useState(false);
//   const [error, setError] = useState(null);
//   const [offset, setOffset] = useState(0); // Pagination offset
//   const [limit, setLimit] = useState(12); // Items per page
//   // Create an effect to fetch data when the component mounts

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data: news, error } = await supabase
//           .from("noticia")
//           .select("*")
//           .range(offset, offset + limit - 1)
//           .order("inserted_at", { ascending: false });
//         if (error) {
//           setError(error.message);
//         } else {
//           setData(news);
//           setLoading(false);
//         }
//       } catch (error) {
//         setError(error.message);
//       }
//     };
//     fetchData();
//   }, [offset, refetch]);
//   // Return the fetched data and loading state
//   return {
//     data,
//     loading,
//     error,
//     setOffset,
//     offset,
//     limit,
//     refetch,
//     setRefetch,
//     setLimit,
//   };
// }

function App() {
  // const { refetch, setRefetch } = useSupabaseData();
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All Sources");
  const [totalItems, setTotalItems] = useState(null);
  const [options, setOptions] = useState([]);
  const [offset, setOffset] = useState(0); // Pagination offset
  const [limit, setLimit] = useState(12); // Items per page

  const rowData = useQuery({
    queryKey: ["noticia", offset, limit],
    queryFn: async () =>
      await supabase
        .from("noticia")
        .select("*")
        .range(offset, offset + limit - 1)
        .order("inserted_at", { ascending: false }),
    staleTime: 8 * 60 * 60 * 1000, //8hrs
  });

  const countingRows = useQuery({
    queryKey: ["noticia"],
    queryFn: async () =>
      await supabase.from("noticia").select("inserted_at", { count: "exact" }),
    staleTime: 8 * 60 * 60 * 1000, //8hrs
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
        .order("inserted_at", { ascending: true }),
    staleTime: 8 * 60 * 60 * 1000, //8hrs
    keepPreviousData: true,
  });

  const filterOptionsRows = useQuery({
    queryKey: ["noticia", sourceFilter],
    queryFn: async () =>
      await supabase
        .from("noticia")
        .select("*")
        .ilike("owner", [`${sourceFilter}`])
        .order("inserted_at", { ascending: true }),
    staleTime: 8 * 60 * 60 * 1000, //8hrs
  });

  useEffect(() => {
    const controller = new AbortController();
    if (rowData?.data?.data?.length > 0) {
      setFilteredNews(rowData?.data?.data);
    }
    return () => controller.abort();
  }, [rowData.data, rowData.isLoading, rowData.error, offset, limit]);

  useEffect(() => {
    const controller = new AbortController();
    setTotalItems(countingRows?.data?.count);
    return () => controller.abort();
  }, [countingRows.data]);

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
            queryKey: ["noticia", offset, limit],
            queryFn: async () =>
              await supabase
                .from("noticia")
                .select("*")
                .range(offset, offset + limit - 1)
                .order("inserted_at", { ascending: false }),
          });
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
                  .range(offset, offset + limit - 1)
                  .order("inserted_at", { ascending: true }),
            });
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
          queryKey: ["noticia", offset, limit],
          queryFn: async () =>
            await supabase
              .from("noticia")
              .select("*")
              .range(offset, offset + limit - 1)
              .order("inserted_at", { ascending: false }),
        });
        return setFilteredNews(rowData?.data?.data);
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
              .range(offset, offset + limit - 1)
              .order("inserted_at", { ascending: true }),
        });
        return setFilteredNews(result?.data?.data);
      };
      fetchingByOptions();
    }
    return () => controller.abort();
  }, [sourceFilter]);

  const [current, setCurrent] = useState(1);
  const onChange = (page, pageSize) => {
    setOffset(page + limit);
    setCurrent(page);
    setLimit(pageSize);
    rowData.refetch({
      queryKey: ["noticia", offset, limit],
      queryFn: async () =>
        await supabase
          .from("noticia")
          .select("*")
          .range(offset, offset + limit - 1)
          .order("inserted_at", { ascending: false }),
    });
  };

  const refetchMethods = () => {
    rowData.refetch({
      queryKey: ["noticia", offset, limit],
      queryFn: async () =>
        await supabase
          .from("noticia")
          .select("*")
          .range(offset, offset + limit - 1)
          .order("inserted_at", { ascending: false }),
    });
    return setFilteredNews(rowData?.data?.data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Banner />
      <Navbar
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

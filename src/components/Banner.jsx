import { Newspaper } from "lucide-react";

export default function Banner() {
  return (
    <div className="bg-gradient-to-r from-yellow-300 via-blue-600 to-red-700 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-4">
          <Newspaper className="w-12 h-12" />
          <h1 className="text-4xl font-bold">Noticias de Venezuela</h1>
        </div>
        <p className="text-center mt-4 text-blue-100">
          Mantente informado sobre las noticias de Venezuela desde el mundo.
        </p>
      </div>
    </div>
  );
}

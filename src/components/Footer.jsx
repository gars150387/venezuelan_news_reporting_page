import { Newspaper } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-6">
            <Newspaper className="w-8 h-8" />
            <span className="text-2xl font-bold">Noticias de Venezuela</span>
          </div>

          {/* <div className="flex gap-6 mb-8">
            <a href="#" className="hover:text-blue-400 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
          </div> */}

          <div className="text-center text-gray-400">
            <p className="mb-2">
              Mantente informado sobre las noticias de Venezuela desde el mundo.
            </p>
            <p>
              &copy; {new Date().getFullYear()} Gustavo Rodriguez.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

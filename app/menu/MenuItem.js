import Image from 'next/image';
import { Plus } from 'lucide-react';

// Note: Removed manual React.memo as per project strategy (reactCompiler: true).
// The compiler automatically memoizes components, making manual wrapping redundant.

export default function MenuItem({ item, onSelect }) {
  return (
    <div
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-stone-100 cursor-pointer flex flex-col h-full"
      onClick={() => onSelect(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(item);
        }
      }}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-xl font-medium text-stone-800 group-hover:text-[var(--saffron)] transition-colors">
            {item.name}
          </h3>
          <span className="font-medium text-[var(--saffron)] whitespace-nowrap ml-2">
            ${item.price}
          </span>
        </div>

        <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
          <div className="flex gap-2">
            {item.spicy && (
              <span className="px-2 py-0.5 text-xs font-medium text-red-700 bg-red-50 rounded-full flex items-center gap-1">
                🌶️ Spicy
              </span>
            )}
            {item.vegan && (
              <span className="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-50 rounded-full flex items-center gap-1">
                🌱 Vegan
              </span>
            )}
          </div>
          <button
            className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center group-hover:bg-[var(--saffron)] group-hover:text-white transition-colors"
            aria-label={`Add ${item.name} to order`}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

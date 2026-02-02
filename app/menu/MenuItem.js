import { memo } from 'react';
import Image from 'next/image';

const MenuItem = memo(({ item, onSelect }) => {
  const renderSpice = (level) => {
    return '🌶️'.repeat(level);
  };

  return (
    <div
      onClick={() => onSelect(item)}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full"
    >
      <div className="relative h-48 w-full">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
          <span className="text-lg font-bold text-amber-600">
            ${item.price}
          </span>
        </div>
        <p className="text-gray-600 mb-4 flex-grow">{item.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm font-medium px-2 py-1 bg-amber-100 text-amber-800 rounded">
            {item.category}
          </span>
          {item.spiceLevel > 0 && (
            <span className="text-sm" title={`Spice Level: ${item.spiceLevel}`}>
              {renderSpice(item.spiceLevel)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

MenuItem.displayName = 'MenuItem';

export default MenuItem;

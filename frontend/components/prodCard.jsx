import Image from "next/image";

export default function Card({ alt, src, title, subtitle, price }) {
  return (
    <div className="p-4 w-full bg-gray-800 border-r-2 border-b-2 border-green-700 rounded-xl ">
      <a className="block relative h-48 bg-white rounded overflow-hidden">
        <Image
          alt={alt}
          class="object-contain object-center md:object-scale-down  w-full h-full block"
          src={src}
          //   height={421}
          //   width={262}
          layout="fill"
        />
      </a>
      <div className="mt-4">
        <h3 className="text-white text-xs tracking-widest title-font mb-1">
          {subtitle}
        </h3>
        <h2 className="text-white title-font text-lg font-medium">{title}</h2>
        <div className="flex justify-between">
          <p className="mt-1 text-green-400">Price: ₹{price}</p>
          <button className="transition-colors transform hover:bg-green-800 mx-5 bg-green-400 px-2 py-1 text-white rounded-md">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

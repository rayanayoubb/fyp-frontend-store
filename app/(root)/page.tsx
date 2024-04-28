import Collections from "@/components/Collections";
import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <>
      <video controls className="w-screen" width="100%" height="auto" autoPlay loop muted>
        <source src="/vd.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Collections />
      <ProductList />
    </>
  );
}

export const dynamic = "force-dynamic";

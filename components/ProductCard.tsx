import Image from "next/image";
import Link from "next/link";
import HeartFavorite from "./HeartFavorite";
import styles from './Product.module.css'; // Import CSS file for styling

interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard = ({ product, updateSignedInUser }: ProductCardProps ) => {
  return (
    <Link
      href={`/products/${product._id}`}
      className={`w-[220px] flex flex-col gap-1 ${styles.productCard}`} // Apply CSS class for modern styling
    >
      <div className={styles.imageContainer}>
        <Image
          src={product.media[0]}
          alt="product"
          width={250}
          height={100}
          className={styles.image}
        />
        <div className={styles.overlay}></div> {/* Add overlay for hover effect */}
        <div className={styles.productName}>{product.title}</div> {/* Add product name */}
      </div>
      <div className={styles.content}>
        <div>
          <p className={styles.title}>{product.title}</p>
          <p className={styles.category}>{product.category}</p>
        </div>
        <div className={styles.priceContainer}>
          <p className={styles.price}>${product.price}</p>
          <HeartFavorite product={product} updateSignedInUser={updateSignedInUser} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

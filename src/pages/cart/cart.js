import { CartLayout } from "@/layouts";
import { useRouter } from "next/router";
import { Product, Inventory } from "@/api";
import { useState, useEffect } from "react";
import { useCart } from "@/hooks";
import { Cart } from "@/components/Cart";
import { Seo } from "@/components/Shared";

const productCtrl = new Product();

const inventoryCtrl = new Inventory();

export default function CartPage() {
  const {
    query: { step = 1 },
  } = useRouter();

  const currentStep = Number(step);

  const [products, setproducts] = useState(null);
  const { cart } = useCart();

  useEffect(() => {
    (async () => {
      try {
        const data = [];
        for await (const item of cart) {
          const response = await inventoryCtrl.getById(item.id);

          const response2 = await inventoryCtrl.getByProductId(
            response.data[0].id
          );

          const response3 = await productCtrl.getProductById(
            response2.data[0].attributes.product.data.id
          );

          data.push({
            ...response.data,
            product: {
              ...response2.data[0].attributes.product,
              cover: response3.data.attributes.cover,
              brand: response3.data.attributes.brand,
            },
            quantity: item.quantity,
          });
        }
        setproducts(data);
      } catch (error) {
        console.error;
      }
    })();
  }, [cart]);

  return (
    <>
      <Seo title="Cesta" />
      <CartLayout>
        {currentStep === 1 && <Cart.StepOne products={products} />}
        {currentStep === 2 && <Cart.StepTwo products={products} />}
        {currentStep === 3 && <Cart.StepThree />}
      </CartLayout>
    </>
  );
}

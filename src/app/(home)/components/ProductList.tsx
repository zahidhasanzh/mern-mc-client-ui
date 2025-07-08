import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category, Product } from "@/lib/types";
import ProductCard from "./product-card";

const ProductList = async () => {
   const [categoryResponse, productResponse] = await Promise.all([
    fetch(`${process.env.BACKEND_URL}/api/catalog/categories`, {
      next: { revalidate: 3600 },
    }),
    fetch(
      `${process.env.BACKEND_URL}/api/catalog/products?Perpage=100&tenantId=`,
      {
        next: { revalidate: 3600 },
      }
    ),
  ]);

  if (!categoryResponse.ok || !productResponse.ok) {
    throw new Error("Failed to fetch data");
  }

  const categories: Category[] = await categoryResponse.json();
  const products: { data: Product[] } = await productResponse.json();
  return (
    <section>
      <div className="container py-12">
        <Tabs defaultValue={categories[0]._id}>
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger
                key={category._id}
                value={category._id}
                className="text-md"
              >
                {category.name}
              </TabsTrigger>
            ))}

            {/* <TabsTrigger value="beverages" className="text-md">
                Beverages
              </TabsTrigger> */}
          </TabsList>
          {categories.map((category) => (
            <TabsContent key={category._id} value={category._id}>
              <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mt-6">
                {products.data
                  .filter((product) => product.category._id === category._id)
                  .map((product) => (
                    <ProductCard product={product} key={product._id} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ProductList;

package crochet_store_backend.product;

import java.util.List;

public interface ProductService {

    Product createProduct(Product product);

    Product getProductById(Long id);

    List<Product> getAllProducts();

    Product updateProduct(Long id, Product updatedProduct);

    Product deactivateProduct(Long id);
}

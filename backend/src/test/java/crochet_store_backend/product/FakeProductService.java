package crochet_store_backend.product;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FakeProductService implements ProductService {

    private final Map<Long, Product> products = new HashMap<>();

    @Override
    public Product createProduct(Product product) {
        products.put(product.getId(), product);
        return product;
    }

    @Override
    public Product getProductById(Long id) {
        Product product = products.get(id);

        if (product == null) {
            throw new ProductNotFoundException(id);
        }

        return product;
    }

    @Override
    public List<Product> getAllProducts() {
        return new ArrayList<>(products.values());
    }

    @Override
    public Product updateProduct(Long id, Product updatedProduct) {
        Product existingProduct = getProductById(id);

        existingProduct.setSku(updatedProduct.getSku());
        existingProduct.setName(updatedProduct.getName());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setCategory(updatedProduct.getCategory());
        existingProduct.setActive(updatedProduct.getActive());

        return existingProduct;
    }

    @Override
    public Product deactivateProduct(Long id) {
        Product product = getProductById(id);
        product.setActive(false);
        return product;
    }

    // Test helper
    public void addProduct(Long id, Product product) {
        products.put(id, product);
    }
}
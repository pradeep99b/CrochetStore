package crochet_store_backend.product;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class FakeProductRepository implements ProductRepository {

    private final List<Product> products = new ArrayList<>();

    @Override
    public Product save(Product product) {
        products.add(product);
        return product;
    }

    @Override
    public Optional<Product> findById(Long id) {
        return products.stream()
                .filter(product -> product.getId() != null)
                .filter(product -> product.getId().equals(id))
                .findFirst();
    }

    @Override
    public List<Product> findAll() {
        return new ArrayList<>(products);
    }
}
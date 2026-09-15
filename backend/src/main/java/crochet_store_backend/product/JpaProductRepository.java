package crochet_store_backend.product;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaProductRepository
        extends JpaRepository<Product, Long>, ProductRepository {
}
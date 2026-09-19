package crochet_store_backend.product;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import static org.junit.jupiter.api.Assertions.*;

class ProductServiceTest {

    private FakeProductRepository productRepository;
    private ProductServiceImpl productService;

    @BeforeEach
    void setUp() {
        productRepository = new FakeProductRepository();
        productService = new ProductServiceImpl(productRepository);
    }

    @Test
    void createProduct_shouldSaveProduct() {
        Product product = createProduct();

        Product result = productService.createProduct(product);

        assertSame(product, result);
        assertEquals(1, productRepository.findAll().size());
        assertSame(product, productRepository.findAll().get(0));

        assertNotNull(result.getCreatedAt());
        assertNotNull(result.getUpdatedAt());
        assertEquals(result.getCreatedAt(), result.getUpdatedAt());
    }

    @Test
    void getAllProducts_shouldReturnAllProducts() {
        Product product1 = createProduct();
        Product product2 = createProduct();

        productService.createProduct(product1);
        productService.createProduct(product2);

        var result = productService.getAllProducts();

        assertEquals(2, result.size());
        assertTrue(result.contains(product1));
        assertTrue(result.contains(product2));
    }

    @Test
    void getProductById_shouldThrowException_whenProductDoesNotExist() {
        ProductNotFoundException exception = assertThrows(
                ProductNotFoundException.class,
                () -> productService.getProductById(999L)
        );

        assertEquals(
                "Product not found with id: 999",
                exception.getMessage()
        );
    }

    private Product createProduct() {
        Product product = new Product();

        product.setSku("CRO-001");
        product.setName("Crochet Bear");
        product.setDescription("Handmade crochet bear");
        product.setPrice(new BigDecimal("499.00"));
        product.setCategory("Toys");
        product.setActive(true);

        return product;
    }
}
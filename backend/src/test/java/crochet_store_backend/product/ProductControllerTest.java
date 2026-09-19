package crochet_store_backend.product;

import crochet_store_backend.product.dto.ProductRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

class ProductControllerTest {

    private FakeProductService productService;
    private ProductController productController;

    @BeforeEach
    void setUp() {
        productService = new FakeProductService();
        productController = new ProductController(productService);
    }

    @Test
    void getAllProducts_shouldReturnAllProducts() {

        Product product1 = createProduct("CRO-001", "Crochet Bear");
        Product product2 = createProduct("CRO-002", "Crochet Bunny");

        productService.addProduct(1L, product1);
        productService.addProduct(2L, product2);

        var result = productController.getAllProducts();

        assertEquals(2, result.size());

        assertEquals("CRO-001", result.get(0).getSku());
        assertEquals("Crochet Bear", result.get(0).getName());

        assertEquals("CRO-002", result.get(1).getSku());
        assertEquals("Crochet Bunny", result.get(1).getName());
    }

    @Test
    void getProductById_shouldReturnProduct() {

        Product product = createProduct("CRO-001", "Crochet Bear");

        productService.addProduct(1L, product);

        var result = productController.getProductById(1L);

        assertNotNull(result);

        assertEquals("CRO-001", result.getSku());
        assertEquals("Crochet Bear", result.getName());
        assertEquals("Handmade crochet product", result.getDescription());
        assertEquals(new BigDecimal("499.00"), result.getPrice());
        assertEquals("Toys", result.getCategory());
        assertTrue(result.getActive());
    }

    @Test
    void createProduct_shouldReturnCreatedProduct() {

        ProductRequest request = new ProductRequest();

        request.setSku("CRO-003");
        request.setName("Crochet Cat");
        request.setDescription("Handmade crochet cat");
        request.setPrice(new BigDecimal("599.00"));
        request.setCategory("Toys");
        request.setActive(true);

        var result = productController.createProduct(request);

        assertEquals(201, result.getStatusCode().value());

        assertNotNull(result.getBody());

        assertEquals("CRO-003", result.getBody().getSku());
        assertEquals("Crochet Cat", result.getBody().getName());
        assertEquals("Handmade crochet cat", result.getBody().getDescription());
        assertEquals(new BigDecimal("599.00"), result.getBody().getPrice());
        assertEquals("Toys", result.getBody().getCategory());
        assertTrue(result.getBody().getActive());
    }

    @Test
    void updateProduct_shouldReturnUpdatedProduct() {

        Product existingProduct = createProduct(
                "CRO-001",
                "Crochet Bear"
        );

        productService.addProduct(1L, existingProduct);

        ProductRequest request = new ProductRequest();

        request.setSku("CRO-001");
        request.setName("Updated Crochet Bear");
        request.setDescription("Updated handmade crochet bear");
        request.setPrice(new BigDecimal("699.00"));
        request.setCategory("Toys");
        request.setActive(true);

        var result = productController.updateProduct(1L, request);

        assertNotNull(result);

        assertEquals("CRO-001", result.getSku());
        assertEquals("Updated Crochet Bear", result.getName());
        assertEquals("Updated handmade crochet bear", result.getDescription());
        assertEquals(new BigDecimal("699.00"), result.getPrice());
        assertEquals("Toys", result.getCategory());
        assertTrue(result.getActive());
    }

    @Test
    void deleteProduct_shouldReturnNoContent() {

        Product product = createProduct(
                "CRO-001",
                "Crochet Bear"
        );

        productService.addProduct(1L, product);

        var result = productController.deleteProduct(1L);

        assertEquals(204, result.getStatusCode().value());
        assertNull(result.getBody());
    }

    private Product createProduct(String sku, String name) {

        Product product = new Product();

        product.setSku(sku);
        product.setName(name);
        product.setDescription("Handmade crochet product");
        product.setPrice(new BigDecimal("499.00"));
        product.setCategory("Toys");
        product.setActive(true);

        return product;
    }
}
-- CRO-014
-- Seed sample crochet catalogue for development and testing.

INSERT INTO products (
    sku,
    name,
    description,
    price,
    category,
    active,
    created_at,
    updated_at
)
VALUES
    (
        'CRO-001',
        'Curly Petal Coaster',
        'Handmade flower-shaped crochet coaster with softly curled petals.',
        199.00,
        'COASTERS',
        TRUE,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'CRO-002',
        'Fruit Coaster',
        'Colourful fruit-inspired crochet coaster for cups, mugs and small tableware.',
        199.00,
        'COASTERS',
        TRUE,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'CRO-003',
        'Smiley Face Coaster',
        'Cheerful round crochet coaster featuring a simple smiling face design.',
        179.00,
        'COASTERS',
        TRUE,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'CRO-004',
        'Sleepy Bunny Coaster',
        'Cute bunny-inspired crochet coaster designed for mugs and small tableware.',
        249.00,
        'COASTERS',
        TRUE,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'CRO-005',
        'Fluffy Crochet Scrunchie',
        'Soft handmade crochet scrunchie with a fluffy and voluminous finish.',
        149.00,
        'HAIR_ACCESSORIES',
        TRUE,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'CRO-006',
        'Ruffle Crochet Scrunchie',
        'Handmade crochet scrunchie featuring soft decorative ruffled edges.',
        129.00,
        'HAIR_ACCESSORIES',
        TRUE,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'CRO-007',
        'Crochet Carnation',
        'Handmade crochet carnation suitable for bouquets, gifts and decorative arrangements.',
        249.00,
        'FLOWERS',
        TRUE,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'CRO-008',
        'Crochet Lily',
        'Three-dimensional handmade crochet lily for bouquets and home decoration.',
        299.00,
        'FLOWERS',
        TRUE,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'CRO-009',
        'Crochet Cherry Blossom',
        'Small handmade crochet cherry blossom for floral arrangements and decorative pieces.',
        99.00,
        'FLOWERS',
        TRUE,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ),
    (
        'CRO-010',
        'Flower Key Cozy',
        'Small flower-shaped crochet key accessory with a soft handmade finish.',
        199.00,
        'ACCESSORIES',
        TRUE,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    );

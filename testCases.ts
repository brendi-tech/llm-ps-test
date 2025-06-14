import { storeProducts } from './store';

export type Product = {
    name: string;
    quantity: number;
};

export type TestCase = {
    userMessage: string;
    expectedResults: {
        products: Product[];
        address: {
            street: string;
            number: string | number;
            neighboorhood: string;
        };
        payment: 'pix' | 'money' | 'credit' | 'debit' | 'VR' | 'VA';
        totalPrice: number;
    };
};

// Remover productPrices e adicionar função auxiliar para buscar preço
function getProductPrice(name: string): number {
    const product = storeProducts.find(p => p.name === name);
    if (!product) throw new Error(`Produto não encontrado: ${name}`);
    return product.price;
}

export const testCases: TestCase[] = [
    {
        userMessage: 'Quero 2 Temaki de Salmão e 1 Refrigerante 1 Litro para a Rua das Flores, 123, Centro. Vou pagar no crédito.',
        expectedResults: {
            products: [
                { name: 'Temaki de Salmão', quantity: 2 },
                { name: 'Refrigerante 1 Litro', quantity: 1 },
            ],
            address: {
                street: 'Rua das Flores',
                number: 123,
                neighboorhood: 'Centro',
            },
            payment: 'credit',
            totalPrice: 2 * getProductPrice('Temaki de Salmão') + 1 * getProductPrice('Refrigerante 1 Litro'),
        },
    },
    {
        userMessage: 'Me envie 3 Hot Roll de Salmão (4 unidades) e 2 Suco Del Valle lata para a Avenida Brasil, 456, Jardim América. Pagamento em dinheiro.',
        expectedResults: {
            products: [
                { name: 'Hot Roll de Salmão (4 unidades)', quantity: 3 },
                { name: 'Suco Del Valle lata', quantity: 2 },
            ],
            address: {
                street: 'Avenida Brasil',
                number: 456,
                neighboorhood: 'Jardim América',
            },
            payment: 'money',
            totalPrice: 3 * getProductPrice('Hot Roll de Salmão (4 unidades)') + 2 * getProductPrice('Suco Del Valle lata'),
        },
    },
    {
        userMessage: 'Gostaria de 1 Sashimi de Salmão e 1 H2oh na Rua Verde, 789, Bela Vista. Vou pagar com pix.',
        expectedResults: {
            products: [
                { name: 'Sashimi de Salmão', quantity: 1 },
                { name: 'H2oh', quantity: 1 },
            ],
            address: {
                street: 'Rua Verde',
                number: 789,
                neighboorhood: 'Bela Vista',
            },
            payment: 'pix',
            totalPrice: 1 * getProductPrice('Sashimi de Salmão') + 1 * getProductPrice('H2oh'),
        },
    },
    {
        userMessage: '2 Temaki de Califórnia e 1 Refrigerante Lata para a Rua Azul, 321, Vila Nova. Pagamento no débito.',
        expectedResults: {
            products: [
                { name: 'Temaki de Califórnia', quantity: 2 },
                { name: 'Refrigerante Lata', quantity: 1 },
            ],
            address: {
                street: 'Rua Azul',
                number: 321,
                neighboorhood: 'Vila Nova',
            },
            payment: 'debit',
            totalPrice: 2 * getProductPrice('Temaki de Califórnia') + 1 * getProductPrice('Refrigerante Lata'),
        },
    },
    {
        userMessage: 'Quero 4 Rolinho de Nutella para a Rua Amarela, 654, Centro. Vou pagar com VR.',
        expectedResults: {
            products: [
                { name: 'Rolinho de Nutella', quantity: 4 },
            ],
            address: {
                street: 'Rua Amarela',
                number: 654,
                neighboorhood: 'Centro',
            },
            payment: 'VR',
            totalPrice: 4 * getProductPrice('Rolinho de Nutella'),
        },
    },
    // Teste 6: Pedido com vários produtos diferentes, incluindo sobremesa e bebida, endereço com número por extenso, pagamento em VA
    {
        userMessage: 'Gostaria de 1 Combo Hot Rolls + Refrigerante 1L, 2 Temaki de Kani Crispy, 3 Rolinho de Kit Kat e 2 Água Mineral 500ml para a Rua do Sol, número quinhentos, Bairro Luz. Pagarei com VA.',
        expectedResults: {
            products: [
                { name: 'Combo Hot Rolls + Refrigerante 1L', quantity: 1 },
                { name: 'Temaki de Kani Crispy', quantity: 2 },
                { name: 'Rolinho de Kit Kat', quantity: 3 },
                { name: 'Água Mineral 500ml', quantity: 2 },
            ],
            address: {
                street: 'Rua do Sol',
                number: 'quinhentos',
                neighboorhood: 'Bairro Luz',
            },
            payment: 'VA',
            totalPrice:
                1 * getProductPrice('Combo Hot Rolls + Refrigerante 1L') +
                2 * getProductPrice('Temaki de Kani Crispy') +
                3 * getProductPrice('Rolinho de Kit Kat') +
                2 * getProductPrice('Água Mineral 500ml'),
        },
    },
    // Teste 7: Pedido com quantidades grandes, endereço com nome composto, pagamento em pix
    {
        userMessage: 'Preciso de 10 Mini Sushi, 5 Niguiri de Salmão (4 unidades), 2 Hot Fry de Salmão (4 unidades) e 1 Suco Del Valle lata para a Avenida das Palmeiras, 77, Jardim das Flores. Pagamento via pix.',
        expectedResults: {
            products: [
                { name: 'Mini Sushi', quantity: 10 },
                { name: 'Niguiri de Salmão (4 unidades)', quantity: 5 },
                { name: 'Hot Fry de Salmão (4 unidades)', quantity: 2 },
                { name: 'Suco Del Valle lata', quantity: 1 },
            ],
            address: {
                street: 'Avenida das Palmeiras',
                number: 77,
                neighboorhood: 'Jardim das Flores',
            },
            payment: 'pix',
            totalPrice:
                10 * getProductPrice('Mini Sushi') +
                5 * getProductPrice('Niguiri de Salmão (4 unidades)') +
                2 * getProductPrice('Hot Fry de Salmão (4 unidades)') +
                1 * getProductPrice('Suco Del Valle lata'),
        },
    },
    // Teste 8: Pedido com produtos hot, bebida e sobremesa, endereço com bairro composto, pagamento em dinheiro
    {
        userMessage: 'Quero 2 Hot roll de banana com doce de leite, 1 Hot Roll de Salmão (4 unidades), 1 Refrigerante Lata e 1 Rolinho de Chocolate Baton para a Rua das Laranjeiras, 12, Alto da Boa Vista. Pagarei em dinheiro.',
        expectedResults: {
            products: [
                { name: 'Hot roll de banana com doce de leite', quantity: 2 },
                { name: 'Hot Roll de Salmão (4 unidades)', quantity: 1 },
                { name: 'Refrigerante Lata', quantity: 1 },
                { name: 'Rolinho de Chocolate Baton', quantity: 1 },
            ],
            address: {
                street: 'Rua das Laranjeiras',
                number: 12,
                neighboorhood: 'Alto da Boa Vista',
            },
            payment: 'money',
            totalPrice:
                2 * getProductPrice('Hot roll de banana com doce de leite') +
                1 * getProductPrice('Hot Roll de Salmão (4 unidades)') +
                1 * getProductPrice('Refrigerante Lata') +
                1 * getProductPrice('Rolinho de Chocolate Baton'),
        },
    },
    // Teste 9: Pedido com temakis variados, endereço com número por extenso, pagamento no débito
    {
        userMessage: 'Me envie 1 Temaki de Salmão Supremo, 1 Temaki de Salmão Spicy, 1 Temaki de Salmão e Skin e 1 Temaki de Califórnia para a Rua do Campo, cento e vinte, Vila Esperança. Pagamento no débito.',
        expectedResults: {
            products: [
                { name: 'Temaki de Salmão Supremo', quantity: 1 },
                { name: 'Temaki de Salmão Spicy', quantity: 1 },
                { name: 'Temaki de Salmão e Skin', quantity: 1 },
                { name: 'Temaki de Califórnia', quantity: 1 },
            ],
            address: {
                street: 'Rua do Campo',
                number: 'cento e vinte',
                neighboorhood: 'Vila Esperança',
            },
            payment: 'debit',
            totalPrice:
                1 * getProductPrice('Temaki de Salmão Supremo') +
                1 * getProductPrice('Temaki de Salmão Spicy') +
                1 * getProductPrice('Temaki de Salmão e Skin') +
                1 * getProductPrice('Temaki de Califórnia'),
        },
    },
    // Teste 10: Pedido com sashimis, uramakis, sobremesa e bebida, endereço com bairro simples, pagamento no crédito
    {
        userMessage: 'Gostaria de 2 Sashimi de Salmão, 3 Uramakis de Salmão, 2 Rolinho de doce de leite com banana e 1 H2oh para a Rua Nova, 999, Centro. Pagarei no crédito.',
        expectedResults: {
            products: [
                { name: 'Sashimi de Salmão', quantity: 2 },
                { name: 'Uramakis de Salmão', quantity: 3 },
                { name: 'Rolinho de doce de leite com banana', quantity: 2 },
                { name: 'H2oh', quantity: 1 },
            ],
            address: {
                street: 'Rua Nova',
                number: 999,
                neighboorhood: 'Centro',
            },
            payment: 'credit',
            totalPrice:
                2 * getProductPrice('Sashimi de Salmão') +
                3 * getProductPrice('Uramakis de Salmão') +
                2 * getProductPrice('Rolinho de doce de leite com banana') +
                1 * getProductPrice('H2oh'),
        },
    },
]; 
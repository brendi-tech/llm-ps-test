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
        // Teste simples 1: 1 produto, endereço e pagamento direto
        userMessage: 'Quero 1 temaki de salmão para Rua das Palmeiras, 10, Centro. Pagamento no dinheiro.',
        expectedResults: {
            products: [
                { name: 'Temaki de Salmão', quantity: 1 },
            ],
            address: {
                street: 'Rua das Palmeiras',
                number: 10,
                neighboorhood: 'Centro',
            },
            payment: 'money',
            totalPrice: 1 * getProductPrice('Temaki de Salmão'),
        },
    },
    {
        // Teste simples 2: 2 produtos, endereço e pagamento direto
        userMessage: '2 refrigerante lata e 3 uramakis de salmão para Avenida Central, 55, Jardim das Flores. Vou pagar no débito.',
        expectedResults: {
            products: [
                { name: 'Refrigerante Lata', quantity: 2 },
                { name: 'Uramakis de Salmão', quantity: 3 },
            ],
            address: {
                street: 'Avenida Central',
                number: 55,
                neighboorhood: 'Jardim das Flores',
            },
            payment: 'debit',
            totalPrice: 2 * getProductPrice('Refrigerante Lata') + 3 * getProductPrice('Uramakis de Salmão'),
        },
    },
    {
        // Teste simples 3: 2 produtos, endereço e pagamento direto
        // Erros de português, abreviações, info extra irrelevante
        userMessage: 'Oii, queria 2 temaki salmao e um refri 1 litro, por favor, pra rua das flores, 123, centro. Ah, pode ser no crédito, e se tiver guardanapo manda tbm!',
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
        // Teste simples 4: 2 produtos, endereço e pagamento direto
        // Troca de ordem, erro de digitação, info extra
        userMessage: 'Pra Av. Brasil, 456, Jardim América, me manda 2 suco del vale lata e 3 hot roll salmao (4unid). Vou pagar em dinnheiro.',
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
        // Teste simples 5: 2 produtos, endereço e pagamento direto
        // Erro de português, info irrelevante, abreviação
        userMessage: '1 sashimi salmao e 1 h2oH pra rua verde, 789, bela vista. Vou pagar com pix. Se tiver balinha, manda tbm rs',
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
        // Teste simples 6: 2 produtos, endereço e pagamento direto
        // Ordem invertida, erro de acentuação, info extra
        userMessage: 'Pagamento no debito. 1 refrigerante lata e 2 temaki california pra rua azul, 321, vila nova. Pode mandar sem wasabi?',
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
        // Teste simples 7: 1 produto, endereço e pagamento direto
        // Erro de português, info irrelevante, abreviação
        userMessage: 'Quero 4 rolinho nutella pra rua amarela, 654, centro. Vou pagar VR. Se tiver desconto, aceito hein!',
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
    {
        // Teste simples 8: 4 produtos, endereço e pagamento direto
        // Erro de português, número por extenso, info extra
        userMessage: '1 combo hot rolls + refri 1L, 2 temaki kani crispy, 3 rolinho kit kat e 2 agua mineral 500ml pra rua do sol, número quinhentos, bairro luz. Pagarei com VA. Ah, pode mandar palitinho?',
        expectedResults: {
            products: [
                { name: 'Combo Hot Rolls + Refrigerante 1L', quantity: 1 },
                { name: 'Temaki de Kani Crispy', quantity: 2 },
                { name: 'Rolinho de Kit Kat', quantity: 3 },
                { name: 'Água Mineral 500ml', quantity: 2 },
            ],
            address: {
                street: 'Rua do Sol',
                number: 500,
                neighboorhood: 'Luz',
            },
            payment: 'VA',
            totalPrice:
                1 * getProductPrice('Combo Hot Rolls + Refrigerante 1L') +
                2 * getProductPrice('Temaki de Kani Crispy') +
                3 * getProductPrice('Rolinho de Kit Kat') +
                2 * getProductPrice('Água Mineral 500ml'),
        },
    },
    {
        // Teste simples 9: 4 produtos, endereço e pagamento direto
        // Erro de português, info irrelevante, abreviação
        userMessage: 'Preciso de 10 mini sushi, 5 niguiri salmao (4un), 2 hot fry salmao (4un) e 1 suco del valle lata pra av. das palmeiras, 77, jardim das flores. Pago via pix. Se tiver brinde, manda aí!',
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
    {
        // Teste simples 10: 4 produtos, endereço e pagamento direto
        // Erro de português, info irrelevante, abreviação
        userMessage: 'Quero 2 hot roll banana c/ doce de leite, 1 hot roll salmao (4un), 1 refri lata e 1 rolinho baton pra rua das laranjeiras, 12, alto da boa vista. Pagamento: dinheiro. Pode mandar sem gengibre?',
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
    {
        // Teste simples 11: 4 produtos, endereço e pagamento direto
        // Erro de português, número por extenso, info extra
        userMessage: 'Me envia 1 temaki salmao supremo, 1 temaki salmao spicy, 1 temaki salmao e skin e 1 temaki california pra rua do campo, cento e vinte, vila esperança. Pago no debito. Se tiver hashis, manda!',
        expectedResults: {
            products: [
                { name: 'Temaki de Salmão Supremo', quantity: 1 },
                { name: 'Temaki de Salmão Spicy', quantity: 1 },
                { name: 'Temaki de Salmão e Skin', quantity: 1 },
                { name: 'Temaki de Califórnia', quantity: 1 },
            ],
            address: {
                street: 'Rua do Campo',
                number: 120,
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
    {
        // Teste simples 12: 4 produtos, endereço e pagamento direto
        // Erro de português, info irrelevante, abreviação
        userMessage: '2 sashimi salmao, 3 uramaki salmao, 2 rolinho doce de leite + banana e 1 h2oh pra rua nova, 999, centro. Pago no crédito. Se puder, manda sem gengibre!',
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
    {
        // Teste simples 13: 4 produtos, endereço e pagamento direto, com nome do produto sinonimo ao inves de nome parecido
        // Erro de português, info irrelevante, abreviação
        userMessage: '2 sashimi salmao, 3 uramaki salmao, 2 rolinho doce de leite + banana e uam coca lata pra rua nova, 999, centro. Pago no crédito. Se puder, manda sem gengibre!',
        expectedResults: {
            products: [
                { name: 'Sashimi de Salmão', quantity: 2 },
                { name: 'Uramakis de Salmão', quantity: 3 },
                { name: 'Rolinho de doce de leite com banana', quantity: 2 },
                { name: 'Refrigerante Lata', quantity: 1 },
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
                1 * getProductPrice('Refrigerante Lata'),
        },
    },
    {
        // Teste simples 14: 2 produtos, endereço e pagamento direto, com nome do produto sinonimo ao inves de nome parecido e usando uma expressão para o tamanho do produto
        // Ordem invertida, erro de acentuação, info extra
        userMessage: 'Pagamento no debito. uma fanta da maior que tiver e 2 temaki california pra rua azul, 321, vila nova. Pode mandar sem wasabi?',
        expectedResults: {
            products: [
                { name: 'Temaki de Califórnia', quantity: 2 },
                { name: 'Refrigerante 1 Litro', quantity: 1 },
            ],
            address: {
                street: 'Rua Azul',
                number: 321,
                neighboorhood: 'Vila Nova',
            },
            payment: 'debit',
            totalPrice: 2 * getProductPrice('Temaki de Califórnia') + 1 * getProductPrice('Refrigerante 1 Litro'),
        },
    },
]; 
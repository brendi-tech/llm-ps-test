import fs from 'fs';
import { testCases, TestCase, Product } from './testCases';
import { structurize } from './structurize';


async function compareProducts(a: Product[] | undefined, b: Product[]): Promise<boolean> {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    // Ordena para comparação independente da ordem
    const sortFn = (p: Product) => `${p.name}|${p.quantity}`;
    const aSorted = [...a].sort((x, y) => sortFn(x).localeCompare(sortFn(y)));
    const bSorted = [...b].sort((x, y) => sortFn(x).localeCompare(sortFn(y)));
    return aSorted.every((prod, idx) => prod.name === bSorted[idx].name && prod.quantity === bSorted[idx].quantity);
}

function compareAddress(a: TestCase['expectedResults']['address'] | undefined, b: TestCase['expectedResults']['address']): boolean {
    if (!a || !b) return false;
    return a.street === b.street && a.number === b.number && a.neighboorhood === b.neighboorhood;
}

function comparePayment(a: string | undefined, b: string): boolean {
    return a === b;
}

function compareTotalPrice(a: number | undefined, b: number): boolean {
    return a === b;
}

export async function runTestComparisons() {
    const results = [];
    let totalProducts = 0, totalAddress = 0, totalPayment = 0, totalTotalPrice = 0, totalAll = 0;

    for (const testCase of testCases) {
        const result = await structurize(testCase.userMessage);
        const expected = testCase.expectedResults;
        const productsEqual = await compareProducts(result?.products, expected.products);
        const addressEqual = compareAddress(result?.address, expected.address);
        const paymentEqual = comparePayment(result?.payment, expected.payment);
        const totalPriceEqual = compareTotalPrice(result?.totalPrice, expected.totalPrice);
        const allEqual = productsEqual && addressEqual && paymentEqual && totalPriceEqual;
        if (productsEqual) totalProducts++;
        if (addressEqual) totalAddress++;
        if (paymentEqual) totalPayment++;
        if (totalPriceEqual) totalTotalPrice++;
        if (allEqual) totalAll++;
        results.push({
            productsEqual,
            addressEqual,
            paymentEqual,
            totalPriceEqual,
            allEqual
        });
    }

    // Escreve o CSV
    const header = 'productsEqual,addressEqual,paymentEqual,totalPriceEqual,allEqual\n';
    const lines = results.map(r => `${r.productsEqual},${r.addressEqual},${r.paymentEqual},${r.totalPriceEqual},${r.allEqual}`).join('\n');
    const totals = `${totalProducts},${totalAddress},${totalPayment},${totalTotalPrice},${totalAll}`;
    fs.writeFileSync('test_results.csv', header + lines + '\n' + totals);

    return `${totalProducts + totalAddress + totalPayment + totalTotalPrice + totalAll}/${testCases.length * 5}`;

} 
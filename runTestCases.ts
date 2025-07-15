import { testCases } from './testCases';

testCases.forEach((testCase, idx) => {
    const productsInfo = testCase.expectedResults.products
        .map(p => `${p.quantity}x ${p.name}`)
        .join(', ');
    console.log(`TestCase #${idx}: products = [${productsInfo}], totalPrice = ${testCase.expectedResults.totalPrice}`);
});
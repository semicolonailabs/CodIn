// fibonacci.js - Another test file for CodIn Extension

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Optimized version with memoization
const fibonacciMemo = (function() {
    const cache = {};
    return function(n) {
        if (n in cache) return cache[n];
        if (n <= 1) return n;
        cache[n] = fibonacciMemo(n - 1) + fibonacciMemo(n - 2);
        return cache[n];
    };
})();

// Array-based approach
function fibonacciArray(n) {
    const fib = [0, 1];
    for (let i = 2; i <= n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib[n];
}

// Test the functions
console.log(`Fibonacci(10) = ${fibonacci(10)}`);
console.log(`Memoized Fibonacci(10) = ${fibonacciMemo(10)}`);
console.log(`Array Fibonacci(10) = ${fibonacciArray(10)}`);

// Select different parts of this code to test CodIn extension features!

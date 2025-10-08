# factorial.py - Test file for CodIn Extension

def factorial(n):
    """Calculate factorial of a number using recursion"""
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)

# Test with different approaches
def factorial_iterative(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

# Edge case handling
def safe_factorial(n):
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers")
    return factorial(n)

# Usage examples
if __name__ == "__main__":
    print(f"5! = {factorial(5)}")
    print(f"Iterative 5! = {factorial_iterative(5)}")
    
    # Try selecting different parts of this code to test the extension!

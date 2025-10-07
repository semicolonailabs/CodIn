def calculate_factorial(n):
    """
    Calculate factorial of a given number using recursion.
    
    Args:
        n (int): Non-negative integer
    
    Returns:
        int: Factorial of n
    """
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers")
    elif n == 0 or n == 1:
        return 1
    else:
        return n * calculate_factorial(n - 1)

# Example usage
if __name__ == "__main__":
    numbers = [0, 1, 5, 10]
    
    for num in numbers:
        try:
            result = calculate_factorial(num)
            print(f"Factorial of {num} is {result}")
        except ValueError as e:
            print(f"Error: {e}")

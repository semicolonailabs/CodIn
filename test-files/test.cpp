#include <iostream>
#include <vector>
#include <algorithm>

class BinarySearch {
public:
    static int search(const std::vector<int>& arr, int target) {
        int left = 0;
        int right = arr.size() - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1; // Element not found
    }
};

int main() {
    std::vector<int> numbers = {1, 3, 5, 7, 9, 11, 13, 15};
    int target = 7;
    
    int result = BinarySearch::search(numbers, target);
    if (result != -1) {
        std::cout << "Element found at index: " << result << std::endl;
    } else {
        std::cout << "Element not found" << std::endl;
    }
    
    return 0;
}

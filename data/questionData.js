export const questions = [
    {
        id: 'q1',
        title: 'Question 1',
        description: `
Given a string of lowercase English characters, transform it into a palindrome by rearranging and deleting characters from the string.
Find the minimum number of deletions required so that the remaining string can be rearranged into a palindrome.

Note: A palindrome is a string that reads the same forwards and backwards, such as "racecar" or "level".

**Example 1**
Input: s = "abcedda"
Output: 2
Explanation:
Possible approaches:
- Remove characters at positions 1 and 2 to get "aedda", which can be rearranged into "adeda".
- Remove characters at positions 1, 2, and 3 to get "adda", which is already a palindrome.
The first approach is optimal.

**Example 2**
Input: s = "abdaa"
Output: 2
Explanation:
One optimal solution for transforming "abdaa" into a palindrome is to remove the characters 'b' and 'd', resulting in "aaa".

**Constraints**
- 0 ≤ length of string ≤ 2*10^6
- string consists of lowercase English letters
    `,
        codeTemplate: `import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.function.*;
import java.util.regex.*;
import java.util.stream.*;
import static java.util.stream.Collectors.joining;
import static java.util.stream.Collectors.toList;

class Result {

    /*
     * Complete the 'minDeletions' function below.
     *
     * The function is expected to return an INTEGER.
     * The function accepts STRING s as parameter.
     */

    public static int minDeletions(String s) {
        // Write your code here
        return 0;
    }

}

public class Solution {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        String s = bufferedReader.readLine();

        int result = Result.minDeletions(s);

        bufferedWriter.write(String.valueOf(result));
        bufferedWriter.newLine();

        bufferedReader.close();
        bufferedWriter.close();
    }
}`
    },
    {
        id: 'q2',
        title: 'Two Sum',
        description: `
Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

**Example 1:**
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
    `,
        codeTemplate: `import java.io.*;
class Result {
    /*
     * Complete the 'twoSum' function below.
     */
    public static int[] twoSum(int[] nums, int target) {
        // Write your code here
        return new int[]{};
    }
}
public class Solution {
    // Boilerplate main logic hidden
}`
    }
];

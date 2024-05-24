import java.io.*;
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
     * Complete the 'swapNodes' function below.
     *
     * The function is expected to return a 2D_INTEGER_ARRAY.
     * The function accepts following parameters:
     *  1. 2D_INTEGER_ARRAY indexes
     *  2. INTEGER_ARRAY queries
     */

    public static List<List<Integer>> swapNodes(List<List<Integer>> indexes, List<Integer> queries) {
    // Write your code here
 for (int k : queries) {
            swap(indexes, 0, 1, k);
            // inorder
            List<Integer> r = new ArrayList<>();
            res.add(inorder(indexes, r, 0));
        }
        return res;
    }
    
    static List<Integer> inorder(List<List<Integer>> indexes, List<Integer> list, int i) {
        if (indexes.get(i).get(0) != -1) {
            inorder(indexes, list, indexes.get(i).get(0) - 1);
        }
        list.add(i+1);
        if (indexes.get(i).get(1) != -1) {
            inorder(indexes, list, indexes.get(i).get(1) - 1);
        }
        return list;
    }
    
    static void swap(List<List<Integer>> indexes, int i, int level, int k) {
        if (level % k == 0) {
            List<Integer> node = indexes.get(i);
            int temp = node.get(0);
            node.set(0, node.get(1));
            node.set(1, temp);
            indexes.set(i, node);
        }
        if (indexes.get(i).get(0) != -1) {
            swap(indexes, indexes.get(i).get(0) - 1, level + 1, k);
        }
        if (indexes.get(i).get(1) != -1) {
            swap(indexes, indexes.get(i).get(1) - 1, level + 1, k);
        }

}

public class Solution {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        int n = Integer.parseInt(bufferedReader.readLine().trim());

        List<List<Integer>> indexes = new ArrayList<>();

        IntStream.range(0, n).forEach(i -> {
            try {
                indexes.add(
                    Stream.of(bufferedReader.readLine().replaceAll("\\s+$", "").split(" "))
                        .map(Integer::parseInt)
                        .collect(toList())
                );
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        });

        int queriesCount = Integer.parseInt(bufferedReader.readLine().trim());

        List<Integer> queries = IntStream.range(0, queriesCount).mapToObj(i -> {
            try {
                return bufferedReader.readLine().replaceAll("\\s+$", "");
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        })
            .map(String::trim)
            .map(Integer::parseInt)
            .collect(toList());

        List<List<Integer>> result = Result.swapNodes(indexes, queries);

        result.stream()
            .map(
                r -> r.stream()
                    .map(Object::toString)
                    .collect(joining(" "))
            )
            .map(r -> r + "\n")
            .collect(toList())
            .forEach(e -> {
                try {
                    bufferedWriter.write(e);
                } catch (IOException ex) {
                    throw new RuntimeException(ex);
                }
            });

        bufferedReader.close();
        bufferedWriter.close();
    }
}
}
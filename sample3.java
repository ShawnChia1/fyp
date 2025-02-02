public class FunctionChain {

    public static void main(String[] args) {
        FunctionChain chain = new FunctionChain();
        chain.startProcess();
    }

    // Entry point function
    public void startProcess() {
        System.out.println("Starting the process...");
        int result = firstFunction(5);
        System.out.println("Final result: " + result);
    }

    // First function in the chain
    private int firstFunction(int input) {
        System.out.println("Executing firstFunction with input: " + input);
        int intermediateResult = secondFunction(input * 2);
        return finalFunction(intermediateResult);
    }

    // Second function in the chain
    private int secondFunction(int input) {
        System.out.println("Executing secondFunction with input: " + input);
        int intermediateResult = thirdFunction(input + 3);
        return intermediateResult * 2;
    }

    // Third function in the chain
    private int thirdFunction(int input) {
        System.out.println("Executing thirdFunction with input: " + input);
        return helperFunction(input) + 10;
    }

    // Helper function used by multiple other functions
    private int helperFunction(int input) {
        System.out.println("Executing helperFunction with input: " + input);
        return input * input; // Square of the input
    }

    // Final function in the chain
    private int finalFunction(int input) {
        System.out.println("Executing finalFunction with input: " + input);
        return input - 5;
    }
}

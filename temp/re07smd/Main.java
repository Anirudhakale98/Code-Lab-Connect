import java.util.*;
public class Main {
	public static void main(String[] args) {
		// Your code here
		Scanner sc = new Scanner(System.in);	 
      	int num = sc.nextInt();
      	
      int rev = 0;
      while(num > 0){
        rev = rev*10 + num%10;
        num /= 10;
      }
      System.out.println(rev);
	}
}
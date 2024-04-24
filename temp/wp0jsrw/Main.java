impoort java.util.*;
public class Main {
	public static void main(String[] args) {
		// Your code here
	 //System.out.println("Hello World");
      int num = sc.nextInt();
      int rev = 0;
      while(num > 0){
        rev = rev*10 + num%10;
        num /= 10;
      }
      System.out.println(rev);
	}
}
package kang.example1;

/**
 * 求子数组和的最大值
 * @author qiao123
 */
public class Practice {
	
	//时间复杂度为N*N
	public static void findMaxSubArrSum(){
		//sum 为子数组的和
		int sum = 0;
		//max 为子数组和的最大值
		int max = 0;
		//最大子数组的起始位置
		int startPos = 0;
		//最大子数组的结束位置
		int endPos = 0;
		
		int[] arr = {-1,2,-3,12,-5,-1,9,-2};
		
		for (int i = 0; i < arr.length; i++) {
			sum = 0;
			for (int j = i; j < arr.length; j++) {
				sum += arr[j];
				if(sum>max){
					max =sum;
					startPos = i;
					endPos = j+1;
				}
			}
		}
		
		System.out.println("Max:" +max);
		System.out.println("startPos:"+startPos+";endPos:"+endPos);
	}
	
	//时间复杂度为N
	public static void findMaxSubArrSumN(){
		//sum 为子数组的和
		int sum = 0;
		//max 为子数组和的最大值
		int max = 0;
		//最大子数组的起始位置
		int startPos = 0;
		//最大子数组的结束位置
		int endPos = 0;
		
		int[] arr = {-1,2,-3,12,-5,-1,9,-2};
		
		for (int i = 0; i < arr.length; i++) {
			sum += arr[i];
			if(sum<0){
				sum = 0;
				startPos = i+1;
			}
			
			if(sum >max){
				max = sum;
				endPos=i+1;
			}
		}
		
		System.out.println("Max:" +max);
		System.out.println("startPos:"+startPos+";endPos:"+endPos);
	}
	
	//测试
	public static void main(String[] args) {
		findMaxSubArrSum();
		findMaxSubArrSumN();
	}
}

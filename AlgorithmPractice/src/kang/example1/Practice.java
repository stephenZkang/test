package kang.example1;

/**
 * ��������͵����ֵ
 * @author qiao123
 */
public class Practice {
	
	//ʱ�临�Ӷ�ΪN*N
	public static void findMaxSubArrSum(){
		//sum Ϊ������ĺ�
		int sum = 0;
		//max Ϊ������͵����ֵ
		int max = 0;
		//������������ʼλ��
		int startPos = 0;
		//���������Ľ���λ��
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
	
	//ʱ�临�Ӷ�ΪN
	public static void findMaxSubArrSumN(){
		//sum Ϊ������ĺ�
		int sum = 0;
		//max Ϊ������͵����ֵ
		int max = 0;
		//������������ʼλ��
		int startPos = 0;
		//���������Ľ���λ��
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
	
	//����
	public static void main(String[] args) {
		findMaxSubArrSum();
		findMaxSubArrSumN();
	}
}

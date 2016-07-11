package sg.gov.mindef.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.Calendar;

import sg.gov.mindef.XMLtoXML;

import com.ibm.workplace.wcm.api.exceptions.DocumentRetrievalException;

public class Utility {

	public static String getMonthInString(int month) {
		String strMonth = null;
		switch (month) {
		case Calendar.JANUARY:
			strMonth = "January";
			break;
		case Calendar.FEBRUARY:
			strMonth = "February";
			break;
		case Calendar.MARCH:
			strMonth = "March";
			break;
		case Calendar.APRIL:
			strMonth = "April";
			break;
		case Calendar.MAY:
			strMonth = "May";
			break;
		case Calendar.JUNE:
			strMonth = "June";
			break;
		case Calendar.JULY:
			strMonth = "July";
			break;
		case Calendar.AUGUST:
			strMonth = "August";
			break;
		case Calendar.SEPTEMBER:
			strMonth = "September";
			break;
		case Calendar.OCTOBER:
			strMonth = "October";
			break;
		case Calendar.NOVEMBER:
			strMonth = "November";
			break;
		case Calendar.DECEMBER:
			strMonth = "December";
			break;
		}
		return strMonth;
	}
	
	public static void getFiles(File[] listFiles, String extension) {
		for (File file : listFiles) {
			if (file.isDirectory()) {
				System.out.println("Directory path -----------"
						+ file.getPath());
				getFiles(file.listFiles(), extension);
			} else {
				System.out.println("File Name:" + file.getName());

				InputStream inputStream;
				try {
					if(getFileExtensionName(file).indexOf(extension) != -1){
						
						inputStream = new FileInputStream(file);
						XMLtoXML.readFromXML(inputStream,file.getAbsolutePath());
					}
				} catch (FileNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (DocumentRetrievalException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

			}
		}
	}

	public static String getFileExtensionName(File f) {
		if (f.getName().indexOf(".") == -1) {
			return "";
		} else {
			return f.getName().substring(f.getName().length() - 3,
					f.getName().length());
		}
	}
	
	public static void getImageFiles(File[] listFiles){
		for (File file : listFiles) {
			if (file.isDirectory()) {
				System.out.println("Directory path -----------"
						+ file.getPath());
				getImageFiles(file.listFiles());
			} else {
				System.out.println("File Name:" + file.getName());
			}
		}
	}
}

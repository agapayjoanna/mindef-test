package sg.gov.mindef.util;

import java.util.Calendar;

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
}

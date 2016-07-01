//package sg.gov.mindef;
//
//import java.io.File;
//import java.io.FileOutputStream;
//import java.io.IOException;
//
//import javax.swing.plaf.basic.BasicTreeUI.NodeDimensionsHandler;
//import javax.xml.parsers.DocumentBuilder;
//import javax.xml.parsers.DocumentBuilderFactory;
//import javax.xml.parsers.ParserConfigurationException;
//
//import org.apache.poi.hssf.usermodel.HSSFCell;
//import org.apache.poi.hssf.usermodel.HSSFRow;
//import org.apache.poi.hssf.usermodel.HSSFSheet;
//import org.apache.poi.hssf.usermodel.HSSFWorkbook;
//import org.apache.poi.ss.usermodel.CellStyle;
//import org.apache.poi.ss.usermodel.Font;
//import org.apache.poi.ss.util.CellRangeAddress;
//import org.w3c.dom.Document;
//import org.w3c.dom.Element;
//import org.w3c.dom.NamedNodeMap;
//import org.w3c.dom.Node;
//import org.w3c.dom.NodeList;
//import org.xml.sax.SAXException;
//
//public class XMLToExcel {
//	
//	public static void main(String[] args){
//		File file = new File("C:\\Users\\sofronio.a.mier\\Downloads\\Press_Room_5May2016\\jcr_root\\content\\imindef\\press_room\\official_releases\\nr\\2016\\may\\05may16_nr\\.content.xml");
//		generateExcel(file);
//	}
//	
//	public static void generateExcel(File xmlDocument){		
//		try {
//			HSSFWorkbook workbook = new HSSFWorkbook();
//			HSSFSheet sheet = workbook.createSheet();
//			//parse xml document
//			DocumentBuilderFactory factory =  DocumentBuilderFactory.newInstance();
//			DocumentBuilder builder = factory.newDocumentBuilder();
//			Document document = builder.parse(xmlDocument);
//			NodeList list = document.getElementsByTagName("jcr:content");
//			Element element = (Element) list.item(0);
//			System.out.println(element.getAttribute("jcr:title"));
//			Element contentNode = (Element) element.getElementsByTagName("imindefPars2012").item(0);
//			Element content = (Element) contentNode.getElementsByTagName("Single").item(0);
//			System.out.println(content.getAttribute("text"));
//			Element postedDate = (Element) element.getElementsByTagName("posteddate").item(0);
//			System.out.println(postedDate.getAttribute("jcr:lastModified"));
//			String date = postedDate.getAttribute("jcr:lastModified");
//			String title = element.getAttribute("jcr:title");
//			String contentStr = content.getAttribute("text");
//			HSSFRow row = sheet.createRow(0);
//			HSSFCell dateCell = row.createCell(0);
//			dateCell.setCellValue("Date Posted");
//			HSSFCell titleCell = row.createCell(1);
//			titleCell.setCellValue("Title");
//			HSSFCell contentCell = row.createCell(2);
//			contentCell.setCellValue("Content");
//			Font font = workbook.createFont();
//			font.setFontName("Serif");
//			CellStyle  style = workbook.createCellStyle();
//			style.setWrapText(true);
//			style.setFont(font);
//			style.setAlignment(CellStyle.ALIGN_CENTER);
//			//Create Row Content
//			HSSFRow row1= sheet.createRow(1);
//			HSSFCell cell = row1.createCell(0);
//			cell.setCellStyle(style);
//			cell.setCellValue(date);
//			HSSFCell cell1 = row1.createCell(1);
//			cell1.setCellStyle(style);
//			cell1.setCellValue(title);
//			HSSFCell cell2 = row1.createCell(2);
//			cell2.setCellStyle(style);
//			cell2.setCellValue(contentStr);
//			row1.setHeight((short) 3500);
//			
//			
//			sheet.setColumnWidth(0, calculateWidth(date.length()));
//			sheet.setColumnWidth(1, calculateWidth(date.length()));
//			sheet.setColumnWidth(2, calculateWidth(title.length()));
//			FileOutputStream fos = new FileOutputStream(new File("test.xls"));
//			workbook.write(fos);
//			fos.flush();
//			fos.close();
//			
//		} catch (ParserConfigurationException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (SAXException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		
//		
//		
//	}
//	
//	
//	public static int calculateWidth(int maxNumberofCharacters){
//		return (int) ((maxNumberofCharacters * 1.14388) * 256);
//	}
//
//}

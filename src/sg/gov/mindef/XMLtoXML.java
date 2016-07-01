package sg.gov.mindef;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.DOMImplementation;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.ibm.workplace.wcm.api.DocumentId;
import com.ibm.workplace.wcm.api.Workspace;
import com.ibm.workplace.wcm.api.exceptions.DocumentRetrievalException;
import com.ibm.workplace.wcm.api.exceptions.OperationFailedException;
import com.ibm.workplace.wcm.api.exceptions.ServiceNotAvailableException;

import sg.gov.mindef.dto.NewsContentDTO;
import sg.gov.mindef.dto.NewsImageDTO;
import sg.gov.mindef.util.AccessUtil;

public class XMLtoXML {

	private static SimpleDateFormat sdf = new SimpleDateFormat(
			"EEE, d MMMMM yyyy HH:mm:ss z");
	

	/*
	 * public static void main(String[] args){ File file = new File(
	 * "C:\\Users\\sofronio.a.mier\\Downloads\\Press_Room_5May2016\\jcr_root\\content\\imindef\\press_room\\official_releases\\nr\\2016\\may\\05may16_nr\\.content.xml"
	 * ); readFromXML(file); }
	 */

	// public static void readFromXML(InputStream inputStream){
	// DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
	// DocumentBuilder builder;
	// try {
	// builder = factory.newDocumentBuilder();
	// Document document = builder.parse(inputStream);
	// NodeList list = document.getElementsByTagName("jcr:content");
	// Element element = (Element) list.item(0);
	// System.out.println(element.getAttribute("jcr:title"));
	// Element contentNode = (Element)
	// element.getElementsByTagName("imindefPars2012").item(0);
	// Element content = (Element)
	// contentNode.getElementsByTagName("Single").item(0);
	// Element newsImage = (Element)
	// element.getElementsByTagName("newsimage").item(0);
	// Element image = (Element)
	// newsImage.getElementsByTagName("image").item(0);
	// System.out.println(content.getAttribute("text"));
	// Element postedDate = (Element)
	// element.getElementsByTagName("posteddate").item(0);
	// System.out.println(element.getAttribute("cq:lastModified"));
	// String date =element.getAttribute("cq:lastModified");
	// String updatedDate = date.substring(date.indexOf("}") + 1,
	// date.lastIndexOf("+"));
	// System.out.println("atay----"+updatedDate);
	// Date dateObj = new
	// SimpleDateFormat("yyyy-dd-MM'T'HH:mm:ss.SSS").parse(updatedDate);
	// SimpleDateFormat sdf = new
	// SimpleDateFormat("EEE, d MMMMM yyyy HH:mm:ss z");
	// sdf.setTimeZone(TimeZone.getTimeZone("Asia/Singapore"));
	// System.out.println("formatted date---"+sdf.format(dateObj));
	//
	// String title = element.getAttribute("pageTitle");
	// String contentStr = content.getAttribute("text");
	// String imageStr = image.getAttribute("fileReference");
	// NewsContentDTO contentDTO = new NewsContentDTO();
	// if(imageStr !=null){
	// NewsImageDTO imgDTO = new NewsImageDTO();
	// imgDTO.setName("image");
	// imgDTO.setSrc("http://www.mindef.gov.sg" + imageStr);
	// contentDTO.getImages().add(imgDTO);
	// }
	// contentDTO.setTitle(title);
	// contentDTO.setGuid(element.getAttribute("jcr:uuid"));
	// contentDTO.setPostedDate(sdf.format(dateObj));
	// contentDTO.setContent(contentStr);
	// AccessUtil util = new AccessUtil();
	// util.createContent(contentDTO);
	// // generateXML(contentDTO);
	//
	// } catch (ParserConfigurationException e) {
	// // TODO Auto-generated catch block
	// e.printStackTrace();
	// } catch (SAXException e) {
	// // TODO Auto-generated catch block
	// e.printStackTrace();
	// } catch (IOException e) {
	// // TODO Auto-generated catch block
	// e.printStackTrace();
	// } catch (ParseException e) {
	// // TODO Auto-generated catch block
	// e.printStackTrace();
	// }
	//
	// }

	public static void readFromXML(InputStream inputStream, String fileDirectory)
			throws DocumentRetrievalException {
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder;
		try {
			builder = factory.newDocumentBuilder();
			Document document = builder.parse(inputStream);
			NodeList list = document.getElementsByTagName("jcr:content");
			System.out.println("Content Directory" + fileDirectory);
			if (hasNodes(list)) {
				Element element = (Element) list.item(0);
				System.out.println(element.getAttribute("jcr:title"));
				NodeList contentListNode = element
						.getElementsByTagName("imindefPars2012");
				
				if (hasNodes(contentListNode)) {
					Element contentNode = (Element) contentListNode.item(0);
					Element content = null;
					if (hasNodes(contentNode.getElementsByTagName("Single"))) {
						content = (Element) contentNode.getElementsByTagName(
								"Single").item(0);
					} else if(hasNodes(element.getElementsByTagName("leftpartop"))) {
						System.out.println("LEFT par top");
						NodeList contentRTE = element.getElementsByTagName("leftpartop");
						Element rte = (Element) contentRTE.item(0);
						if(hasNodes(rte.getElementsByTagName("richedit"))){
							System.out.println("rich edit");
							content = (Element) rte.getElementsByTagName("richedit").item(0);
						}
					}
					Element newsImage = null;
					Element image = null;
					if (hasNodes(element.getElementsByTagName("newsimage"))) {
						newsImage = (Element) element.getElementsByTagName(
								"newsimage").item(0);
						image = (Element) newsImage.getElementsByTagName(
								"image").item(0);
					}
					if (content != null) {
						Element postedDate = (Element) element
								.getElementsByTagName("posteddate").item(0);
						System.out.println(element
								.getAttribute("cq:lastModified"));
						String date = element.getAttribute("cq:lastModified");
						String updatedDate = date.substring(
								date.indexOf("}") + 1, date.lastIndexOf("+"));
						System.out.println("atay----" + updatedDate);
						Date dateObj = new SimpleDateFormat(
								"yyyy-MM-dd'T'HH:mm:ss.SSS").parse(updatedDate);

						sdf.setTimeZone(TimeZone.getTimeZone("Asia/Singapore"));
						System.out.println("formatted date---"
								+ sdf.format(dateObj));
						String contentStr = null;
						String title = element.getAttribute("pageTitle");
						if(content.hasAttribute("text")){
							contentStr = content.getAttribute("text");
						} else if(hasNodes(element.getElementsByTagName("leftpartop"))) {
							System.out.println("LEFT par top");
							NodeList contentRTE = element.getElementsByTagName("leftpartop");
							Element rte = (Element) contentRTE.item(0);
							if(hasNodes(rte.getElementsByTagName("richedit"))){
								System.out.println("rich edit");
								content = (Element) rte.getElementsByTagName("richedit").item(0);
								contentStr = content.getAttribute("text");
							}
						}
						String imageStr = image != null ? image
								.getAttribute("fileReference") : null;
						NewsContentDTO contentDTO = new NewsContentDTO();
						contentDTO.setTitle(title);
						contentDTO.setGuid(element.getAttribute("jcr:uuid"));
						contentDTO.setPostedDate(dateObj);
						contentDTO.setContent(contentStr);
						contentDTO.setCategory(getCategory(fileDirectory));
						AccessUtil util = new AccessUtil();
						int count = 0;
						util.createContent(contentDTO);

					}
					// generateXML(contentDTO);
				}

			}

		} catch (ParserConfigurationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SAXException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ServiceNotAvailableException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (OperationFailedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public static void generateXML(NewsContentDTO dto) {
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = null;
		try {
			builder = factory.newDocumentBuilder();
			factory.setNamespaceAware(true);
			DOMImplementation domImpl = builder.getDOMImplementation();
			URL nameSpace = new URL("http://purl.org/net/ibmfeedsvc/wcm/1.0");
			Document document = domImpl.createDocument(null, "rss", null);
			document.setXmlStandalone(true);
			Element nameSpaceElem = document.getDocumentElement();
			nameSpaceElem.setAttributeNS("http://www.w3.org/2000/xmlns/",
					"xmlns:ibmwcm", nameSpace.toString());
			nameSpaceElem.setAttribute("version", "2.0");
			Element channel = document.createElement("channel");
			Element root = document.createElement("item");
			nameSpaceElem.appendChild(channel);
			channel.appendChild(createElement(document, dto.getTitle(), "title"));
			channel.appendChild(document.createElement("link"));
			channel.appendChild(document.createElement("description"));
			channel.appendChild(root);
			;
			if (dto.getTitle() != null) {
				root.appendChild(createElement(document, dto.getTitle(),
						"title"));
			}
			if (dto.getGuid() != null) {
				root.appendChild(createElement(document, dto.getGuid(), "guid"));
			}
			if (dto.getPostedDate() != null) {
				root.appendChild(createDateElement(document, null,
						dto.getPostedDate(), "Date"));
			}
			root.appendChild(createElement(document, "add", "ibmwcm:action"));
			root.appendChild(createElement(document, "content",
					"ibmwcm:itemType"));
			root.appendChild(createElementAttribute(document,
					"/Official Releases/Official Releases",
					"ibmwcm:authoringTemplate", "ibmwcm:library",
					"iMindef Design"));
			root.appendChild(createElementAttribute(document,
					"/Official Release/Press Room/2016/May", "ibmwcm:path",
					"ibmwcm:library", "iMindef Content"));
			if (dto.getContent() != null) {
				root.appendChild(createTextElement(document, null,
						dto.getTitle(), "Title"));
				root.appendChild(createRTElement(document, null,
						dto.getContent(), "Content"));
			}
			if (dto.getImages() != null) {
				root.appendChild(createImageElement(document, null, dto
						.getImages().get(0).getSrc(), "image_1"));
			}
			Transformer transformer = TransformerFactory.newInstance()
					.newTransformer();
			transformer.setOutputProperty(OutputKeys.INDENT, "yes");
			DOMSource source = new DOMSource(document);
			File xmlFile = new File("xmlTest.xml");
			StreamResult result = new StreamResult(xmlFile.getPath());
			transformer.transform(source, result);

			System.out.println("XML DOM Created Successfully");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private static Node createElement(Document doc, String text, String node) {
		Element nodeElem = doc.createElement(node);
		if (text != null) {
			nodeElem.appendChild(doc.createTextNode(text));
		}
		return nodeElem;
	}

	private static Node createTextElement(Document doc, String node,
			String text, String attribute) {
		Element element = doc.createElement("ibmwcm:element");
		element.setAttribute("name", attribute);
		element.appendChild(createElement(doc, "text", "ibmwcm:type"));
		element.appendChild(createElement(doc, text, "ibmwcm:value"));
		return element;
	}

	private static Node createImageElement(Document doc, String node,
			String src, String attribute) {
		Element element = doc.createElement("ibmwcm:element");
		element.setAttribute("name", attribute);
		element.appendChild(createElement(doc, "image", "ibmwcm:type"));
		element.appendChild(createElement(doc, src, "ibmwcm:source"));
		return element;
	}

	private static Node createDateElement(Document doc, String node, Date date,
			String attribute) {
		Element element = doc.createElement("ibmwcm:element");
		element.setAttribute("name", attribute);
		element.appendChild(createElement(doc, "date", "ibmwcm:type"));
		element.appendChild(createElement(doc, sdf.format(date), "ibmwcm:value"));
		element.appendChild(createElement(doc, "date", "ibmwcm:format"));
		return element;
	}

	private static Node createRTElement(Document doc, String node, String text,
			String attribute) {
		Element element = doc.createElement("ibmwcm:element");
		element.setAttribute("name", attribute);
		element.appendChild(createElement(doc, "rich text", "ibmwcm:type"));
		element.appendChild(createElement(doc, "<![CDATA[" + text + "]]>",
				"ibmwcm:value"));
		return element;
	}

	private static Node createElementAttribute(Document doc, String text,
			String node, String attrName, String attrValue) {
		Element nodeElem = doc.createElement(node);
		nodeElem.setAttribute(attrName, attrValue);
		nodeElem.appendChild(doc.createTextNode(text));
		return nodeElem;
	}

	private static boolean hasNodes(NodeList nodeList) {
		boolean hasNodes = false;
		if (nodeList.getLength() > 0) {
			hasNodes = true;
		}
		return hasNodes;
	}
	public static String getCategory(String cat){
		System.out.println("Current path-------" + cat );
		if(cat.indexOf("nr") != -1){
			return "News Releases";
		} else if(cat.indexOf("mq") != -1){
			return "Replies to Media Queries";
		} else if(cat.indexOf("ps") != -1){
			return "Parliamentary Statements";
		} else if(cat.indexOf("fl") != -1){
			return "Forum Letter Replies";
		} else if(cat.indexOf("sp") != -1){
			return "Speeches";
		} else if(cat.indexOf("news_releases") != -1){
			return "News Releases";
		}
		return null;
	}
	

}

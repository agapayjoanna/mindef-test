package sg.gov.mindef;

import com.fasterxml.jackson.dataformat.xml.JacksonXmlModule;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

public class XMLObjectMapper {
	
	public static void main(String[] args){
		JacksonXmlModule module = new JacksonXmlModule();
		module.setDefaultUseWrapper(false);
		XmlMapper mapper = new XmlMapper();
	}

}

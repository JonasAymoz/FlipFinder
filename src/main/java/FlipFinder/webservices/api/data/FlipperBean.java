package FlipFinder.webservices.api.data;


import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FlipperBean {

    @JsonSerialize(using = ToStringSerializer.class)
    private String id;
    private String active;
    private Integer price1;
    private Integer price2;
    private java.time.LocalDate addDate;
    private java.time.LocalDate lastSeen;

    private String address;
    private String city;
    private Object coord;
    private String placeName;
    private Integer postalCode;
    private String schedule;

    private String lat;
    private String lng;

    private String missions;
    private String flipName;
}

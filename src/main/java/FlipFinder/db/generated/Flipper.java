package FlipFinder.db.generated;

import javax.annotation.Generated;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.querydsl.sql.Column;

/**
 * Flipper is a Querydsl bean type
 */
@Generated("com.coreoz.plume.db.querydsl.generation.IdBeanSerializer")
public class Flipper extends com.coreoz.plume.db.querydsl.crud.CrudEntityQuerydsl {

    @Column("active")
    private String active;

    @Column("add_date")
    private java.time.LocalDate addDate;

    @JsonSerialize(using=com.fasterxml.jackson.databind.ser.std.ToStringSerializer.class)
    @Column("id")
    private Long id;

    @Column("last_seen")
    private java.time.LocalDate lastSeen;

    @JsonSerialize(using=com.fasterxml.jackson.databind.ser.std.ToStringSerializer.class)
    @Column("model")
    private Long model;

    @JsonSerialize(using=com.fasterxml.jackson.databind.ser.std.ToStringSerializer.class)
    @Column("place")
    private Long place;

    @Column("price1")
    private Integer price1;

    @Column("price2")
    private Integer price2;

    public String getActive() {
        return active;
    }

    public void setActive(String active) {
        this.active = active;
    }

    public java.time.LocalDate getAddDate() {
        return addDate;
    }

    public void setAddDate(java.time.LocalDate addDate) {
        this.addDate = addDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public java.time.LocalDate getLastSeen() {
        return lastSeen;
    }

    public void setLastSeen(java.time.LocalDate lastSeen) {
        this.lastSeen = lastSeen;
    }

    public Long getModel() {
        return model;
    }

    public void setModel(Long model) {
        this.model = model;
    }

    public Long getPlace() {
        return place;
    }

    public void setPlace(Long place) {
        this.place = place;
    }

    public Integer getPrice1() {
        return price1;
    }

    public void setPrice1(Integer price1) {
        this.price1 = price1;
    }

    public Integer getPrice2() {
        return price2;
    }

    public void setPrice2(Integer price2) {
        this.price2 = price2;
    }

    @Override
    public boolean equals(Object o) {
        if (id == null) {
            return super.equals(o);
        }
        if (!(o instanceof Flipper)) {
            return false;
        }
        Flipper obj = (Flipper) o;
        return id.equals(obj.id);
    }

    @Override
    public int hashCode() {
        if (id == null) {
            return super.hashCode();
        }
        final int prime = 31;
        int result = 1;
        result = prime * result + id.hashCode();
        return result;
    }

    @Override
    public String toString() {
        return "Flipper#" + id;
    }

}

